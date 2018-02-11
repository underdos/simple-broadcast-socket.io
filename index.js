var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('broadcast', function(msg){
    io.emit('broadcast', msg);
    console.log('message: ' + msg);
  });
});


i = 0;
setInterval(function(){
 io.emit('counter', 'Counter '+i);
  console.log('Counter '+i);
  i++;
}, 5000);  

var response = { status: 200, message: 'Success', response: 'Helloooowww' };
setInterval(function(){
 io.emit('json', response);
}, 5000);



http.listen(7070, function(){
  console.log('listening on *:80');
});

