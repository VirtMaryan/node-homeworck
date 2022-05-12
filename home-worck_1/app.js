const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { PORT, MONGO_DB_URL } = require('./config/config');
const { carRouter, logoutRouter, userRouter, welcomeRouter } = require('./routes');
const { ApiError } = require('./error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

app.use('/', welcomeRouter);
app.use('/cars', carRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next) {
  next(new ApiError('Not found', 404));
}

function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status
    });
}

mongoose.connect(MONGO_DB_URL).then(() => {
  console.log(`Connection to ${MONGO_DB_URL} successfully`);
});

app.listen(PORT, () => {
  console.log(`App listen ${PORT} port `);
})
