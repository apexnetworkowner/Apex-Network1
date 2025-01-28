// Page content
const routes = {
    home: `
        <div class="home-content">
            <h1 class="home-title">Welcome to BuzChat</h1>
            <p>Your gateway to seamless communication and browsing</p>
            <button class="button" onclick="navigateTo('proxy')">Launch BuzChat</button>
        </div>
    `,
    proxy: `
        <h1>BuzChat Proxy</h1>
        <p>Fast, secure, and private browsing</p>
        <div class="card">
            <div class="search-bar">
                <input type="text" class="input" placeholder="Enter URL or search query...">
                <button class="button">Go</button>
            </div>
            <div class="website-list" id="website-list"></div>
        </div>
    `,
    games: `
        <h1>Games</h1>
        <div class="game-grid" id="game-grid"></div>
    `,
    messages: `
        <h1>Messages</h1>
        <div class="card">
            <div class="message-list" id="message-list"></div>
            <div class="search-bar">
                <input type="text" class="input" id="message-input" placeholder="Type a message...">
                <button class="button" onclick="sendMessage()">Send</button>
            </div>
        </div>
    `,
    notifications: `
        <h1>Notifications</h1>
        <div class="card">
            <div id="notification-list"></div>
        </div>
    `,
    settings: `
        <h1>Settings</h1>
        <div class="card settings-grid">
            <div class="setting-item">
                <span>Theme</span>
                <select id="theme-select" onchange="changeTheme()">
                    <option value="acidrain">Acid Rain</option>
                    <option value="sunsetmidnight">Sunset Midnight</option>
                    <option value="darkocean">Dark Ocean</option>
                </select>
            </div>
            <div class="setting-item">
                <span>Notifications</span>
                <input type="checkbox" id="notifications-toggle" onchange="toggleNotifications()">
            </div>
            <div class="setting-item">
                <span>Dark Mode</span>
                <input type="checkbox" id="dark-mode-toggle" onchange="toggleDarkMode()">
            </div>
        </div>
    `
};

// Navigation
function navigateTo(page) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = routes[page];
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');

    if (page === 'proxy') loadWebsites();
    if (page === 'games') loadGames();
    if (page === 'messages') loadMessages();
    if (page === 'notifications') loadNotifications();
}

// Proxy page
const websites = [
    { name: "YouTube", icon: "fab fa-youtube", color: "#FF0000" },
    { name: "GitHub", icon: "fab fa-github", color: "#181717" },
    { name: "Reddit", icon: "fab fa-reddit", color: "#FF4500" },
    { name: "Twitter", icon: "fab fa-twitter", color: "#1DA1F2" },
    { name: "Facebook", icon: "fab fa-facebook", color: "#1877F2" },
    { name: "Instagram", icon: "fab fa-instagram", color: "#E4405F" },
    { name: "LinkedIn", icon: "fab fa-linkedin", color: "#0A66C2" },
    { name: "Twitch", icon: "fab fa-twitch", color: "#9146FF" },
];

function loadWebsites() {
    const websiteList = document.getElementById('website-list');
    websiteList.innerHTML = websites.map(site => `
        <div class="card">
            <i class="${site.icon}" style="color: ${site.color}; font-size: 2em;"></i>
            <h3>${site.name}</h3>
            <button class="button" onclick="openWebsite('${site.name}')">Open</button>
        </div>
    `).join('');
}

function openWebsite(name) {
    alert(`Opening ${name}`);
    // In a real application, you would implement the proxy functionality here
}

// Games page
const games = [
    { name: "Space Invaders", image: "https://via.placeholder.com/150" },
    { name: "Tetris", image: "https://via.placeholder.com/150" },
    { name: "Pac-Man", image: "https://via.placeholder.com/150" },
    { name: "Snake", image: "https://via.placeholder.com/150" },
    { name: "Asteroids", image: "https://via.placeholder.com/150" },
    { name: "Pong", image: "https://via.placeholder.com/150" },
];

function loadGames() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = games.map(game => `
        <div class="game-item">
            <img src="${game.image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <button class="button" onclick="playGame('${game.name}')">Play</button>
        </div>
    `).join('');
}

function playGame(name) {
    alert(`Playing ${name}`);
    // In a real application, you would launch the game here
}

// Messages page
const messages = [
    { id: 1, text: "Hey, how's it going?", sender: "user" },
    { id: 2, text: "Not bad, just working on some code. You?", sender: "friend" },
    { id: 3, text: "Same here! Working on a new project.", sender: "user" },
];

function loadMessages() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender}">
            <p>${msg.text}</p>
        </div>
    `).join('');
    messageList.scrollTop = messageList.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    if (input.value.trim()) {
        messages.push({ id: messages.length + 1, text: input.value, sender: 'user' });
        input.value = '';
        loadMessages();
    }
}

// Notifications page
const notifications = [
    { id: 1, text: "New friend request from Alex" },
    { id: 2, text: "Your post has 10 new likes" },
    { id: 3, text: "Don't forget to check out the new games!" },
];

function loadNotifications() {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = notifications.map(notif => `
        <div class="notification-item">
            <p>${notif.text}</p>
        </div>
    `).join('');
}

// Settings page
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    // In a real application, you would change CSS variables here
    console.log(`Theme changed to ${theme}`);
}

function toggleNotifications() {
    const enabled = document.getElementById('notifications-toggle').checked;
    console.log(`Notifications ${enabled ? 'enabled' : 'disabled'}`);
}

function toggleDarkMode() {
    const enabled = document.getElementById('dark-mode-toggle').checked;
    document.body.classList.toggle('dark-mode', enabled);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.dataset.page);
        });
    });

    // Load the home page by default
    navigateTo('home');
});

// Apply initial theme
changeTheme();

// Initialize dark mode based on user preference
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
document.getElementById('dark-mode-toggle').checked = prefersDarkMode;
toggleDarkMode();
