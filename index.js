const express = require('express')
const app = express()
const port = 3000
var time = new Date();
var date = time.getHours() + ':' + time.getMinutes();

app.get('/', (req, res) => {
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" })
})

app.get('/time', (req, res) => {
    res.send({ status: 200, message: date })
})