

var express = require('express');
var categoryRouter = express.Router();
var dbCategory = require('./../db/dbCategory');
var jwt = require('./../handlers/jwt');

categoryRouter.get('/getAll',(req,res) => {
    dbCategory.find({},(err,categories) => {
        if(err) throw err;
        obj = { categories:categories,favorite: req.body.costumer.obj[0].favoriteProducts }
        res.json(obj);
    })
});


module.exports = categoryRouter;
