/**
 * Created by shunsuke on 14/11/01.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var movieSchema = new Schema({
    text: String
});

module.exports = mongoose.model('Twitter', movieSchema);
