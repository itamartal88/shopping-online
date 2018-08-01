
var express = require('express');
var productsRouter = express.Router();
var dbProducts = require('./../db/dbProducts');
var jwt = require('./../handlers/jwt');
var dbPerson = require('./../db/dbPersons');

productsRouter.post('/getCatgory',(req,res) => {
    var id = req.body.category._id.toString();
    var length;
   dbProducts.find({categoryId:id},(err,products) => {
       if(err) throw err;
       length = products.length;
       dbProducts.find({categoryId:id}).populate('categories').limit(5).skip(req.body.skip).exec((err,products) => {
        if(err) throw err;
        var obj = { products:products,length: length }
        res.json(obj);
    })
   });
  });

  productsRouter.post('/search', (req,res) => {
      var name = req.body.name;
    dbProducts.find({productName:{'$regex': new RegExp(name, "i")}}, (err,product)=>{
        if(err) throw err;
        res.json(product);
    })
});

productsRouter.post('/addFavo',(req,res) => {
    dbPerson.update({_id:req.body.costumer.obj[0]._id},
        {$set: { favoriteProducts:req.body.favorite
       }},{upsert: true},function(err,response){
        if(err) throw err;
        res.json(response);
      })
})

  module.exports = productsRouter;