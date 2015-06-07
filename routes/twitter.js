/**
 * Created by pro on 15/06/07.
 */
"use strict";

var express = require('express');
var fs = require("fs");
var router = express.Router();

router.post("/doTweet/", function (req, res) {
    console.dir(req.files);
    var old_path = req.files.image.path;
    var new_path = req.files.image.path + ".png";
    fs.rename(old_path, new_path, function (err) {
        if (err) {
            return err;
        }
        var twitter = require.main.children[1].exports.twitterAPI;
        twitter.statuses("update_with_media", {
            media: [
                new_path
            ],
            status: ""
        },
            req.app.get('options').token,
            req.app.get('options').token_secret,
            function (error, data, response) {
                if (data.errors) {
                    console.log("error:", data.errors);
                    res.json(data.errors);
                } else {
                    console.log(data);
                    res.json({imgURL: data.text});
                }
                fs.unlink(new_path, function (err) {
                    if (err) {
                        return err;
                    }
                });
            }
            );
    });
});

module.exports = router;
