var canvas;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,trexCollided,ground,invisibleGround,gameOver,restart;
var trexImg,trexCollidedImg,groundImg,gameOverImg,restartImg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloud;
var obstaclesGroup,cloudsGroup;
var count = 0;

function preload(){
  trexImg = loadImage("images/Trex.gif");
  trexCollidedImg = loadImage("images/TrexCollided.png");
  groundImg = loadImage("images/ground2.png");
  gameOverImg = loadImage("images/GameOver.png");
  restartImg = loadImage("images/Restart.png");
  obstacle1 = loadImage("images/Obstacle1.png");
  obstacle2 = loadImage("images/Obstacle2.png");
  obstacle3 = loadImage("images/Obstacle3.png");
  obstacle4 = loadImage("images/Obstacle4.png");
  obstacle5 = loadImage("images/Obstacle5.png");
  obstacle6 = loadImage("images/Obstacle6.png");
  cloudImg = loadImage("images/Cloud.png");
}

function setup() {
  canvas = createCanvas(1500,1000);


  //Create the Bodies Here.
  trex = createSprite(-1,400);
  trex.addImage(trexImg);
  trex.scale = 1;
  trex.setCollider("circle",0,0,20);
  trex.velocityX = 2;
  

  ground = createSprite(150,555,displayWidth+500,5);
  ground.addImage(groundImg);
  ground.scale = 5;

  /*invisibleGround = createSprite(150,580,displayWidth+500,5);
  invisibleGround.scale = 2;*/

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  gameOver = createSprite(1000,200,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(1000,300,50,50);
  restart.addImage(restartImg);
  restart.visible = false;

}

function draw() {

  background(255);

  trex.collide(ground);

  if(gameState === PLAY){

    
    if(keyDown("space") && trex.y >= 400){
      trex.velocityY = -14;
    }
    trex.velocityY = trex.velocityY + 0.5;

    camera.position.x = trex.x+500;

    count  = count + Math.round(World.frameRate/30);

    ground.velocityX = -2;
  if(ground.x<400){
  ground.x = ground.width/2;
  }
    
 

 spawnObstacles();
  spawnClouds();

  //End the game when trex is touching the obstacle
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
}
else if(gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
 // ObstaclesGroup.setVelocityXEach(0);
  //CloudsGroup.setVelocityXEach(0);
  
  //change the trex animation
  trex.addImage(trexCollidedImg);
  trex.scale = 0.5;
  trex.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  //set lifetime of the game objects so that they are never destroyed
 obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
}

//creating a function when the mouse is pressed over the restart sprite  
if(mousePressedOver(restart)) {
  reset();
}

//console.log(trex.y);

//stop trex from falling down
//trex.collide(ground);

drawSprites();
textSize(45);
  fill("black");
  text("Score:"+count,trex.x+200,100);
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
count = 0;
trex.x = 100;
trex.y = 400;
trex.addImage(trexImg);
trex.scale = 1;
trex.velocityX = 2;
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
}

  

function spawnObstacles() {
  if(frameCount%100===0) {
    var obstacle = createSprite(Math.round(random(250,600)),555,10,40);
    //obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
     var rand = Math.round(random(1,5));
   console.log(rand);
   // obstacle.addImage(obstacle+rand);
   if(rand === 1){
     obstacle.addImage(obstacle1);
     obstacle.scale = 0.2;
   }
   if(rand === 2){
    obstacle.addImage(obstacle2);
  }
   if(rand === 3){
    obstacle.addImage(obstacle3);
  }
  if(rand === 4){
   obstacle.addImage(obstacle5);
 }
 if(rand === 5){
  obstacle.addImage(obstacle6);
}

    obstacle.collide(ground);
    //camera.position.x = obstacle.x;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
  //  obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);


  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount%100===0) {
    var cloud = createSprite(400,320,40,10);
   var rand = Math.round(random(250,350));
    cloud.y = rand;
    var randX = Math.round(random(200,600));
    cloud.x = randX;
    cloud.addImage(cloudImg);
    cloud.scale = 1;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    //cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //camera.position.x = ;
    //camera.position.y = cloud.y;  
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
 
}
