var io = require('socket.io-client');
var socket = io.connect('http://192.168.0.24:3000');
var CarManager = require('pidrive-lib');

var start = function() {

	var carManager = new CarManager();

	socket.on('connect', function(param){
		console.log('a user connected');
	});

	socket.on('controlMsg', function(data) {
		console.log(data);
		if(data.command === 'forward') {
			carManager.forward(parseInt(data.params.speed));
		} else if (data.command === 'backward') {
			carManager.backward(parseInt(data.params.speed));
		} else if (data.command === 'stop') {
			carManager.stop();
		} else if (data.command === 'left') {
			carManager.left(parseInt(data.params.angle));
		} else if (data.command === 'right') {
			carManager.right(parseInt(data.params.angle));
		} else if (data.command === 'straight') {
			carManager.straight();
		} else if (data.command === 'print') {
			console.log(data);
		}
	});
	socket.emit('register', {devId: '1234'});


};

module.exports = {
	'start': start
};
