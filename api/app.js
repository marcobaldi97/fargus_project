var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");//Creo el router que voy a probar.
var publicationsRouter = require("./routes/publications")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Debajo de esta linea es donde debo pegar las nuevas direcciones X que haga en /routes . Ej.: /routes/X.js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/publications", publicationsRouter);
app.use("/publications/publish/", publicationsRouter);
app.use("/publications/list/", publicationsRouter);
app.use("/publications/deletePost/", publicationsRouter);
app.use("/publications/viewSinglePost/", publicationsRouter);
app.use("/publications/viewSinglePostResponses/", publicationsRouter);
//---------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
