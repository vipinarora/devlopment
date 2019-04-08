var express = require('express');
var router = express.Router();
var banners = require('../public/data/banners/index.get.json');
var prodCategories = require('../public/data/categories/index.get.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('home', {banners:ActiveBanners,categories:ActiveCategories});
});

router.get('/category/:id', function(req, res, next) {
  res.render('home', { title: 'Express' });
});





module.exports = router;
