
var express = require('express');
var adminRouter = express.Router();
var dbCategory = require('./../db/dbCategory');
var dbProducts = require('./../db/dbProducts');
var file = require('file-system');
var fs = require('fs');
var mime = require('mime');
var validHandler = require('./../handlers/validation');
var allowedUpload = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];   

adminRouter.post('/addProduct',(req,res) => {
  var product = JSON.parse(req.body.product);
  var type = mime.getType(req.files.img.name);
  var categoryId = parseInt(product.categoryId);
  if(req.files && allowedUpload.indexOf(type) > -1){
    fs.writeFileSync('./Images/' + req.files.img.name, req.files.img.data); 
    dbCategory.find({categoryId:categoryId}).then(category => {
       var objInsert = new dbProducts({
       productName:product.name,
       categoryId:category[0]._id,
       unitPrice:product.price,
       img:req.files.img.name,
       addingDate:new Date()
      });
      objInsert.save(function(err,response){
        if(err) throw err;
        var pro = [{_id:objInsert._id,productName:product.name,unitPrice:product.price,
          categoryId:category[0]._id,img:req.files.img.name}];
        var obj = { massege:'',product:pro}
        res.json(obj);
        })
       });
     }else{
      var obj = { massege:'you can upload only images'}
      res.json(obj);
     }
  })

  adminRouter.post('/editProduct', (req,res) => {
     var product = JSON.parse(req.body.product);
     var p = validHandler.editValidition(product,req);
      var type = mime.getType(p.img); 
      if(req.files && allowedUpload.indexOf(type) > -1){
        fs.writeFileSync('./Images/' + req.files.img.name, req.files.img.data); 
      }
     
      if(allowedUpload.indexOf(type) > -1){
      dbCategory.find({Name:product.productCategory},(err,result) => {
        if(err) throw err;
        if(result.length > 0){
          dbProducts.update({_id:product.product._id},{$set: { productName:p.name, unitPrice:p.price, img:p.img,categoryId:result[0]._id }},
            {upsert: true},function(err,response){
              if(err) throw err;
              var pro = [{_id:product.product._id,productName:p.name, unitPrice:p.price, img:p.img,categoryId:result[0]._id}];
              var obj = { massege:'Product Update Succsesfully',product:pro}
           res.json(obj);
         })
        }
      })  
      }else{
        var obj = { massege:'you can upload only images'}
        res.json(obj);
      }
  })

 

  module.exports = adminRouter;