

     var dbConnect = require('./dbConnect');
     var mongoose  = dbConnect.mongoose;
     var store = dbConnect.store;
   
    var schema = mongoose.Schema;
    
    var productSchema = new schema({
       categoryId:[{ type: schema.Types.ObjectId, ref: 'categories' }],
       productName:String,
       unitPrice:Number,
       img:String,
       addingDate:Date
    })

    mongoose.model('products', productSchema);
    var products = mongoose.model('products');

    module.exports = products;
    
