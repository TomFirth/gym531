const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
const _ = require('lodash')

const config = require('./config/config')

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

const port = process.env.PORT || 8080

const round5 = (x) => {
  return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5
}

app.listen(port, () => {
  console.log(`${port} belongs to us`)
})

app.get('/', (req, res) => {
  res.render('home', {})
})

app.get('/workout', (req, res) => {
  let output = []
  _.forEach(config, (week, index) => {
    _.forEach(week, (set, key) => {
      output.push({
        week: index,
        set: key,
        weight: round5(req.query.max * (set.p / 100)) + ' x ' + set.x
      })
    })
  })
  res.send(JSON.stringify(output))
})
