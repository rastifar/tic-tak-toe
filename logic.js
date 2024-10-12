const tiles = Array.from(document.querySelectorAll(".tile"));
const player = document.querySelector(".player");
const diaplay = document.querySelector(".display");
const gameBoard = document.querySelector(".board")

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const playerXWon = "Player X Won";
const playerOWon = "Player O Won";
const draw = "Draw";

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => ActionUser(tile, index));
});

document.addEventListener("click", function(e){
  // e.stopPropagation()

  
    if(!isGameActive && e.target.nodeName !== 'DIV' ){     
         resetBoard()       
    }
    
  });

const ActionUser = (tile, index) => {
  if (isValidation(tile) && isGameActive) {
    tile.classList.add(`fill-${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
};

const isValidation = (tile)=>{
  if(tile.innerText == "X" || tile.innerText == "O"){
      return false;
  }
  return true;
}

const updateBoard = (index)=>{
  board[index] = currentPlayer
}

function handleResultValidation() {
  
  let roundWon = -1;
    for (let index = 0; index < winningCondition.length; index++) {
      const winCondition = winningCondition[index];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
     
      if (a == b && b == c) {
        roundWon = index;
        console.log(index)
        console.log(roundWon)
        console.log(winningCondition[index])
        colorWinningLine(index)
        break;
      }
    }
    
    if (roundWon != -1) {
        isGameActive = false       
        announce(currentPlayer === "X" ? playerXWon : playerOWon );
        return;
    }
    if(!board.includes("")){     
        isGameActive = false
        announce(draw)
    }
  }

const changePlayer = () => {  
  currentPlayer = currentPlayer === "X" ? "O" : "X";  
};


const announce = (type) => {
  switch (type) {
    case playerXWon:     
      gameBoard.classList.add("game-over","win-x")
     
      break;
    case playerOWon:
      gameBoard.classList.add("game-over","win-o")      
      break;
    case draw:
      gameBoard.classList.add("game-over","draw")
      break;
  }
};


const resetBoard = ()=>{
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    gameBoard.classList.remove("game-over","win-x","win-o","draw")

    if(currentPlayer ==="O"){
        changePlayer()
    }

    tiles.forEach(tile=>{
        tile.innerText= "";
        tile.classList.remove('fill-X')
        tile.classList.remove('fill-O')
        tile.style.removeProperty('background-color')

    })

}
const colorWinningLine = (index)=>{
    for (const iterator of winningCondition[index]) {
        tiles[iterator].style.setProperty('background-color','lightpink');        
    }
}