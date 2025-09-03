let restart = document.getElementById('restartBtn');
let gameOver = false;
let counter =0;
let alreadyPicked; // Will be initialized in resetGameVariables
const X_TEXT = "X";
const O_TEXT = "O";
let onePlayer = true;
// let now = true; // 'now' is a parameter in myFunction, not needed globally

let currentPlayer  = X_TEXT;
let boardSize; // Will be set in initializeBoard

let x_palyer = []
let o_palyer = []
let winningCombo = []
let win =[]; // Will be populated by generateWinningCombinations

// 1. initializeBoard function
function initializeBoard() {
    const boardSizeInput = document.getElementById('boardSizeInput');
    const N = parseInt(boardSizeInput.value);

    if (isNaN(N) || N < 2) {
        alert("Please enter a valid board size (a number greater than or equal to 2).");
        return;
    }
    boardSize = N; // Set global boardSize

    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; // Clear existing board

    // Dynamically create cells
    for (let i = 0; i < N * N; i++) {
        const cell = document.createElement('div');
        cell.id = i.toString();
        cell.classList.add('box');
        cell.onclick = function() { myFunction(this.id); };
        gameBoard.appendChild(cell);
    }

    // Adjust CSS for N x N grid
    gameBoard.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${N}, 1fr)`; // Added for completeness

    resetGameVariables(N);
    document.getElementById('palyerText').innerHTML = currentPlayer + " 's turn";
}

// 2. resetGameVariables function
function resetGameVariables(N) {
    gameOver = false;
    counter = 0;
    alreadyPicked = Array(N * N).fill(false);
    x_palyer = [];
    o_palyer = [];
    currentPlayer = X_TEXT;
    winningCombo = []; // Clear previous winning combo
    // Update player turn display - already done in initializeBoard, but good to have if called separately
    document.getElementById('palyerText').innerHTML = currentPlayer + " 's turn"; 
    generateWinningCombinations(N); // Generate and set new winning combinations
}

// 3. generateWinningCombinations function
function generateWinningCombinations(n) {
    const newWin = [];
    // Rows
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(i * n + j);
        }
        newWin.push(row);
    }
    // Columns
    for (let j = 0; j < n; j++) {
        const col = [];
        for (let i = 0; i < n; i++) {
            col.push(i * n + j);
        }
        newWin.push(col);
    }
    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < n; i++) {
        diag1.push(i * (n + 1));
        diag2.push((i + 1) * (n - 1));
    }
    newWin.push(diag1);
    newWin.push(diag2);
    win = newWin; // Update the global win variable
}


// startGame() // This function is empty and initializeBoard handles setup. Removing it.


function check(currentPlayer)
{
    var playerArray =[]
    if(currentPlayer === X_TEXT)
    {    playerArray = x_palyer;    }
    else
    {   playerArray = o_palyer;    }

    for(let i in win)
    {
        const x = win[i].every(element => {
            return playerArray.indexOf(element) !== -1;
          });

        if(x === true)
        {   
            winningCombo  =   win[i];  
            endGame(currentPlayer)
            return x;
        }
        
    }

    return false;

}
function addtoCurrentPlayer(currentPlayer,ele)
{

    if(currentPlayer === X_TEXT)
    {    x_palyer.push(ele);    }
    else
    {    o_palyer.push(ele);    }
}



startGame()


function myFunction(id,now=true)
{
    if(gameOver)
        return;
    var ele = parseInt(id);
    if(alreadyPicked[ele]===true)
        return;
    var palyer = document.getElementById('palyerText');
    document.getElementById(id).innerHTML = currentPlayer;
    alreadyPicked[ele] = true;
    addtoCurrentPlayer(currentPlayer,ele)
    // console.log(id,currentPlayer);

    // console.log( check(currentPlayer)) // Removed redundant check call
    if ( check(currentPlayer) === true )
    {
        // console.log(currentPlayer)
        palyer.innerHTML = "The Winner Is "+currentPlayer;
        gameOver =true;
        return;
    }
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT ;
    palyer.innerHTML = currentPlayer + " 's turn";
    counter+=1;
    if(counter == (boardSize * boardSize)) // Use boardSize
    {
        palyer.innerHTML = "Game Over ! ~Draw";
        gameOver = true; // Set gameOver to true in a draw
        return;
    }
    
    if(onePlayer === true && now === true && currentPlayer === O_TEXT) // Ensure AI plays as O_TEXT and 'now' is true
    {
        // Simple AI: pick a random available spot
        let availableSpots = [];
        for(let k=0; k < boardSize * boardSize; k++){
            if(!alreadyPicked[k]){
                availableSpots.push(k);
            }
        }

        if(availableSpots.length > 0){
            var randomIndex = Math.floor(Math.random() * availableSpots.length);
            var  i = availableSpots[randomIndex];
            myFunction(i.toString(),false); // Pass id as string
        }
        return; // AI has made its move
    }
        
}



function endGame(currentPlayer)
{
    // console.log(winningCombo);
    for(let i of winningCombo) // Iterate directly over elements if winningCombo is an array of numbers
    {
        const cell = document.getElementById(i.toString());
        if (cell) { // Check if cell exists
            cell.style.backgroundColor = "#ddfff7";
        }
    }
}

function restartfun()
{   
    // This will reload the page, prompting the user to enter board size again.
    // For a smoother experience, we could clear the board and reset variables
    // by calling initializeBoard() if boardSize is stored or re-read,
    // or by calling resetGameVariables(boardSize) and then redrawing the board.
    location.reload();
}


function darkMode()
{
    var Isdark = document.getElementById("darkmode-toggle");
    if(Isdark.checked === true )
    {
        document.documentElement.style.setProperty('--orange', '#ffcc00');
        document.documentElement.style.setProperty('--backgroundCplor', '#1a2634');
    }
    else
    {
        document.documentElement.style.setProperty('--orange', '#145277');
        document.documentElement.style.setProperty('--backgroundCplor', '#83d0cb');
    }
}


function singleOrDouble(play)
{
    onePlayer =play;
}