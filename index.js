/**
 * Created by Administrator on 2018/3/1.
 */
window.onload = function () {
    var oImg = document.getElementById('img');
    var aImg = document.getElementsByTagName('img');
    var x = 0;
    var oLastImg = oImg;
    var timer = null;
    var iSpeed = 0;
    var lastX = 0;

    for(var i=1; i<77; i++) {
        /* var oImg = new Image();
         oImg.src = 'img/miaov%20(' + i + ').jpg';
         var oNewImg = document.createElement('img');
         oImg.onload = function () {
         oNewImg.src = this.src;           //这样的话，不知道oNewImg是哪一个oNewImage
         }
         oNewImg.style.display = 'none';
         document.body.appendChild(oNewImg);*/
        (function (oNewImg) {
            var oImg = new Image();
            oImg.src = 'img/miaov%20(' + i + ').jpg';
            oImg.onload = function () {
                oNewImg.src = this.src;
            }
            oNewImg.style.display = 'none';
            document.body.appendChild(oNewImg);
        })(document.createElement('img'));
    }

    document.onmousedown = function (ev) {
        var oEvent = ev || event;
        var disX = oEvent.clientX - x;
        clearInterval(timer);

        document.onmousemove = function (ev) {
            var oEvent = ev || event;
            x = oEvent.clientX - disX;
            move();
            iSpeed = x - lastX;
            lastX = x;

//                    oImg.src = 'img/miaov%20(' + l + ').jpg';
            return false;
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            timer = setInterval(function () {
                x = x + iSpeed;
                move();
            }, 30);


        }

        function move() {
            if(iSpeed >0) {
                iSpeed--;
            } else {
                iSpeed++;
            }
            if(iSpeed==0) {
                clearInterval(timer);
            }
            var l = parseInt(-x/10);              //让图片不要换的那么快
            if (l > 0) {
                l = l%77;
            } else {
                l=l+-Math.floor(l/77)*77;
            }
            if(oLastImg != aImg[l]) {           //x在0-9范围内，图片都是不变的，所以不能让同一张图片来回切换
                oLastImg.style.display = 'none';
                aImg[l].style.display = 'block';
                oLastImg = aImg[l];
            }
        }
        return false;
    };



}