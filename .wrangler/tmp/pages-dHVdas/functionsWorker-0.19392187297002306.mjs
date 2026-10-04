var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _vc.js
var COURSES = ["pmp", "sat-math", "tabe-a", "tabe-d", "tabe-e"];
var COOKIE_DAYS = 30;
function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers }
  });
}
__name(json, "json");
var enc = new TextEncoder();
var b64url = /* @__PURE__ */ __name((buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), "b64url");
async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}
__name(hmac, "hmac");
async function makeToken(env, slug) {
  const exp = Math.floor(Date.now() / 1e3) + COOKIE_DAYS * 86400;
  return slug + "." + exp + "." + await hmac(env.VC_SESSION_SECRET, slug + "." + exp);
}
__name(makeToken, "makeToken");
async function hasAccess(request, env, slug) {
  if (!env.VC_SESSION_SECRET) return false;
  const m = (request.headers.get("Cookie") || "").match(new RegExp("(?:^|;\\s*)vc_" + slug.replace("-", "_") + "=([^;]+)"));
  if (!m) return false;
  const [s, exp, sig] = decodeURIComponent(m[1]).split(".");
  if (s !== slug || !(Number(exp) > Date.now() / 1e3)) return false;
  const good = await hmac(env.VC_SESSION_SECRET, s + "." + exp);
  if (good.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < good.length; i++) diff |= good.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
__name(hasAccess, "hasAccess");
function cookieFor(slug, token) {
  return "vc_" + slug.replace("-", "_") + "=" + encodeURIComponent(token) + "; Path=/; Max-Age=" + COOKIE_DAYS * 86400 + "; HttpOnly; Secure; SameSite=Lax";
}
__name(cookieFor, "cookieFor");
async function verifyLicence(env, slug, key) {
  let secrets = {};
  try {
    secrets = JSON.parse(env.VC_PAYHIP_SECRETS || "{}");
  } catch (e) {
  }
  const sk = secrets[slug];
  if (!sk) return { ok: false, error: "not_configured" };
  const r = await fetch("https://payhip.com/api/v2/license/verify?license_key=" + encodeURIComponent(key), {
    headers: { "product-secret-key": sk }
  });
  if (!r.ok) return { ok: false };
  let d = null;
  try {
    d = await r.json();
  } catch (e) {
    return { ok: false };
  }
  const data = d && d.data;
  if (!data || data.enabled !== true) return { ok: false };
  return { ok: true, email: String(data.buyer_email || "").trim().toLowerCase() };
}
__name(verifyLicence, "verifyLicence");
var BOOKS_FOR_COURSE = {
  "pmp": ["pmp"],
  "sat-math": ["sat-math", "sat-math-workbook", "sat-math-tests"],
  "tabe-a": ["tabe-a"],
  "tabe-d": ["tabe-d"],
  "tabe-e": ["tabe-e"]
};
var sha256Hex = /* @__PURE__ */ __name(async (s) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join(""), "sha256Hex");
async function isBookCode(request, env, slug, code) {
  const norm2 = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!norm2 || !env.ASSETS) return false;
  let data;
  try {
    data = await (await env.ASSETS.fetch(new URL("/data/books.json", request.url))).json();
  } catch (e) {
    return false;
  }
  const h = await sha256Hex(norm2);
  if (h === data.adminCodeHash) return true;
  const allowed = BOOKS_FOR_COURSE[slug] || [];
  return (data.books || []).some((b) => allowed.includes(b.slug) && [b.codeHash, ...Array.isArray(b.codeHashes) ? b.codeHashes : []].includes(h));
}
__name(isBookCode, "isBookCode");

