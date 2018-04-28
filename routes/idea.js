var express = require('express');
var router = express.Router();

const Idea = require('../controllers/idea')

router.post('/store/:id', Idea.store);
router.get('/index', Idea.index);
router.post('/uploadImg', Idea.uploadImg);

module.exports = router;
 