const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var Todo = require('./models/todo');
mongoose.connect('mongodb://todo-app:todo-app@ds157641.mlab.com:57641/db_todo_app');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/getTodos', function (req, res) {
  Todo.find({}, function (err, todo) {
    if (err) {
      res.send(err);
    } else {
      res.json(todo);
    }
  })
})

app.post('/postTodo', function (req, res) {
  var newTodo = new Todo;
  newTodo.title = req.body.title;
  newTodo.finish = req.body.finish;
  newTodo.save({
  }, function (err, todo) {
    if (err) {
      res.send(err);
    } else {
      res.json(todo);
    }
  })
});

app.put('/updateTodo', function (req, res) {
  Todo.findById(req.body.id, function (err, todo) {
    if (err)
      res.send(err);
    todo.finish = req.body.finish;
    todo.save(function (err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
  })
})

app.delete('/deleteTodo/:id', function (req, res) {
  console.log(req.params.id);
  Todo.findById(req.params.id, function (err, todo) {
    if (err){
      res.send(err)}
    todo.remove(function (err, result) {
      if (err){
        res.send(err)};
      res.json(result);
    });
  })
})

app.listen(process.env.PORT || 8080, function () {
  console.log("Listening")
});