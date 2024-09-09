// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 2 + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Create an array of particles
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Animate the particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
