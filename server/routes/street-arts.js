const express = require('express')
const StreetArt = require('../models/StreetArt.js')
const uploader = require('../configs/cloudinary')
const router = express.Router()

// Route to get all streetarts
router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(dbRes => {
      console.log('found all street art', dbRes)
      console.log('sending back a res JSON')
      res.json(dbRes)
    })
    .catch(err => {
      console.log('error finding the street arts', err)
    })
})

router.get('/:streetArtId', (req, res, next) => {
  const id = req.params.streetArtId
  StreetArt.findById(id)
    .then(dbRes => {
      console.log('the found street-art is', dbRes)
      res.json(dbRes)
    })
    .catch(err => {
      console.log('error during lookup of street-art', err)
    })
})

router.post('/', uploader.single('picture'), (req, res, next) => {
  let pictureUrl = req.body.picture
  let lat = req.body.lat
  let lng = req.body.lng
  // {lat, lng} = req.body
  let location = {
    coordinates: [lat, lng],
  }
  StreetArt.create({ pictureUrl, location })
    .then(dbREs => {
      console.log('a new street art was created', dbREs)
      res.json(dbREs)
    })
    .catch(err => {
      console.log('error adding a street art', err)
    })
})

// // Route to add a country
// router.post('/', (req, res, next) => {
//   let { name, capitals, area, description } = req.body
//   Country.create({ name, capitals, area, description })
//     .then(country => {
//       res.json({
//         success: true,
//         country,
//       })
//     })
//     .catch(err => next(err))
// })
// export to be able to require it somewhere else
module.exports = router
