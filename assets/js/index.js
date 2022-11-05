var gameMode;
var home = document.getElementById('home');
var game = document.getElementById('game');
function displayHome(){
  game.style.display = "none";
  home.style.display = "block";
}

function displayGame(){
  game.style.display = "block";
  home.style.display = "none";
}

function mode(element, mode){
  gameMode = mode;
  //window.open('./assets/html/game.html','_self');
  console.log(gameMode);
  displayGame();
}

