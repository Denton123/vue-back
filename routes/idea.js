var express = require('express');
var router = express.Router();

const Idea = require('../controllers/idea')

router.post('/store', Idea.store);
router.get('/index', Idea.index);
router.post('/uploadImg', Idea.uploadImg);
router.get('/showByUser/:id', Idea.showByUser);

module.exports = router;
  