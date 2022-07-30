var express = require('express');
const cors=require('cors');
const bodyparser=require('body-parser')


require("firebase/firestore");
const config=require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');


var app = express();


app.set('view engine', 'jade');

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

app.listen(config.port,()=>console.log('App is listening on url http://localhost:8080 '+config.port))




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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
