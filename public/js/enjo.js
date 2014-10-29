/**
 * Created by shunsuke on 14/10/30.
 */
(function(window, Vue){
    'use strict';

    var img;
    var cvs;
    var ctx;

    window.enjo = new Vue({
        el: '#main',
        data: {
            enjoMsg1: "",
            enjoMsg2: ""
        },
        ready: function(){
            img = new Image();
            img.src = "/imgs/enjo.jpeg";
            cvs = document.getElementById('enjo-area');
            this.init();
        },
        methods: {
            init: function(){
                if(cvs.getContext){
                    ctx = cvs.getContext("2d");
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(0,0,cvs.width,cvs.height);
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.drawImage(img,0,0);
                }
            },
            // thanks to http://www55.atpages.jp/triplog/pg/monthly/1405/ra-men.js?0526
            tategaki: function(context,text,x,y,num){
                var lineHeight = context.measureText("ん").width;
                Array.prototype.forEach.call(text,function(ch,j){
                    if(ch==='ー'||ch==='－'||ch==='―')
                        context.fillText('｜', x-lineHeight*Math.floor(j/num)*1.1, y+lineHeight*(j%num));
                    else if(ch==='、'||ch==='，'||ch==='。'||ch==='．'||ch==='.'||ch===',')
                        context.fillText(ch, x-lineHeight*(Math.floor(j/num)-0.6)*1.1, y+lineHeight*(j%num-0.6));
                    else
                        context.fillText(ch, x-lineHeight*Math.floor(j/num)*1.1, y+lineHeight*(j%num));
                });
            },
            inputMsg1: function(){
                ctx.font = "20px 'YasashisaAntique'";
                this.tategaki(ctx,this.$data.enjoMsg1,360,43,11);
            },
            inputMsg2: function(){
                ctx.font = "20px 'YasashisaAntique'";
                this.tategaki(ctx,this.$data.enjoMsg2,70,43,11);
            },
            inputMsg: function(){
                this.init();
                this.inputMsg1();
                this.inputMsg2();
            },
            allDelete: function(){
                this.init();
                this.$data.enjoMsg1 = "";
                this.$data.enjoMsg2 = "";
            },
            inputOrigin: function(){
                this.$data.enjoMsg1 = "今日のゼミは　　　　　絶対炎上しないよ！";
                this.$data.enjoMsg2 = "もし炎上したら　　　　木の下に埋めて貰っても構わないよ";
                this.inputMsg();
            },
            save: function(){
                this.saveBlob(this.dataUrlToBlob(cvs.toDataURL()),'enjo.png');
            },
            // thanks to http://www55.atpages.jp/triplog/pg/monthly/1405/ra-men.js?0526
            saveBlob: function(blob, name){
//     var url = parent.URL || parent.webkitURL,
                var url = window.URL || window.webkitURL,
                    objectUrl = url.createObjectURL(blob),
                    e = new Event('click'),
                    el = document.createElement('a');
                el.href = objectUrl;
                el.download = name;
                el.dispatchEvent(e);
            },
            // thanks to http://www55.atpages.jp/triplog/pg/monthly/1405/ra-men.js?0526
            dataUrlToBlob: function(dataUrl){
                var splitted = dataUrl.split(','),
                    byteString = atob(splitted[1]),
                    mimeString = splitted[0].split(':')[1].split(';')[0],
                    ab = new ArrayBuffer(byteString.length),
                    ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], { type: mimeString });
            }
        }
    });

})(window,Vue);