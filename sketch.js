var bgImg, running_man, riverImg, holeImg, thronesImg, thrones;
var bg, player, obstacle;
var wall, rwall, a, rand, ob, random_obstacle, rrand, topwall, i, gameoverSound, gameover;

function preload() {
  bgImg = loadImage("bg1.png");
  running_man = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png");
  riverImg = loadImage("River.png");
  holeImg = loadImage("hole.png");
  thronesImg = loadImage("thrones.png");
  gameoverSound = loadSound("gameover.mp3");
}

function setup() {
  random_obstacle = Math.round(random(1, 3));

  createCanvas(1370, 280);

  a = 0;

  //Create Background
  bg = createSprite(1000, 100, 100, 100);
  bg.addImage(bgImg);

  //Create Player
  player = createSprite(60, 190, 1, 1);
  player.addAnimation("player", running_man);
  player.scale = .5;

  //Creating Base
  wall = createSprite(50, 280, 150, 5);
  wall.visible = false;

  topwall = createSprite(685,-100,1800,10)

}


function draw() {
  background = "white";

  //Moving Elements
  bg.velocityX = -10;

  //Jumping player with Gravity
  if (keyDown("UP") && player.y>100) {
    player.velocityY = -10;
    player.velocityY = player.velocityY + .3;
  }
  if (keyDown("LEFT") && player.y > 100) {
    player.y =  player.y - 2;
  }
  if (keyDown("RIGHT")) {
    player.y =  player.y + 2;
  }

  player.collide(wall);
  player.bounceOff(topwall);

  //Making background Infinite
  if (bg.x < 400) {
    bg.x = bg.width/2;
  }


  if (random_obstacle === 1) {
    rrand = Math.round(random(1200,2000));
    obstacle = createSprite(rrand, 210, 20, 20);
    obstacle.addImage(riverImg);
    obstacle.scale = .3;
    rwall = createSprite(rrand, 280, 150, 150);
    rwall.visible = false;
    obstacle.velocityX = -10;
    rwall.velocityX = -10;
    random_obstacle = 10;
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    rwall.depth = player.depth;
  }
  if (random_obstacle === 2) {
    rrand = Math.round(random(1200,2000));
    obstacle = createSprite(rrand, 270, 20, 20);
    obstacle.addImage(holeImg);
    obstacle.scale = .7;
    rwall = createSprite(rrand, 280, 1, 100);
    rwall.visible = false;
    obstacle.velocityX = -10;
    rwall.velocityX = -10;
    random_obstacle = 10;
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    rwall.depth = player.depth;
  }
  if (random_obstacle === 3) {
    rrand = Math.round(random(1200,2000));
    obstacle = createSprite(rrand, 320, 20, 20);
    obstacle.addImage(thronesImg);
    obstacle.scale = .3;
    rwall = createSprite(rrand, 250, 30, 10);
    rwall.visible = false;
    obstacle.velocityX = -10;
    rwall.velocityX = -10;
    random_obstacle = 10;
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    rwall.depth = player.depth;
  }


  if(obstacle.x<-10){
    obstacle.x = 1800;
    random_obstacle = Math.round(random(1,3));  
  }

  if (player.isTouching(rwall)) {
    a = 1;
  }
  if(a === 1){
    bg.velocityX = 0;
    obstacle.velocityX = 0;
    rwall.velocityX = 0;
    player.x = 60;
    wall.destroy();
    player.y = player.y + 20;
    gameoverSound.play();
  }
  
  drawSprites();
}