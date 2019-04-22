var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var banners = require('../public/data/banners/index.get.json');
var prodCategories = require('../public/data/categories/index.get.json');
var products = require('../public/data/products/index.get.json');
var cartMsg = require('../public/data/addToCart/index.post.json');


/* GET home page. */

router.get('/home', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.sendFile('C:/Users/Harry/Desktop/spwork/devlopment/views/header.html');//, {banners:ActiveBanners,categories:ActiveCategories});

});

router.get('/', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('home', {banners:ActiveBanners,categories:ActiveCategories});

});


router.get('/category', function(req, res, next) {
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('product_listing', {products:products,categories:ActiveCategories});
  
});
router.get('/category/:id', function(req, res, next) {
  var CatId = req.params.id;
  CategoryProducts = products.filter(product => product.category==CatId);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  console.log(CatId);
  res.render('product_listing', {products:CategoryProducts,categories:ActiveCategories,currentCat:CatId});
  
});
router.post("/api/subToCart",function(req, res, next) {
  
  var ProductId = req.body.prodId;
  var cartData = require('./cart.json');
  if(cartData[ProductId] == 1)
  {
    delete cartData[ProductId];
  }else{
    cartData[ProductId] -= 1;
  }
  
  fs.writeFileSync('./routes/cart.json', JSON.stringify(cartData));
  const reducer = (a, b) => a + b;
  const sumValues = obj => Object.values(obj);
  var cartCountData = sumValues(cartData);
  var cartCount = 0;
  if(cartCountData.length>0)
  {
    cartCount = cartCountData.reduce(reducer);
  }
  var cartMsg_temp = {...cartMsg,'cartCount':cartCount};
  res.send(cartMsg_temp);
});

router.post('/api/addToCart', function(req, res, next) {
  
  var ProductId = req.body.prodId;
  var cartData = require('./cart.json');
  if(!cartData[ProductId])
  {
    cartData[ProductId] = 0;
  }
  cartData[ProductId] += 1;
  fs.writeFileSync('./routes/cart.json', JSON.stringify(cartData));
  const reducer = (a, b) => a + b;
  const sumValues = obj => Object.values(obj);
  var cartCountData = sumValues(cartData);
  var cartCount = 0;
  if(cartCountData.length>0)
  {
    cartCount = cartCountData.reduce(reducer);
  }
  var cartMsg_temp = {...cartMsg,'cartCount':cartCount};
  res.send(cartMsg_temp);
});

router.get('/api/cartCount', function(req, res, next) {
  var cartData = require('./cart.json');
  const reducer = (a, b) => a + b;
  const sumValues = obj => Object.values(obj);
  var cartCountData = sumValues(cartData);
  var cartCount = 0;
  if(cartCountData.length>0)
  {
    cartCount = cartCountData.reduce(reducer);
  }
  var cartMsg_temp = {'cartCount':cartCount};
  res.send(cartMsg_temp);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/cart', function(req, res, next) {
  var cartData = require('./cart.json');
  var prodIds = Object.keys(cartData);
  var cartProducts = [];
  var totalAmt = 0;
  var cartCount = 0;
  if(Object.keys(cartData).length > 0)
  {
    cartProducts = products.filter(product => prodIds.includes(product.id))
    .map(product=>{
      product.count = cartData[product.id];
      cartCount += product.count;
      totalAmt += product.count * product.price;
      return product;
    });
  }
  res.render('cart',{'cartProducts':cartProducts,'totalAmt':totalAmt,cartCount});
});



module.exports = router;
