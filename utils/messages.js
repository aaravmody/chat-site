// const moment=require('moment');

// function formatmsg(username,text){
//     return{
//         username,text,time:moment().format('h:mm a')
//     }
// }

// module.exports = formatmsg;

function formatmsg(username, text) {
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours()  }:${currentTime.getMinutes()} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    return {
        username,
        text,
        time: formattedTime
    };
}

module.exports = formatmsg;
