var express = require('express');
var router = express.Router();

const User = require('../controllers/user')

/* GET users listing. */
router.get('/users', User.list);
router.get('/findUser/:id', User.findUser);
router.post('/login', User.login);
router.post('/register', User.register);
router.get('/logout', User.logout);
router.post('/update/:id/:flag', User.update);

module.exports = router;
 