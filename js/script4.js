const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth-5;
canvas.height = document.body.clientHeight-5;
DrawField();
function resize() {
  canvas.width = document.body.clientWidth-5;
  canvas.height = document.body.clientHeight-5;
  DrawField();
}
window.addEventListener('resize', resize);
function DrawField(){
  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

let flagUp = false;
let flagLeft = false;
let flagDown = false;
let flagRight = false;
const upElement = document.querySelector('.key-up');
const leftElement = document.querySelector('.key-left');
const downElement = document.querySelector('.key-down');
const rightElement = document.querySelector('.key-right');
document.addEventListener('keydown', KeyPressed);
function KeyPressed(e){
  switch (e.key){
    case 'w':
    case 'ц':
    case 'ArrowUp':
      PressUp();
      break;
    case 'a':
    case 'ф':
    case 'ArrowLeft':
      PressLeft();
      break;
    case 's':
    case 'ы':
    case 'ArrowDown':
      PressDown();
      break;
    case 'd':
    case 'в':
    case 'ArrowRight':
      PressRight();
      break;
    default:
      console.log('Unknown key');
      break;
  }
}
function PressUp(){
  if (flagUp===false) {
    upElement.classList.toggle('pressed');
    flagUp=true;
    document.addEventListener('keyup', KeyRelease)
  }
}
function PressLeft(){
  if (flagLeft===false) {
    leftElement.classList.toggle('pressed');
    flagLeft=true;
    document.addEventListener('keyup', KeyRelease)
  }
}
function PressDown(){
  if (flagDown===false) {
    downElement.classList.toggle('pressed');
    flagDown=true;
    document.addEventListener('keyup', KeyRelease)
  }
}
function PressRight(){
  if (flagRight===false) {
    rightElement.classList.toggle('pressed');
    flagRight=true;
    document.addEventListener('keyup', KeyRelease)
  }
}
function KeyRelease(e) {
  switch (e.key){
    case 'w':
    case 'ц':
    case 'ArrowUp':
      ReleaseUp();
      break;
    case 'a':
    case 'ф':
    case 'ArrowLeft':
      ReleaseLeft();
      break;
    case 's':
    case 'ы':
    case 'ArrowDown':
      ReleaseDown();
      break;
    case 'd':
    case 'в':
    case 'ArrowRight':
      ReleaseRight();
      break;
    default:
      console.log('Unknown key');
      break;
  }
}
function ReleaseUp(){
  upElement.classList.toggle('pressed');
  flagUp=false;
  document.removeEventListener('keyup', ReleaseUp);
}
function ReleaseLeft(){
  leftElement.classList.toggle('pressed');
  flagLeft=false;
  document.removeEventListener('keyup', ReleaseLeft);
}
function ReleaseDown(){
  downElement.classList.toggle('pressed');
  flagDown=false;
  document.removeEventListener('keyup', ReleaseDown);
}
function ReleaseRight(){
  rightElement.classList.toggle('pressed');
  flagRight=false;
  document.removeEventListener('keyup', ReleaseRight);
}
DrawField();