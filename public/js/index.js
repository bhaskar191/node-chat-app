var socket = io();
    socket.on('connect', function(){
        console.log('connected to the server');

       socket.emit('createMessage',{
           from: 'bhaskar',
           text: 'it is great to see u here'
       });
    });

    socket.on('disconnect', function() {
        console.log('Disconnected to the server');
    });

    socket.on('newMessage',function(message) {
        console.log('newMessage',message);
    });