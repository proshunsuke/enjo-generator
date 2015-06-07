"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twitterAPI = require('node-twitter-api');
var methodOverride  = require("method-override");
var ECT = require('ect');
var multer = require('multer');
var fs = require("fs");

// ルーティング
var routes = require('./routes/index');
var twitter = require('./routes/twitter');
var api = require('./routes/api');

var app = express();

// 環境変数から Titter アプリケーションのキー等を取得
var options = {
    key: process.env.TWIBOT_TWITTER_KEY,
    secret: process.env.TWIBOT_TWITTER_SECRET,
    token: process.env.TWIBOT_TWITTER_TOKEN,
    token_secret: process.env.TWIBOT_TWITTER_TOKEN_SECRET
};
app.set('options', options);

var addr;

var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ dest: __dirname + '/public/imgs'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.fonts')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/twitter/', twitter);
app.use('/api/', api);

// catch 404 and forward to error handler
app.use(function (next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

require('dns').lookup(require('os').hostname(), function (add) {
    addr = add;
    module.exports.twitterAPI = new twitterAPI({
        consumerKey: app.get('options').key,
        consumerSecret: app.get('options').secret,
        callback: 'http://' + addr
    });
});

module.exports = app;
