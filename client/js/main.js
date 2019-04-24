"use strict";
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var cw = 1000;
var ch = 1000;
canvas.height = ch;
canvas.width = cw;
document.body.appendChild(canvas);
var narwhale = new Narwhale(new Skin(rgb(0, 5, 250), SpeSkin.noSpe), 100, 100);
//setInterval(() => narwhale.setAngle(narwhale.head.angle + Math.PI * 2 / 2500), 1000 / 2500);narwhale.f = 10
console.log(narwhale);
function draw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.translate(-(narwhale.x - 500), -(narwhale.y - 500));
    narwhale.draw(ctx);
    ctx.restore();
}
function play() {
    narwhale.move();
}
draw.rate = 30;
play.rate = 60;
draw.interval = setInterval(draw, 1000 / draw.rate);
play.interval = setInterval(play, 1000 / play.rate);
function ratio() {
    if (window.innerHeight > window.innerWidth) {
        var diff = window.innerHeight - window.innerWidth;
        ctx.scale(diff / window.innerHeight + 1, 1);
    }
    else {
        var diff = window.innerWidth - window.innerHeight;
        ctx.scale(1, diff / window.innerWidth + 1);
    }
}
ratio();
window.addEventListener('resize', ratio);
