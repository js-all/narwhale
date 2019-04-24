const canvas = <HTMLCanvasElement>document.createElement('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
const cw :number = 1000;
const ch :number = 1000;
canvas.height = ch;
canvas.width = cw;

document.body.appendChild(canvas);

const narwhale = new Narwhale(new Skin(rgb(0, 5, 250), SpeSkin.noSpe), 100, 100);
//setInterval(() => narwhale.setAngle(narwhale.head.angle + Math.PI * 2 / 2500), 1000 / 2500);narwhale.f = 10
console.log(narwhale)
function draw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.translate(-(narwhale.x - 500),-( narwhale.y -500));
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
    if(window.innerHeight > window.innerWidth) {
        const diff = window.innerHeight - window.innerWidth;
        ctx.scale(diff / window.innerHeight + 1, 1);
    } else  {
        const diff = window.innerWidth - window.innerHeight;
        ctx.scale(1, diff / window.innerWidth + 1);
    }
}

ratio()

window.addEventListener('resize', ratio);
