/**
 * Created by shunsuke on 14/11/01.
 */
var Twitter = require('../models/twitter');
var express = require('express');
var conf = require('config');
var twitterAPI = require.main.children[1];
var router = express.Router();

router.route('/twitter')
    .get(function(req, res) {
        Twitter.find(function(err, data) {
            if (err) {
                return res.send(err);
            }

            var twitter = twitterAPI.exports.twitterAPI;
            twitter.statuses("update", {
                    status: "Hello world!",
                    media: [
                        "path_to_file1",
                        "path_to_file2",
                        stream
                    ]
                },
                conf.twitter.accessToken,
                conf.twitter.accessTokenSecret,
                function(error, data, response) {
                    if (error) {
                        console.log(error);
                        res.json(error);
                        // something went wrong
                    } else {
                        console.log(response);
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