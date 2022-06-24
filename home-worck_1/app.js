require('module-alias/register');
const express = require('express');
const http = require('http');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const socketIO = require('socket.io');

dotenv.config();

const cronRun = require('./cron');
const swaggerJSON = require('./swagger.json');
const { PORT, MONGO_DB_URL, NODE_ENV } = require('./config/config');
const { carRouter, logoutRouter, userRouter, welcomeRouter, authRouter, socketRouter } = require('./routes');
const { ApiError } = require('@error');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket) => socketRouter(io, socket));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

app.use(fileUpload({}));

if (NODE_ENV === 'local') {
  const morgan = require('morgan');

  app.use(morgan('dev'));
}

app.use('/', welcomeRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use('*', _notFoundHandler);
app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next) {
  next(new ApiError('Not found', 404));
}

// eslint-disable-next-line no-unused-vars
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

server.listen(PORT, () => {
  console.log(`App listen ${PORT} port `);

  cronRun();
})
