const chatform = document.getElementById('chat-form');

const socket = io();


socket.on('message',message =>{
    console.log(message);
    outputmsg(message);
})

//message submit
chatform.addEventListener('submit', e=>{
e.preventDefault();

//get msg text
const msg = e.target.elements.msg.value;

//emit msg to server
socket.emit('chatmsg',msg);
})

//output msg to dom
function outputmsg(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
    ${message} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}