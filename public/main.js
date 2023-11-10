const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function getRandomNonZeroIntInclusive(min, max) {
  let number;

  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (number === 0);

  return number;
}

class Ball {
  width = 10;

  speedX = getRandomNonZeroIntInclusive(-3, 3);
  speedY = getRandomNonZeroIntInclusive(-3, 3);

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

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    this.y -= 20;
  }

  moveDown() {
    this.y += 20;
  }
}

const b = new Ball(canvas.width / 2, canvas.height / 2);

const p1 = new Paddle(canvas.width / 10, (2 * canvas.height) / 3, 10, 100);
const p2 = new Paddle((9 * canvas.width) / 10, canvas.height / 3, 10, 100);

ctx.fillRect(0, 0, canvas.width, canvas.height);
b.draw();

document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    p1.moveUp();
  }
  if (event.key === "s") {
    p1.moveDown();
  }
  if (event.key === "k") {
    p2.moveUp();
  }
  if (event.key === "m") {
    p2.moveDown();
  }
});

setInterval(() => {
  b.foo(canvas);
  b.bar(canvas);
  b.translate();

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  b.draw();
  p1.draw();
  p2.draw();
}, 10);
