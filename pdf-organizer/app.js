/* PDF Organizer — client-side only.
   Rendering: pdf.js  |  Editing/export: pdf-lib  |  Reorder: SortableJS */

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const { PDFDocument, degrees } = PDFLib;

// ---------- State ----------
let nextSrcId = 0;
let nextPageId = 0;
const sources = new Map();          // srcId -> { name, buffer (ArrayBuffer), doc (pdf.js doc promise) }
let pages = [];                     // ordered: { id, srcId, pageIndex, rotation }
const selected = new Set();         // selected page ids
const thumbCache = new Map();       // `${pageId}:${rotation}:${deviceW}` -> dataURL
const DPR = Math.min(window.devicePixelRatio || 1, 3); // render at device resolution (Retina-crisp)
const MAX_THUMB_W = 1400;           // cap thumbnail render width (device px)

// ---------- Elements ----------
const el = {
  fileInput: document.getElementById("fileInput"),
  addBtn: document.getElementById("addBtn"),
  browseBtn: document.getElementById("browseBtn"),
  dropzone: document.getElementById("dropzone"),
  stage: document.getElementById("stage"),
  grid: document.getElementById("grid"),
  status: document.getElementById("status"),
  exportBtn: document.getElementById("exportBtn"),
  selectAllBtn: document.getElementById("selectAllBtn"),
  rotateSelBtn: document.getElementById("rotateSelBtn"),
  deleteSelBtn: document.getElementById("deleteSelBtn"),
  busy: document.getElementById("busy"),
  busyText: document.getElementById("busyText"),
  layoutBtns: [...document.querySelectorAll(".layout-btn")],
  zoomInBtn: document.getElementById("zoomInBtn"),
  zoomOutBtn: document.getElementById("zoomOutBtn"),
  zoomReadout: document.getElementById("zoomReadout"),
};

// ---------- Lazy thumbnail rendering ----------
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        renderTile(e.target);
        io.unobserve(e.target);
      }
    }
  },
  { root: el.stage, rootMargin: "300px 0px" }
);

// ---------- File loading ----------
el.addBtn.addEventListener("click", () => el.fileInput.click());
el.browseBtn.addEventListener("click", () => el.fileInput.click());
el.fileInput.addEventListener("change", (e) => {
  loadFiles([...e.target.files]);
  el.fileInput.value = "";
});

["dragenter", "dragover"].forEach((ev) =>
  el.stage.addEventListener(ev, (e) => {
    e.preventDefault();
    el.stage.classList.add("dragover");
  })
);
["dragleave", "drop"].forEach((ev) =>
  el.stage.addEventListener(ev, (e) => {
    e.preventDefault();
    if (ev === "dragleave" && el.stage.contains(e.relatedTarget)) return;
    el.stage.classList.remove("dragover");
  })
);
el.stage.addEventListener("drop", (e) => {
  const files = [...(e.dataTransfer?.files || [])].filter(
    (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
  );
  if (files.length) loadFiles(files);
});

async function loadFiles(files) {
  if (!files.length) return;
  showBusy(`Loading ${files.length} file${files.length > 1 ? "s" : ""}…`);
  try {
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const srcId = nextSrcId++;
      // pdf.js may transfer the buffer to its worker, so give it a copy.
      const docPromise = pdfjsLib.getDocument({ data: buffer.slice(0) }).promise;
      const doc = await docPromise;
      sources.set(srcId, { name: file.name, buffer, doc });
      for (let i = 0; i < doc.numPages; i++) {
        pages.push({ id: nextPageId++, srcId, pageIndex: i, rotation: 0 });
      }
    }
    renderGrid();
  } catch (err) {
    console.error(err);
    alert("Could not read a PDF: " + err.message);
  } finally {
    hideBusy();
  }
}

// ---------- Grid rendering ----------
function renderGrid() {
  const hasPages = pages.length > 0;
  el.dropzone.hidden = hasPages;
  el.grid.hidden = !hasPages;

  el.grid.innerHTML = "";
  for (const p of pages) el.grid.appendChild(buildTile(p));
  updateToolbar();
}

