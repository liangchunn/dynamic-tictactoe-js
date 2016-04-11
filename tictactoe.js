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

    //DEFAULTS
    this.args = {
        movesToWin: 3,
        boardSize: 3,
        debug: false,
        players: 2,
        instanceName: ""
    }

    this.args = userArgs;

    this.turn = 1;
    this.playable = true;
    this.currentMoves = 0;

    this.board;
    this.boardSize;
    this.totalMoves;
    this.instructionHandler;
    this.Debugger;
    this.movesToWin;
    this.performanceCalculate;

    this.colorArray = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'cyan'];
    this.generateGame();
    this.drawGame();
}

//Toggle between users
TicTacToe.prototype.switchTurns = function() {
    if (this.turn < this.args.players) {
        this.turn++;
    } else {
        this.turn = 1;
    }
}


//Initializes variables
TicTacToe.prototype.generateGame = function() {
    var size = this.args.boardSize;
    var movesToWin = this.args.movesToWin;
    var players = this.args.players;
    var __array = new Array(),
        __x, __y;
    if (size < 3 || size % 2 !== 0) {
        for (__x = 0; __x < size; __x++) {
            __array[__x] = new Array();
            for (__y = 0; __y < size; __y++) {
                __array[__x][__y] = 0;
            }
        }
        this.boardSize = size;
        this.board = __array.clone();
        this.totalMoves = size * size;
    } else {
        alert("Dimension Error!");
        return;
    }
    if (movesToWin > size) {
        alert("Invalid movesToWin, moves to win must not be lower than board size!");
        return;
    } else {
        this.movesToWin = movesToWin;
    }

    if (players > size) {
        alert("Players " + (size + 1) + " and above does not have any chances to win! Max players: " + size);
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
    var movesToWin = this.movesToWin
    var x, y, z, matches;

    if (this.playable === true && this.currentMoves != this.totalMoves) {
        //horizontal matches
        for (x = 0; x < this.boardSize; x++) {
            matches = 0;
            for (y = 0; y < this.boardSize; y++) {
                if (this.board[x][y] === player) {
                    matches++;
                    if (matches >= movesToWin) {
                        this.playable = false;
                        this.endGame(player);
                    }
                } else {
                    matches = 0;
                }
            }
        }
        //vertical matchs a/b
        for (x = 0; x < this.boardSize; x++) {
            matches = 0;
            for (y = 0; y < this.boardSize; y++) {
                if (this.board[y][x] === player) {
                    matches++;
                    if (matches >= movesToWin) {
                        this.playable = false;
                        this.endGame(player);
                    }
                } else {
                    matches = 0;
                }
            }
        }
        //top left to bottom right matches
        for (x = 0; x < this.boardSize - movesToWin + 1; x++) {
            for (y = 0; y < this.boardSize - movesToWin + 1; y++) {
                matches = 0;
                for (z = 0; z < movesToWin; z++) {
                    if (this.board[x + z][y + z] == player) {
                        matches++;
                        if (matches >= movesToWin) {
                            this.playable = false;
                            this.endGame(player);
                        }
                    }
                }

            }
        }
        //top right to bottom left matches
        for (x = 0; x < (this.boardSize - movesToWin + 1); x++) {
            for (y = this.boardSize - 1; y > this.boardSize - movesToWin - 1; y--) {
                matches = 0;
                for (z = 0; z < movesToWin; z++) {
                    if (this.board[x + z][y - z] == player) {
                        matches++;
                        if (matches >= movesToWin) {
                            this.playable = false;
                            this.endGame(player);
                        }
                    }
                }
            }
        }

    } else if (this.currentMoves === this.totalMoves) {
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
    resetButton.setAttribute("onclick", this.args.instanceName + ".reset();");
    container.appendChild(resetButton);

    //creates a p element that gives instructions
    var instructionContainer = document.createElement("p");
    instructionContainer.innerText = "Player " + this.turn + "'s turn!";
    instructionContainer.id = "instructions"
    container.appendChild(instructionContainer);

    //create our gameboard
    for (var __x = 0; __x < this.boardSize; __x++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var __y = 0; __y < this.boardSize; __y++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            cell.id = this.args.instanceName + ".g" + __x + __y
            cell.setAttribute("onclick", this.args.instanceName + ".toggle(" + __x + "," + __y + ")");
            cell.innerText = "+";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    console.log(container);
    e.appendChild(container);

    //sets up debugger
    if (this.args.debug) {
        var __debuggerElem = document.createElement("p");
        __debuggerElem.innerText = "DEBUGGER ACTIVE\nREADY";
        __debuggerElem.id = this.args.instanceName + ".Debugger";
        __debuggerElem.className = "debugger";
        container.appendChild(__debuggerElem);
        this.Debugger = document.getElementById(this.args.instanceName + ".Debugger");
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
    var x, y, __tile;
    for (x = 0; x < this.boardSize; x++) {
        for (y = 0; y < this.boardSize; y++) {
            __tile = document.getElementById(this.args.instanceName + ".g" + x + y);
            __tile.style.background = this.colorArray[this.board[x][y] - 1];
            __tile.style.color = "#FFF";
            __tile.innerText = this.board[x][y];
            if (this.board[x][y] == 0) {
                __tile.style.background = "#FFF";
                __tile.style.color = "#000";
                __tile.innerText = "+";
            }
        }
    }
    if (this.args.debug) {
        var __dX;
        var __dY;
        var __debugTextHandler = "DEBUGGER ACTIVE\n";
        __debugTextHandler += "CURRENT TURN: " + this.turn + "\n";
        __debugTextHandler += "MOVES LEFT: " + (this.totalMoves - this.currentMoves) + "\n";
        __debugTextHandler += "***BOARD MATRIX***\n";
        for (__dX = 0; __dX < this.boardSize; __dX++) {
            __debugTextHandler += "[ ";
            for (__dY = 0; __dY < this.boardSize; __dY++) {
                __debugTextHandler += this.board[__dX][__dY] + " ";
            }
            __debugTextHandler += "]\n";
        }
        if (this.playable) {
            __debugTextHandler += "Time taken for match check: ";
            __debugTextHandler += this.performanceCalculate + " ms";
        }
        __debugTextHandler += "\n\n\n\n";
        this.Debugger.innerText = __debugTextHandler;
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
    this.generateGame();
    this.playable = true;
    this.turn = 1;
    this.currentMoves = 0;
    this.instructionHandler.innerText = "Player " + this.turn + "'s turn!";
    this.render();
}
