const express = require('express')
const app = express()
const port = 3000
var time = new Date();
var date = time.getHours() + ':' + time.getMinutes();

app.get('/', (req, res) => {
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)
})

app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" })
})

app.get('/time', (req, res) => {
    res.send({ status: 200, message: date })
})

app.get('/hello/:name', (req, res) => {
    res.send({ status: 200, message: "hello, " + req.params.name + "!" });
})

app.get('/hello/', (req, res) => {
    res.send({ status: 200, message: "hello, !" });
})

app.get('/search', (req, res) => {
    const search = req.query.s;
    if (search == "") {
        res.status(500);
        res.send({ status: 500, error: true, message: "you have to provide a search" });
    }
    res.send({ status: 200, message: "ok", data: search });
})