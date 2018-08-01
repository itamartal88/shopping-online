
     var dbConnect = require('./dbConnect');
     var mongoose  = dbConnect.mongoose;
     var store = dbConnect.store;
   
    var schema = mongoose.Schema;
    
    var orderScema = new schema({
       costumerId:[{ type: schema.Types.ObjectId, ref: 'persons' }],
       totalPrice:Number,
       city:String,
       street:String,
       shippingDate:Date,
       orderDate:Date,
       creditCard:String,
       productsInCart:[]
    })

    mongoose.model('orders', orderScema);
    var orders = mongoose.model('orders');

    module.exports = orders;
    
