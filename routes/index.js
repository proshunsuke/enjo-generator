var express = require('express');
var conf = require('config');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        res.render('index', { url: add });
    });

});

module.exports = router;
