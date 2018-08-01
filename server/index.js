
var express = require('express');
var http = require('http');
var app = express();
var categoryRouter = require('./routs/categoryRouter');
var personRouter = require('./routs/personRouter');
var productsRouter = require('./routs/productsRouter');
var notificationRouter = require('./routs/notificationRouter');
var adminRouter = require('./routs/adminRouter');
var orderRouter = require('./routs/orderRouter');
var myServer = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var upload = require('express-fileupload');
var jwt = require('./handlers/jwt');

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(cors());
 app.use(upload());
 app.use('/pictures', express.static(__dirname + '/Images'));

app.use('/shop',(req,res,next) => {
  jwt.verifyToken(req,next);
})

app.use('/shop/products', productsRouter);
app.use('/shop/admin', adminRouter);
app.use('/shop/order',orderRouter);
app.use('/shop/category',categoryRouter);
app.use('/persons',personRouter);
app.use('/notification', notificationRouter);
 
myServer.listen(4000);

myServer.on('listening',()=>{
  console.log('server listening');
});

