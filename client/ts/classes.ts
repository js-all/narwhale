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

interface Part {
    angle: number
}

class Narwhale {
    static NARWHALE_LENGTH = 40;
    skin: Skin;
    lvl: number;
    tuskLength: number;
    turnRate: number;
    stamina: number;
    staminaRegen: number;
    dashSpeed: number;
    parts: Part[];
    head: Part;
    x: number;
    y: number;
    f: number;
    setAngle(angle: number) {
        angle = angle > Math.PI * 2 ? angle - 2 * Math.PI : angle;
        let a = this.head.angle - angle;
        /*for (let i of this.parts) {
            a = a / 2;
            i.angle = a > 0 ? a : -a;
        }*/
        this.head.angle = angle;
    }
    constructor(skin: Skin, x: number, y: number) {
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
        for (let i of new Array(Narwhale.NARWHALE_LENGTH)) {
            this.parts.push({ angle: 0 });
        }

    }
    draw(ctx: CanvasRenderingContext2D) {
        const pi = Math.PI;
        const rotate = (x: number, y: number, angle: number) => {
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.translate(-x, -y);
        }
        ctx.fillStyle = this.skin.color;
        let index = 0;
        let angle: number = this.head.angle;
        let height = 40 - (30 / (Narwhale.NARWHALE_LENGTH - 1));
        let xp = this.x;
        let yp = this.y;
        for (let i of [this.head, ...this.parts]) {
            angle += i.angle;
            if (!index) {
                ctx.save()
                rotate(this.x, this.y, angle);
                ctx.beginPath();
                ctx.arc(this.x, this.y, 20, -(pi / 2), pi / 2)
                ctx.fill();
                ctx.closePath();
                ctx.fillStyle = 'black';
                ctx.beginPath()
                ctx.moveTo(this.x + 20, this.y - 5)
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
            const width = 10;
            const f = (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h :Function) => a + ((b * h(c + pi)) * ((c % (Math.PI * 2)) >= d && (c % (Math.PI * 2)) <= e ? f : g))
            const xt : [number, number] = [1, 1];
            const yt : [number, number] = [1, 1];
            const xf = Math.cos;
            const yf = Math.sin;
            const x = index == 1
                ? f(xp, width, angle, -(pi / 2), pi / 2, xt[0], xt[1], xf)
                : f(xp, width / 2, angle, -(pi / 2), pi / 2, xt[0], xt[1], xf);
            const y = index == 1
                ? f(yp, width, angle, 0, pi, yt[0], yt[1], yf)
                : f(yp, width / 2, angle, 0, pi, yt[0], yt[1], yf);
            const x2 = x  +  width/ 2
            const y2 = y - height / 2;
            xp = x
            yp = y
            // -----------------------------------------
            ctx.save();
            rotate(x, y, angle);
            if(index == Narwhale.NARWHALE_LENGTH) {
                ctx.beginPath();
                ctx.moveTo(x + width / 2 - 5, y - 10);
                ctx.lineTo(x + width, y -5);
                ctx.lineTo(x + width, y +5);
                ctx.lineTo(x + width / 2 - 5, y + 10)
                ctx.fill();
                ctx.closePath()
            } else {
                ctx.beginPath()
                ctx.moveTo(x2, y2 - (30 / (Narwhale.NARWHALE_LENGTH - 1)) / 2)
                ctx.lineTo(x2 + width / 2, y2);
                ctx.lineTo(x2 + width, y2 )
                ctx.lineTo(x2 + width, y2 + height)
                ctx.lineTo(x2 + width / 2, y2 + height) 
                ctx.lineTo(x2, y2 + height - (30 / (Narwhale.NARWHALE_LENGTH - 1)) / 2);
                ctx.fill()
                ctx.closePath()
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
    }
    move() {
        this.y += Math.sin(this.head.angle) * this.f;
        this.x += Math.cos(this.head.angle) * this.f;
        let ch = (2 * Math.PI * (1 / 128)) / 4 * this.turnRate * (this.f / 10);
        let angle = this.head.angle;
        for (let i of this.parts) {
            if (Math.abs(i.angle) > ch) {
                //i.angle += (i.angle > 0 ? -1 : 1) * ch;
                i.angle = 0;
                break;
            } else {
                i.angle = 0;
            }
            ch = ch / 1.02;
            angle += i.angle;
        }

    }
}

enum SpeSkin {
    hotdog,
    trump,
    noSpe
}

class Skin {
    color: string;
    speSkin: SpeSkin;
    constructor(color: string, speSkin: SpeSkin) {
        this.color = color;
        this.speSkin = speSkin;
    }
    applyToParts(parts: Part[]) {

    }
}

function rgb(r: number, g: number, b: number, a: number = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
} 