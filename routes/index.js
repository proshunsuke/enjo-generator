"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (res) {
    require('dns').lookup(require('os').hostname(), function (add) {
        res.render('index', { url: add });
    });
});

module.exports = router;
