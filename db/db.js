var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Article = new Schema({
    user_id    : String,
    username   : String,
    title      : String,
    content    : String,
    image      : String,
    updated_at : Date
});

var User = new Schema({
    name          : String,
    username      : String,
    password      : String,
    email         : String,
    register_date : Date
});
 
mongoose.model('User', User);
mongoose.model( 'Article', Article );
mongoose.connect( 'mongodb://localhost/blog' );