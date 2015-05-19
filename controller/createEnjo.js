/**
 * Created by pro on 15/05/17.
 */

var util = require('util');
var conf = require('config');

var Canvas = require('canvas');
var Image = Canvas.Image;
var canvas = new Canvas(400, 595);
var ctx = canvas.getContext('2d');


exports.init = function(req, res, fs){
    console.log("createEnjoのinit処理を開始します");
    //console.log(util.inspect("aaa"));
    drawImg(req, res, fs);
};

var drawImg = function (req, res, fs) {
    fs.readFile(__dirname + "/../public/imgs/enjo.jpeg", function (err, squid) {
        var img = new Image;
        img.src = squid;
        ctx.drawImage(img, 0, 0);

        console.log(req.query.text1);

        // ここからベタ書き
        console.log("てきすと：　"+req.query.text1);
        var enjoMsg1 = req.query.text1;
        var enjoMsg2 = req.query.text2;

        // font
        var Font = Canvas.Font;
        var yasashisaFont = new Font('07YasashisaAntique', fontFile('07YasashisaAntique.otf'));
        ctx.addFont(yasashisaFont);

        ctx.font = "20px yasashisaFont";
        tategaki(ctx,enjoMsg1,360,43,10);
        tategaki(ctx,enjoMsg2,75,43,10);

        // ここからは、出来上がった画像をツイートする処理
        var new_path = __dirname + '/../public/imgs/image-src.png';
        var out = fs.createWriteStream(new_path);
        var stream = canvas.createPNGStream();
        stream.on('data', function (chunk) {
            out.write(chunk);
        });
        setTimeout(function(){
            var twitter = require.main.children[1].exports.twitterAPI;
            twitter.statuses("update_with_media", {
                    media: [
                        new_path
                    ],
                    status: ""
                },
                conf.twitter.accessToken,
                conf.twitter.accessTokenSecret,
                function (error, data, response) {

                    if (data.errors) {
                        console.log("error:", data.errors);
                        res.json(data.errors);
                        // something went wrong
                    } else {
                        console.log(data);
                        res.json({imgURL: data.text});
                        // data contains the data sent by twitter
                    }
                    fs.unlink(new_path, function (err) {
                        if (err) {
                            return err
                        }
                    });
                }
            );
        },3000);

        // ここまでベタ書き

        //res.send('<img src="' + canvas.toDataURL() + '" />');
    });
};

function tategaki(context,text,x,y,num){
    var lineHeight = context.measureText("ん").width;
    Array.prototype.forEach.call(text,function(ch,j){
        if(ch==='ー'||ch==='－'||ch==='―')
            context.fillText('｜', x-lineHeight*Math.floor(j/num)*1.1, y+lineHeight*(j%num));
        else if(ch==='、'||ch==='，'||ch==='。'||ch==='．'||ch==='.'||ch===',')
            context.fillText(ch, x-lineHeight*(Math.floor(j/num)-0.6)*1.1, y+lineHeight*(j%num-0.6));
        else
            context.fillText(ch, x-lineHeight*Math.floor(j/num)*1.1, y+lineHeight*(j%num));
    });
}

function fontFile(name) {
    return path.join(__dirname, '/../.fonts/', name);
}
