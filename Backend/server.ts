import express from "express"
import { env } from './env'
import { print } from 'listening-on'
import { client } from './db'
import http from 'http'
import { Server as ServerIO } from 'socket.io';

const app = express();
const PORT = env.PORT;

client.connect(err => {
    if (err) {
        console.error(`database connection error : ${err}`)
    } else {
        console.log(`Database => ${client.database}, Port => ${client.port}, connected by => ${client.user}`)
    }
})


//-------------Socket.IO--------------------------
const server = new http.Server(app)
const io = new ServerIO(server)

io.on('connection', (socket) => {
    console.log(`client socket connected by ID : ${socket.id}`)

    socket.emit('toClient', 'frontend user connected to server')
    socket.on('toServer', (msg) => {
        console.log(msg)
    })
})


server.listen(PORT, () => {
    print(PORT)
})


app.use(express.static("public"))
// app.use('/uploads', express.static(uploadDir))


// app.post('api',async(req,res)=>{
//     let file  = req.body
//    let response = await fetch('http://localhost:5000',
//     {method:'POST'},
//     {body:JSON.stringify(file)})
//     let result = await response.json()
//     res.json({result})
// })

