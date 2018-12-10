var socket = io();
    socket.on('connect', function(){
        console.log('connected to the server');

    });

    socket.on('disconnect', function() {
        console.log('Disconnected to the server');
    });

    socket.on('newMessage',function(message) {
        var formattedTime = moment(message.createdAt).format('hh:mm:a');
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}: ${formattedTime}`);
        jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage',function(message) {
        var formattedTime = moment(message.createdAt).format('hh:mm:a');
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My Current Location</a>');

        li.text(`${message.from} ${formattedTime}:`);
        a.attr('href',message.url);
        li.append(a);
        jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit',function(e) {
        e.preventDefault();

        var messageTextBox = jQuery('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()

        },function () {
            messageTextBox.val('')
        });
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click',function() {
        if(!navigator.geolocation){
            return alert('geolocation is not support your browser.');
            }
            locationButton.attr('disabled','disabled').text('Sending location.....');

           navigator.geolocation.getCurrentPosition(function (position) {
               locationButton.removeAttr('disabled').text('sending location');
          socket.emit('createLocationMessage', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          })  
        }, function() {
            locationButton.removeAttr('disabled').text('sending location');
            alert('Unable to fetch location.');
           }); 
    });