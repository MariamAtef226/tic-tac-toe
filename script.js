window.onload = function(){

let cells = Array.from(document.querySelector(".gridcont").children);
let turn = document.querySelector(".turn");
let currentPlayer = "X";
let running = false;
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let x = document.getElementById("x");
let o = document.getElementById("o");
let winner;
let computer;
let player;

let wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let taken=["","","","","","","","",""];

start.addEventListener('click', initialize);
reset.addEventListener('click',restart);
x.addEventListener('click', function(){
  player = "X";
  computer = "O";
  play();
  console.log("x is chosen");
});
o.addEventListener('click', function(){
  player = "O";
  computer = "X";
  console.log("o is chosen");
  play();
});


function initialize(){
    start.style.display = "none";
    x.style.display="inline";
    o.style.display="inline";
    turn.textContent = "Select a Letter to Play With!";
}

function play(){
  x.style.display="none";
  o.style.display="none";
  // currentPlayer == "X";
  reset.style.display="inline";
  running = true;
  turn.textContent = `Your Turn!`;
  if (computer == "X"){
    compPlay();
  }
  cells.forEach(val=>{
    val.addEventListener('click',cellClick);
  });

}

function cellClick(cell){
  if (running){
  let ind = this.getAttribute("cellindex");

  if (taken[ind] == ""){
    taken[ind] = currentPlayer;
    this.textContent = currentPlayer;
    currentPlayer = computer;
    checkWin();
    if(running)
      compPlay();
  }

  }
}

function compPlay(){
  if (running){
      console.log("comp is playing");
    let cind = Math.floor(Math.random() * 10);
    while(taken[cind] !="")
      cind = Math.floor(Math.random() * 10);
    let cell = document.querySelector('div[cellindex="' + cind +'"]');
    taken[cind] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = player;
    checkWin();
  }

}

function checkWin(){
  let roundwon = false;
  var i =0;
  for ( ; i< wins.length; i++){
    let chance = wins[i];
    let c1 = chance[0];
    let c2 =chance[1];
    let c3 = chance[2];
    if (taken[c1] == "" || taken[c2] == "" || taken[c3] == "")
      continue;
    if(taken[c1] == taken[c2] && taken[c2] == taken[c3]){
      roundwon = true;
      winner = taken[c1];
      console.log(winner);
      break;
    }
  }

  if (roundwon){
    running = false;
    turn.innerText =`Player ${winner} is the Winner!
                       Press "Reset" to Play Again!`;
  }
  else if(!taken.includes("")){
    running = false;
    turn.textContent ='It is a Draw! Press "Reset" to Play Again!';
  }

}

function restart(){
  start.style.display = "inline";
  reset.style.display="none";
  running = false;
  currentPlayer="X";
  turn.textContent = 'Press "Start" and Begin Your Game!';
  cells.forEach(val =>{
    val.textContent = "";
  })
  taken=["","","","","","","","",""];
}

};
