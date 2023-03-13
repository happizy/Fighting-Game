const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const player2 = new Sprite({
  position: {
    x: 1024 - 50,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  q: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  Ar: {
    pressed: false,
  },
  Al: {
    pressed: false,
  },
};

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.q.pressed) {
    player.velocity.x = -1;
  } else if (keys.d.pressed && player.lastKey === "d") player.velocity.x = 1;

  player2.velocity.x = 0;
  if (keys.Al.pressed) {
    player2.velocity.x = -1;
  } else if (keys.Ar.pressed && player2.lastKey === "Ar")
    player2.velocity.x = 1;
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "q":
      player.lastKey = "q";
      keys.q.pressed = true;
      break;
    case "z":
      player.velocity.y = -10;
      break;

    case "ArrowRight":
      keys.Ar.pressed = true;
      player2.lastKey = "Ar";
      break;
    case "ArrowLeft":
      keys.Al.pressed = true;
      player2.lastKey = "Al";
      break;
    case "ArrowUp":
      player2.velocity.y = -10;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "q":
      keys.q.pressed = false;
      break;

    case "ArrowRight":
      keys.Ar.pressed = false;
      break;
    case "ArrowLeft":
      keys.Al.pressed = false;
      break;
  }
});
