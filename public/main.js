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

  bar(canvas, score1, score2) {
    if (this.position.x + this.width <= 0) {
      score2++;
      this.reset();
    }

    if (this.position.x + this.width >= canvas.width) {
      score1++;
      this.reset();
    }

    return [score1, score2];
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

const keysPressed = {
  p1: {},
  p2: {},
};

document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    keysPressed.p1.w = true;
    p1.setSpeed(keysPressed.p1.s ? 0 : -10);
  }
  if (event.key === "s") {
    keysPressed.p1.s = true;
    p1.setSpeed(keysPressed.p1.w ? 0 : 10);
  }
  if (event.key === "k") {
    keysPressed.p2.k = true;
    p2.setSpeed(keysPressed.p2.m ? 0 : -10);
  }
  if (event.key === "m") {
    keysPressed.p2.m = true;
    p2.setSpeed(keysPressed.p2.k ? 0 : 10);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    keysPressed.p1.w = false;
    p1.setSpeed(keysPressed.p1.s ? 10 : 0);
  }
  if (event.key === "s") {
    keysPressed.p1.s = false;
    p1.setSpeed(keysPressed.p1.w ? -10 : 0);
  }
  if (event.key === "k") {
    keysPressed.p2.k = false;
    p2.setSpeed(keysPressed.p2.m ? 10 : 0);
  }
  if (event.key === "m") {
    keysPressed.p2.m = false;
    p2.setSpeed(keysPressed.p2.k ? -10 : 0);
  }
});

function drawDashedLine() {
  ctx.fillStyle = "#fff";
  let rectangleWidth = 2;
  for (let s = 0; s < canvas.height; s += 10) {
    ctx.fillRect(
      canvas.width / 2 - rectangleWidth / 2,
      s,
      rectangleWidth,
      2 * rectangleWidth
    );
  }
}

let score1 = 0;
let score2 = 0;

ctx.font = "15px sans-serif";

function animate() {
  b.foo(canvas);
  [score1, score2] = b.bar(canvas, score1, score2);
  b.baz(p1);
  b.baz(p2);

  b.translate();
  p1.update(canvas);
  p2.update(canvas);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawDashedLine();

  ctx.fillStyle = "#fff";
  ctx.fillText(score1, (1 * canvas.width) / 4, canvas.height / 10);
  ctx.fillText(score2, (3 * canvas.width) / 4, canvas.height / 10);

  b.draw();
  p1.draw();
  p2.draw();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
