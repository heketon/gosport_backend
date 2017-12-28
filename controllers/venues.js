const Venue  = require('../models').Venue

module.exports = {
  create: (req, res) => {
    Venue.create({
      venue_name: req.body.venue_name,
      address: req.body.address,
      coordinates: req.body.coordinates,
      plus_codes: req.body.plus_codes || null,
      phone: req.body.phone,
      time_open: req.body.time_open,
      time_close: req.body.time_close,
      remarks: req.body.remarks,
      UserId: req._id,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(venue => {
      res.send({message: "success", payload: venue})
    })
    .catch(err => {
      res.send({message: "error", payload: err})
    })
  },
  getAll: (req, res) => {
    Venue.findAll({}).then(venues => {
      res.send({message: "success", payload: venues})
    })
    .catch(err => { res.send({message: "error", payload: err})})
  },
  getByUserId: (req, res) => {
    Venue.findAll({
      where: {
        UserId: req._id
      }
    })
    .then(venues => {
      res.send({message: "success", payload: venues})
    })
    .catch(err => { res.send({message: "success", payload: err}) })
  },
  update: (req, res) => {
    Venue.update({
      venue_name: req.body.venue_name,
      address: req.body.address,
      coordinates: req.body.coordinates,
      plus_codes: req.body.plus_codes || null,
      phone: req.body.phone,
      time_open: req.body.time_open,
      time_close: req.body.time_close,
      remarks: req.body.remarks,
      updatedAt: new Date()      
    }, 
    {where: {id: req.params.venueId}, 
    returning: true,
    plain: true
    })
    .then(venue => {
      res.send({message: "success", payload: venue})
    })
    .catch(err => {
      res.send({message: "error", payload: err})
    })
  },
  destroy: (req, res) => {
    Venue.destroy({
      where: {id: req.params.venueId}      
    })
    .then(venue => {
      res.send({message: "success", payload: venue})
    })
    .catch(err => { res.send({message: "error", payload: err})})
  }
}