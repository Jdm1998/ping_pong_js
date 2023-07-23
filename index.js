import "./styles.css";

let app = document.getElementById("app");
let rod1 = document.getElementById("rod1");
let rod2 = document.getElementById("rod2");

let ball = document.getElementById("ball");

let start = false;
let maxScore = 0;
let maxScorer= "";
let rod1Score = 0;
let rod2Score = 0;
let level = prompt(`enter difficulty level 1-10`);
level = parseInt(level);

let vx = -3+level;
let vy = 4+ level/2;
//for left and right key press
let leftKeyPressed = false;
let rightKeyPressed = false;

//getting/setting localstorage
if(!localStorage.getItem("maxScorer")){

  localStorage.setItem("maxScorer","");
  localStorage.setItem("maxScore",maxScore);
}
else
{
  maxScore= localStorage.getItem("maxScore");
  maxScorer = localStorage.getItem("maxScorer");

}
 if(maxScore==0)
 alert(`First time game is being played`);  //for first time
 else
alert(`${maxScorer} has scored Maximum ${ maxScore}`);

//key down event

function buttonHandlerOnDown(event) {
  if (event.key === "ArrowLeft") {
    leftKeyPressed = true;
  }
  if (event.key === "ArrowRight") {
    rightKeyPressed = true;
  }
  if (event.key === "Enter") start = false;
}

// key up event
let buttonHandlerOnUp = (event) => {
  if (event.key === "ArrowLeft") leftKeyPressed = false;

  if (event.key === "ArrowRight") rightKeyPressed = false;
  if (event.key === "Enter") start = false;

//  console.log(event.key)
};

document.addEventListener("keydown", buttonHandlerOnDown);
document.addEventListener("keyup", buttonHandlerOnUp);

// game reset handler function

function reset(loser){
 // console.log(rod1Score,rod2Score);
  
 // checking max score
  maxScore= maxScore<rod1Score?rod1Score:maxScore;
  maxScore= maxScore<rod2Score?rod2Score:maxScore;
  if(rod1Score<rod2Score){
    maxScorer="rod2";
    alert( `rod2 win with ${rod2Score-rod1Score} Max score is ${maxScore}`)
  }
  else if(rod1Score>rod2Score){
    maxScorer="rod1";
    alert( `rod1 win with ${rod1Score-rod2Score} Max score is ${maxScore}`)
  }
  else 
  alert (`no one win. Max score is ${maxScore}`);

  localStorage.setItem("maxScorer",maxScorer);
  localStorage.setItem("maxScore",maxScore);

  rightKeyPressed=false;
  leftKeyPressed=false;
  // alert("start again? press Enter to start again");
  firstStart();
}

// initial setup for game/ reset
function firstStart(){
  start=true;
  rightKeyPressed= false;
  leftKeyPressed= false;
  rod1Score=0;
  rod2Score=0;
  
  ball.style.top=app.offsetHeight-rod2.offsetHeight- ball.offsetHeight-10+"px";
  ball.style.left= app.offsetWidth/2 +"px";
  rod1.style.left=app.offsetWidth/2-100 +"px";
  rod2.style.left=app.offsetWidth/2 -100 +"px";
  
}
firstStart();


// checking collision 
function checkCollision(){

let ballLeft= ball.offsetLeft;
let ballRight = ball.offsetLeft+ ball.offsetWidth;
let ballTop = ball.offsetTop;
let ballBottom = ball.offsetTop + ball.offsetHeight;

let rod1Left = rod1.offsetLeft;
let rod1Right = rod1.offsetLeft + rod1.offsetWidth;
let rod1Top = rod1.offsetTop;
let rod1Bottom = rod1.offsetTop + rod1.offsetHeight;

let rod2Right = rod2.offsetLeft + rod2.offsetWidth;
let rod2Top = rod2.offsetTop;
let rod2Left = rod2.offsetLeft;
let rod2Bottom = rod2.offsetTop + rod2.offsetHeight;

if(ballRight > rod1Left && ballLeft < rod1Right && ballTop<=rod1Bottom &&vy<0){

  rod1Score+=100;
  return true;
  
}

if(ballRight > rod2Left && ballLeft < rod2Right && ballBottom>=rod2Top && vy>0){
  

  rod2Score+=100;
  return true;

}
else

ball.style.backgroundColor="blue";
return false;




}

function gameLoop() {

  //ball movement
  if (ball.offsetLeft < 0) {
    vx = -vx;
  } else if (ball.offsetLeft > app.offsetWidth - ball.offsetWidth -10) {
    vx = -vx;
  }

  if (ball.offsetTop < 0) {
    reset("rod1");
    // vy = -vy;
  } else if (ball.offsetTop > app.offsetHeight - ball.offsetHeight-10) {
    // vy = -vy;
    reset("rod2");
  }
  if(start===true)
  {
   ball.style.left = rod2.offsetLeft+rod2.offsetWidth/2 +"px";
   console.log( "ball left",ball.offsetLeft);
  }
  
if(start===false){
  ball.style.top = ball.offsetTop + vy + "px";
  ball.style.left = ball.offsetLeft + vx + "px";

  if( checkCollision()){  
    vy=-vy;  // reversing vertical velocity
   }
}

// rod movement

  if (leftKeyPressed && rod1.offsetLeft > 1) {
    rod1.style.left = rod1.offsetLeft - 5-level + "px";
    rod2.style.left = rod2.offsetLeft - 5-level + "px";
  }
  if ( rightKeyPressed && rod1.offsetLeft  < app.offsetWidth - rod1.offsetWidth - 20
  ) {
    rod2.style.left = rod2.offsetLeft + 5+ level + "px";
    rod1.style.left = rod1.offsetLeft + 5+level + "px";
  }

  requestAnimationFrame(gameLoop);  // for infinite loop
}

gameLoop();
