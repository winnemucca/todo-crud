var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ngTodo app' });
});

router.get('/templates/:templateid' ,function(req,res,next){
	res.render('templates/' + req.params.templateid);
})

module.exports = router;
