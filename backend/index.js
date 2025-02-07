import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({ success: true })
})

const server = http.createServer(app)

const io = new Server(server, {
    cors: { origin: '*' }
})

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id)

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
    })

    socket.on("sendData", (data) => {
        console.log(data)
        io.emit("message", data)
    })

    socket.on("showTyping", (data) => {
        socket.broadcast.emit("typing", data)
    })

    socket.on("removeTyping", () => {
        io.emit("stopTyping")
    })
})

server.listen(port, () => console.log(`Server running at http://localhost:${port}`))


