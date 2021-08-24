var score = 0;
var count = 25
var ammo
var gameState = "menu"
var highscore = 0

function preload(){
  playerimg = loadImage("sdgs/player.png")
  ship1= loadImage("sdgs/spaceship2.png")
  ship2= loadImage("sdgs/spaceship3.png")
  ammoimg= loadImage("sdgs/ammo.png")
  
}

function setup() {
  createCanvas(600,650);
  player = createSprite(300, 550, 50, 50)
  player.addImage(playerimg)
  player.scale=0.3
  edges=createEdgeSprites()
  enemygroup=createGroup()
  bulletgroup=createGroup()
  ammogroup=createGroup()
  start=createButton("start")
  start.position(290,300)
}

function draw() {
  background(0,0,0);
  textSize(30)
  fill("white")
  text("Score: " + score,30,50)
  text("Ammo: "+count,400,50)
if(gameState==="menu"){
  start.mouseClicked(function(){
    gameState="play"
    start.hide( )
  })
  text("Shoot all the planes to get the high score!",25,250)
}
  
  if(gameState==="play"){
    player.visible=true
    
  player.velocityX=0 
  player.debug=true
  player.setCollider("rectangle",0,0,320,400)
   if(keyDown("left")){
     player.velocityX = -10
   }
   if(keyDown("right")){
    player.velocityX = 10
  }
  player.collide(edges)
  spaceships()
  if(keyDown("space")&& frameCount%3 ===0 && count >0){
    bullet=createSprite(player.x,player.y,10,10)
    bullet.velocityY=-10
    bulletgroup.add(bullet)
    count=count-1
  }
 for (var i = 0;i <enemygroup.length;i++){
  if(enemygroup.get(i).y >500){
    gameState="end"
  }
   for(var j = 0;j<bulletgroup.length;j++){
      if(bulletgroup.get(j) != undefined && enemygroup.get(i)!== undefined){
        if(bulletgroup.get(j).isTouching(enemygroup.get(i))&&enemygroup.get(i).y>200){
      enemygroup.get(i).destroy()
      bulletgroup.get(j).destroy()
      score= score+50
      }
    }
  }
  
  }
 
  if(player.isTouching(ammogroup)){
    count=count+25
ammogroup.destroyEach()
  }

    ammos()
    if(ammo && ammogroup[0]){
    ellipseMode(RADIUS)
    fill(rgb(50,255,0))
    ellipse(ammo.x,ammo.y,60,60)
    }
  }
  if(gameState==="end"){
    if(highscore<score){
      highscore=score
    }
    enemygroup.destroyEach()
    ammogroup.destroyEach()
    player.visible=false
    text("Game Over", 225,300)
    text("Press R to restart", 175,350)
    text("Highscore: "+highscore,200,400)
    if(keyDown("r")){
      gameState="play"
      score=0
      count =25
    }
  }
  drawSprites();
}

function spaceships (){
 var num = 60
 num = num - Math.round(score/250)
if(frameCount%num===0 || frameCount === 1){
  spaceship=createSprite(random(50,550),-20,50,50)
  spaceship.velocityY=4+score/100
  spaceship.rotation=180
  
  switch(Math.round(random(1,2))){
    case 1: spaceship.addImage(ship1)
    spaceship.scale = 0.6
    break;
    case 2: spaceship.addImage(ship2)
    spaceship.scale = 0.3
    break
  }
  spaceship.lifetime=200
  enemygroup.add(spaceship)
}
}

function ammos(){
  var nim = 400
  nim=nim-Math.round(score/1000)
  if (frameCount%nim===0){
    ammo = createSprite(random(50,550),-20,50,50)
    ammo.addImage(ammoimg)
    ammo.velocityY=4+score/100
    ammo.scale = 0.4
    ammogroup.add(ammo)
  }
}