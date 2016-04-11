/*MIT License

Copyright (c) 2016 Liang Chun Wong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function TicTacToe(userArgs) {
    this.args = userArgs;
    this.instanceName = this.args.instanceName;
    this.board;
    this.boardSize;
    this.turn = 1;
    this.playable = true;
    this.movesLeft;
    this.currentMoves = 0;
    this.instructionHandler;
    this.Debugger;
    this.movesToWin;
    this.numberOfPlayers;
    this.colorArray = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'cyan'];
    this.generateGame();
    this.drawGame();
    this.performanceCalculate;
}

//Toggle between users
TicTacToe.prototype.switchTurns = function() {
    if (this.turn < this.numberOfPlayers) {
        this.turn++;
    } else {
        this.turn = 1;
    }
}


//Generates all the variables as well as puts all the variables in place.
TicTacToe.prototype.generateGame = function() {
    size = this.args.boardSize;
    movesToWinUsr = this.args.movesToWin;
    players = this.args.players;
    var array = [],
        x, y;
    if (size < 3 || size % 2 !== 0) {
        for (x = 0; x < size; x++) {
            array[x] = new Array();
            for (y = 0; y < size; y++) {
                array[x][y] = 0;
            }
        }
        if (movesToWinUsr > size) {
            alert("Invalid movesToWin, moves to win must not be lower than board size!");
            return;
        } else {
            this.movesToWin = movesToWinUsr || 3;
        }

        if (players > size) {
            alert("Players " + (size + 1) + " and above does not have any chances to win! Max players: " + size);
            return;
        } else {
            this.numberOfPlayers = players || 2;
        }
        this.boardSize = size;
        this.board = array.clone();
        this.movesLeft = size * size;
    } else {
        alert("Dimension Error!");
        return;
    }
};

Array.prototype.clone = function() {
    return this.slice(0);
};

TicTacToe.prototype.checkMatches = function() {
    if (this.args.debug) {
        var start = performance.now();
    }
    var player = this.turn;
    var x, y, a, b, p, q, r, c, d, e, matches, bmatches, h1matches, h2matches;
    if (this.playable === true && this.currentMoves != this.movesLeft) {
        //horizontal matches
        for (x = 0; x < this.boardSize; x++) {
            bmatches = 0;
            for (y = 0; y < this.boardSize; y++) {
                if (this.board[x][y] === player) {
                    bmatches++;
                    if (bmatches >= this.movesToWin) {
                        this.playable = false;
                        this.endGame(player);
                    }
                } else {
                    bmatches = 0;
                }
            }
        }
        //vertical matchs
        for (a = 0; a < this.boardSize; a++) {
            matches = 0;
            for (b = 0; b < this.boardSize; b++) {
                if (this.board[b][a] === player) {
                    matches++;
                    if (matches >= this.movesToWin) {
                        this.playable = false;
                        this.endGame(player);
                    }
                } else {
                    matches = 0;
                }
            }
        }
        //top left to bottom right matches
        for (p = 0; p < this.boardSize - this.movesToWin + 1; p++) {
            for (q = 0; q < this.boardSize - this.movesToWin + 1; q++) {
                h1matches = 0;
                for (r = 0; r < this.movesToWin; r++) {
                    if (this.board[p + r][q + r] == player) {
                        h1matches++;
                        if (h1matches >= this.movesToWin) {
                            this.playable = false;
                            this.endGame(player);
                        }
                    }
                }

            }
        }
        //top right to bottom left matches
        for (c = 0; c < (this.boardSize - this.movesToWin + 1); c++) {
            for (d = this.boardSize - 1; d > this.boardSize - this.movesToWin - 1; d--) {
                h2matches = 0;
                for (e = 0; e < this.movesToWin; e++) {
                    if (this.board[c + e][d - e] == player) {
                        h2matches++;
                        if (h2matches >= this.movesToWin) {
                            this.playable = false;
                            this.endGame(player);
                        }
                    }
                }
            }
        }

    } else if (this.currentMoves === this.movesLeft) {
        this.playable = false;
        this.endGame(-1);
    } else {
        alert('Unexpected error occured.');
    }
    if (this.args.debug) {
        var end = performance.now();
        this.performanceCalculate = end - start;
    }
};


//draws all the necessary divs and boxes in the HTML document.
TicTacToe.prototype.drawGame = function() {
    var x, y, container;
    var e = document.body;

    //set up container that holds our game
    container = document.createElement("div");
    container.id = "TicTacToe";
    container.style.width = this.boardSize * 100 + 30 + "px";
    var resetButton = document.createElement("button");
    var resetText = document.createTextNode("Reset");

    //creates a reset button
    resetButton.appendChild(resetText);
    resetButton.className = "resetButton";
    resetButton.setAttribute("onclick", this.instanceName + ".reset();");
    container.appendChild(resetButton);

    //creates a p element that gives instructions
    var instructionContainer = document.createElement("p");
    instructionContainer.innerText = "Player " + this.turn + "'s turn!";
    instructionContainer.id = "instructions"
    container.appendChild(instructionContainer);

    //create our gameboard
    for (var x = 0; x < this.boardSize; x++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var y = 0; y < this.boardSize; y++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            cell.id = this.instanceName + ".g" + x + y
            cell.setAttribute("onclick", this.instanceName + ".toggle(" + x + "," + y + ")");
            cell.innerText = "+";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    e.appendChild(container);

    //sets up debugger
    if (this.args.debug) {
        var debuggerElem = document.createElement("p");
        debuggerElem.innerText = "DEBUGGER ACTIVE\nREADY";
        debuggerElem.id = this.instanceName + ".Debugger";
        debuggerElem.className = "debugger";
        container.appendChild(debuggerElem);
        this.Debugger = document.getElementById(this.instanceName + ".Debugger");
    }

    //finally, reference instruction element so that our game can change the text.
    this.instructionHandler = document.getElementById("instructions");

}

//toggling divs
TicTacToe.prototype.toggle = function(x, y) {
    if (this.turn != 0 && this.playable == true && this.board[x][y] == 0) {
        this.board[x][y] = this.turn;
        this.currentMoves++;
        this.checkMatches();
        this.render();
        this.switchTurns();
        this.instructionHandler.innerText = "Player " + this.turn + "'s turn!";
    } else {
        this.instructionHandler.innerText = "Already Chosen!"
    }
};


//Renders changes done to the game.
//This is different from generating the HTML backbone required for the game.
TicTacToe.prototype.render = function() {
    var x, y, n;
    for (x = 0; x < this.boardSize; x++) {
        for (y = 0; y < this.boardSize; y++) {
            n = document.getElementById(this.instanceName + ".g" + x + y);
            n.style.background = this.colorArray[this.board[x][y] - 1];
            n.style.color = "#FFF";
            n.innerText = this.board[x][y];
            if (this.board[x][y] == 0) {
                n.style.background = "#FFF";
                n.style.color = "#000";
                n.innerText = "+";
            }
        }
    }
    if (this.args.debug) {
        var __x;
        var __y;
        var __handler = "DEBUGGER ACTIVE\n";
        __handler += "CURRENT TURN: " + this.turn + "\n";
        __handler += "MOVES LEFT: " + (this.movesLeft - this.currentMoves) + "\n";
        __handler += "***BOARD MATRIX***\n";
        for (__x = 0; __x < this.boardSize; __x++) {
            __handler += "[ ";
            for (__y = 0; __y < this.boardSize; __y++) {
                __handler += this.board[__x][__y] + " ";
            }
            __handler += "]\n";
        }
        if (this.playable) {
            __handler += "Time taken for match check: ";
            __handler += this.performanceCalculate + " ms";
        }
        __handler += "\n\n\n\n";
        this.Debugger.innerText = __handler;
    }
}

TicTacToe.prototype.endGame = function(player) {
    if (this.playable === false) {
        if (player === -1) {
            alert("It's a draw!");
        } else {
            alert("Player " + player + " won!");
        }
    } else {
        alert("Error! Tried to end game with no matches!");
    }
}

TicTacToe.prototype.reset = function() {
    this.generateGame(this.args);
    this.playable = true;
    this.turn = 1;
    this.currentMoves = 0;
    this.instructionHandler.innerText = "Player " + this.turn + "'s turn!";
    this.render();
}
