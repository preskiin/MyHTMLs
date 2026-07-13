const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
function resize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  DrawField();
}
window.addEventListener('resize', resize);
function DrawField(){
  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.fillRect(0,0, canvas.width, canvas.height);
}
DrawField();