const _ = require('lodash')

const config = require('../config/config')
const utilities = require('../libs/utilities')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home', {})
  })

  app.get(['/workout', '/workout/:page'], (req, res) => {
    let output = []
    let selectedWeek = '1'
    if (req.params.page) selectedWeek = req.params.page
    _.forEach(config, (week, index) => {
      _.forEach(week, (set, key) => {
        if (selectedWeek === index) {
          output.push({
            set: key,
            weight: req.query.round === 'on'
              ? utilities.round5(req.query.max * (set.p / 100)) + ' x ' + set.x
              : req.query.max * (set.p / 100) + ' x ' + set.x
          })
        }
      })
    })
    output.query = req._parsedUrl.search
    res.render('output', {output})
  })
}
