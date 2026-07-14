const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth-5;
canvas.height = document.body.clientHeight-5;
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
window.addEventListener('keydown', KeyPressed(event));
function KeyPressed(e){
  switch (e.key){
    case 'w':
    case 'ArrowUp':
      TurnUp();
      break;
    case 'a':
    case 'ArrowLeft':
      TurnLeft();
      break;
    case 's':
    case 'ArrowDown':
      TurnDown();
      break;
    case 'd':
    case 'ArrowRight':
      TurnRight();
      break;
    default:
      console.log('Unknown key');
      break;
  }
}
DrawField();