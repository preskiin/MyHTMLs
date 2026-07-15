function Main(){
  let timer1;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let seconds=0;
  let tick005=0;
  let flagPause = true;
  let flagUp = false;
  let flagLeft = false;
  let flagDown = false;
  let flagRight = false;
  const timeValueElement=document.querySelector('.time-value');
  const upElement = document.querySelector('.key-up');
  const leftElement = document.querySelector('.key-left');
  const downElement = document.querySelector('.key-down');
  const rightElement = document.querySelector('.key-right');
  const spaceElement = document.querySelector('.key-space');
  canvas.width = window.innerWidth-5;
  canvas.height = window.innerHeight-120;
  let particle ={
    x: (canvas.getBoundingClientRect().right-21)/2,
    y: (canvas.getBoundingClientRect().bottom-136)/2, 
    life:1.0,
    color: `hsl(${Math.random()*360}, 100%, 50%)`
  };
  let snake={
    speed:0,
    sparseness: 10,
    x: 0,
    y: 0,
    direction:0, // the direction of snake`s head (angle between upside and snake`s direction of move)
    color: `hsl(${Math.random()*360}, 100%, 50%)`
  };
  let tail=[]; // snake`s tail elements
  window.addEventListener('resize', resize);
  DrawField();
  SnakeInit((canvas.getBoundingClientRect().right-21)/2 + 100, (canvas.getBoundingClientRect().bottom-136)/2);
  DrawAllElements();
  document.addEventListener('keydown', KeyPressed);
  //Function to draw page with screen frequency
  function DrawFrame(){
    if (flagPause===true)//Stop all logic if the game is not started or paused.
      return;
    SnakeMove();
    AgingParticle();
    DrawAllElements();// This function should be in the end of tick, because all works with elements would be finished here.
    requestAnimationFrame(DrawFrame);
  }
  //Function to tick status time every second
  function Tick1(){
    ChangeTimeValue(seconds++);
  }
  //Initialize snake
  function SnakeInit(x0,y0){
    snake.speed=10;
    snake.x=x0;
    snake.y=y0;
    snake.direction=0;
    for (let i=1;i<=5;i++){
      tail.push({
        x: snake.x-10*i,
        y: snake.y
      });
    }
  }
  //Changing the size of canvas
  function resize() {
    canvas.width = window.innerWidth-5;
    canvas.height = window.innerHeight-120;
    DrawField();
  }
  //Filling canvas black background
  function DrawField(){
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.fillRect(0,0, canvas.width, canvas.height);
  }
  //The function to track the status of button pulled down
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
      case ' ':
        PressSpace();
        break;
      default:
        //console.log('Unknown key');
        break;
    }
  }
  //Pause button pressed
  function PressSpace(){
    if (flagPause===true){
      timer1=setInterval(Tick1,1000);
      spaceElement.classList.toggle('paused');
      console.log('Unpaused');
      flagPause=false;
      requestAnimationFrame(DrawFrame);
    } else {
      clearInterval(timer1);
      spaceElement.classList.toggle('paused');
      console.log('Paused')
      flagPause=true;
      cancelAnimationFrame(DrawFrame);
    }
  }
  //Pull down up btn
  function PressUp(){
    if (flagUp===false) {
      upElement.classList.toggle('pressed');
      flagUp=true;
      document.addEventListener('keyup', KeyRelease)
    }
  }
  //Pull down left btn
  function PressLeft(){
    if (flagLeft===false) {
      leftElement.classList.toggle('pressed');
      flagLeft=true;
      document.addEventListener('keyup', KeyRelease)
    }
  }
  //Pull down down btn
  function PressDown(){
    if (flagDown===false) {
      downElement.classList.toggle('pressed');
      flagDown=true;
      document.addEventListener('keyup', KeyRelease)
    }
  }
  //Pull down right btn
  function PressRight(){
    if (flagRight===false) {
      rightElement.classList.toggle('pressed');
      flagRight=true;
      document.addEventListener('keyup', KeyRelease)
    }
  }
  //The function to track the status of released btn
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
        //console.log('Unknown key');
        break;
    }
  }
  //Release for button up
  function ReleaseUp(){
    upElement.classList.toggle('pressed');
    flagUp=false;
    document.removeEventListener('keyup', ReleaseUp);
  }
  //Release for button left
  function ReleaseLeft(){
    leftElement.classList.toggle('pressed');
    flagLeft=false;
    document.removeEventListener('keyup', ReleaseLeft);
  }
  //Release for button down
  function ReleaseDown(){
    downElement.classList.toggle('pressed');
    flagDown=false;
    document.removeEventListener('keyup', ReleaseDown);
  }
  //Release for button right
  function ReleaseRight(){
    rightElement.classList.toggle('pressed');
    flagRight=false;
    document.removeEventListener('keyup', ReleaseRight);
  }
  //To set time value
  function ChangeTimeValue(value){
    let mins=Math.floor(value/60);
    let secs=value%60;
    mins<10 ? mins=`0${mins}` : mins=`${mins}`;
    secs<10 ? secs=`0${secs}` : secs=`${secs}`;
    timeValueElement.textContent = `${mins}:${secs}`;
  }
  //Function for decrease of a particle`s lifetime
  function AgingParticle(){
    particle.life-=0.001;
    if (particle.life<=0){
      GenerateNewParticle();
    }
  }
  //Generates particle on new coordinates
  function GenerateNewParticle(){
    particle.x=Math.random()*(canvas.getBoundingClientRect().right-21)+15;
    particle.y=Math.random()*(canvas.getBoundingClientRect().bottom-136)+15;
    particle.life=1.0;
    particle.color= `hsl(${Math.random()*360}, 100%, 50%)`;
  }
  function SnakeMove(){
    for (let i=tail.length-1;i>=1;i--){// till 1, because second tail`s element will get position of snake`s head
      tail[i].x=tail[i-1].x;
      tail[i].y=tail[i-1].y;
    }
    tail[0].x=snake.x;
    tail[0].y=snake.y;
    snake.x=snake.x+Math.cos(snake.direction)*snake.speed;
    snake.y=snake.y-Math.sin(snake.direction)*snake.speed;
  }
  //Draw a single particle, that is defined in object "particle"
  function DrawParticle(){
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.life*15,0,Math.PI*2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 15, 0, Math.PI*2);
    ctx.strokeStyle = particle.color;
    ctx.lineWidth=1;
    ctx.stroke();
  }
  //Draw snake`s head and tail`s elements
  function DrawSnake(){
    for (let i=tail.length-1; i>=0; i--){
      ctx.beginPath();
      ctx.arc(tail[i].x, tail[i].y, 10, 0, Math.PI*2);
      ctx.fillStyle=snake.color;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, 8, 0, Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, 9, 0, Math.PI*2);
    ctx.strokeStyle=snake.color;
    ctx.lineWidth=2;
    ctx.stroke();
  }
  //Function for drawing all objects, that exist on canvas per frame
  function DrawAllElements(){
    DrawField(); 
    DrawSnake();
    DrawParticle();
  }
}
Main();