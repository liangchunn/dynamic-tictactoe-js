# dynamic-tictactoe-js
A simple and dynamic Tic Tac Toe program built on Javascript.

## Features:
- Dynamic grid (odd numbers only)
- Dynamic grid match-checking
- Unlimited players (if board is infinitely large)

## How to use: 
    var TicTac = new TicTacToe({
        boardSize: 5,
        movesToWin: 3,
        players: 2,
        debug: true,
        instanceName: "TicTac"
    });
