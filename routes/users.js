var express   = require('express');
var router    = express.Router();
var usersCont = require('../controllers/users')
var auth      = require('../helpers/auth')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ok');
});

router.post('/', usersCont.register)
router.post('/login', usersCont.login)
router.post('/verify', usersCont.verify)
router.patch('/:id', auth.isLogin, auth.isAuthUser ,usersCont.update)

module.exports = router;
