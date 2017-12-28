const jwt     = require('jsonwebtoken')
require('dotenv').config()
const Venue  = require('../models').Venue

module.exports = {
  isLogin: (req, res, next) => {
    token = req.body.token || req.headers.token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log('decoded', decoded)
      if(!err) {
        req._id = decoded.user.id
        next()
      } else { 
        res.send({message: 'error', payload: err}) 
      }
    })
  },
  isAuthUser: (req, res, next) => {
    if(req.params.id == req._id) next()
    else res.send({message: 'access denied'})
  },
  isAuthDataVenues: (req, res, next) => {
    Venue.findById(req.params.venueId)
    .then(venue => {
      if(venue !== null) {
        if(req._id == venue.UserId) next()
        else res.send({message: "access denied"})
      } else {
        res.send({message: "venue not found"})
      }   
    })
    .catch(err => {
      res.send({message: "error", payload: err})
    })
  }
}