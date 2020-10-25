//Create variables here
var dog, happydog, database, foodStock, foodS, foodObj, Nameinput, bedroom, washroom, garden, saddog, game, sadDog,currenttime;

function preload() {
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  sadDog = loadImage("images/Lazy.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  //dog
  dog = createSprite(750, 300, 100, 100);
  dog.scale = 0.3;
  dog.addImage("1", dogimg);
  dog.addImage("2", happydog);

  //food object
  foodObj = new Food();
  foodObj.getfoodstock();

  //add food button
  addfood = createButton("Add Food");
  addfood.position(750, 500);
  addfood.hide();
  addfood.mousePressed(() => {
    foodObj.addfood();
  });

  //deduct food button
  Deductfood = createButton("Feed Dog");
  Deductfood.position(850, 500);
  Deductfood.hide();

  //input for name
  Nameinput = new Form();
  NameObj = new Name();
  NameObj.getname();

  //gamestate
  game = new Game();
  game.getstate();

}

function draw() {

  //gamestate changes
  currenttime = hour();
  if (currenttime === (foodObj.lastfed + 1)) {
    console.log("state changed");
    game.garden();
    game.state = "Playing";
    game.updatestate(game.state);
  }
  else if(currenttime === (foodObj.lastfed + 2)){
    console.log("state changed");
    game.state = "Sleeping";
    game.bedroom();
    game.updatestate("Sleeping");
  }
  else if (currenttime > (foodObj.lastfed + 2) && currenttime <= (foodObj.lastfed + 4)) {
    console.log("state changed");
    game.washroom();
    game.state = "Bathing";
    game.updatestate("Bathing");
  }
  else {
    console.log("state changed");
    background(150,255,100);
    foodObj.display();
    dog.visible = true;
    addfood.show();
    Deductfood.show();
    game.state = "Hungry";
    game.updatestate("Hungry");
  }


  //display methods of food and nameinput
  Nameinput.display();
  NameObj.display();

  //mouse pressed condition
  Deductfood.mousePressed(() => {
    dog.changeImage("2");
    foodObj.deductfood();
    foodObj.lastfed = hour();
    database.ref("/").update({
      Lastfeed: foodObj.lastfed
    })
  });

  drawSprites();

  //lastfeed time
  foodObj.getlastfedtime();
  foodObj.displaylastfedtime();
  
  //text
  textSize(15);
  text("Food Stock = " + foodObj.foodstock, 100, 50);
}