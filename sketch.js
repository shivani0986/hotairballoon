var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var balloon,balloonImage;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var ballonHeight = database.ref("ballon/height");
  ballonHeight.on("value",readheight,showerror);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateheight(-15,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updateheight(15,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updateheight(0,-15);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    
  }
  else if(keyDown(DOWN_ARROW)){
    updateheight(0,15);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
   
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateheight(x,y){
  database.ref("balloon/height").set({
    'x':height.x+x,
    'y':height.y+y
  })
}
function readheight(data){
  height = data.val()
  balloon.x = height.x
  balloon.y = height.y
}
function showerror(){
  console.log("error in writing to the database");
}