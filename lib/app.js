var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
var CarManager = require('pidrive-lib');

var start = function() {

	var carManager = new CarManager();

	socket.on('connect', function(param){
		console.log('a user connected');
	});

	socket.on('controlMsg', function(data) {
		if(data.command === 'forward') {
			carManager.forward(data.params.speed);
		} else if (data.command === 'backward') {
			carManager.backward(data.params.speed);
		} else if (data.command === 'stop') {
			carManager.stop();
		} else if (data.command === 'left') {
			carManager.left(data.params.angle);
		} else if (data.command === 'right') {
			carManager.right(data.params.angle);
		} else if (data.command === 'straight') {
			carManager.straight();
		}
	});
	socket.emit('register', {id: '1234'});


};

module.exports = {
	'start': start
};
