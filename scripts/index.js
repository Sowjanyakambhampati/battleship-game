const chronometer = new Chronometer();


var battleship;

const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

let minDec = document.getElementById('minDec');
let minUni = document.getElementById('minUni');
let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni');

function printTime() {
  printMinutes();
  printSeconds();
}

function printMinutes() {
  minUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[1];
  minDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[0];
}

function printSeconds() {
  secUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[1];
  secDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0];
}


function setStopBtn() {
  btnLeft.className = 'btn stop';
  btnLeft.textContent = 'STOP';
}


function setStartBtn() {
  btnLeft.className = 'btn start';
  btnLeft.textContent = 'START';
}

function setResetBtn() {
  btnRight.className = 'btn reset';
  btnRight.textContent = 'RESET';
}

// Start/Stop Button
btnLeft.addEventListener('click', () => {
  if (btnLeft.classList.contains('start')) {
    chronometer.start(printTime);
    battleship = new BattleShip();
    battleship.loadGameBoard();
    setStopBtn();
  } else {
    chronometer.stop();
    setStartBtn();
    setResetBtn();
  }
});

// Reset/Split Button
btnRight.addEventListener('click', () => {
  if (btnRight.classList.contains('reset')) {
    chronometer.reset();
    printTime();
    resetAllElements();
  }
});


function resetAllElements() {
  
  var element = document.getElementsByClassName("board-components-111");
  document.getElementById("carrier-1").style.backgroundColor = "gray";
  document.getElementById("carrier-2").style.backgroundColor = "gray";
  document.getElementById("carrier-3").style.backgroundColor = "gray";
  document.getElementById("carrier-4").style.backgroundColor = "gray";
  document.getElementById("carrier-5").style.backgroundColor = "gray";


  var element = document.getElementsByClassName("board-components-110");
  document.getElementById("battleship-1").style.backgroundColor = "gray";
  document.getElementById("battleship-2").style.backgroundColor = "gray";
  document.getElementById("battleship-3").style.backgroundColor = "gray";
  document.getElementById("battleship-4").style.backgroundColor = "gray";

  var element = document.getElementsByClassName("board-components-108");
  document.getElementById("cruiser-1").style.backgroundColor = "gray";
  document.getElementById("cruiser-2").style.backgroundColor = "gray";
  document.getElementById("cruiser-3").style.backgroundColor = "gray";

  var element = document.getElementsByClassName("board-components-109");
  document.getElementById("destroyer-1").style.backgroundColor = "gray";
  document.getElementById("destroyer-2").style.backgroundColor = "gray";

  var element = document.getElementsByClassName("board-components-107");
  document.getElementById("submarine").style.backgroundColor = "gray";

  var gameBoardContainer = document.getElementById("gameboard");

  this.battleship = new BattleShip();

  this.battleship.totalHits =0;
  this.battleship.hitCount =0;
  this.battleship.gameBoard =[];
  this.battleship.minimumHits =0;
  this.battleship.computerShips =[];
  this.battleship.hitCells=[];

  gameBoardContainer.removeEventListener("click", battleship.loadGameBoard());
  
}

