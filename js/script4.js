function Main(){
  let timer1;
  let timer001;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let AmountOfPressedDirections=0;
  let seconds=1;
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
  DrawAllElements();
  document.addEventListener('keydown', KeyPressed);


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
  }
  //Function to activate functions every 10ms
  function Tick001(){
    AffectDirection();
    SnakeMove(5);
    AgingParticle();
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
      AmountOfPressedDirections++;
      document.addEventListener('keyup', KeyRelease)
    } 
  }
  //Pull down left btn
  function PressLeft(){
    if (flagLeft===false) {
      leftElement.classList.toggle('pressed');
      flagLeft=true;
      AmountOfPressedDirections++;
      document.addEventListener('keyup', KeyRelease)
    } 
  }
  //Pull down down btn
  function PressDown(){
    if (flagDown===false) {
      downElement.classList.toggle('pressed');
      flagDown=true;
      AmountOfPressedDirections++;
      document.addEventListener('keyup', KeyRelease)
    } 
  }
  //Pull down right btn
  function PressRight(){
    if (flagRight===false) {
      rightElement.classList.toggle('pressed');
      flagRight=true;
      AmountOfPressedDirections++;
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
      AmountOfPressedDirections--;
      document.removeEventListener('keyup', ReleaseUp);
    } 
  }
  //Release for button left
  function ReleaseLeft(){
    if (flagLeft===true){
      leftElement.classList.toggle('pressed');
      flagLeft=false;
      AmountOfPressedDirections--;
      document.removeEventListener('keyup', ReleaseLeft);
    } 
  }
  //Release for button down
  function ReleaseDown(){
    if (flagDown===true){
      downElement.classList.toggle('pressed');
      flagDown=false;
      AmountOfPressedDirections--;
      document.removeEventListener('keyup', ReleaseDown);
    } 
  }
  //Release for button right
  function ReleaseRight(){
    if (flagRight===true) {
      rightElement.classList.toggle('pressed');
      flagRight=false;
      AmountOfPressedDirections--;
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
    particle.x=Math.random()*(canvas.getBoundingClientRect().right-21)+15;
    particle.y=Math.random()*(canvas.getBoundingClientRect().bottom-136)+15;
    particle.life=1.0;
    particle.color= `hsl(${Math.random()*360}, 100%, 50%)`;
  }
  //Main snake move function, offset of head is inversly proportional to smoothness
  function SnakeMove(smoothness){
    for (let i=tail.length-1;i>=1;i--){// till 1, because second tail`s element will get position of snake`s head
      tail[i].x=tail[i].x+(tail[i-1].x-tail[i].x)/smoothness;
      tail[i].y=tail[i].y+(tail[i-1].y-tail[i].y)/smoothness;
    }
    tail[0].x=tail[0].x + Math.cos(snake.direction)*(snake.speed/smoothness);
    tail[0].y=tail[0].y - Math.sin(snake.direction)*(snake.speed/smoothness);
    snake.x=snake.x+Math.cos(snake.direction)*(snake.speed/smoothness);
    snake.y=snake.y-Math.sin(snake.direction)*(snake.speed/smoothness);
  }
  function AffectDirection(){ //100 times per second
    needWay = GetResultDirection(); // god damn that will really break the program
    if (needWay!==-13){
      snake.direction+=ChooseDirectionOfTurn(needWay)*(Math.PI/2/100);
    }
    console.log(`needWay=${needWay} snake.direction=${snake.direction}`);
  }
  function GetResultDirection(){
    needX=0;
    needY=0;
    if (flagDown||flagUp||flagRight||flagLeft){
      flagUp ? needY+=1 : needY=needY;
      flagDown ? needY-=1 : needY=needY;
      flagRight ? needX+=1 : need=needX;
      flagLeft ? needX-=1 : needX=needX;
      //console.log(`x=${needX} y=${needY}`);
      if (needX===0 && needY===0){
        return -13;
      } else { return Math.atan2(needY, needX);}
    } else { return -13; }
  }
  function ChooseDirectionOfTurn(needDirection){
    if (Math.abs(needDirection-snake.direction)%(Math.PI*2)>=(Math.abs(snake.direction+Math.PI*2-needDirection)%(Math.PI*2))) { //holy shit... this calculation will stop the program....
      return -1;
    } else { return 1;}
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