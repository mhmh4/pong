const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y) {
    this.position = { x, y };
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
  }

  translate(x, y) {
    this.position.x += x;
    this.position.y += y;
  }
}

const b = new Ball(10, 10);

ctx.fillRect(0, 0, canvas.width, canvas.height);
b.draw();

b.translate(100, 100);

setTimeout(() => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  b.draw();
}, 500);