function buildTile(p) {
  const tile = document.createElement("div");
  tile.className = "tile" + (selected.has(p.id) ? " is-selected" : "");
  tile.dataset.id = p.id;

  const wrap = document.createElement("div");
  wrap.className = "thumb-wrap";
  const skel = document.createElement("div");
  skel.className = "thumb-skeleton";
  wrap.appendChild(skel);

  const check = document.createElement("div");
  check.className = "tile-check";
  check.textContent = "✓";
  check.title = "Select page";
  check.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSelect(p.id);
  });

  const actions = document.createElement("div");
  actions.className = "tile-actions";
  const zoomBtn = mkActBtn("🔍", "Preview / zoom", (e) => {
    e.stopPropagation();
    openViewer(pages.findIndex((x) => x.id === p.id));
  });
  const rotBtn = mkActBtn("⟳", "Rotate 90°", (e) => {
    e.stopPropagation();
    rotatePages([p.id]);
  });
  const delBtn = mkActBtn("🗑", "Delete page", (e) => {
    e.stopPropagation();
    deletePages([p.id]);
  });
  delBtn.classList.add("danger");
  actions.append(zoomBtn, rotBtn, delBtn);

  const footer = document.createElement("div");
  footer.className = "tile-footer";
  const num = document.createElement("span");
  num.className = "tile-num";
  const src = document.createElement("span");
  src.className = "tile-src";
  src.textContent = sources.get(p.srcId)?.name || "";
  src.title = src.textContent;
  footer.append(num, src);

  tile.append(wrap, check, actions, footer);
  tile.addEventListener("dblclick", () =>
    openViewer(pages.findIndex((x) => x.id === p.id))
  );
  io.observe(tile);
  return tile;
}

function mkActBtn(label, title, onClick) {
  const b = document.createElement("button");
  b.className = "act-btn";
  b.textContent = label;
  b.title = title;
  b.addEventListener("click", onClick);
  return b;
}

async function renderTile(tile) {
  const id = Number(tile.dataset.id);
  const p = pages.find((x) => x.id === id);
  if (!p) return;
  const wrap = tile.querySelector(".thumb-wrap");
  const cssW = wrap.clientWidth || 240;
  const deviceW = Math.min(Math.round(cssW * DPR), MAX_THUMB_W);
  const key = `${p.id}:${p.rotation}:${deviceW}`;

  let url = thumbCache.get(key);
  if (!url) {
    try {
      url = await renderPageToDataURL(p, deviceW);
      thumbCache.set(key, url);
    } catch (err) {
      console.error("render failed", err);
      return;
    }
  }
  // Tile may have been removed/reused while awaiting.
  if (tile.dataset.id != id) return;
  wrap.innerHTML = "";
  const img = document.createElement("img");
  img.src = url;
  img.alt = "page";
  wrap.appendChild(img);
}

async function renderPageToDataURL(p, deviceW) {
  const src = sources.get(p.srcId);
  const page = await src.doc.getPage(p.pageIndex + 1);
  const base = page.getViewport({ scale: 1, rotation: p.rotation });
  const scale = deviceW / base.width;
  const v = page.getViewport({ scale, rotation: p.rotation });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(v.width);
  canvas.height = Math.ceil(v.height);
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport: v }).promise;
  return canvas.toDataURL("image/jpeg", 0.9);
}

// ---------- Selection ----------
function toggleSelect(id) {
  if (selected.has(id)) selected.delete(id);
  else selected.add(id);
  const tile = tileById(id);
  if (tile) tile.classList.toggle("is-selected", selected.has(id));
  updateToolbar();
}

el.selectAllBtn.addEventListener("click", () => {
  const allSelected = selected.size === pages.length;
  selected.clear();
  if (!allSelected) pages.forEach((p) => selected.add(p.id));
  for (const t of el.grid.children) {
    t.classList.toggle("is-selected", selected.has(Number(t.dataset.id)));
  }
  updateToolbar();
});

el.rotateSelBtn.addEventListener("click", () => rotatePages([...selected]));
el.deleteSelBtn.addEventListener("click", () => deletePages([...selected]));

// ---------- Page operations ----------
function rotatePages(ids) {
  const set = new Set(ids);
  for (const p of pages) {
    if (set.has(p.id)) p.rotation = (p.rotation + 90) % 360;
  }
  // Re-render affected tiles.
  for (const id of ids) {
    const tile = tileById(id);
    if (tile) {
      const wrap = tile.querySelector(".thumb-wrap");
      wrap.innerHTML = '<div class="thumb-skeleton"></div>';
      renderTile(tile);
    }
  }
}

