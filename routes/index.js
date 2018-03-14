const _ = require('lodash')

const config = require('../config/config')
const utilities = require('../libs/utilities')

const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four'
]

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home', {})
  })

  app.get(['/workout', '/workout/:page'], (req, res) => {
    let output = {
      nav: {},
      workout: []
    }
    let selectedWeek = '1'
    if (req.params.page) selectedWeek = req.params.page
    _.forEach(config, (week, index) => {
      _.forEach(week, (set, key) => {
        if (selectedWeek === index) {
          output.workout.push({
            set: key,
            weight: req.query.round === 'on'
              ? utilities.round5(req.query.max * (set.p / 100)) + ' x ' + set.x
              : req.query.max * (set.p / 100) + ' x ' + set.x
          })
        }
      })
    })
    _.forEach(numbers, (number, index) => {
      output.nav[number] = {
        active: false,
        number: index
      }
      if (index === selectedWeek) output[number] = true
    })
    delete output.nav.zero
    output.query = _.get(req, '_parsedUrl.search', '')
    res.render('output', {output})
  })
}
