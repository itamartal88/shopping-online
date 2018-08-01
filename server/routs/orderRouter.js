

var express = require('express');
var orderRouter = express.Router();
var dbOrder = require('./../db/dbOrder');
var dbProduct = require('./../db/dbProducts');

orderRouter.post('/insertProduct',(req,res) => {
    console.log(req.body.products);
    dbOrder.find({costumerId:req.body.costumer.obj[0]._id, shippingDate:null},(err,response) => {
        if(response.length == 0){
            var objInsert = new dbOrder({
                costumerId:req.body.costumer.obj[0]._id,
                totalPrice:req.body.total,
                orderDate:new Date(),
                shippingDate:null,
                city:null,
                street:null,
                creditCard:null,
                productsInCart:[{product:req.body.products}]
               });
                objInsert.save(function(err,result){
                if(err) throw err;
                res.json(result);
                })
              }else{
               dbOrder.update({costumerId:response[0].costumerId,shippingDate:null},{$set: { productsInCart:[{product:req.body.products}], totalPrice:req.body.total,orderDate:new Date() }},
                {upsert: true},function(err,response){
                  if(err) throw err;
                  res.json(response);
                });
              }
            })
          })

      orderRouter.get('/getBusyDays',(req,res) => {
        dbOrder.find({},(err,result) => {
          if(err) throw err;
          var allDates = [];
          for(var i = 0; i < result.length; i++){
            var d = new Date(result[i].shippingDate);
            var dd = d.getDate();
            var month = d.getMonth()+1; 
            var year = d.getFullYear();
            var shortDate = dd+'/'+month+'/'+year;
           allDates.push(shortDate)
          }
          res.json(allDates);
        })
      })    

     orderRouter.get('/deleteCart',(req,res) => {
       dbOrder.remove({costumerId:req.body.costumer.obj[0]._id, shippingDate:null},(err,result) => {
         if(err) throw err;
         console.log(result);
         res.json(result);
       })
     })     

     orderRouter.post('/order',(req,res) => {
      var str = req.body.credit.split(" ");
      var credit = ''
      for(var i = 0; i < str.length; i++){
       credit = str[i];
      }
     dbOrder.find({shippingDate:req.body.date},(err,res1) => {
      if(err) throw err;
      if(res1.length >= 3){
        var a = {message:res1.length}
        res.json(a);
      }else{
        dbOrder.find({costumerId:req.body.costumer.obj[0]._id, shippingDate:null},(err,response) => {
          if(response.length > 0){
            dbOrder.update({costumerId:response[0].costumerId,shippingDate:null},
              {$set: { orderDate:new Date(), shippingDate:req.body.date, city:req.body.city, street:req.body.street,
              creditCard:credit
            }},{upsert: true},function(err,response){
              if(err) throw err;
              var a = {message:res1.length}
              res.json(a);
            })
           } else{
            var a = {message:'was problam please try again'}
            res.json(a);
           }
          })
         }
       })  
     })         

     orderRouter.get('/favorite', (req,res) => {
      var id = req.body.costumer.obj["0"]._id;
      dbOrder.find({costumerId:id,shippingDate:{$ne:null}},(err,result) => {
        var arr = [];
        var arr2 = [];
        for(var i = 0; i < result.length; i++){
         var a = result[i].productsInCart["0"].product;
         getProductsOfOrder(a,arr,arr2);
        }
        arr.sort(function(a,b){return b.num - a.num});
        var topTen = arr.slice(0,10);
       dbProduct.find({_id: {$in: topTen.map(a => a.id)}},(err,res1) => {
        res.json(res1);
       })
      })
    })

    function getProductsOfOrder(pro,arr,arr2){
      for(var c = 0; c < pro.length; c++){
        var a = arr2.indexOf(pro[c].id);
        if(a > -1){
        arr[a].num++;
        }else{
          var product = {id:pro[c].id,num:1}
          arr.push(product);
          arr2.push(pro[c].id)
        }
       }
    }

  module.exports = orderRouter;