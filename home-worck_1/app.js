const express = require('express');
const { engine } = require('express-handlebars');

const { PORT } = require('./config/config');
const carRouter = require('./routes/car.routers');
const logoutRouter = require('./routes/logout.router');
const userRouter = require('./routes/user.router');
const welcomeRouter = require('./routes/welcomepage.router');

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

app.listen(PORT, () => {
  console.log(`App listen ${PORT} port `);
});