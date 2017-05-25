const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  // url: 'http://localhost/beautyshop',
  url: 'http://techdaily.esy.es',
  consumerKey: 'ck_8c862b7a2b67e174aae4229e59ffb6987026155d',
  consumerSecret: 'cs_0a0e8037f0f53e905d3106efff328fa19dde501e',
  wpAPI: true,
  version: 'wc/v1'
});

app.use(bodyParser.urlencoded({
    extended: false
})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.get('/getProducts', function (request, response) {

  WooCommerce.get('products?per_page=100', function (err, data, res) {
    if (err) {
      response.send(err)
    } else {
      response.json(data)
    }
  });

});

app.post('/postOrders', function (request, response) {
  console.log(request.body.data);
  WooCommerce.post('orders', request.body.data, function (err, data, res) {
    console.log(res);
    if (err) {
      response.send(err)
    } else {
      response.json(data)
    }
  });
})

app.listen(process.env.PORT || 8080, function () {
  console.log("Listening")
});