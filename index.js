const express = require('express')
const app = express()
const port = 3000
var time = new Date();
var date = time.getHours() + ':' + time.getMinutes();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

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
    res.send({ status: 200, message: "hello " + req.params.name });
})

app.get('/hello/', (req, res) => {
    res.send({ status: 200, message: "hello" });
})

app.get('/search', (req, res) => {
    const search = req.query.s;
    if (search == "") {
        res.status(500);
        res.send({ status: 500, error: true, message: "you have to provide a search" });
    }
    res.send({ status: 200, message: "ok", data: search });
})
app.get('/movies/add', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/get', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/edit', (req, res) => {
    res.send({ status: 200, message: "Ok", data: movies });
})

app.get('/movies/delete', (req, res) => {
    res.send({ status: 200, message: "ok", data: movies });
})

app.get('/movies/read', (req, res) => {
    res.send({ status: 200, message: "Ok", data: movies });
})