function deletePages(ids) {
  const set = new Set(ids);
  pages = pages.filter((p) => !set.has(p.id));
  ids.forEach((id) => selected.delete(id));
  for (const id of ids) tileById(id)?.remove();
  // Drop unused sources to free memory.
  const usedSrc = new Set(pages.map((p) => p.srcId));
  for (const srcId of [...sources.keys()]) {
    if (!usedSrc.has(srcId)) sources.delete(srcId);
  }
  if (!pages.length) renderGrid();
  else updateToolbar();
}

// ---------- Layout & zoom ----------
let cols = 4;
const MIN_COLS = 1;
const MAX_COLS = 12;

function setCols(n) {
  cols = Math.max(MIN_COLS, Math.min(MAX_COLS, n));
  el.grid.style.setProperty("--cols", cols);
  el.grid.classList.toggle("single", cols === 1);
  el.grid.classList.toggle("dense", cols >= 6);
  el.layoutBtns.forEach((x) =>
    x.classList.toggle("is-active", Number(x.dataset.cols) === cols)
  );
  el.zoomReadout.textContent = cols + " / row";
  el.zoomInBtn.disabled = cols === MIN_COLS;
  el.zoomOutBtn.disabled = cols === MAX_COLS;
  reRenderThumbs();
}

el.layoutBtns.forEach((b) =>
  b.addEventListener("click", () => setCols(Number(b.dataset.cols)))
);
el.zoomInBtn.addEventListener("click", () => setCols(cols - 1));   // fewer cols = larger
el.zoomOutBtn.addEventListener("click", () => setCols(cols + 1));  // more cols = smaller

// Re-render visible thumbnails at the new on-screen size (keeps them sharp).
function reRenderThumbs() {
  thumbCache.clear();
  for (const tile of el.grid.children) {
    const wrap = tile.querySelector(".thumb-wrap");
    if (wrap) wrap.innerHTML = '<div class="thumb-skeleton"></div>';
    io.unobserve(tile);
    io.observe(tile);
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (pages.length) reRenderThumbs();
  }, 250);
});

// ---------- Drag reorder ----------
new Sortable(el.grid, {
  animation: 150,
  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  filter: ".tile-check, .act-btn",
  preventOnFilter: false,
  onEnd: reorderFromDom,
});

function reorderFromDom() {
  const order = [...el.grid.children].map((c) => Number(c.dataset.id));
  const rank = new Map(order.map((id, i) => [id, i]));
  pages.sort((a, b) => rank.get(a.id) - rank.get(b.id));
  updateToolbar(); // refresh page numbers
}

// ---------- Toolbar / status ----------
function updateToolbar() {
  const n = pages.length;
  const s = selected.size;
  el.exportBtn.disabled = n === 0;
  el.selectAllBtn.disabled = n === 0;
  el.rotateSelBtn.disabled = s === 0;
  el.deleteSelBtn.disabled = s === 0;
  el.selectAllBtn.textContent =
    s === n && n > 0 ? "Deselect all" : "Select all";

  const srcCount = new Set(pages.map((p) => p.srcId)).size;
  let txt = n === 0 ? "No pages loaded" : `${n} page${n > 1 ? "s" : ""}`;
  if (srcCount > 1) txt += ` from ${srcCount} files`;
  if (s > 0) txt += ` · ${s} selected`;
  el.status.textContent = txt;

  // refresh page-number badges to reflect current order
  [...el.grid.children].forEach((tile, i) => {
    const num = tile.querySelector(".tile-num");
    if (num) num.textContent = `#${i + 1}`;
  });
}

// ---------- Export ----------
el.exportBtn.addEventListener("click", exportPdf);

async function exportPdf() {
  if (!pages.length) return;
  showBusy("Building PDF…");
  try {
    const out = await PDFDocument.create();
    const loaded = new Map(); // srcId -> pdf-lib doc
    for (const p of pages) {
      let doc = loaded.get(p.srcId);
      if (!doc) {
        doc = await PDFDocument.load(sources.get(p.srcId).buffer);
        loaded.set(p.srcId, doc);
      }
      const [copied] = await out.copyPages(doc, [p.pageIndex]);
      if (p.rotation) {
        const base = copied.getRotation().angle || 0;
        copied.setRotation(degrees((base + p.rotation) % 360));
      }
      out.addPage(copied);
    }
    const bytes = await out.save();
    downloadBytes(bytes, suggestName());
  } catch (err) {
    console.error(err);
    alert("Export failed: " + err.message);
  } finally {
    hideBusy();
  }
}

