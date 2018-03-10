const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')
app.locals.basedir = path.join(__dirname, '/')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({
  extended: true
}))

require('./routes')(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`${port} belongs to us`)
})
