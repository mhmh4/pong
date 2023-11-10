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

const b = new Ball(canvas.width / 2, canvas.height / 2);

ctx.fillRect(0, 0, canvas.width, canvas.height);
b.draw();

setInterval(() => {
  b.translate(1, 1);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  b.draw();
}, 10);
