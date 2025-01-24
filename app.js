// Mouse Glitter Animation
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Set canvas properties
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "1000";

// Update canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particle settings
const particles = [];
const particleCount = 15;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `hsl(${Math.random() * 360}, 70%, 80%)`;
    this.life = Math.random() * 50 + 20; // Particle lifespan
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.97; // Slowly shrink particle
    this.life -= 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function addParticles(x, y) {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y));
  }
}

function handleParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw();

    if (particle.life <= 0 || particle.size <= 0.2) {
      particles.splice(i, 1); // Remove dead particles
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

// Add mousemove listener
window.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  addParticles(clientX, clientY);
});

// Start the animation loop
animate();