function suggestName() {
  const names = [...new Set(pages.map((p) => sources.get(p.srcId)?.name))].filter(Boolean);
  if (names.length === 1) {
    return names[0].replace(/\.pdf$/i, "") + "-organized.pdf";
  }
  return "organized.pdf";
}

function downloadBytes(bytes, filename) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- Page viewer (zoom) ----------
const vw = {
  root: document.getElementById("viewer"),
  stage: document.getElementById("vStage"),
  img: document.getElementById("vImg"),
  label: document.getElementById("vLabel"),
  zoom: document.getElementById("vZoom"),
};
let vIndex = 0;       // index into `pages`
let vZoom = 1;        // multiplier of fit-to-window width
let vFitWidth = 0;    // css px at 100%
let vRatio = 1;       // height / width

async function openViewer(index) {
  if (!pages.length || index < 0) return;
  vIndex = Math.min(index, pages.length - 1);
  vZoom = 1;
  vw.root.hidden = false;
  await renderViewer();
}
function closeViewer() {
  vw.root.hidden = true;
  vw.img.removeAttribute("src");
}
async function renderViewer() {
  const p = pages[vIndex];
  vw.label.textContent = `Page ${vIndex + 1} of ${pages.length}`;
  const src = sources.get(p.srcId);
  const page = await src.doc.getPage(p.pageIndex + 1);
  const base = page.getViewport({ scale: 1, rotation: p.rotation });
  const stageW = Math.max(vw.stage.clientWidth - 40, 200);
  const stageH = Math.max(vw.stage.clientHeight - 40, 200);
  // Render with headroom so zooming in stays sharp.
  const deviceW = Math.min(Math.round(stageW * DPR * 2), 3200);
  const scale = deviceW / base.width;
  const v = page.getViewport({ scale, rotation: p.rotation });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(v.width);
  canvas.height = Math.ceil(v.height);
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: v }).promise;
  vw.img.src = canvas.toDataURL("image/jpeg", 0.92);
  vRatio = v.height / v.width;
  vFitWidth = Math.min(stageW, stageH / vRatio);
  applyZoom();
}
function applyZoom() {
  const w = vFitWidth * vZoom;
  vw.img.style.width = w + "px";
  vw.img.style.height = w * vRatio + "px";
  vw.zoom.textContent = Math.round(vZoom * 100) + "%";
}
function setZoom(factor) {
  vZoom = Math.max(0.25, Math.min(5, vZoom * factor));
  applyZoom();
}
function viewerStep(delta) {
  const next = vIndex + delta;
  if (next < 0 || next >= pages.length) return;
  vIndex = next;
  renderViewer();
}

document.getElementById("vClose").addEventListener("click", closeViewer);
document.getElementById("vPrev").addEventListener("click", () => viewerStep(-1));
document.getElementById("vNext").addEventListener("click", () => viewerStep(1));
document.getElementById("vZoomIn").addEventListener("click", () => setZoom(1.25));
document.getElementById("vZoomOut").addEventListener("click", () => setZoom(1 / 1.25));
document.getElementById("vFit").addEventListener("click", () => {
  vZoom = 1;
  applyZoom();
});
document.getElementById("vRotate").addEventListener("click", () => {
  rotatePages([pages[vIndex].id]);
  renderViewer();
});
vw.root.addEventListener("click", (e) => {
  if (e.target === vw.root) closeViewer();
});
document.addEventListener("keydown", (e) => {
  if (vw.root.hidden) return;
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowRight") viewerStep(1);
  else if (e.key === "ArrowLeft") viewerStep(-1);
  else if (e.key === "+" || e.key === "=") setZoom(1.25);
  else if (e.key === "-") setZoom(1 / 1.25);
});

// ---------- Helpers ----------
function tileById(id) {
  return el.grid.querySelector(`.tile[data-id="${id}"]`);
}
function showBusy(text) {
  el.busyText.textContent = text || "Working…";
  el.busy.hidden = false;
}
function hideBusy() {
  el.busy.hidden = true;
}
