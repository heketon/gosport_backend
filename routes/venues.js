var express   = require('express');
var router    = express.Router();
var venueCont = require('../controllers/venues')
var auth      = require('../helpers/auth')

// must login first
router.post('/', auth.isLogin, venueCont.create)
router.get('/', auth.isLogin, venueCont.getByUserId)
router.patch('/:venueId', auth.isLogin, auth.isAuthDataVenues, venueCont.update)
router.get('/all', venueCont.getAll)
router.delete('/:venueId', auth.isLogin, auth.isAuthDataVenues, venueCont.destroy)

module.exports = router;
