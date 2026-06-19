const CACHE_NAME = "pwa-version3";

const archivos = [
    "./index.html",
    "./manifest.json",
    "./css/estilo.css",
    "./js/funciones.js",
    "./icono/icono-192.png",
    "./icono/icono-512.png"
];

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(archivos);
        })
    );
});

self.addEventListener("fetch",(evento)=>{
    evento.respondWith(
        caches.match(evento.request).then((respuesta)=>{
            return respuesta || fetch(evento.request);
        })
    );
});