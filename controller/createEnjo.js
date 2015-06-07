/**
 * Created by pro on 15/05/17.
 */

"use strict";

var util = require('util');
var path = require("path");
var fs = require("fs");

var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;

var tategaki = function (context, text, x, y, num) {
    var lineHeight = context.measureText("ん").width;
    Array.prototype.forEach.call(text, function (ch, j) {
        if (ch === 'ー' || ch === '－' || ch === '―') {
            context.fillText('｜', x - lineHeight * Math.floor(j / num) * 1.1, y + lineHeight * (j % num));
        } else if (ch === '、' || ch === '，' || ch === '。' || ch === '．' || ch === '.' || ch === ',') {
            context.fillText(ch, x - lineHeight * (Math.floor(j / num) - 0.6) * 1.1, y + lineHeight * (j % num - 0.6));
        } else {
            context.fillText(ch, x - lineHeight * Math.floor(j / num) * 1.1, y + lineHeight * (j % num));
        }
    });
};

var fontFile = function (name) {
    return path.join(__dirname, '/../.fonts/', name);
};

var drawedCanvas = function (baseImage, enjoMsg1, enjoMsg2) {
    var canvas = new Canvas(400, 595);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(baseImage, 0, 0);

    var yasashisaFont = new Font('07YasashisaAntique', fontFile('07YasashisaAntique.otf'));
    ctx.addFont(yasashisaFont);
    ctx.font = "20px 07YasashisaAntique";

    tategaki(ctx, enjoMsg1, 360, 43, 10);
    tategaki(ctx, enjoMsg2, 75, 43, 10);
    return canvas;
};

var sendImage = function (req, res) {
    fs.readFile(__dirname + "/../public/imgs/enjo.jpeg", function (err, squid) {
        if (err) { console.log(err); }
        var img = new Image;
        img.src = squid;

        var canvas = drawedCanvas(img, req.query.text1 || "", req.query.text2 || "");

        res.setHeader("Content-Type", "image/png");
        canvas.toBuffer(function (err, buf) {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.send(buf);
        });
    });
};

exports.init = function (req, res) {
    console.log("createEnjoのinit処理を開始します");
    sendImage(req, res);
};
