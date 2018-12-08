//Service Worker

if ('serviceWorker' in navigator){
	console.log ('Puedes usar');

	navigator.serviceWorker.register('./sw.js')
						   .then (res => console.log ('serviceWorker cargando correctamente', res))
						   .cath (err => console.log ('serviceWorker no se ha podido registrar', err));
						   
}

	


//Scroll suavizado
$(document).ready(function () {

	$("#menu a").click (function (e){
		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr ('href')).offset().top
		});


		return false;

	});


});