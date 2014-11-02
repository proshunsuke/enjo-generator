/**
 * Created by shunsuke on 14/11/01.
 */
var Twitter = require('../models/twitter');
var express = require('express');
var conf = require('config');
var fs = require('fs');
var appMain = require.main.children[1];
var router = express.Router();

router.route('/twittera').get(function(req, res) {
    console.log(req);
    Twitter.find(function(err, data) {
        if (err) {
            return res.send(err);
        }
        var twitter = appMain.exports.twitterAPI;

        twitter.statuses("update", {
                //media: [
                //    //__dirname+'/../public/imgs/enjo.jpeg'
                //    //"http://cdn18.atwikiimg.com/pazdra/pub/icon/069.png"
                //],
                status: req.body
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
});

router.route("/twitter").post(function(req, res, next) {
    console.log(JSON.stringify(req.body));
    console.log("body: "+req.body);
    console.log("req: " + req);
    //var twitter = new Twitter(req.body);

    res.send({message: "メッセージ"});


    //twitter.save(function (err) {
    //    if (err) {
    //        return res.send(err);
    //    }
    //
    //    res.send({message: 'twitter Added'});
    //});
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
    console.log(req);
    console.log(req.params.id);
    console.log(req.files);
    for(var i in req.params.id){
        console.log(i);
    }
    var tmp_path = __dirname+'/../public/imgs/tmp/';
    // 実際のファイル置き場
    var target_path = __dirname+'/../public/imgs/target/';
    // ファイルを仮の場所から移します
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 仮ファイルを削除します
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            console.log("kokokiteru?");
            res.send('File uploaded to: ' + target_path + ' - ' + req.params.id.size + ' bytes');
        });
    });
    //Twitter.find(function(err, data) {
    //    if (err) {
    //        return res.send(err);
    //    }
    //    var twitter = appMain.exports.twitterAPI;
    //
    //    twitter.statuses("update_with_media", {
    //            media: [
    //                req.params.id
    //                //"http://cdn18.atwikiimg.com/pazdra/pub/icon/069.png"
    //            ],
    //            status: "media"
    //        },
    //        conf.twitter.accessToken,
    //        conf.twitter.accessTokenSecret,
    //        function(error, data, response) {
    //            if (data.errors) {
    //                console.log("error:",data.errors);
    //                res.json(data.errors);
    //                // something went wrong
    //            } else {
    //                console.log(error);
    //                console.log(data);
    //                res.json({ message: 'twitter updated!' });
    //                // data contains the data sent by twitter
    //            }
    //        }
    //    );
    //});

    //Twitter.findOne({ _id: req.params.id}, function(err, twitter) {
    //    if (err) {
    //        return res.send(err);
    //    }
    //
    //    res.json(twitter);
    //});
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