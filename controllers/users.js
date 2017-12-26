const models  = require('../models')
const User  = require('../models').User
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  register: (req, res) => {
    // generate hash and password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        // send data to db
        User.create({
          email: req.body.email,
          password: hash,
          fullname: req.body.fullname,
          phone: req.body.phone,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .then(user => {
          res.send({
            message: 'success',
            // code: ,
            payload: user
          })
        })
        .catch(err => {
          res.send({
            message: 'error',
            // code: ,
            payload: err
          })
        })
      })
    })
  },
  login: (req, res) => {
    User.findOne({
      where: {email: req.body.email}
    })
    .then(user => {
      if(user == null) {
        res.send({message: 'user not found', user: user }) // code: ,
      } else {
        
        bcrypt.compare(req.body.password, user.password, function(errCheck, resultCheck) {
          if(!errCheck) {
              if(resultCheck == true) {
                // password match
                jwt.sign({
                  // message: 'valid token',
                  user: user
                }, process.env.SECRET, (err, token) => {
                  if(!err) res.send({message: 'success', payload: {token: token}})
                  else res.send({message: 'error creating token', payload: err})
                })
              } else {
                // password not match
                res.send({message: 'password not match', payload: {email: req.body.email}})
              }
          } else {
            res.send({message: 'error', payload: err})
          }
        })
      }
    })
    .catch(err => {
      res.send({message: 'error', payload: err})      
    })
  },
  verify: (req, res) => {
    token = req.body.token || req.headers.token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(!err) res.send({message: 'success', payload: decoded})
      else res.send({message: 'error', payload: err})
    })
  },
  update: (req, res) => {
    changePassword = req.body.changePassword || false
    if(changePassword) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          User.update({
            email: req.body.email,
            password: hash,
            fullname: req.body.fullname,
            phone: req.body.phone,
            // createdAt: new Date(),
            updatedAt: new Date()
          }, 
            {where: {id: req.params.id}, 
            returning: true,
            plain: true
          })
          .then(user => {
            res.send({message: 'success', payload: user})
          })
          .catch(err => { 
            res.send({message: 'error', payload: err})
          })
        })
      })
    } else {
      User.update({
        email: req.body.email,
        // password: password,
        fullname: req.body.fullname,
        phone: req.body.phone,
        updatedAt: new Date()
      }, 
        {where: {id: req.params.id},
        returning: true,
        plain: true
      })
      .then(user => {
        res.send({message: 'success', payload: user})
      })
      .catch(err => { 
        res.send({message: 'error', payload: err})
      })
    }
    
  }
}