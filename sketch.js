var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trexRunning, trexCollided;
var ground, groundImage,invisibleGround;
var cloud, cloudImage, cloudsGroup;
var obstacleGroup, obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score;


function preload(){
  trexCollided = loadAnimation("trex_collided.png");
  trexRunning = loadAnimation("trex1.png", "trex3.png","trex4.png");

  groundImage = loadImage("ground2.png");
  cloudImage  = loadImage("cloud.png");
 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup(){
createCanvas(600,200);

trex = createSprite(200,180,50,10);
trex.addAnimation("running",trexRunning);
trex.addAnimation("collided",trexCollided);
  
trex.scale = 0.5;
trex.x = 50;

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;
ground.x = ground.x -5;

invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

obstacleGroup = createGroup();
cloudsGroup = createGroup();

score = 0;

}

function draw(){
  background(180);

  text("score: "+ score,500,50);


  if(gameState === PLAY){
  ground.velocityX = -4;
  score = score + Math.round(frameCount/60);

  if(ground.x < 0){
  ground.x = ground.width/2;
    }
  }
  
  ground.velocityX = -3;
  console.log(ground.x);

  if(keyDown("space")  && trex.y >= 100){
    trex.velocityY = -7; 
  }

  if(obstacleGroup.isTouching(trex)){
    gameState = END;
  }

  else if(gameState === END){
  ground.velocityX = 0;

  obstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  }

if(ground.x < 0){
  ground.x = ground.width/2;
}

trex.velocityY = trex.velocityY + 0.8; 


trex.collide(invisibleGround);
spawnObstacles();
spawnClouds();
drawSprites();
}


function spawnClouds(){

  if(frameCount % 60 === 0){
    cloud = createSprite(600,100,40,10);
    cloud.addImage("clouds",cloudImage);
    cloud.y = Math.round(random(60,10))
    cloud.scale = 0.5;
    cloud.velocityX = -4;

    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloud.lifetime = 134;

    cloudsGroup.add(cloud);
}
}



function spawnObstacles(){
  if(frameCount % 60 === 0){
    
     var obstacle = createSprite(400,165,40,10);
     obstacle.velocityX = -3;

     var rand = Math.round(random(1,6));
     switch(rand){
    

      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;

     }
     obstacle.scale = 0.5;
     obstacle.lifeTime = 300;
     obstacleGroup.add(obstacle);
  }

}