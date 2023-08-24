import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import pkg from 'express-handlebars';
import session from 'express-session';

/* Rutas */
import indexRouter from './app/routes/index.js';
import usersRouter from './app/routes/users.js';
import bootcampsRouter from './app/routes/bootcamps.js';

const app = express();
const { engine } = pkg;

/* Express-Session Config */
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

/* View Engine Setup */
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('views', path.join('app/views'));
app.set('partials', path.join('app/views/partials'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

/* Archivos estáticos */
app.use(express.static(path.join('node_modules/axios/dist')));
app.use(express.static(path.join('node_modules/bootstrap/dist')));
app.use(express.static(path.join('node_modules/toastr/build')));
app.use(express.static(path.join('node_modules/jquery/dist')));

/* Rutas */
app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/bootcamp', bootcampsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

export default app;