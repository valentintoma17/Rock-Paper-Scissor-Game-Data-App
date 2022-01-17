var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var querystring = require('querystring');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var app = express();
var router = express.Router();

const axios = require('axios');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
app.use(cors());

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/history', function (req, res) {
    var response = res;
    console.log("Server param is " + req.query.cursor);
    var url = 'https://bad-api-assignment.reaktor.com/rps/history';
    if (req.query.cursor) {
        url += "?cursor=" + req.query.cursor;
    }
    // response.json({"url is" : url});
    var body = axios
        .get(url, {})
        .then(res => {

            console.log(`statusCode: ${res.status}`)
            console.log(res.data);
            response.json(res.data);
        })
        .catch(error => {
            console.error(error)
        });
    console.log(body);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000, () => console.log("App server started..."));
module.exports = router;
