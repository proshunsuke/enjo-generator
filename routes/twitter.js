/**
 * Created by shunsuke on 14/11/01.
 */
var Twitter = require('../models/twitter');
var express = require('express');
var conf = require('config');
var appMain = require.main.children[1];
var router = express.Router();

router.route('/twitter')
    .get(function(req, res) {
        Twitter.find(function(err, data) {
            if (err) {
                return res.send(err);
            }
            //console.log(require.main.children);

            var twitter = appMain.exports.twitterAPI;

            twitter.statuses("update_with_media", {
                    media: [
                        __dirname+'/../public/imgs/enjo.jpeg'
                        //"http://cdn18.atwikiimg.com/pazdra/pub/icon/069.png"
                    ],
                    status: "Hello world!asdfadsfdsdfddddddfadsfa"+Math.random()
                },
                conf.twitter.accessToken,
                conf.twitter.accessTokenSecret,
                function(error, data, response) {
                    if (data.errors) {
                        console.log("error:",data.errors);
                        res.json(data.errors);
                        // something went wrong
                    } else {
                        console.log(error);
                        console.log(data);
                        res.json(response);
                        // data contains the data sent by twitter
                    }
                }
            );
        });
    }).post(function(req, res) {
        var twitter = new Twitter(req.body);

        twitter.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'twitter Added'});
        });
    });

router.route('/twitter/:id').put(function(req,res){
    Twitter.findOne({ _id: req.params.id }, function(err, twitter) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            twitter[prop] = req.body[prop];
        }

        // save the movie
        twitter.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'twitter updated!' });
        });
    });
});

router.route('/twitter/:id').get(function(req, res) {
    Twitter.findOne({ _id: req.params.id}, function(err, twitter) {
        if (err) {
            return res.send(err);
        }

        res.json(twitter);
    });
});

router.route('/twitter/:id').delete(function(req, res) {
    Twitter.remove({
        _id: req.params.id
    }, function(err, twitter) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;