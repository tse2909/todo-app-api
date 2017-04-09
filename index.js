const express = require('express');
const app = express();

var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost/beautyshop',
  consumerKey: 'ck_b7f92ab36f70d3517d86dc855e04b9d41b6d8277',
  consumerSecret: 'cs_54ffc64bc91b4d7630c06161acf22532de1fcf53',
  wpAPI: true,
  version: 'wc/v1'
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/getProducts', function(request,response) {

  WooCommerce.get('products', function (err, data, res) {
    if (err){
      response.send(err)
    } else{
      response.json(data)
    }
  });

})
app.listen(3000, function(){
  console.log("Listening")
});