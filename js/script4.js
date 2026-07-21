function Main(){
  let fictionPoint= {
    x:0,
    y:0
  };
  let timer1;
  let timer001;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let seconds=1;
  let score=0;
  let flagPause = true;
  let flagUp = false;
  let flagLeft = false;
  let flagDown = false;
  let flagRight = false;
  let colorPalette =[];
  const particleSize=15;
  const snakeSize=10;
  const timeValueElement=document.querySelector('.time-value');
  const scoreValueElement=document.querySelector('.score-value');
  const upElement = document.querySelector('.key-up');
  const leftElement = document.querySelector('.key-left');
  const downElement = document.querySelector('.key-down');
  const rightElement = document.querySelector('.key-right');
  const spaceElement = document.querySelector('.key-space');
  canvas.width = window.innerWidth-5;
  canvas.height = window.innerHeight-120;
  let particle ={
    x: (canvas.getBoundingClientRect().right-21)/2+100,
    y: (canvas.getBoundingClientRect().bottom-136)/2+100, 
    life:1.0,
    color: `hsl(${Math.random()*360}, 100%, 50%)`
  };
  let snake={
    speed: 0,
    x: 0,
    y: 0,
    direction:0, // the direction of snake`s head (angle between upside and snake`s direction of move)
    color: `hsl(${Math.random()*360}, 100%, 50%)`
  };
  let tail=[]; // snake`s tail elements
  let needWay;
  let needX;
  let needY;
  window.addEventListener('resize', resize);
  SnakeInit((canvas.getBoundingClientRect().right-21)/2 + 100, (canvas.getBoundingClientRect().bottom-136)/2);//отладочный вывод. не забудь убрать
  InitPalette();
  DrawAllElements();
  document.addEventListener('keydown', KeyPressed);

  //Fills palette of snake`s colors
  function InitPalette(){
    colorPalette.push(`hsl(${Math.random()*360}, 100%,50%)`);
    colorPalette.push(`hsl(${Math.random()*360},100%,50%)`);
  }
  //Helps painter to choose color for next snake`s tail (or head)
  function GetColorFromPalette(num){
    return colorPalette[num%(colorPalette.length)];
  }
  //Function to draw page with screen frequency
  function DrawFrame(){
    if (flagPause===true)//Stop all logic if the game is not started or paused.
      return;
    DrawAllElements();
    requestAnimationFrame(DrawFrame);
  }
  //Function to tick status time every second
  function Tick1(){
    ChangeTimeValue(seconds++);
    //console.log(`snake: (${snake.x}, ${snake.y})`);
  }
  //Function to activate functions every 10ms
  function Tick001(){
    AffectDirection();
    SnakeMove(100*1);
    AgingParticle();
    
  }
  //Initialize snake
  function SnakeInit(x0,y0){
    snake.speed=150;
    snake.x=x0;
    snake.y=y0;
    snake.direction=0;
    for (let i=1;i<=50;i++){
      tail.push({
        x: snake.x-snakeSize*i,
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
      timer001=setInterval(Tick001,10);
      spaceElement.classList.toggle('paused');
      console.log('Unpaused');
      flagPause=false;
      requestAnimationFrame(DrawFrame);
    } else {
      clearInterval(timer1);
      clearInterval(timer001);
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
    if (flagUp===true) {
      upElement.classList.toggle('pressed');
      flagUp=false;
      document.removeEventListener('keyup', ReleaseUp);
    } 
  }
  //Release for button left
  function ReleaseLeft(){
    if (flagLeft===true){
      leftElement.classList.toggle('pressed');
      flagLeft=false;
      document.removeEventListener('keyup', ReleaseLeft);
    } 
  }
  //Release for button down
  function ReleaseDown(){
    if (flagDown===true){
      downElement.classList.toggle('pressed');
      flagDown=false;
      document.removeEventListener('keyup', ReleaseDown);
    } 
  }
  //Release for button right
  function ReleaseRight(){
    if (flagRight===true) {
      rightElement.classList.toggle('pressed');
      flagRight=false;
      document.removeEventListener('keyup', ReleaseRight);
    } 
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
    particle.x=Math.random()*(canvas.getBoundingClientRect().right-21)+particleSize;
    particle.y=Math.random()*(canvas.getBoundingClientRect().bottom-136)+particleSize;
    particle.life=1.0;
    particle.color= `hsl(${Math.random()*360}, 100%, 50%)`;
  }
  //Main snake move function, offset of head is inversly proportional to smoothness
  function SnakeMove(smoothness){
    snake.x=snake.x+Math.cos(snake.direction)*(snake.speed/smoothness);
    snake.y=snake.y-Math.sin(snake.direction)*(snake.speed/smoothness);
    tail[0].x=snake.x - Math.cos(snake.direction)*10;
    tail[0].y=snake.y + Math.sin(snake.direction)*10;
    for (let i=1;i<tail.length;i++){// till 1, because second tail`s element will get position of snake`s head // && OutBorder(tail[i].x, tail[i].y)
      // if (Math.sqrt(Math.pow(tail[i].x-fictionPoint.x, 2)+Math.pow(tail[i].y-fictionPoint.y,2))>20) {
      //   fictionPoint={x:tail[i].x, y:tail[i].y};
        tail[i].x=tail[i-1].x;
        tail[i].y=tail[i-1].y;
      // } else {
      //   tail[i].x=tail[i].x+(fictionPoint.x-tail[i].x)*0.05;
      //   tail[i].y=tail[i].y+(fictionPoint.y-tail[i].y)*0.05;
      //   fictionPoint={x:tail[i].x, y: tail[i].y};
      // }

      // Попробуй через 3 проверки: первая - если большое расстояние и граница нарушена (подумай, может достаточным условием является лишь граница) - телепорт + запоминаем последнюю точку перед переносом; 
      // вторая - если просто большое расстояние - стремимся к последней телепортированной;
      // третья - обычное перемещение.
    }

    if (particleSize+snakeSize>=Math.sqrt(Math.pow((snake.x-particle.x),2)+Math.pow((snake.y-particle.y),2))){
      console.log(`${particleSize+snakeSize}-----${Math.sqrt(Math.pow((snake.x-particle.x),2)+Math.pow((snake.y-particle.y),2))}:${Math.pow(5,2)}`)
      SnakeEat();
    }
    TeleportAsNeeded();
    counterMove=0;
    //console.log(`snake head: ${Math.floor(snake.x)}, ${Math.floor(snake.y)}; snake first tail: ${Math.floor(tail[0].x)}, ${Math.floor(tail[0].y)}`);
  }
  function GetDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2,2));
  }
  function TeleportAsNeeded(){//0 115 828 918
    if (snake.x+snakeSize>canvas.getBoundingClientRect().right-2){
      snake.x=canvas.getBoundingClientRect().left+snakeSize+2;
      //console.log(`r snake: (${snake.x}, ${snake.y})---- right=${canvas.getBoundingClientRect().right+2}`);
      //return;
    }
    if (snake.x-snakeSize+1<canvas.getBoundingClientRect().left+2){
      snake.x=canvas.getBoundingClientRect().right-snakeSize-2;
      //console.log(`l snake: (${snake.x}, ${snake.y})---- left=${canvas.getBoundingClientRect().left+2}`);
      //return;
    }
    if (snake.y+snakeSize>canvas.getBoundingClientRect().bottom-110-2){
      snake.y=snakeSize+2; 
      //snake.y=0;
      //console.log(`b snake: (${snake.x}, ${snake.y})---- bot=${canvas.getBoundingClientRect().bottom-115-2}`);
      //return;
    }
    if (snake.y-snakeSize+1<0+2){
      snake.y=canvas.getBoundingClientRect().bottom-110-2-snakeSize;
      //console.log(`t snake: (${snake.x}, ${snake.y})---- top=${canvas.getBoundingClientRect().top}`);
      //return
    }
  }
  function OutBorder(pointX, pointY){
    if (pointX+snakeSize>canvas.getBoundingClientRect().right-2 
    || pointX-snakeSize+1<canvas.getBoundingClientRect().left+2 
    || pointY+snakeSize>canvas.getBoundingClientRect().bottom-110-2
    || pointY-snakeSize+1<0+2)
      return true;
    else
      return false;
  }
  function LimitX(xOld){
    let x0=-13;
    if (xOld+snakeSize>canvas.getBoundingClientRect().right-2)
      x0=canvas.getBoundingClientRect().left+snakeSize+2;
    if (xOld-snakeSize<canvas.getBoundingClientRect().left+2)
      x0=canvas.getBoundingClientRect.right-snakeSize-2;
    if (x0===-13)
      x0=xOld;
    return x0;
  }
  function LimitY(yOld){
    let y0=-13;
    if (yOld+snakeSize>canvas.getBoundingClientRect().bottom-110-2)
      y0=snakeSize+2;
    if(yOld-snakeSize+1<0+2)
      y0=canvas.getBoundingClientRect().bottom-110-2;
    if (y0===-13)
      y0=yOld;
    return y0;
  }
  function AffectDirection(){ //100 times per second 
    needWay = GetNeededDirection(); // god damn that will really break the program
    if (Math.abs(needWay+Math.PI-snake.direction)>Math.PI/400){
      if (needWay!==-13){
        snake.direction+=ChooseDirectionOfTurn(needWay)*(Math.PI/200);
        if (Math.abs(snake.direction)>Math.PI*2)
          snake.direction=snake.direction%(Math.PI*2);
        //console.log(`needWay=${needWay*180/Math.PI} snake.direction=${snake.direction*180/Math.PI}`);
      }
    }
  }
  //Function that calcs what direction user wants
  function GetNeededDirection(){
    needX=0;
    needY=0;
    if (flagDown||flagUp||flagRight||flagLeft){
      flagUp ? needY-=1 : needY=needY;
      flagDown ? needY+=1 : needY=needY;
      flagRight ? needX-=1 : need=needX;
      flagLeft ? needX+=1 : needX=needX;
      //console.log(`x=${needX} y=${needY}`);
      if (needX===0 && needY===0){
        return -13;
      } else { return Math.atan2(needY, needX);}
    } else { return -13; }
  }
  //Function that cals how to reach direction, that user wants: clockwise or counter-clockwise
  function ChooseDirectionOfTurn(needDirection){
    if (/*Math.abs(needDirection-snake.direction)%(Math.PI*2)>=Math.abs(snake.direction+Math.PI*2-needDirection)%(Math.PI*2)*/Math.sin(needDirection-snake.direction)>0) { //holy shit... this calculation will stop the program....
      return -1;
    } else { 
      return 1;}
  }
  //Adds points to score, generates new dote and makes snake to grow
  function SnakeEat(){
    GenerateNewParticle();
    ChangeScore(score++);
    for (let i=0; i<50;i++){
      tail.push({
        x:tail[tail.length-1].x,
        y:tail[tail.length-1].y
      });
    }
    
  }
  //Changes the score
  function ChangeScore(newScore) {
    if (newScore>=100) {
      scoreValueElement.textContent=`${newScore}`;
    } else if (newScore>=10) {
      scoreValueElement.textContent=`0${newScore}`;
    } else {scoreValueElement.textContent=`00${newScore}`;}
  }
  //Draw a single particle, that is defined in object "particle"
  function DrawParticle(){
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.life*particleSize,0,Math.PI*2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI*2);
    ctx.strokeStyle = particle.color;
    ctx.lineWidth=1;
    ctx.stroke();
  }
  //Draw snake`s head and tail`s elements
  function DrawSnake(){
    for (let i=tail.length-1; i>=0; i--){
      ctx.beginPath();
      ctx.arc(tail[i].x, tail[i].y, snakeSize, 0, Math.PI*2);
      ctx.fillStyle=GetColorFromPalette(i);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, snakeSize-2, 0, Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, snakeSize-1, 0, Math.PI*2);
    ctx.strokeStyle=colorPalette[0];
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