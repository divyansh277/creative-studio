
const CACHE = 'creative-studio-v1';
const ASSETS = [
  '/', '/index.html', '/about.html', '/services.html', '/portfolio.html', '/pricing.html', '/jobs.html', '/contact.html', '/job-application.html',
  '/assets/styles.css', '/assets/main.js', '/partials/header.html', '/partials/footer.html'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(res=> res || fetch(e.request).then(r=>{
    const copy = r.clone();
    caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
    return r;
  }).catch(()=>caches.match('/index.html'))));
});
