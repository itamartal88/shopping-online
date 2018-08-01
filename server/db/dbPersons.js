

     var dbConnect = require('./dbConnect');
     var mongoose  = dbConnect.mongoose;
     var store = dbConnect.store;
   
    var schema = mongoose.Schema;
    
    var personSchema = new schema({
       Name:String,
       lastName:String,
       eMail:String,
       Id:Number,
       password:String,
       city:String,
       street:String,
       role:String,
       favoriteProducts:[]
    })

    mongoose.model('persons', personSchema);
    var persons = mongoose.model('persons');

    module.exports = persons;
    
