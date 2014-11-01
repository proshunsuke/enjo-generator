var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var twitterAPI = require('node-twitter-api');
var conf = require('config');
var methodOverride  = require("method-override");
var ECT = require('ect');
var multer = require('multer');
var fs = require("fs");



var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

var routes = require('./routes/index');
var users = require('./routes/users');
var apiTwitter = require('./routes/twitter'); //routes are defined here
var app = express();

var addr;
var twitter;

// view engine setup
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ dest: __dirname+'/public/imgs'}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser({keepExtensions: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', apiTwitter); //This is our route middleware



app.post("/test/twitter",function(req,res){

    console.log(req.files);
    console.dir(req.files);
    var old_path = req.files.image.path;
    var new_path = req.files.image.path + ".png";

    fs.rename(old_path, new_path, function(err){
        if(err){return err}

        var twitter = require.main.children[1].exports.twitterAPI;
        twitter.statuses("update_with_media", {
                media: [
                    new_path
                ],
                status: req.files.image.name
            },
            conf.twitter.accessToken,
            conf.twitter.accessTokenSecret,
            function(error, data, response) {
                if (data.errors) {
                    console.log("error:",data.errors);
                    res.json(data.errors);
                    // something went wrong
                } else {
                    console.log(data);
                    res.json({ message: 'twitter updated!' });
                    // data contains the data sent by twitter
                }
            }
        );
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    addr = add;
    //connect to our database
//Ideally you will obtain DB details from a config file
    var dbName = 'twitterDB';
    var connectionString = 'mongodb://'+addr+':27017/' + dbName;
    mongoose.connect(connectionString);

    // twitter api
    module.exports.twitterAPI= new twitterAPI({
        consumerKey: conf.twitter.consumerKey,
        consumerSecret: conf.twitter.consumerSecret,
        callback: 'http://' + addr
    });

});

module.exports = app;
