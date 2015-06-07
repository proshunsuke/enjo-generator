/**
 * Created by pro on 15/06/07.
 */
"use strict";

var express = require('express');

var createEnjo = require('../controller/createEnjo');
var router = express.Router();

router.get("/create-enjo", function (req, res) {
    console.log("炎上画像作成を開始します");
    createEnjo.init(req, res);
});

module.exports = router;
