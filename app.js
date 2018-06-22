const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000

app.get('/ping', function (req, res) {
  res.status(200).send({message: "pong"})
})



app.use(function (req,res,next) {
  next({status: 404, message: "Route not found"})
})

app.use(function (err,req,res,next) {
  const errToSend = {}
  errToSend.status = err.status || 500
  errToSend.message = err.message || "Internal Server Error"
  if (process.env.NODE_ENV !== "production") {
    errToSend.stack = err.stack
  }

  res.status(errToSend.status).send(errToSend)
})

app.listen(port, function() {
  console.log(`Listening on port: ${port}`)
})
