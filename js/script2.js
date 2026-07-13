const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const radius = 100;
let headPosition ={x: canvas.width/2+radius, y: canvas.height/2};
let currentCenter={x: canvas.width/2, y: canvas.height/2};
let counter=0;
const snakeSpeed=0.2;
const animationSpeed=0.055;
// Событие изменения центра круга по клику
canvas.addEventListener('click', (e)=>{
  const rect = canvas.getBoundingClientRect();
  currentCenter.x = e.clientX - rect.left;
  currentCenter.y = e.clientY - rect.top;
  headPosition.x = currentCenter.x + radius;
  headPosition.y = currentCenter.y;
  counter=0
});
// Создаем цепочку из 5 шариков
const points = [];
const count = 20;
for (let i=0;i<count;i++){
  points.push({x: headPosition.x, y: headPosition.y});
}
function animate() {
  counter+=animationSpeed;
  // Очищаем холст прозрачным фоном (для эффекта "хвоста" используем низкую opacity)
  ctx.fillStyle = 'rgba(0,0,0,1)'; //0.1 эффект затухания
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // указываем, куда сдвинулась голова змеи при вызове функции
  headPosition.x = currentCenter.x + radius*Math.cos(counter);
  headPosition.y = currentCenter.y + radius*Math.sin(counter);
  // Добавляем логику змейки 
  points[0].x += (headPosition.x - points[0].x) * snakeSpeed;
  points[0].y += (headPosition.y - points[0].y) * snakeSpeed;
  // Остальные точки преследуют предыдущую
  for (let i=1;i<count;i++) {
    const previous = points[i-1];
    const current = points[i];
    current.x += (previous.x-current.x)*snakeSpeed;
    current.y += (previous.y-current.y)*snakeSpeed;
  }
  // рисуем
  for (let i=0;i<count;i++){
    const p = points[i];
    const radius = (count-i)/count*15+5; //рост к голове
    // цвета радуги
    const hue = (i / count)*360 + Date.now() * 0.1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue}, 100%, 60%`;
    ctx.fill();
    // соединяем точки
    if (i>0){
      ctx.beginPath()
      ctx.moveTo(points[i-1].x, points[i-1].y);
      ctx.lineTo(p.x,p.y);
      ctx.strokeStyle = 'grba(255,255,255,0.3)';
      ctx.lineWidth=1;
      ctx.stroke();
    }
  }
  requestAnimationFrame(animate);
}
animate();