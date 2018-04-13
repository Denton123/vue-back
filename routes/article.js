var express = require('express');
var router = express.Router();

const Article = require('../controllers/article')

/* GET users listing. */
router.get('/list', Article.list);

module.exports = router;
 