import express from "express";
import fetch from 'node-fetch';
const app = express();
app.use(express.static("public"));
app.use('/uploads', express.static(uploadDir));
app.post('api', async (req, res) => {
    let file = req.body;
    let response = await fetch('http://localhost:5000', { method: 'POST' }, { body: JSON.stringify(file) });
    let result = await response.json();
    res.json({ result });
});
app.listen(8000, () => {
    console.log('listening to port 8000');
});
