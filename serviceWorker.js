const staticColorPicker = "dasturUz11";
// let isUpdateAvailable = false;

const assets = [
    "/",
    // "/index.html",
    "/offline.html",
    "/css/bootstrap.css",
    "/css/main.css",
    // "/js/bootstrap.js",
    // "/js/main.js",
    // "/js/data.js",
    "/images/complete.png",
    "/images/warn.png",
    "/images/wrong.png",
    "/images/down.png",
    "/images/checks.png",
]

caches.delete("dasturUz").then(() => {});
caches.delete("dasturUz2").then(() => {});
caches.delete("dasturUz3").then(() => {});
caches.delete("dasturUz4").then(() => {});
caches.delete("dasturUz5").then(() => {});
caches.delete("dasturUz6").then(() => {});
caches.delete("title4").then(() => {});
caches.delete("dasturUz7").then(() => {});
caches.delete("dasturUz8").then(() => {});
caches.delete("dasturUz9").then(() => {});
caches.delete("dasturUz10").then(() => {});
// caches.delete("dasturUz11").then(() => {});


self.addEventListener("install", installEvent => {
    installEvent.waitUntil (
        caches.open(staticColorPicker).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).catch(() => caches.match('/offline.html'))
    )
})
// export { isUpdateAvailable }