// api/vc/video/[slug]/[file].js
async function onRequestGet({ request, env, params }) {
  const slug = params.slug;
  const file = params.file;
  if (!COURSES.includes(slug) || !/^\d{3}\.mp4$/.test(file)) return new Response("Not found", { status: 404 });
  if (!await hasAccess(request, env, slug)) return new Response("Locked", { status: 403, headers: { "Cache-Control": "no-store" } });
  const key = "vc/" + slug + "/" + file;
  const rangeHeader = request.headers.get("Range");
  let range;
  const m = rangeHeader && rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
  if (m) {
    if (m[1] === "" && m[2] !== "") range = { suffix: Number(m[2]) };
    else range = { offset: Number(m[1] || 0), ...m[2] !== "" ? { length: Number(m[2]) - Number(m[1] || 0) + 1 } : {} };
  }
  const obj = await env.VC_BUCKET.get(key, range ? { range } : {});
  if (!obj) return new Response("Not found", { status: 404 });
  const headers = new Headers({
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, max-age=3600",
    "X-Robots-Tag": "noindex"
  });
  if (range && obj.range) {
    const size = obj.size;
    const start = obj.range.offset != null ? obj.range.offset : size - obj.range.suffix;
    const len = obj.range.length != null ? obj.range.length : size - start;
    headers.set("Content-Range", "bytes " + start + "-" + (start + len - 1) + "/" + size);
    headers.set("Content-Length", String(len));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set("Content-Length", String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
__name(onRequestGet, "onRequestGet");

// api/vc/unlock.js
var norm = /* @__PURE__ */ __name((s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, ""), "norm");
async function onRequestPost({ request, env }) {
  let body = {};
  try {
    body = await request.json();
  } catch (e) {
  }
  let slug = String(body.course || "");
  const key = String(body.key || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  if (!key) return json({ ok: false, error: "Enter your access key." }, 400);
  if (slug === "auto" || slug.startsWith("auto:")) {
    const pool = slug === "auto" ? COURSES : slug.slice(5).split(",").filter((c) => COURSES.includes(c));
    let found = "";
    for (const c of pool) {
      if (await isBookCode(request, env, c, key)) {
        found = c;
        break;
      }
    }
    if (!found) return json({ ok: false, error: "That code was not recognised. Check it against the last page of your book." });
    slug = found;
  }
  if (!COURSES.includes(slug)) return json({ ok: false, error: "Unknown course" }, 400);
  if (!env.VC_SESSION_SECRET) return json({ ok: false, error: "Course access is not set up yet." }, 503);
  const superCode = norm(env.SUPER_ACCESS_CODE);
  let ok = !!superCode && norm(key) === superCode;
  let via = ok ? "super" : "";
  if (!ok && await isBookCode(request, env, slug, key)) {
    ok = true;
    via = "book";
  }
  if (!ok) {
    via = "payhip";
    const v = await verifyLicence(env, slug, key);
    if (v.error === "not_configured") return json({ ok: false, error: "Course access is not set up yet." }, 503);
    if (!v.ok) return json({ ok: false, error: "That key or book code is not valid for this course." });
    if (v.email && email !== v.email) return json({ ok: false, error: "Use the same email address you bought the course with." });
    ok = true;
  }
  const token = await makeToken(env, slug);
  return json({ ok: true, via, course: slug }, 200, { "Set-Cookie": cookieFor(slug, token) });
}
__name(onRequestPost, "onRequestPost");
async function onRequestGet2({ request, env }) {
  const slug = new URL(request.url).searchParams.get("course") || "";
  if (!COURSES.includes(slug)) return json({ ok: false }, 400);
  return json({ ok: await hasAccess(request, env, slug) });
}
__name(onRequestGet2, "onRequestGet");

// api/redeem-course.js
var PRODUCT_LINK = "DMyl1";
function json2(body, status, extra) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, extra || {})
  });
}
__name(json2, "json");
async function onRequestPost2({ request, env }) {
  try {
    const { code, superOnly } = await request.json();
    if (!code || typeof code !== "string") return json2({ ok: false, error: "Missing code" }, 400);
    const norm2 = /* @__PURE__ */ __name((s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, ""), "norm");
    const superCode = norm2(env.SUPER_ACCESS_CODE);
    if (superCode && norm2(code) === superCode) return json2({ ok: true, tier: "complete", super: true }, 200);
    if (superOnly) return json2({ ok: false }, 200);
    const apiKey = env.PAYHIP_API_KEY;
    if (!apiKey) return json2({ ok: false, error: "not_configured" }, 503);
    const url = "https://payhip.com/api/v1/license/verify?product_link=" + encodeURIComponent(PRODUCT_LINK) + "&license_key=" + encodeURIComponent(code.trim());
    const r = await fetch(url, { headers: { "payhip-api-key": apiKey } });
    if (!r.ok) return json2({ ok: false }, 200);
    let d;
    try {
      d = await r.json();
    } catch (e) {
      return json2({ ok: false }, 200);
    }
    const enabled = d && d.data && d.data.enabled === true;
    return json2({ ok: !!enabled, tier: enabled ? "complete" : null }, 200);
  } catch (err) {
    return json2({ ok: false, error: String(err) }, 500);
  }
}
__name(onRequestPost2, "onRequestPost");
async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions, "onRequestOptions");

