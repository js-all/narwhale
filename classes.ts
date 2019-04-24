class Area {
    camera: Camera;
    width: number;
    height: number;
    constructor(camera: Camera, width: number, height: number) {
        this.camera = camera;
        this.width = width;
        this.height = height
    }
}

class Camera {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Narwhale {
    skin: Skin;
    lvl: number;
    tuskLength: number;
    turnRate: number;
    stamina: number;
    staminaRegen: number;
    dashSpeed: number;
    constructor(skin: Skin) {
        this.skin = skin;
        this.lvl = 1;
        this.tuskLength = 1;
        this.turnRate = 1;
        this.stamina = 1;
        this.staminaRegen = 1000;
        this.dashSpeed = 5;
    }
}

enum SpeSkin {
    hotdog,
    trump
}

class Skin {
    color: String;
    speSkin: SpeSkin;
    constructor(color: String, speSkin: SpeSkin) {
        this.color = color;
        this.speSkin = speSkin;
    }
}

function rgb(r: number, g: number, b: number, a?: number) {
    let res = `(${r}, ${g}, ${b}`;
    let pre = `rgb` + a ? 'a' : '';
    let suf = a || `, ${a}` + ')';
    return pre + res + suf;

} 