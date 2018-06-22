const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/ping', function (req, res) {
  res.send({message: "pong"})
})



app.use(function (req,res,next) {
  const status = 404
  const message = `Could not ${req.method} ${req.url}`
  next({status, message})
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
