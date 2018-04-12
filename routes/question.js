var express = require('express');
var router = express.Router();

const Question = require('../controllers/question')

/* GET users listing. */
router.get('/list', Question.list);

module.exports = router;
 