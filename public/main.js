const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Ball {
  width = 10;

  constructor(x, y) {
    this.position = { x, y };
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.width);
  }

  translate(x, y) {
    this.position.x += x;
    this.position.y += y;
  }

  foo(canvas) {
    if (this.position.y + this.width <= 0) {
      console.log("hit top");
    }
    if (this.position.y + this.width >= canvas.height) {
      console.log("hit bottom");
    }
  }
}

const b = new Ball(canvas.width / 2, canvas.height / 2);

ctx.fillRect(0, 0, canvas.width, canvas.height);
b.draw();

setInterval(() => {
  b.translate(1, 1);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  b.foo(canvas);
  b.draw();
}, 10);
