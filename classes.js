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
    function Narwhale(skin) {
        this.skin = skin;
        this.lvl = 1;
        this.tuskLength = 1;
        this.turnRate = 1;
        this.stamina = 1;
        this.staminaRegen = 1000;
        this.dashSpeed = 5;
    }
    return Narwhale;
}());
var SpeSkin;
(function (SpeSkin) {
    SpeSkin[SpeSkin["hotdog"] = 0] = "hotdog";
    SpeSkin[SpeSkin["trump"] = 1] = "trump";
})(SpeSkin || (SpeSkin = {}));
var Skin = /** @class */ (function () {
    function Skin(color, speSkin) {
        this.color = color;
        this.speSkin = speSkin;
    }
    return Skin;
}());
function rgb(r, g, b, a) {
    var res = "(" + r + ", " + g + ", " + b;
    var pre = "rgb" + a ? 'a' : '';
    var suf = a || ", " + a + ')';
    return pre + res + suf;
}
