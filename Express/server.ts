import express from "express"
import { env } from './env'
import { print } from 'listening-on'
import { client } from './db'
import http from 'http'
import { Server as ServerIO } from 'socket.io';
import fetch from 'node-fetch';
import formidable from 'formidable';
// import * as Knex from 'knex';
import fs from "fs"




const app = express();
const PORT = +env.PORT;

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

    socket.emit('toClient', 'socketIO connected !! Express server listening...')
    socket.on('toExpress', (msg) => {
        console.log(msg)
    })
})


server.listen(PORT, () => {
    print(PORT)
})



//------------Formidable-------------------
const uploadDir = 'upload';
fs.mkdirSync(uploadDir, { recursive: true })


//------------Express Application-------------
app.use(express.static("public"));
app.use('/image', express.static(uploadDir))
app.use(express.json());







//***************** BELOW IS EXPRESS ROUTE ****************************/


app.get('/', (req, res) => {
    res.json("Hello World by Express")
})

//------------------fetching with Sanic server-----------------
app.post('/api', async (req, res) => {
    console.log(req.body)
    let file = req.body
    let response = await fetch('http://localhost:5000/api',
        {
            method: 'POST',
            body: JSON.stringify(file)
        })
    let result = await response.json()
    console.log(result)
    res.json(result)
})

app.post('/upload', async (req, res) => {
    // console.log(req)

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFiles: 1,
        maxFileSize: 1024 * 1024 ** 2,
        filter: file => file.mimetype?.startsWith('image/') || false,
    })

    form.parse(req, async (err, fields, files: any) => {
        if (err) {
            console.error({ err })
            return;
        }
        // console.log(files)
        const submitImage = files.image.newFilename
        console.log(submitImage)


        // await knex("images")
        //     .insert({
        //         image: submitImage,
        //         uploaded_date: "now()"
        //     })
        //     .returning("id")
        //     .then((res: any) => {
        //         let result = res
        //         let id = result[0].id
        //         console.log(`image ID is : ${id}`)
        //     })


        let toSanic = await fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(submitImage)
        })
        let result = await toSanic.json()
        console.log(result)

        // let predictResult = result;

        // let toFrontend = await fetch('/', {
        //     method: 'POST',
        //     body: JSON.stringify(predictResult)
        // })
        // let res = await toFrontend.json()
        res.json(result)
    })
})

// app.get('/post', async (req, res) => {

// })


