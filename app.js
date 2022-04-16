const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const appError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('././routes/reviewRoutes');
const viewRouter = require('././routes/viewsRoutes');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));
app.use(helmet());
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 500,
  windowMS: 60 * 60 * 100,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/', viewRouter);
app.all('*', (req, res, next) => {
  next(new appError(`Can't find this ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);
module.exports = app;
