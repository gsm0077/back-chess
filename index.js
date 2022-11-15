const express = require("express");

const app = express()

const port = 8000;

app.use('/',(req,res) => {
    res.json({ message :' thi is first to render'})
})

app.listen(port, () => {
    console.log("starting the server  man")
})