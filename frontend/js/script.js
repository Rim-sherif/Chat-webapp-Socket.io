const socket = io('http://localhost:3000')

let data = document.querySelector('#inputData')

function getInputData() {
    socket.emit("sendData", data.value)
    data.value = ''
}

socket.on("message", (data) => {
    document.getElementById('showMessage').innerHTML += `<div><button class="btn btn-danger my-3">${data}</button></div>`
})

data.addEventListener("input", (e) => {
    socket.emit("showTyping", e.target.value)
})

socket.on("typing", () => {
    document.getElementById("isTyping").classList.replace("d-none", "d-block")
})

data.addEventListener("keyup", () => {  
    socket.emit("removeTyping")
})

socket.on("stopTyping", () => {
    setTimeout(() => {
        document.getElementById("isTyping").classList.replace("d-block", "d-none")
    }, 1000)
})




