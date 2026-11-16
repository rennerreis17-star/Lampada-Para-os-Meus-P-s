// Guarda o app no aparelho para funcionar sem internet.
// Ao publicar uma atualização, mude o número da versão abaixo.
const VERSAO = "lampada-v2";
const APP = [
  "./", "index.html", "firebase-config.js", "manifest.webmanifest",
  "icons/icon-32.png", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"
];
const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
const FIREBASE = ["firebase-app.js", "firebase-auth.js", "firebase-firestore.js"].map(f => FB + f);

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSAO);
    await c.addAll(APP);
    // o Firebase é opcional: se não carregar agora, é guardado no primeiro uso
    await Promise.all(FIREBASE.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSAO) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const proprio = url.origin === location.origin;
  const firebaseLib = req.url.startsWith("https://www.gstatic.com/firebasejs/");
  if (!proprio && !firebaseLib) return; // login e banco de dados vão direto para a internet

  // Mostra o que está guardado na hora e atualiza em segundo plano
  e.respondWith((async () => {
    const c = await caches.open(VERSAO);
    const salvo = await c.match(req, { ignoreSearch: proprio });
    const rede = fetch(req).then(r => {
      if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone());
      return r;
    }).catch(() => null);
    if (salvo) { e.waitUntil(rede); return salvo; }
    const r = await rede;
    if (r) return r;
    if (req.mode === "navigate") return (await c.match("index.html")) || Response.error();
    return Response.error();
  })());
});
