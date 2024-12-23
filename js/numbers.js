const canvas = document.getElementById('numberCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numbers = [];
const maxNumbers = 100;

class NumberParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = Math.floor(Math.random() * 10); // Random number between 0 and 9
    this.alpha = 1; // Initial opacity
    this.size = Math.random() * 30 + 10; // Random size
    this.fadeSpeed = Math.random() * 0.01 + 0.005; // Random fade-out speed
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.font = `${this.size}px Arial`;
    ctx.fillText(this.value, this.x, this.y);
  }

  update() {
    this.alpha -= this.fadeSpeed;
    if (this.alpha <= 0) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.value = Math.floor(Math.random() * 10);
    this.alpha = 1;
    this.size = Math.random() * 30 + 10;
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
  }
}

function init() {
  for (let i = 0; i < maxNumbers; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    numbers.push(new NumberParticle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  numbers.forEach((number) => {
    number.draw();
    number.update();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();
