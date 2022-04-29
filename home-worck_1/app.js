const express = require('express');
const { engine } = require('express-handlebars');
const DB = require('./dataBase/users')

const app = express();

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

app.get('/', (req, res) => {
  res.render('welcome')
});

app.get('/users', (req, res) => {
  res.json(DB.usersArr)
});

app.get('/users/:userIndex', (req, res) => {
  const { userIndex } = req.params;

  res.json(DB.usersArr[userIndex])
})

app.get('/cars', (req, res) => {
  res.json(DB.carsArr)
});

app.get('/cars/:carIndex', (req, res) => {
  const { carIndex } = req.params;

  res.json(DB.carsArr[carIndex])
});

app.get('/logout', (req, res) => {
  res.render('logout')
});

app.listen(5000, () => {
  console.log('App listen port 5000');
});