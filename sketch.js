//Create variables here
var dog,happyDog,database,foodS,foodStock

function preload(){
 dogImage = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

  createCanvas(500,500);

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //creating sprites object
  dog = createSprite(200,300,100,100);
  dog.addImage("dog",dogImage);
  dog.scale = 0.2;

  
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDog);
  }

  drawSprites();
  fill("black");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",170,20);
  text("Food Remaining "+foodS,170,120);


}
//function to read values in DB
function readStock(data){
  foodS = data.val();
}

//function to write values in DB
function writeStock(x){
if(x <= 0){
  x = 0;
}else{
  x = x-1;
}
  database.ref('/').update({
    Food: x
  })
}



