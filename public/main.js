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
    if (this.position.y <= 0) {
      this.speedY *= -1;
    }
    if (this.position.y + this.width >= canvas.height) {
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

  baz(paddle) {
    if (
      this.position.x + this.width >= paddle.x &&
      this.position.x <= paddle.x + paddle.width &&
      this.position.y + this.width >= paddle.y &&
      this.position.y <= paddle.y + paddle.height
    ) {
      this.speedX *= -1;
    }
  }
}

class Paddle {
  speed = 0;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(canvas) {
    this.y += this.speed;
    this.y = Math.max(this.y, 0);
    this.y = Math.min(this.y, canvas.height - this.height);
  }
}

const b = new Ball(canvas.width / 2, canvas.height / 2);

const p1 = new Paddle(canvas.width / 10, (2 * canvas.height) / 3, 10, 100);
const p2 = new Paddle((9 * canvas.width) / 10, canvas.height / 3, 10, 100);

document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    p1.setSpeed(-10);
  }
  if (event.key === "s") {
    p1.setSpeed(10);
  }
  if (event.key === "k") {
    p2.setSpeed(-10);
  }
  if (event.key === "m") {
    p2.setSpeed(10);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    p1.setSpeed(0);
  }
  if (event.key === "s") {
    p1.setSpeed(0);
  }
  if (event.key === "k") {
    p2.setSpeed(0);
  }
  if (event.key === "m") {
    p2.setSpeed(0);
  }
});

let score1 = 0;
let score2 = 0;

ctx.font = "15px sans-serif";

function animate() {
  b.foo(canvas);
  b.bar(canvas);
  b.baz(p1);
  b.baz(p2);

  b.translate();
  p1.update(canvas);
  p2.update(canvas);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillText(score1, (1 * canvas.width) / 4, canvas.height / 10);
  ctx.fillText(score2, (3 * canvas.width) / 4, canvas.height / 10);

  b.draw();
  p1.draw();
  p2.draw();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
