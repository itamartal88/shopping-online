
var express = require('express');
var personRouter = express.Router();
var dbPerson = require('./../db/dbPersons');
var dbOrder = require('./../db/dbOrder');
var jwt = require('./../handlers/jwt');
var mailHandler = require('./../handlers/mail');

personRouter.post('/insert',(req,res) => {
    var objInsert = new dbPerson({
        Name:req.body.name,
        lastName:req.body.lastName,
        eMail:req.body.step1.email,
        Id:req.body.step1.id,
        password:req.body.step1.password,
        city:req.body.city,
        street:req.body.street,
        role:'costumer',
        favoriteProducts:[]
    });
        objInsert.save(function(err, response) {
            if (err) throw err;
            jwt.getWebToken([objInsert]).then((token) => {
               mailHandler.sendEmail(req.body.name,req.body.step1.email);
                req.body.token = token;
                req.body.role = 'costumer';
                res.json(req.body);
              }).catch((er) => {
                console.error("error?:" + er.message);
                res.sendStatus(404);
              }); 
          });
     });



personRouter.post('/checkId', (req,res) => {
    dbPerson.find({Id:req.body.id}, (err,person)=>{
        if(err) throw err;
        res.json(person);
    })
});

personRouter.post('/login', (req,res) => {
   dbPerson.find({Name:req.body.name, password:req.body.password},(err,person)=>{
        if(err) throw err;
        if(person.length > 0){
            jwt.getWebToken(person).then((token) => {
                req.body.token = token;
                req.body.person = person;
              }).catch((er) => {
                console.error("error?:" + er.message);
                res.sendStatus(404);
              }); 
         dbOrder.find({costumerId:person[0]._id, shippingDate:null},(err,cart) => {  
             if(cart.length > 0){
                if(err) throw err;
                req.body.cart = cart;
                res.json(req.body);
             }else{
          dbOrder.find({costumerId:person[0]._id},(err,cart) => {
              if(err) throw err;
              req.body.cart = cart;
              res.json(req.body);
               })
            }                                       
         })
        }else{
          req.body.person = person;
          res.json(req.body);
        }
    });
})


module.exports = personRouter;
