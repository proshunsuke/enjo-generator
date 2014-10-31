/**
 * Created by shunsuke on 14/11/01.
 */
var Twitter = require('../models/twitter');
var express = require('express');
var twitterAPI = require.main.children[1];
var router = express.Router();

router.route('/twitter')
    .get(function(req, res) {
        Twitter.find(function(err, data) {
            if (err) {
                return res.send(err);
            }

            //res.json(twitter);
            console.log(twitterAPI.exports.twitterAPI);
            res.json(twitterAPI.exports.twitterAPI);
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