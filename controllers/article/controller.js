
var mongoose = require( 'mongoose' );
var Article    = mongoose.model( 'Article' );

Date.prototype.toDateInputValue = (function() {
    var datenow = new Date(this);

    // reformate to get local date :)
    datenow.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return datenow.toJSON().slice(0,10);
});

module.exports = {

   create: function(req,res,next){

    new Article({
        title      : req.body.title,
        content    : req.body.content,
        image      : req.body.image,
        user_id    : req.session.userid,
        username   : req.session.username,
        updated_at : new Date().toDateInputValue()
    }).save( function( err, article, count ){
        res.redirect( '/articles' );
    });
   },

   modify: function(req,res,next) {
    
    Article.findById( req.params.id, function ( err, article ){
        var datenow = new Date().toDateInputValue();

        res.render( 'edit', {
            article  : article,
            user_id  : req.session.userid,
            datenow  : datenow,
        });
    });
   },

   delete: function(req, res, next) {

    Article.findById( req.params.id, function ( err, article ){
        article.remove( function ( err, article ){
            res.redirect( '/articles' );
        });
    });
   },

   update: function(req, res, next) {
    Article.findById( req.params.id, function ( err, article ){
        article.content    = req.body.content;
        article.title      = req.body.title;
        article.updated_at = Date.now();
        article.image      = req.body.image;
        article.save( function ( err, article, count ){
            res.redirect( '/articles' );
        });
    });
   },

   display: function(req,res,next) {
        Article.find( function ( err, articles){
            var datenow = new Date().toDateInputValue();
            res.render( 'home', {
                articles : articles,
                user_id  : req.session.userid,
                datenow  : datenow
            });
        });
   }
}