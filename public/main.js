var socket = io.connect('http://localhost:8080',{forceNeq:true});

socket.on('messages',(data)=>{
    render(data);
});

function render(data){
    var html=data.map((message,index)=>{
        return(`
            <div class="message">
           <p><strong>${message.nickname}</strong> - ${message.text}</p>
            </div>
        `);
    }).join(' ');
    var all_mssg=document.getElementById('messages');
    all_mssg.innerHTML=html;
    all_mssg.scrollTop=all_mssg.scrollHeight;
}
function addMessage(){
    var message={
        nickname:document.getElementById('nickname').value,
        text:document.getElementById('text').value
    }
    document.getElementById('nickname').style.display='none';
    socket.emit('add-message',message);
    document.getElementById('text').value=''
    return false;
}