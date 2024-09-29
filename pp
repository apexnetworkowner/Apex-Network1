<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>APEX NETWORK</title>
  <meta name="description" content="skibdi." />
  <meta content='apex.png' property='og:image'>
  <meta name="theme-color" content="#6853f">
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: linear-gradient(to bottom, #660033, #330033);
      font-family: Helvetica, sans-serif;
      background-image: url("https://media.discordapp.net/attachments/1282131641581436959/1284976330978361344/IMG_4501.png");
      background-size: cover;
      background-position: center;
    }
    
    #canvas {
      width: 100%;
      height: 100vh;
      display: block;
    }
    
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: left 0.5s;
    }
    
    .navbar.closed {
      left: -250px;
    }
    
    .navbar .nav-options {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .nav-option, .nav-option_logo {
      vertical-align: middle;
      font-family: 'Vietnam Pro';
      text-decoration: none;
      width: 100%;
      height: max-content;
      color: rgb(222, 222, 222);
      margin-bottom: 20px;
      transition: all 0.3s ease-in-out;
      border-radius: 10px;
      padding: 10px;
      animation: shrink 0.8s both;
      background-color: rgba(255, 0, 0, 0.2);
    }
    
    .nav-option_logo { 
      background-color: transparent;
      border: 1px solid rgba(255, 0, 0, 0.5);
    }
    
    .nav-option:hover {
      transition: transform 0.2s, box-shadow 0.2s;
      transform: scale(1.15);
      background-color: rgba(255, 0, 0, 0.4);
      box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.8);
    }
    
    .nav-option.active {
      color: #ff3737;
      text-shadow: 0px 0px 15px rgba(255, 55, 55, 0.8);
      background-color: rgba(255, 55, 55, 0.4);
      box-shadow: 0px 0px 10px rgba(255, 55, 55, 0.8);
    }
    
    .toggle-button {
      position: fixed;
      top: 50%;
      left: 250px;
      transform: translate(0, -50%);
      font-size: 30px;
      color: white;
      cursor: pointer;
    }
    
    .toggle-button.closed {
      left: 0;
    }
    
    .header-container {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.8);
    }
    
    .header-text {
      font-size: 80px;
      color: #fef8f8;
      text-shadow: 0px 0px 15px rgba(255, 55, 55, 0.8);
    }
    
    .searchbox {
      width: 400px;
      height: 60px;
      background: rgba(255, 0, 0, 0.5);
      border-radius: 10px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(255, 0, 0, 0.5);
      transition: width 0.5s;
    }
    
    .searchbox.expanded {
      width: 600px;
    }
    
    .search {
      width: 300px;
      height: 57px;
      border-radius: 10px;
      background: transparent;
      border: none;
      color: rgb(205, 205, 205);
      font-size: 20px;
      outline: none;
      margin-left: 10px;
      padding: 10px;
      background-color: rgba(255, 0, 0, 0.2);
    }
    
    ::placeholder {
      color: rgb(205, 205, 205);
      font-size: 18px;
      border: none;
    }
    
    .submit-button {
      background: transparent;
      border: none;
      width: 55px;
      height: 60px;
      color: rgb(205, 205, 205);
      margin-left: 5px;
    }
    
    #CREDIT-DO-NOT-REMOVE {
      position: fixed;
      bottom: 5px;
      color: white;
      left: calc(50% - 190px);
    }
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
</head>
<body>
  <div class="toggle-button" onclick="toggleNavbar()">&gt;</div>
  <nav class="navbar">
    <div class="nav-options">
      <a href="home.html" class="nav-option"><i class="home-icon fa fa-house-user fa-2xl fa-fw"></i></a>
      <a href="games.html" class="nav-option"><i class="games-icon fa fa-gamepad fa-2xl fa-fw"></i></a>
      <a href="/settings" class="nav-option"><i class="settings-icon fa fa-gear fa-2xl fa-fw"></i></a>
      <center>
        <a href="home.html" class="nav-option_logo"><img src="https://media.discordapp.net/attachments/1282131641581436959/1284976330978361344/IMG_4501.png?ex=66e896f7&is=66e74577&hm=52fe04a1f8c19654ad50c9ec30a5e9d0de647bf25d671b796968d973c9201bb5&=&format=webp&quality=lossless" height="40px" alt="Apex Logo"></a>
      </center>
      <a href="/chat" class="nav-option"><i class="chat-icon fa fa-message fa-2xl fa-fw"></i></a>
      <a href="/proxy" class="nav-option"><i class="search-icon fa-solid fa-magnifying-glass fa-2xl fa-fw"></i></a>
      <a href="/darkweb" class="nav-option"><i class="darkweb-icon fa-solid fa-lock fa-2xl fa-fw"></i></a>
    </div>
  </nav>
  <div class="header-container">
    <h1 class="header-text">APEX</h1>
    <div class="searchbox">
      <form>
        <input type="search" class="search" placeholder="Search...">
        <button type="submit" class="submit-button"><i class="fas fa-search searchicon"></i></button>
      </form>
    </div>
  </div>

  <p id="CREDIT-DO-NOT-REMOVE">Website by Apex Network, CSS by the Glitch Network </p>

  <canvas id="canvas"></canvas>
  <script src="script.js"></script>
  <script>
    function toggleNavbar() {
      document.querySelector('.navbar').classList.toggle('closed');
      document.querySelector('.toggle-button').classList.toggle('closed');
      if (document.querySelector('.toggle-button').classList.contains('closed')) {
        document.querySelector('.toggle-button').innerHTML = '&gt;';
      } else {
        document.querySelector('.toggle-button').innerHTML = '&lt;';
      }
    }
    
    document.querySelector('.searchbox').addEventListener('click', function() {
      document.querySelector('.searchbox').classList.add('expanded');
    });
    
    document.addEventListener('click', function(event) {
      if (!document.querySelector('.searchbox').contains(event.target)) {
        document.querySelector('.searchbox').classList.remove('expanded');
      }
    });
  </script>
</body>
</html>
