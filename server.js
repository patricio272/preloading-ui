var carga = require('./carga');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
});

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


//Socket.io Code
io.on('connection', function (socket) {
	console.log('Connected Client: '+socket.id);



	socket.on('BTN_PRESS', function (data) {
		console.log('Button Pressed: ' + JSON.stringify(data, null, 2));
	});

	socket.on('cargar_stuff', function(){
		var num = carga.cargar();
		socket.emit('cargado', {res: num, 
		images: ['http://dev.bradsknutson.com/demos/page-loader/images/b1.jpg','http://dev.bradsknutson.com/demos/page-loader/images/b2.jpg','http://dev.bradsknutson.com/demos/page-loader/images/b3.jpg','http://dev.bradsknutson.com/demos/page-loader/images/b4.jpg','http://dev.bradsknutson.com/demos/page-loader/images/b5.jpg','http://dev.bradsknutson.com/demos/page-loader/images/b6.jpg']
		});
	});



	socket.on('disconnect', function () {
		console.log('Disconnected Client: '+socket.id);
	});
});

