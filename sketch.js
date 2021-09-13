var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var blueBubbleGroup, redBubbleGroup, bulletGroup,lifeCount;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  lifeCount = createElement("h1");
  scoreboard = createElement('h1');

  scoreboard.html("Score:"+score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  lifeCount.html("Life:"+life);
  lifeCount.style('color:blue');
  lifeCount.position(width-200,40);
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y=mouseY  

    if(keyIsDown(32)){
      shootBullets();
    }
    if ((frameCount%80===0)) {
      drawBlueBubbles();
    }
    if (frameCount%100===0) {
      drawRedBubbles();
    }
    if(life<=1){
      lifeCount.style('color:red');
    }
    handleBubbleCollision(blueBubbleGroup) ;  
    handleBubbleCollision(redBubbleGroup) ;  
    console.log(score);
    //if(life<=0){
    
      handleGameOver();
    //}

    drawSprites();


    
  }
}

function shootBullets () {
  bullet = createSprite(230,gun.y-35,50,50);
  bullet.velocityX= 10;
  bullet.addImage(bulletImg);
  bullet.scale = 0.18;
  bullet.lifetime = 40;
  bulletGroup.add(bullet);
}

function drawBlueBubbles() {
  bluebubble = createSprite(600,random(20,780),50,50);
  bluebubble.velocityX = -5;
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale= 0.2;
  blueBubbleGroup.add(bluebubble);
}
function drawRedBubbles() {
  redbubble = createSprite(600,random(20,780),50,50);
  redbubble.velocityX = -5;
  redbubble.addImage(redBubbleImg);
  redbubble.scale= 0.2;
  redBubbleGroup.add(redbubble);
}

function handleBubbleCollision(bubbleGroup) {
  if (bulletGroup.overlap(bubbleGroup) &&life>0) {
    score = score +1;   
    bubbleGroup.destroyEach();
    var blast = createSprite(bullet.x,bullet.y,50,50);
    blast.addImage(blastImg);
    blast.scale=0.2;
    blast.lifetime=20;
    bulletGroup.destroyEach();
    scoreboard.html("Score:"+score);
  }
  if(backBoard.overlap(bubbleGroup)){
    bubbleGroup.destroyEach();
    life = life-1;
    lifeCount.html("Life:"+life);
  }
}

function handleGameOver() {
  if(life<=0 ){
    
      
    
    gameState ===2;
    bulletGroup.destroyEach();
    blueBubbleGroup.destroyEach();
    redBubbleGroup.destroyEach();
    gun.lifetime=0;
    //
    
  }
  if(life===0){
    swal({
      title: 'Game Over',
      text: 'Oops you lost the game...!!!',
      text: 'Your score is '+ score,
      imageUrl: 
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: '100x100',
      confirmButtonText: "Thanks for Playing"
    })
    life = life -1;
  }
  
}