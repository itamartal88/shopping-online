

var mongoose = require('mongoose');

 var store = mongoose.connect('mongodb://localhost:27017/shopping-online');


module.exports = {
    mongoose,
    store
}