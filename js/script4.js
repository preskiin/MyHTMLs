function Main(){
  const timer = setInterval(Tick, 10);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = document.body.clientWidth-5;
  canvas.height = document.body.clientHeight-5;
  window.addEventListener('resize', resize);
  DrawField();
  let flagUp = false;
  let flagLeft = false;
  let flagDown = false;
  let flagRight = false;
  const upElement = document.querySelector('.key-up');
  const leftElement = document.querySelector('.key-left');
  const downElement = document.querySelector('.key-down');
  const rightElement = document.querySelector('.key-right');
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
      case 'Space':
        PressSpace();
        break;
      default:
        console.log('Unknown key');
        break;
    }
  }
  //Pause button pressed
  function PressSpace(){
    
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
        console.log('Unknown key');
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
  let tickCounter=0;
  let deadlineInterval=0;
  //Timer tick (T=1/100)
  function Tick(){
    TestTick();
    CheckEnd();
  }
  function TestTick(){
    tickCounter++;
    if (tickCounter===100){
      console.log('Hello.');
      tickCounter=0;
    }
  }
  function CheckEnd() {
    deadlineInterval++;
    if (deadlineInterval>1000)
      clearInterval(timer);
  }
}
Main();