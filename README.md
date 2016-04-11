# dynamic-tictactoe-js
A simple and dynamic Tic Tac Toe program built on Javascript.

## Features:
- Dynamic grid (odd numbers only)
- Dynamic grid match-checking
- Unlimited players (if board is infinitely large)

## How to use: 
1) Create a new variable with the class TicTacToe();
2) Pass variables:
- boardSize: defines the board size (odd numbers only)
- movesToWin: defines the winning criteria (eg: 3 in a row to win) | default: 3
- players: self-explanatory | default: 2
- debug: shows current turn, moves left, matrix array, and time taken for checks | default: false
- instanceName: !important set the instanceName as the same as the variable name!

### Example:
    var TicTac = new TicTacToe({
        boardSize: 5,
        movesToWin: 3,
        players: 2,
        debug: true,
        instanceName: "TicTac"
    });
    
Pull requests are welcome. I did this in quite a dirty way, so the code is a little messy at the moment.

