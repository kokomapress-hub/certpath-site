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
const thumbCache = new Map();       // `${pageId}:${rotation}` -> dataURL
const RENDER_WIDTH = 480;           // base thumbnail render width in px

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
  const rotBtn = mkActBtn("⟳", "Rotate 90°", (e) => {
    e.stopPropagation();
    rotatePages([p.id]);
  });
  const delBtn = mkActBtn("🗑", "Delete page", (e) => {
    e.stopPropagation();
    deletePages([p.id]);
  });
  delBtn.classList.add("danger");
  actions.append(rotBtn, delBtn);

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
  const key = `${p.id}:${p.rotation}`;

  let url = thumbCache.get(key);
  if (!url) {
    try {
      url = await renderPageToDataURL(p);
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

async function renderPageToDataURL(p) {
  const src = sources.get(p.srcId);
  const page = await src.doc.getPage(p.pageIndex + 1);
  const viewport = page.getViewport({ scale: 1, rotation: p.rotation });
  const scale = RENDER_WIDTH / viewport.width;
  const v = page.getViewport({ scale, rotation: p.rotation });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(v.width);
  canvas.height = Math.ceil(v.height);
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport: v }).promise;
  return canvas.toDataURL("image/jpeg", 0.82);
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

// ---------- Layout ----------
el.layoutBtns.forEach((b) =>
  b.addEventListener("click", () => {
    el.layoutBtns.forEach((x) => x.classList.toggle("is-active", x === b));
    el.grid.dataset.cols = b.dataset.cols;
  })
);

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
