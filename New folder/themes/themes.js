// themes.js
const canvas = document.getElementById('theme-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let theme = 'dark-ocean';

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const themeColors = {
    'dark-ocean': {
        background: 'linear-gradient(135deg, #000000, #660000)',
        particles: '#ff0000',
        accent: '#ff0000'
    },
    'coffee': {
        background: 'linear-gradient(135deg, #964B00, #6b3500)',
        particles: '#786C3B',
        accent: '#786C3B'
    },
    'fire': {
        background: 'linear-gradient(135deg, #FF4500, #FF8C00)',
        particles: '#FF0000',
        accent: '#FF4500'
    },
    'ocean': {
        background: 'linear-gradient(135deg, #032B44, #065471)',
        particles: '#045A8D',
        accent: '#045A8D'
    },
    'sunset': {
        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
        particles: '#FFC080',
        accent: '#FF6B6B'
    },
    'galaxy': {
        background: 'linear-gradient(135deg, #2F4F7F, #1A1B4B)',
        particles: '#66CCCC',
        accent: '#66CCCC'
    },
    'forest': {
        background: 'linear-gradient(135deg, #228B22, #145214)',
        particles: '#32CD32',
        accent: '#32CD32'
    },
    'mountain': {
        background: 'linear-gradient(135deg, #6495ED, #4169E1)',
        particles: '#87CEEB',
        accent: '#87CEEB'
    },
    'night': {
        background: 'linear-gradient(135deg, #1A1D23, #0F1115)',
        particles: '#FFFFFF',
        accent: '#FFFFFF'
    },
    'purple': {
        background: 'linear-gradient(135deg, #6c5ce7, #a55eea)',
        particles: '#8e44ad',
        accent: '#8e44ad'
    },
    'emerald': {
        background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
        particles: '#1abc9c',
        accent: '#16a085'
    },
    'cherry-blossom': {
        background: 'linear-gradient(135deg, #FFC0CB, #FFB6C1)',
        particles: '#FF69B4',
        accent: '#FF1493'
    },
    'arctic': {
        background: 'linear-gradient(135deg, #E0FFFF, #B0E0E6)',
        particles: '#87CEFA',
        accent: '#4682B4'
    },
    'desert': {
        background: 'linear-gradient(135deg, #F4A460, #D2691E)',
        particles: '#DEB887',
        accent: '#8B4513'
    },
    'neon': {
        background: 'linear-gradient(135deg, #000000, #1A1A1A)',
        particles: '#FF00FF',
        accent: '#00FFFF'
    },
    'autumn': {
        background: 'linear-gradient(135deg, #FFA500, #FF4500)',
        particles: '#8B4513',
        accent: '#A0522D'
    },
    'cyber': {
        background: 'linear-gradient(135deg, #000000, #0C0C0C)',
        particles: '#00FF00',
        accent: '#008000'
    },
    'pastel': {
        background: 'linear-gradient(135deg, #FFB3BA, #BFFCC6)',
        particles: '#FFFFBA',
        accent: '#BAE1FF'
    },
    'volcano': {
        background: 'linear-gradient(135deg, #8B0000, #B22222)',
        particles: '#FF4500',
        accent: '#FF6347'
    },
    'deep-space': {
        background: 'linear-gradient(135deg, #000033, #000066)',
        particles: '#4169E1',
        accent: '#1E90FF'
    }
};

function createParticles(color) {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: color
        });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }
    
    requestAnimationFrame(update);
}

function updateCSSVariables(themeColor) {
    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-color-transparent', `${themeColor}1a`);
}

function setTheme(themeName) {
    if (!themeColors[themeName]) themeName = 'dark-ocean';
    
    const colors = themeColors[themeName];
    document.body.style.background = colors.background;
    document.body.style.backgroundSize = '400% 400%';
    createParticles(colors.particles);
    
    // Update CSS variables
    updateCSSVariables(colors.accent);
    
    // Update all elements with the theme color
    const elements = document.querySelectorAll('.nav-option, .toggle-button, .setting-card, .btn');
    elements.forEach(element => {
        element.style.color = colors.accent;
        if (element.classList.contains('setting-card')) {
            element.style.boxShadow = `0 0 30px ${colors.accent}`;
        }
    });

    localStorage.setItem('selectedTheme', themeName);
    
    if (!canvas) return;
    init();
    update();
}

function changeTheme() {
    const themeSelect = document.getElementById('themeSelect');
    setTheme(themeSelect.value);
}

window.addEventListener('resize', init);

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark-ocean';
    setTheme(savedTheme);
    
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
});