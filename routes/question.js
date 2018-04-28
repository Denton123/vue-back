var express = require('express');
var router = express.Router();

const Question = require('../controllers/question')

/* GET users listing. */
router.get('/list', Question.list);
router.get('/showById/:id', Question.showById);
router.get('/showByUser/:id', Question.showByUser);
router.post('/updateById/:id', Question.updateById);
router.post('/store/:id', Question.store);

module.exports = router;
 