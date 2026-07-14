function Main(){
  const timer = setInterval(Tick, 10);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = document.body.clientWidth-5;
  canvas.height = document.body.clientHeight-5;
  window.addEventListener('resize', resize);
  DrawField();
  let tickCounter=0;//counter of 10ms ticks
  let deadlineInterval=0;//counter for shutdown
  let seconds=0;
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
  document.addEventListener('keydown', KeyPressed);

  //Changing the size of canvas
  function resize() {
    canvas.width = document.body.clientWidth-5;
    canvas.height = document.body.clientHeight-5;
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
      spaceElement.classList.toggle('paused');
      console.log('Unpaused')
      flagPause=false;
    } else {
      spaceElement.classList.toggle('paused');
      console.log('Paused')
      flagPause=true;
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
  //Timer tick (T=1/100)
  function Tick(){
    TimeTick();
    CheckEnd();
  }
  function TimeTick(){
    tickCounter++;
    if (flagPause===false){
      if (Math.floor(tickCounter/100)>=1){
        seconds++;
        ChangeTimeValue(seconds);
        tickCounter=0;
      }
    }
  }
  function ChangeTimeValue(value){
    let mins=Math.floor(value/60);
    let secs=value%60;
    mins<10 ? mins=`0${mins}` : mins=`${mins}`;
    secs<10 ? secs=`0${secs}` : secs=`${secs}`;
    timeValueElement.textContent = `${mins}:${secs}`;
  }
  function CheckEnd() {
    deadlineInterval++;
    if (deadlineInterval>100000){
      console.log(`DEADEND: ${tickCounter}`);
      clearInterval(timer);
    }
  }
}
Main();