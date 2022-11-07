var gameMode;
var home = document.getElementById('home');
var game = document.getElementById('game');
var falgStartGame = false;

function displayHome(){
  location.reload();
  game.style.display = "none";
  home.style.display = "block";
  falgStartGame = false;
  console.log("JOGO ACABOU")

}

function displayGame(mode){
  game.style.display = "block";
  home.style.display = "none";
  falgStartGame = true;
  if(falgStartGame){
   startGame(mode);
   console.log("JOGO COMECOU")
  }

}

function mode(element, mode){
  gameMode = mode;
  //window.open('./assets/html/game.html','_self');
  console.log(gameMode);
  displayGame(gameMode);
}

function startGame(mode){

  if(mode === 'hh'){
    console.log("modo humano")
    modeHumanHuman();
  }
  else{
    console.log("mode computador")
    modeHumanComputer();
  }

}

