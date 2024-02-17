// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 35;

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

    // set each grid square's coordinates: multiples of the current row or column number
    var topPosition = j * squareSize;
    var leftPosition = i * squareSize;

    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topPosition + "px";
    square.style.left = leftPosition + "px";
  }
}

/* 
   there are 17 hits to be made in order to win the game:
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
var hitCount = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)

   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/

var gameBoard = [];

const shipLengths = [5, 4, 3, 3, 2];

var minimumHits =0;

for(let i=0;i<shipLengths.length ;i++){
	minimumHits +=shipLengths[i];
}

placeShips(gameBoard);

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
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isValidPosition(board, x, y, length, isHorizontal));
    if (isHorizontal) {
      for (let i = 0; i < length; i++) {
        board[x][y + i] = 1;
      }
    } else {
      for (let i = 0; i < length; i++) {
        board[x + i][y] = 1;
      }
    }
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

// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", fireTorpedo, false);

var totalHits =0;

function fireTorpedo(e) {
  // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
	
	//count total hits
	totalHits +=1;

    // extract row and column # from the HTML element's id
    var row = e.target.id.substring(1, 2);
    var col = e.target.id.substring(2, 3);
    //alert("Clicked on row " + row + ", col " + col);

    // if player clicks a square with no ship, change the color and change square's value
    if (gameBoard[row][col] == 0) {
      e.target.style.background = "#bbb";
      // set this square's value to 3 to indicate that they fired and missed
      gameBoard[row][col] = 3;

      // if player clicks a square with a ship, change the color and change square's value
    } else if (gameBoard[row][col] == 1) {
      e.target.style.background = "red";
      // set this square's value to 2 to indicate the ship has been hit
      gameBoard[row][col] = 2;

      // increment hitCount each time a ship is hit
      hitCount++;
          if (hitCount == minimumHits) {
        alert("All enemy battleships have been defeated! You win! and you took " + totalHits + " hits");
		stopTimer();
      }

      // if player clicks a square that's been previously hit, let them know
    } else if (gameBoard[row][col] > 1) {
      alert("You already fired at this location!");
    }
  }
  e.stopPropagation();
}


