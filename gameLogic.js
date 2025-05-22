let restart = document.getElementById('restartBtn');
let gameOver = false;
let counter =0;
let alreadyPicked  = Array(9).fill(false)
const X_TEXT = "X";
const O_TEXT = "O";
let onePlayer = true;
let now = true;

let currentPlayer  = X_TEXT;

let x_palyer = []
let o_palyer = []
let winningCombo = []
const win =[

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
]
function startGame()
{
   //  console.log("game started ...")
}

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

    console.log( check(currentPlayer))
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
    if(counter == 9)
    {
        palyer.innerHTML = "Game Over ! ~Draw";
        return;
    }
    
    if(onePlayer === true && now === true)
    {
        while(true)
        {
            var  i = Math.floor(Math.random() * 9);
            if(alreadyPicked[i]===true)
                continue;
            else
            {   
                myFunction(i,false);
                return;
            }
        }
    }
        
}



function endGame(currentPlayer)
{
    // console.log(winningCombo);
    for(let i in winningCombo)
    {
        document.getElementById(winningCombo[i]).style.backgroundColor = "#ddfff7";
    }
}

function restartfun()
{   
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