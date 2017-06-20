var express = require('express');
var router = express.Router();

//Chat


var mongoose = require( 'mongoose' );
var Article  = mongoose.model( 'Article' );
var User     = mongoose.model( 'User' );

// Controllers

var userController = require('../controllers/user');
var articleController = require('../controllers/article');


/* GET home page. */

router.get('/addArticle', function(req, res, next){
  res.render('addArticle');
});

router.get('/articles', articleController.controller.display);

router.post('/create', articleController.controller.create);

router.get( '/destroy/:id', articleController.controller.delete);

router.get( '/edit/:id', articleController.controller.modify);

router.post( '/update/:id', articleController.controller.update);

router.get('/login', function(req, res, next) {
  res.render( 'login', {
      error : '',
    });
});

router.post('/login', userController.controller.connect);

router.get('/register', function(req, res, next) {
  res.render( 'register', {
      error : '',
    });
});

router.post('/register', userController.controller.register)

router.get('/logout', userController.controller.logout);



module.exports = router;

