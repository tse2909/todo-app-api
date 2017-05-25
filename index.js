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


app.get('/getProducts', function (request, response) {

  WooCommerce.get('products?per_page=100', function (err, data, res) {
    if (err) {
      response.send(err)
    } else {
      response.json(data)
    }
  });

});

var data = {
  payment_method: 'bacs',
  payment_method_title: 'Direct Bank Transfer',
  set_paid: true,
  billing: {
    
    city: 'San Francisco',
    state: 'CA',
    postcode: '94103',
    country: 'US',
    email: 'john.doe@example.com',
    phone: '(555) 555-5555'
  },
  shipping: {
    first_name: 'John',
    last_name: 'Doe',
    address_1: '969 Market',
    address_2: '',
    city: 'San Francisco',
    state: 'CA',
    postcode: '94103',
    country: 'US',
    email: 'john.doe@example.com',
    phone: '(555) 555-5555'
  },
  line_items: [
    {
      product_id: 64,
      quantity: 2
    },
    
  ],

    shipping_lines: [
    {
      method_id: 'flat_rate',
      method_title: 'Flat Rate',
      total: 10
    }
  ]
};

app.post('/postOrders', function (request, response) {
  WooCommerce.post('orders', data, function (err, data, res) {
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