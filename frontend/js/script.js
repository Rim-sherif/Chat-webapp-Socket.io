const socket = io('http://localhost:3000')

let data = document.querySelector('#inputData');
function getInputData(){
   
   socket.emit("sendData" ,data.value)
   console.log(data)
   data.value = ''
}

socket.on("message",(data)=>{
    document.getElementById('showMessage').innerHTML += `<div><button class="btn btn-danger my-3">${data}</button></div>`
})


data.addEventListener("input",(e)=>{
    socket.emit("showTyping",e.target.value)
})


socket.on("typing",(data)=>{
    document.getElementById("isTyping").classList.replace("d-none" ,"d-block")
})

data.addEventListener("keyUp",(e)=>{
    socket.emit("removeTyping",e.target.value)
})


socket.on("remove",(data)=>{
    setTimeout(() => {
        document.getElementById("isTyping").classList.replace("d-block","d-none" )
    }, 1500);
    
})



