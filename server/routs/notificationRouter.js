
var express = require('express');
var notificationRouter = express.Router();
var dbProducts = require('./../db/dbProducts');
var dbOrder = require('./../db/dbOrder');

notificationRouter.get('/getAllProducts',(req,res) => {
    dbProducts.find({},(err,products) => {
        if(err) throw err;
        var num = products.length;
        res.json(num);
    })
})

notificationRouter.get('/getAllOrders', (req,res) => {
    dbOrder.find({shippingDate: {$ne : null}},(err,orders) => {
        if(err) throw err;
        var num = orders.length;
        res.json(num);
    })
})

module.exports = notificationRouter;