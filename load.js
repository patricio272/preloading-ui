$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');

	socket.on('connect',function(){
		$('#status-text').append('Soy Cliente, me conecte al server. YAHOO!!!');
		$('#status-text').append('<br>');
	});

	socket.on('disconnect',function(){
		$('#status-text').append('Soy Cliente, el server se MURIOOO :(');
			$('#status-text').append('<br>');
		});

	socket.on('reconnect',function(){
		$('#status-text').append('Soy Cliente, me RECONECTE al server. SALVADOO!!!');
		$('#status-text').append('<br>');
	});

	socket.on('reconnect_attemp',function(){
		$('#status-text').append('Intentado reconectar');
		$('#status-text').append('<br>');
	});

	socket.on('reconnecting',function(times){
		$('#status-text').append('Reconectando. Intento #: '+times);
		$('#status-text').append('<br>');
	});


	socket.emit('cargar_stuff')	;
	socket.on('cargado', function(data){
		var num = data.res;
		var images = data.images;
		$('#contenido').html('<h1>Valor: '+num+'</h1>');
		$(".loader").fadeOut("slow");

		var acum = 0;
		for(key of images){
			acum++;
			imgLoader(key, acum);
		}



	});


	function imgLoader(path, acum){
		var id_imagen = "img"+acum;

		//Loading Placeholders
		var imageDOM = new Image();
		$('#images').append(imageDOM);
		imageDOM.src = "./loading_gif.gif";
		imageDOM.id = id_imagen;
		imageDOM.className = "imageHolder";

		//Loading REAL Resources HIDDEN
		var img_oculta = new Image();
		img_oculta.src = path;

		img_oculta.addEventListener('load',function(){
			console.log('Imagen:'+path+' Cargada Completamente');
			$('#'+id_imagen+'').fadeOut(400, function(){
				$('#'+id_imagen+'').attr('src', path);
				$('#'+id_imagen+'').fadeIn(400);
			});
		});
	}


});