const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var WooCommerceAPI = require('woocommerce-api');
var ongkir = require('./ongkir');
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


var dataObj = {
        origin: '501', // tipe string id kota atau kecamatan 
        destination: '48', // tipe string id kota atau kecamatan 
        weight:'2220' // tipe string berat kiriman 
        }



app.get('/getAllProvince', function (req, res) {
  var a = ongkir.getAllProvince()
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
});

app.get('/getAllCities', function (req, res) {
  var a = ongkir.getCities()
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
});

app.get('/getCity/:id', function (req, res) {
  var a = ongkir.getCity(req.params.id)
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
});


app.get('/getAllSubdistricts', function (req, res) {
  var a = ongkir.getSubdistricts();
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
});


app.get('/province/:id', function (req, res) {
  console.log(req.params.id);
  var a = ongkir.getProvince(req.params.id)
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
});


app.post('/getCost', function (req, res) {
  console.log(req.body.data);
  var a = ongkir.getCost(req.body.data)
  a.then(function (data) {
    res.send(data['rajaongkir']['results'])
    res.end()
  })
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