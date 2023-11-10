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
}

ctx.fillRect(0, 0, canvas.width, canvas.height);

const b = new Ball(10, 10);
b.draw();
