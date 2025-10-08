function createPlayer(name, marker) {
    let score = 0;
    let tie = 0;
    let loseScore = 0;
    return {
        name: name,
        marker: marker,

        addWin() {
            score++;
        },

        addTie() {
            tie++;
        },

        addLose() {
            loseScore++;
        },

        getScore () {
            return { score, tie, loseScore };
        }
    }
}

const GameController = (function() {
    let player1;
    let player2;
    let currentPlayer;

    return {
        setPlayers (p1, p2) {
            player1 = p1;
            player2 = p2;
            currentPlayer = player1;
        },

        playGame () {
            let gameOver = false;
            let turnCount = 1;

            while (!gameOver) {
                var row = parseInt(prompt("row"));
                var col = parseInt(prompt("col"));

                GameBoard.makeMove(row,col,currentPlayer.marker);

                if (this.checkWinner(row, col)) {
                    this.declareWinner(currentPlayer);
                    gameOver = true;
                } else if (turnCount === 9) {
                    this.declareWinner(null);
                    gameOver = true;
                }
                else {
                    this.setTurn(currentPlayer);
                    turnCount++;
                }
            }
            
        },

        setTurn (player) {
            if (player === player1) {
                currentPlayer = player2
            } else {
                currentPlayer = player1;
            }
        },

        declareWinner (winner) {
            if (winner === player1) {
                player1.addWin();
                player2.addLose();
            } else if (winner === player2) {
                player1.addLose();
                player2.addWin();
            } else if (winner === null) {
                player1.addTie();
                player2.addTie();
            }
            
            const p1Stats = player1.getScore();
            const p2Stats = player2.getScore();
            console.log('player1 W:' + p1Stats.score + ' T:' +p1Stats.tie + ' L:' + p1Stats.loseScore)
            console.log('player2 W:' + p2Stats.score + ' T:' + p2Stats.tie + ' L:' + p2Stats.loseScore)
        },

        checkWinner (row, col) {
            const marker = GameBoard.getMatrix()[row][col];
            
            const directions = [
                [0, 1],  // horizontal
                [1, 0],  // vertical  
                [1, 1],  // diagonal \
                [1, -1]  // diagonal /
            ];

            for (let [dr, dc] of directions) {
                let count = 1;

                //check positive
                for (let i = 1; i <=2; i++) {
                    let newRow = row + dr * i;
                    let newCol = col + dc * i;

                    if ( newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3 
                        && marker === GameBoard.getMatrix()[newRow][newCol]) {
                        count++
                    } else {
                        break;
                    }
                }

                //check negative
                for (let i = 1; i <=2; i++) {
                    let newRow = row - dr * i;
                    let newCol = col - dc * i;

                    if ( newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3
                        && marker === GameBoard.getMatrix()[newRow][newCol]) {
                        count++
                    } else {
                        break;
                    }
                }

                if(count >= 3) {
                    return true;
                }
            }
            return false;
        }
    }
})();

const GameBoard = (function () {

    let matrix = [
        ['','',''],
        ['','',''],
        ['','','']
    ]

    return {

        getMatrix (){
            return matrix
        },
        
        makeMove (row, column, marker) {
            matrix[row][column] = marker;
        },

        clearMatrix () {
            matrix = [
                ['','',''],
                ['','',''],
                ['','','']
            ]
        },


    }
})();

const player1 = createPlayer("Justin", "X");
const player2 = createPlayer("Justfin", "O");


GameController.setPlayers(player1,player2);
GameController.playGame();