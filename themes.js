
const canvas = document.getElementById('theme-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles(color, vy) {
    particles = [];
    ctx.fillStyle = color;
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: 0,
            vy: vy,
            size: 2
        });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.y += particle.vy;
        if (particle.y < 0) {
            particle.y = canvas.height;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    requestAnimationFrame(update);
}

function setTheme(theme) {
    init();
    switch (theme) {
        case 'coffee':
            createParticles('#786C3B', -1);
            document.body.style.backgroundColor = '#964B00';
            break;
        case 'fire':
            createParticles('#FF0000', -2);
            document.body.style.backgroundColor = '#FFC080';
            break;
        case 'ocean':
            createParticles('#045A8D', -1);
            document.body.style.backgroundColor = '#032B44';
            break;
        case 'sunset':
            createParticles('#FFC080', -1);
            document.body.style.backgroundColor = '#FFA07A';
            break;
        case 'galaxy':
            createParticles('#66CCCC', -1);
            document.body.style.backgroundColor = '#2F4F7F';
            break;
        case 'forest':
            createParticles('#32CD32', -1);
            document.body.style.backgroundColor = '#228B22';
            break;
        case 'mountain':
            createParticles('#87CEEB', -1);
            document.body.style.backgroundColor = '#6495ED';
            break;
        case 'night':
            createParticles('#FFFFFF',
                
            createParticles('#FFFFFF', -1);
            document.body.style.backgroundColor = '#1A1D23';
            break;
        case 'purple':
            createParticles('#8e44ad', -1);
            document.body.style.backgroundColor = '#6c5ce7';
            break;
        case 'dark-ocean':
            createParticles('#330000', -1);
            document.body.style.backgroundColor = '#660000';
            break;
        default:
            createParticles('#FFFFFF', -1);
            document.body.style.backgroundColor = '#ffffff'; // Default
            break;
    }
    update(); // Start the animation
}

// Initialize the default theme on page load
window.onload = function() {
    setTheme('coffee'); // Set the default theme
};


function setTheme(theme) {
    localStorage.setItem('selectedTheme', theme); // Save theme to local storage
    init();
    // ... rest of the code
}
