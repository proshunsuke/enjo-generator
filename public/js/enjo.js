/**
 * Created by shunsuke on 14/10/30.
 */
(function(window, Vue){
    'use strict';

    var img;

    window.enjo = new Vue({
        el: '#main',
        data: {
            enjoMesg1: "",
            enjoMesg2: ""
        },
        ready: function(){
            img = new Image();
            img.src = "/imgs/enjo.jpeg";
            (new Taketori()).set({fontFamily: "serif", height: "auto"}).element("tes").toVertical();
            this.init();
        },
        methods: {
            init: function(){
                var cvs = document.getElementById('enjo-area');
                if(cvs.getContext){
                    var ctx = cvs.getContext("2d");
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(0,0,cvs.width,cvs.height);
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.drawImage(img,0,0);

                }
            }
        }
    });

})(window,Vue);