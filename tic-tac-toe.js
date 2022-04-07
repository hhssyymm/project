/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require("prompt-sync")({ sigint: true });

// TODO: Update this gameboard by giving better naming (use A1, A2 etc insteaed of 1,2,3)
// 1,2,3 is very confusing and not sure which position it is denoting
let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
  board[position] = mark; //mark will go into position (1-9) in the board
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
  let drawboard = {
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: " ",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
  };

  for (let i in board) {
    //using for-in because it is to search property (not value) in object //double check for-in
    if (board[i] == " ") {
      // check the board [i] empty
      drawboard[i] = i; // each iteration property board will push into drawboard value
    } else {
      drawboard[i] = board[i];
    }
  }
  console.log(`\n  ${drawboard[1]}| ${drawboard[2]}| ${drawboard[3]}\n---------
    \n ${drawboard[4]}| ${drawboard[5]} |${drawboard[6]}\n---------
    \n ${drawboard[7]}| ${drawboard[8]} | ${drawboard[9]}\n---------`);
}
// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
  if (position < 1 || position > 9) {
    return false;
  }
  if (board[position] == " ") {
    return true;
  }
  if (board[position] != "X" || board[position] != "O") {
    return false;
  }
}

// TODO: list out all the combinations of winning, you will need this
// one of the winning combinations is already done for you
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  let i, j, markCounter;
  for (i = 0; i < winCombinations.length; i++) {
    markCounter = 0;
    for (j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        markCounter++;
      }
      if (markCounter === 3) {
        return true;
      }
    }
  }
  return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie basically means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  //1. check does the board occupied/tie or not
  if (board[1] == " ") {
    return false; //once return function end
  }
  if (board[2] == " ") {
    return false;
  }
  if (board[3] == " ") {
    return false;
  }
  if (board[4] == " ") {
    return false;
  }
  if (board[5] == " ") {
    return false;
  }
  if (board[6] == " ") {
    return false;
  }
  if (board[7] == " ") {
    return false;
  }
  if (board[8] == " ") {
    return false;
  }
  if (board[9] == " ") {
    return false;
  }
  return true; //it means that the box is full
}

// *****************************************************
// Copy all your code/functions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
  printBoard();

  let storeInput = prompt(`${player} pick a position: `);
  while (!validateMove(storeInput)) {
    console.log("Invalid Input!");
    storeInput = prompt(player);
  }
  if (validateMove(storeInput)) {
    markBoard(storeInput, player);
    checkFull(player);
  }
  // full or tie
  if (checkFull(player) == false) {
    console.log(`There are more spaces!`);
  } else if (checkFull(player) == true && checkWin(player) == false) {
    console.log(`space full! TIE!! `);
    stop()
  } else {
    null;
  }

  //checking the winning
  let checkWinning = checkWin(player);
  if (checkWinning == true) {
    console.log(`${player} You're the winner`);
    stop()
  } else {
    return false;
  }
}

// entry point of the whole program
console.log(
  "Game started: \n\n" +
    " 1 | 2 | 3 \n" +
    " --------- \n" +
    " 4 | 5 | 6 \n" +
    " --------- \n" +
    " 7 | 8 | 9 \n"
);

let winnerIdentified = false;
let currentTurnPlayer = "X";

while (!winnerIdentified) {
  playTurn(currentTurnPlayer);
  if (currentTurnPlayer == "X") {
    currentTurnPlayer = "O"; //now x become O
  } else if (currentTurnPlayer == "O") {
    currentTurnPlayer = "X"; //now O become X
  }

  // feel free to add logic here if needed, e.g. announcing winner or tie
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
