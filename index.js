var express=require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname+'/public/index.html');
})

var messages=[{id:1,text:'Welcome to the chat with Socket.io and Nodejs',nickname:'ServerBot'}]

io.on('connection',(socket)=>{
   console.log('IP connected-'+socket.handshake.address);
   socket.emit('messages',messages);
   socket.on('add-message',(data)=>{
    messages.push(data);
    io.sockets.emit('messages',messages);
   });
});

server.listen(8080,()=>{
    console.log('Server running...');
});