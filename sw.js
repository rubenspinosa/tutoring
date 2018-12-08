// Asignar nombre y versión de cache
const CACHE_NAME = 'v1_cache_gallo';

// Ficheros a cachear en la aplicación
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/faceboook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
	
];

// Evento install
//Instalación del serviceWorker y guardar en cache los recursos estaticos

self.addEventListener ('install', e => {
	e.waitUntil (
		caches.open (CACHE_NAME)
			  .then (cache => {
			  		return cache.AddAll(urlsToCache)
			  					.then (() => {
			  						self.skipWaiting();
			  					});
			  					
			  })
			  .cath (err => console.log('No se ha registrado el cache', err))


		);



});



// Evento activate, que la app funcione sin conexion

self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
			caches.keys()
				  .then (cacheNames => {
				  	return Promise.all(
				  		cacheNames.map(cacheName => {

				  			if(cacheWhitelist.indexOf(cacheName) === -1){
				  				//borrar los elementos que no se necesitan
				  				return caches.delete(cacheName);
				  			}
				  		})
				  	);
				  })
				  .then (() => {
				  	//activa la cache en el dispositivo
				  	self.clients.claim();

				  })
	);


});


// Evento fetch

self. addEventListener('fetch', e => {

	e.respondWith (
		caches.match(e.request)
			  .then(res => {
			  	if (res){
			  		//devuelvo los datos desde cache
			  		return res;

			  	}

			  	return fetch(e.request);
			  })

		);

});







