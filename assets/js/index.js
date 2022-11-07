var gameMode;
var home = document.getElementById("home");
var game = document.getElementById("game");
var falgStartGame = false;

//playerSpeed = player speed
var playerSpeed = 15;


var r = document.getElementById("right");
var l = document.getElementById("left");
var b = document.getElementById("ball");

var rscore = document.getElementById("scoreleft");
var lscore = document.getElementById("scoreright");
var ogoal = document.getElementById("goal");

var w = window.innerWidth;
var h = window.innerHeight;

var map = []; // Or you could call it "key"
  onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == "keydown";
    /*insert conditional here*/
  };

var speedx = 3, speedy = 1;
var balltime = 1,  speedyComp =1;
b.style.left = w / 2 + "px";

function pxToNumber(urpx) {
  return Number(urpx.replace("px", ""));
}


function displayHome() {
  game.style.display = "none";
  home.style.display = "block";
  falgStartGame = false;
  console.log("JOGO ACABOU");
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
    if (pxToNumber(r.style.top) + playerSpeed > h - 200) r.style.top = h - 200 + "px";
    else r.style.top = pxToNumber(r.style.top) + playerSpeed + "px";
  }

  //if key was down arrow
  else if (map[38]) {
    if (pxToNumber(r.style.top) - playerSpeed < 0) r.style.top = 0 + "px";
    else r.style.top = pxToNumber(r.style.top) - playerSpeed + "px";
  }

  //if key was s
  if (map[83]) {
    if (pxToNumber(l.style.top) + playerSpeed > h - 200) l.style.top = h - 200 + "px";
    else l.style.top = pxToNumber(l.style.top) + playerSpeed + "px";
  }

  //if key was w
  else if (map[87]) {
    if (pxToNumber(l.style.top) - playerSpeed < 0) l.style.top = 0 + "px";
    else l.style.top = pxToNumber(l.style.top) - playerSpeed + "px";
  }

  //40 arrow down, 38 arrow up
  //w 87,s 83
}

function computer(){
  l.style.top = pxToNumber(l.style.top) + speedyComp + "px";
}

function moveComputer(){
  computer();
  //remove overflow y
  if (h < (pxToNumber(l.style.top) + 200) || pxToNumber(l.style.top) < 0) {
    speedyComp *= -1;
  }

  setTimeout(function () {
    moveComputer();
  }, 1);

}

function ball() {
  b.style.left = pxToNumber(b.style.left) + speedx + "px";
  b.style.top = pxToNumber(b.style.top) + speedy + "px";
}

function moveball() {
  ball();

  //remove overflow y
  if (h < pxToNumber(b.style.top) + 20 || pxToNumber(b.style.top) < 0) {
    speedy *= -1;
  }

  //overflow-x right
  if (pxToNumber(b.style.left) >= w - 50) {
    if (
      pxToNumber(r.style.top) <= pxToNumber(b.style.top) + 20 &&
      pxToNumber(r.style.top) + 200 >= pxToNumber(b.style.top)
    ) {
      speedx *= -1;
    } else if (pxToNumber(b.style.left) >= w - 20) goal("left");
  }

  //remove overflow x in left ir get the goal in left
  if (pxToNumber(b.style.left) <= 30) {
    if (
      pxToNumber(l.style.top) <= pxToNumber(b.style.top) + 20 &&
      pxToNumber(l.style.top) + 200 >= pxToNumber(b.style.top)
    ) {
      speedx *= -1;
    } else if (pxToNumber(b.style.left) <= 0) goal("right");
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

  if (pos == "left") rscore.innerHTML = Number(rscore.innerHTML) + 1;
  else lscore.innerHTML = Number(lscore.innerHTML) + 1;

  speedx *= -1;
  b.style.left = w / 2 + "px";
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