// api/subscribe.js
async function onRequestPost3({ request, env }) {
  const cors = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const { email, accessCode, book, name } = await request.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ ok: false, error: "Missing email" }), { status: 400, headers: cors });
    }
    const apiKey = env.MAILERLITE_API_KEY;
    const groupId = env.MAILERLITE_GROUP_ID;
    if (!apiKey || !groupId) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { headers: cors });
    }
    const payload = {
      email: email.trim().toLowerCase(),
      groups: [groupId],
      fields: {
        ...name && typeof name === "string" ? { name: name.trim().slice(0, 40) } : {},
        access_code: (accessCode || "").toUpperCase(),
        book_unlocked: book || "",
        unlock_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        source: "certpathpublishing.store"
      }
    };
    const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ ok: false, error: "MailerLite error", status: r.status, detail: text }), { status: 502, headers: cors });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: cors });
  }
}
__name(onRequestPost3, "onRequestPost");
async function onRequestOptions2() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions2, "onRequestOptions");

// api/lists.js
var JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex"
};
var MAX_BYTES = 900 * 1024;
function reply(obj, status) {
  return new Response(JSON.stringify(obj), { status: status || 200, headers: JSON_HEADERS });
}
__name(reply, "reply");
function sameKey(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
__name(sameKey, "sameKey");
async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("certpath-todo:" + text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hash, "hash");
async function passOk(env, given) {
  if (env.TODO_KEY) return sameKey(given, env.TODO_KEY);
  const saved = await env.TODO_KV.get("passhash");
  if (!saved) {
    if (given.length < 6) return "short";
    await env.TODO_KV.put("passhash", await hash(given));
    return true;
  }
  return sameKey(await hash(given), saved);
}
__name(passOk, "passOk");
async function onRequest({ request, env }) {
  if (!env.TODO_KV) return reply({ error: "not-configured" }, 503);
  const ok = await passOk(env, request.headers.get("x-todo-key") || "");
  if (ok === "short") return reply({ error: "too-short" }, 400);
  if (ok !== true) {
    await new Promise((r) => setTimeout(r, 400));
    return reply({ error: "wrong-passcode" }, 401);
  }
  if (request.method === "GET") {
    const stored = await env.TODO_KV.get("lists", "json");
    return reply(stored || { data: null, updated: 0 });
  }
  if (request.method === "PUT") {
    const text = await request.text();
    if (text.length > MAX_BYTES) return reply({ error: "too-large" }, 413);
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      return reply({ error: "bad-json" }, 400);
    }
    if (!body || !body.data || !Array.isArray(body.data.lists)) return reply({ error: "bad-data" }, 400);
    const stored = await env.TODO_KV.get("lists", "json");
    if (stored && stored.updated && Number(body.base) !== stored.updated) {
      return reply({ error: "conflict", data: stored.data, updated: stored.updated }, 409);
    }
    let updated = Number(body.updated) || Date.now();
    if (stored && updated <= stored.updated) updated = stored.updated + 1;
    await env.TODO_KV.put("lists", JSON.stringify({ data: body.data, updated }));
    return reply({ ok: true, updated });
  }
  return reply({ error: "method" }, 405);
}
__name(onRequest, "onRequest");

// _middleware.js
var GA_ID = "G-BFJGKDL998";
var TAG = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"><\/script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
  // Key events: Amazon and sample/practice-test clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a || !a.href) return;
    if (a.href.indexOf('amazon.') > -1) gtag('event', 'amazon_click', { link_url: a.href });
    else if (['/sample', '/quiz', '/access'].some(function (p) { return a.pathname.indexOf(p) === 0; })) gtag('event', 'practice_click', { link_url: a.href });
  }, true);
<\/script>`;
async function onRequest2(context) {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  return new HTMLRewriter().on("head", { element(el) {
    el.append(TAG, { html: true });
  } }).transform(response);
}
__name(onRequest2, "onRequest");

// ../.wrangler/tmp/pages-dHVdas/functionsRoutes-0.53446283743903.mjs
var routes = [
  {
    routePath: "/api/vc/video/:slug/:file",
    mountPath: "/api/vc/video/:slug",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/vc/unlock",
    mountPath: "/api/vc",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/vc/unlock",
    mountPath: "/api/vc",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/redeem-course",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/redeem-course",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/subscribe",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/subscribe",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/lists",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest2],
    modules: []
  }
];

// ../../../../opt/homebrew/lib/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-PwVJSE/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-PwVJSE/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.19392187297002306.mjs.map
