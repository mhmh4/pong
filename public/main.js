const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Ball {
  width = 10;

  speedX = 2;
  speedY = 2;

  constructor(x, y) {
    this.initialX = x;
    this.initialY = y;
    this.position = { x, y };
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.width);
  }

  translate() {
    this.position.x += this.speedX;
    this.position.y += this.speedY;
  }

  foo(canvas) {
    if (this.position.y + this.width <= 0) {
      console.log("hit top");
      this.speedY *= -1;
    }
    if (this.position.y + this.width >= canvas.height) {
      console.log("hit bottom");
      this.speedY *= -1;
    }
  }

  reset() {
    this.position.x = this.initialX;
    this.position.y = this.initialY;
  }

  bar(canvas) {
    if (
      this.position.x + this.width <= 0 ||
      this.position.x + this.width >= canvas.width
    ) {
      this.reset();
    }
  }
}

const b = new Ball(canvas.width / 2, canvas.height / 2);

ctx.fillRect(0, 0, canvas.width, canvas.height);
b.draw();

setInterval(() => {
  b.foo(canvas);
  b.bar(canvas);
  b.translate();

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  b.draw();
}, 10);
