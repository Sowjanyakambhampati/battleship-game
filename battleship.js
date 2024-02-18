// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 40;

// Capture number of hits took 
var totalHits =0;
var hitCount = 0;


/* 
   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/

var gameBoard = [];
const shipLengths = [5, 4, 3, 2, 1];

// calculate total number of actual hits required to finish the game
var minimumHits = shipLengths.reduce((a,b) => a+b,0);

//computer ships location placed as per the random logic
var computerShips = [];
var hitCells = [];

//Load game board
loadGameBoard();

// Place Ships Randomly 
placeShips(gameBoard);


function loadGameBoard(){

  // get the container element
var gameBoardContainer = document.getElementById("gameboard");

// make the grid columns and rows
for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      // create a new div HTML element for each grid square and make it the right size
      var square = document.createElement("div");
      gameBoardContainer.appendChild(square);

      // give each div element a unique id based on its row and column, like "s00"
      square.id = "s" + j + i;

      //square.innerHTML += square.id;

      // set each grid square's coordinates: multiples of the current row or column number
      var topPosition = j * squareSize;
      var leftPosition = i * squareSize;

      // use CSS absolute positioning to place each grid square on the page
      square.style.top = topPosition + "px";
      square.style.left = leftPosition + "px";
    }
  }

// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);

}

function placeShips(board) {
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  for (const length of shipLengths) {
    let isHorizontal = Math.random() < 0.5;
    let x, y;
    var computerShip = [];
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isValidPosition(board, x, y, length, isHorizontal));
    if (isHorizontal) {
      for (let i = 0; i < length; i++) {
        board[x][y + i] = 1;
        computerShip.push("s" + x + (y + i));
      }
    } else {
      for (let i = 0; i < length; i++) {
        board[x + i][y] = 1;
        computerShip.push("s" + (x + i) + y);
      }
    }
    computerShips.push(computerShip);
  }
}


// Function to check if ship placement is valid
function isValidPosition(board, x, y, length, isHorizontal) {
  if (isHorizontal && y + length > 10) return false;
  if (!isHorizontal && x + length > 10) return false;
  for (let i = 0; i < length; i++) {
    if (isHorizontal && board[x][y + i] === 1) return false;
    if (!isHorizontal && board[x + i][y] === 1) return false;
  }
  return true;
}


//Listner event handle after firing torpedo to see if any ship is hit
function fireTorpedo(e) {
  // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
	
	//count total hits
	totalHits +=1;

    // extract row and column # from the HTML element's id
    var row = e.target.id.substring(1, 2);
    var col = e.target.id.substring(2, 3);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] == 0) {
      //e.target.style.background = "#bbb";
      var elem = document.createElement("img");
      elem.setAttribute("height", "40");
      elem.setAttribute("width", "40");
      elem.setAttribute("src", "img/water-splash.gif");
      e.target.appendChild(elem);
      // set this square's value to 3 to indicate that they fired and missed
      gameBoard[row][col] = 3;

      // if player clicks a square with a ship, change the color and change square's value
    } else if (gameBoard[row][col] == 1) {
      var elem = document.createElement("img");
      elem.setAttribute("height", "35");
      elem.setAttribute("width", "35");
      elem.setAttribute("src", "img/battleship-ship-icon.svg");
      e.target.appendChild(elem);

      // set this square's value to 2 to indicate the ship has been hit
      gameBoard[row][col] = 2;
      hitCells.push("s" + row + col);

      // increment hitCount each time a ship is hit
      hitCount++;
      if (hitCount == minimumHits) {
        alert("All enemy battleships have been defeated! You win! and you took " + totalHits + " hits");
        //displayMessage("All enemy battleships have been defeated! You win! and you took " + totalHits + " hits")
      }

      // if player clicks a square that's been previously hit, let them know
    } else if (gameBoard[row][col] > 1) {
      alert("You already fired at this location!");
      //displayMessage("You already fired at this location!");
    }

    nextTurn();
  }
  e.stopPropagation();
}

const nextTurn = () => {
  // Draw only Enemy Ships that have completely sunk
  computerShips.forEach(ship => {
    // Get cells that exist in the ship
    const hitCellsShips = hitCells.filter(cell => ship.includes(cell))
    // If the whole cells exist, it means the ship is completely sunk, we can draw it in the screen
    if (hitCellsShips.length == ship.length) {
      drawCells(ship, "enemy")
    }
  })
}

const drawCells = (cells, target) => {
  if (target == "enemy") {
    switch (cells.length) {
      case 5:
        var element = document.getElementsByClassName("board-components-111");
        document.getElementById("carrier-1").style.backgroundColor = "red";
        document.getElementById("carrier-2").style.backgroundColor = "red";
        document.getElementById("carrier-3").style.backgroundColor = "red";
        document.getElementById("carrier-4").style.backgroundColor = "red";
        document.getElementById("carrier-5").style.backgroundColor = "red";
        break;
      case 4:
        var element = document.getElementsByClassName("board-components-110");
        document.getElementById("battleship-1").style.backgroundColor = "red";
        document.getElementById("battleship-2").style.backgroundColor = "red";
        document.getElementById("battleship-3").style.backgroundColor = "red";
        document.getElementById("battleship-4").style.backgroundColor = "red";
        break;
      case 3:
        var element = document.getElementsByClassName("board-components-108");
        document.getElementById("cruiser-1").style.backgroundColor = "red";
        document.getElementById("cruiser-2").style.backgroundColor = "red";
        document.getElementById("cruiser-3").style.backgroundColor = "red";
        break;
      case 2:
        var element = document.getElementsByClassName("board-components-109");
        document.getElementById("destroyer-1").style.backgroundColor = "red";
        document.getElementById("destroyer-2").style.backgroundColor = "red";
        break;
      case 1:
        var element = document.getElementsByClassName("board-components-107");
        document.getElementById("submarine").style.backgroundColor = "red";
        break;
      default:
        break;

    }
  }
}

const displayMessage = (message) =>{

  var messageArea = document.getElementById('messageArea');
  messageArea.innerHtml = message;

}

