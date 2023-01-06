var gameMode;
var home = document.getElementById("home");
var game = document.getElementById("game");
var falgStartGame = false;

//playerSpeed = player speed
var playerSpeed = 15;
let computerMode = 0; // 1 -> Defense mode, 0 -> Normal mode

var rightPlayer = document.getElementById("right-player-div");
var leftPlayer = document.getElementById("left-player-div");
var ball = document.getElementById("ball");

var rscore = document.getElementById("scoreleft");
var lscore = document.getElementById("scoreright");
var ogoal = document.getElementById("goal");

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var map = []; // Or you could call it "key"
onkeydown = onkeyup = function (e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == "keydown";
  /*insert conditional here*/
};

var speedx = 3,
  speedy = 1;
var balltime = 1,
  speedyComp = 1;
ball.style.left = screenWidth / 2 + "px";

function pxToNumber(urpx) {
  return Number(urpx.replace("px", ""));
}

function displayHome() {
  game.style.display = "none";
  home.style.display = "block";
  falgStartGame = false;
  //console.log("JOGO ACABOU");
  location.reload();
}

function displayGame(mode) {
  game.style.display = "block";
  home.style.display = "none";
  falgStartGame = true;
  if (falgStartGame) {
    startGame(mode);
    console.log("JOGO COMECOU");
  }
}

function keydown() {
  //if key was up arrow
  if (map[40]) {
    if (pxToNumber(rightPlayer.style.top) + playerSpeed > screenHeight - 200)
      rightPlayer.style.top = screenHeight - 200 + "px";
    else
      rightPlayer.style.top =
        pxToNumber(rightPlayer.style.top) + playerSpeed + "px";
  }

  //if key was down arrow
  else if (map[38]) {
    if (pxToNumber(rightPlayer.style.top) - playerSpeed < 0)
      rightPlayer.style.top = 0 + "px";
    else
      rightPlayer.style.top =
        pxToNumber(rightPlayer.style.top) - playerSpeed + "px";
  }

  //if key was s
  if (map[83]) {
    if (pxToNumber(leftPlayer.style.top) + playerSpeed > screenHeight - 200)
      leftPlayer.style.top = screenHeight - 200 + "px";
    else
      leftPlayer.style.top =
        pxToNumber(leftPlayer.style.top) + playerSpeed + "px";
  }

  //if key was screenWidth
  else if (map[87]) {
    if (pxToNumber(leftPlayer.style.top) - playerSpeed < 0)
      leftPlayer.style.top = 0 + "px";
    else
      leftPlayer.style.top =
        pxToNumber(leftPlayer.style.top) - playerSpeed + "px";
  }

  //40 arrow down, 38 arrow up
  //screenWidth 87,s 83
}

function updateComputerYPosition() {
  leftPlayer.style.top = pxToNumber(leftPlayer.style.top) + speedyComp + "px";
}

function moveComputer() {
  if (computerMode == 1) {
    speedyComp = speedy;
  }

  if (
    screenHeight < pxToNumber(leftPlayer.style.top) + 200 ||
    pxToNumber(leftPlayer.style.top) < 0
  ) {
    speedyComp *= -1;
  }

  updateComputerYPosition();
  //remove overflow y

  setTimeout(function () {
    moveComputer();
  }, 1);
}

function updateBallPosition() {
  ball.style.left = pxToNumber(ball.style.left) + speedx + "px";
  ball.style.top = pxToNumber(ball.style.top) + speedy + "px";
}

function moveball() {
  updateBallPosition();

  //remove overflow y
  if (
    screenHeight < pxToNumber(ball.style.top) + 20 ||
    pxToNumber(ball.style.top) < 0
  ) {
    speedy *= -1;
  }

  //overflow-x right
  if (pxToNumber(ball.style.left) >= screenWidth - 50) {
    if (
      pxToNumber(rightPlayer.style.top) <= pxToNumber(ball.style.top) + 20 &&
      pxToNumber(rightPlayer.style.top) + 200 >= pxToNumber(ball.style.top)
    ) {
      speedx *= -1;
      computerMode = 1; // 1 -> Save mode
    } else if (pxToNumber(ball.style.left) >= screenWidth - 20) {
      computerMode = 0; // 0 -> Normal mode
      goal("left-player-div");
    }
  }

  //remove overflow x in left ir get the goal in left
  if (pxToNumber(ball.style.left) <= 30) {
    if (
      pxToNumber(leftPlayer.style.top) <= pxToNumber(ball.style.top) + 20 &&
      pxToNumber(leftPlayer.style.top) + 200 >= pxToNumber(ball.style.top)
    ) {
      speedx *= -1;
      computerMode = 0; // 0 -> Normal mode
    } else if (pxToNumber(ball.style.left) <= 0) {
      computerMode = 0;
      goal("right-player-div");
    }
  }

  setTimeout(function () {
    moveball();
  }, balltime);
}

function mode(element, mode) {
  gameMode = mode;
  console.log(gameMode);
  displayGame(gameMode);
}

function goal(pos) {
  ogoal.style.color = "white";

  setTimeout(function () {
    ogoal.style.color = "black";
  }, 1000);

  if (pos == "left-player-div") rscore.innerHTML = Number(rscore.innerHTML) + 1;
  else lscore.innerHTML = Number(lscore.innerHTML) + 1;

  speedx *= -1;
  ball.style.left = screenWidth / 2 + "px";
}

function modeHumanHuman() {
  setInterval(function () {
    keydown();
  }, 10);
  moveball();
}

function modeHumanComputer() {
  setInterval(function () {
    keydown();
  }, 10);
  moveball();
  moveComputer();
}

function startGame(mode) {
  if (mode === "hh") {
    console.log("modo humano");
    modeHumanHuman();
  } else {
    console.log("mode computador");
    modeHumanComputer();
  }
}
