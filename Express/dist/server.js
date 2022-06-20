"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./env");
const listening_on_1 = require("listening-on");
const db_1 = require("./db");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const node_fetch_1 = __importDefault(require("node-fetch"));
const formidable_1 = __importDefault(require("formidable"));
// import * as Knex from 'knex';
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = +env_1.env.PORT;
db_1.client.connect(err => {
    if (err) {
        console.error(`database connection error : ${err}`);
    }
    else {
        console.log(`Database => ${db_1.client.database}, Port => ${db_1.client.port}, connected by => ${db_1.client.user}`);
    }
});
//-------------Socket.IO--------------------------
const server = new http_1.default.Server(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log(`client socket connected by ID : ${socket.id}`);
    socket.emit('toClient', 'socketIO connected !! Express server listening...');
    socket.on('toExpress', (msg) => {
        console.log(msg);
    });
});
server.listen(PORT, () => {
    (0, listening_on_1.print)(PORT);
});
//------------Formidable-------------------
let uploadDir = 'upload';
let publicDir = 'public';
if (!fs_1.default.existsSync(publicDir)) {
    publicDir = "../public";
    uploadDir = '../upload';
}
fs_1.default.mkdirSync(uploadDir, { recursive: true });
//------------Express Application-------------
app.use(express_1.default.static(publicDir));
app.use('/image', express_1.default.static(uploadDir));
app.use(express_1.default.json());
//***************** BELOW IS EXPRESS ROUTE ****************************/
app.get('/', (req, res) => {
    res.json("Hello World by Express");
});
//------------------fetching with Sanic server-----------------
app.post('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let file = req.body;
    let response = yield (0, node_fetch_1.default)('http://localhost:5000/api', {
        method: 'POST',
        body: JSON.stringify(file)
    });
    let result = yield response.json();
    console.log(result);
    res.json(result);
}));
app.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req)
    const form = (0, formidable_1.default)({
        uploadDir,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFiles: 1,
        maxFileSize: 1024 * Math.pow(1024, 2),
        filter: file => { var _a; return ((_a = file.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith('image/')) || false; },
    });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error({ err });
            return;
        }
        // console.log(files)
        const submitImage = files.image.newFilename;
        console.log(submitImage);
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
        let toSanic = yield (0, node_fetch_1.default)('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(submitImage)
        });
        let result = yield toSanic.json();
        console.log(result);
        // let predictResult = result;
        // let toFrontend = await fetch('/', {
        //     method: 'POST',
        //     body: JSON.stringify(predictResult)
        // })
        // let res = await toFrontend.json()
        res.json(result);
    }));
}));
// app.get('/post', async (req, res) => {
// })
