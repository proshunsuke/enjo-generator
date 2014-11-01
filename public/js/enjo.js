/**
 * Created by shunsuke on 14/10/30.
 */
(function(window, $, Vue){
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
                this.tategaki(ctx,this.$data.enjoMsg1,360,43,10);
            },
            inputMsg2: function(){
                ctx.font = "20px 'YasashisaAntique'";
                this.tategaki(ctx,this.$data.enjoMsg2,75,43,10);
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
                this.$data.enjoMsg1 = "今日のゼミは　　　　絶対炎上しないよ！";
                this.$data.enjoMsg2 = "もし炎上したら　　　木の下に埋めて貰っても構わないよ";
                this.inputMsg();
            },
            // thanks to http://jsdo.it/Yukisuke/p311
            ArraytoBlob: function(_mime,_array)
            {
                // ArrayBufferやUint8Arrayなら入れなおす工数がなくなります
                var arr = new Uint8Array(_array.length);
                for (var i = 0; i < _array.length; i++) {arr[i] = _array[i];}

                var blob = new Blob([arr], { type: _mime });
                return blob;
            },
            // thanks to http://jsdo.it/Yukisuke/p311
            saveBlob: function(_blob,_file)
            {
                if( /*@cc_on ! @*/ false )
                {	// IEの場合
                    window.navigator.msSaveBlob(_blob, _file);
                }
                else
                {
                    var url = (window.URL || window.webkitURL);
                    var data = url.createObjectURL(_blob);
                    var e = document.createEvent("MouseEvents");
                    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                    a.href = data;
                    a.download = _file;
                    console.log(a);
                    a.dispatchEvent(e);
                }
            },
            // thanks to http://jsdo.it/Yukisuke/p311
            Base64toBlob: function(_base64)
            {
                var i;
                var tmp = _base64.split(',');
                var data = atob(tmp[1]);
                var mime = tmp[0].split(':')[1].split(';')[0];

                //var buff = new ArrayBuffer(data.length);
                //var arr = new Uint8Array(buff);
                var arr = new Uint8Array(data.length);
                for (i = 0; i < data.length; i++) {arr[i] = data.charCodeAt(i);}
                var blob = new Blob([arr], { type: mime });
                return blob;
            },
            // thanks to http://jsdo.it/Yukisuke/p311
            save: function(){
                var base64 = cvs.toDataURL();    // firfoxならtoblobで直接blobにして保存できます。
                var blob = this.Base64toBlob(base64);
                this.saveBlob(blob,"enjo.png");
            },
            uploadImage: function(){
                var base64 = cvs.toDataURL();    // firfoxならtoblobで直接blobにして保存できます。
                var blob = this.Base64toBlob(base64);
                var fd = new FormData();
                console.log(blob);
                fd.append("image", blob);
                $.ajax({
                    url: '/test/twitter/',
                    method: "POST",
                    xhr2: true,
                    data: fd,
                    processData: false,
                    contentType: false,
                    done: function(data){
                        console.log("data: "+data);
                    }
                });
            }
        }
    });

})(window,jQuery,Vue);