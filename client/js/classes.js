"use strict";
var Area = /** @class */ (function () {
    function Area(camera, width, height) {
        this.camera = camera;
        this.width = width;
        this.height = height;
    }
    return Area;
}());
var Camera = /** @class */ (function () {
    function Camera(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Camera;
}());
var Narwhale = /** @class */ (function () {
    function Narwhale(skin, x, y) {
        this.skin = skin;
        this.lvl = 1;
        this.tuskLength = 1;
        this.turnRate = 1;
        this.stamina = 1;
        this.staminaRegen = 1000;
        this.dashSpeed = 5;
        this.parts = [];
        this.head = { angle: 0 };
        this.x = x;
        this.y = y;
        this.f = 0;
        for (var _i = 0, _a = new Array(Narwhale.NARWHALE_LENGTH); _i < _a.length; _i++) {
            var i = _a[_i];
            this.parts.push({ angle: 0 });
        }
    }
    Narwhale.prototype.setAngle = function (angle) {
        angle = angle > Math.PI * 2 ? angle - 2 * Math.PI : angle;
        var a = this.head.angle - angle;
        /*for (let i of this.parts) {
            a = a / 2;
            i.angle = a > 0 ? a : -a;
        }*/
        this.head.angle = angle;
    };
    Narwhale.prototype.draw = function (ctx) {
        var pi = Math.PI;
        var rotate = function (x, y, angle) {
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.translate(-x, -y);
        };
        ctx.fillStyle = this.skin.color;
        var index = 0;
        var angle = this.head.angle;
        var height = 40 - (30 / (Narwhale.NARWHALE_LENGTH - 1));
        var xp = this.x;
        var yp = this.y;
        for (var _i = 0, _a = [this.head].concat(this.parts); _i < _a.length; _i++) {
            var i = _a[_i];
            angle += i.angle;
            if (!index) {
                ctx.save();
                rotate(this.x, this.y, angle);
                ctx.beginPath();
                ctx.arc(this.x, this.y, 20, -(pi / 2), pi / 2);
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.moveTo(this.x + 20, this.y - 5);
                ctx.lineTo(this.x + 120, this.y);
                ctx.lineTo(this.x + 20, this.y + 5);
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
                index++;
                continue;
            }
            var width = 10;
            var f = function (a, b, c, d, e, f, g, h) { return a + ((b * h(c + pi)) * ((c % (Math.PI * 2)) >= d && (c % (Math.PI * 2)) <= e ? f : g)); };
            var xt = [1, 1];
            var yt = [1, 1];
            var xf = Math.cos;
            var yf = Math.sin;
            var x = index == 1
                ? f(xp, width, angle, -(pi / 2), pi / 2, xt[0], xt[1], xf)
                : f(xp, width / 2, angle, -(pi / 2), pi / 2, xt[0], xt[1], xf);
            var y = index == 1
                ? f(yp, width, angle, 0, pi, yt[0], yt[1], yf)
                : f(yp, width / 2, angle, 0, pi, yt[0], yt[1], yf);
            var x2 = x + width / 2;
            var y2 = y - height / 2;
            xp = x;
            yp = y;
            // -----------------------------------------
            ctx.save();
            rotate(x, y, angle);
            if (index == Narwhale.NARWHALE_LENGTH) {
                ctx.beginPath();
                ctx.moveTo(x + width / 2 - 5, y - 10);
                ctx.lineTo(x + width, y - 5);
                ctx.lineTo(x + width, y + 5);
                ctx.lineTo(x + width / 2 - 5, y + 10);
                ctx.fill();
                ctx.closePath();
            }
            else {
                ctx.beginPath();
                ctx.moveTo(x2, y2 - (30 / (Narwhale.NARWHALE_LENGTH - 1)) / 2);
                ctx.lineTo(x2 + width / 2, y2);
                ctx.lineTo(x2 + width, y2);
                ctx.lineTo(x2 + width, y2 + height);
                ctx.lineTo(x2 + width / 2, y2 + height);
                ctx.lineTo(x2, y2 + height - (30 / (Narwhale.NARWHALE_LENGTH - 1)) / 2);
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
            ctx.restore();
            index++;
            height -= (30 / (Narwhale.NARWHALE_LENGTH - 1));
        }
    };
    Narwhale.prototype.move = function () {
        this.y += Math.sin(this.head.angle) * this.f;
        this.x += Math.cos(this.head.angle) * this.f;
        var ch = (2 * Math.PI * (1 / 128)) / 4 * this.turnRate * (this.f / 10);
        var angle = this.head.angle;
        for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
            var i = _a[_i];
            if (Math.abs(i.angle) > ch) {
                //i.angle += (i.angle > 0 ? -1 : 1) * ch;
                i.angle = 0;
                break;
            }
            else {
                i.angle = 0;
            }
            ch = ch / 1.02;
            angle += i.angle;
        }
    };
    Narwhale.NARWHALE_LENGTH = 40;
    return Narwhale;
}());
var SpeSkin;
(function (SpeSkin) {
    SpeSkin[SpeSkin["hotdog"] = 0] = "hotdog";
    SpeSkin[SpeSkin["trump"] = 1] = "trump";
    SpeSkin[SpeSkin["noSpe"] = 2] = "noSpe";
})(SpeSkin || (SpeSkin = {}));
var Skin = /** @class */ (function () {
    function Skin(color, speSkin) {
        this.color = color;
        this.speSkin = speSkin;
    }
    Skin.prototype.applyToParts = function (parts) {
    };
    return Skin;
}());
function rgb(r, g, b, a) {
    if (a === void 0) { a = 1; }
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
