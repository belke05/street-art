const express = require('express')
const router = express.Router()
const Visit = require('../models/Visit')
const { isLoggedIn } = require('../middlewares')
const StreetArt = require('../models/StreetArt')
const User = require('../models/User')

// route protected for logged in user
router.get('/my-visits', (req, res, next) => {
  Visit.find({ _user: req.session.passport.user })
    // .populate('_user')
    .populate('_streetArt')
    .then(AllVisits => {
      console.log(AllVisits, 'all the visits he has are')
      // AllVisits.foreach(visit => {})
      res.json(AllVisits)
    })
    .catch(err => {
      console.log(err)
    })
  // Visit.populate('User').then(visit=>{

  // })
})

router.post('/visits', (req, res, next) => {
  const _streetArt = req.body._streetArt
  const _user = req.session.passport.user
  const createdVisit = new Visit({
    _user: _user,
    _streetArt: _streetArt,
  })
  Visit.save(createdVisit)
})

module.exports = router
