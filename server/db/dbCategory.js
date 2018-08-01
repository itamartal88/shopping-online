
     var dbConnect = require('./dbConnect');
     var mongoose  = dbConnect.mongoose;
     var store = dbConnect.store;
   
    var schema = mongoose.Schema;
    
    var categorySchema = new schema({
       Name:String
    })

    mongoose.model('categories', categorySchema);
    var categories = mongoose.model('categories');

    module.exports = categories;
    

