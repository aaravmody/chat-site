const chatform = document.getElementById('chat-form');
const chatmsg = document.querySelector('.chat-messages');
const socket = io();
const roomname= document.getElementById('room-name');
const userlist= document.getElementById('users');


//get username and room from url
const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

//join chatroom
socket.emit('joinroom', {username,room});


//get room users

socket.on('roomusers',({room,users})=>{
    outputroomname(room);
    outputusers(users);
})

socket.on('message',message =>{
    console.log(message);
    outputmsg(message);
//scroll
chatmsg.scrollTop = chatmsg.scrollHeight;

})

//message submit
chatform.addEventListener('submit', e=>{
e.preventDefault();

//get msg text
const msg = e.target.elements.msg.value;

//emit msg to server
socket.emit('chatmsg',msg);

//clear input
e.target.elements.msg.value='';
e.target.elements.msg.focus();
})

//output msg to dom
function outputmsg(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span> &nbsp &nbsp  ${message.time}</span></p>
    <p class="text">
    ${message.text} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add room name to DOM
function outputroomname(room){
    roomname.innerText = room;

}

//add users to DOM
function outputusers(users){
    userlist.innerHTML = `${users.map(user=> `<li>${user.username}</li>`).join('')}`
}