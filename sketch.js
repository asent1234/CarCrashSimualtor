var gameState, car, carweight, carspeed, cardeformation, wall, manualbutton, randombutton, carweightran, speedran, carcrashstate,manualsimb
let input, button,iw, is;
function setup() {
  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);
  
  carweight = 0;
  carspeed = 0;
  cardeformation = 0;
  carcrashstate = "..."
  wall = createSprite( 750, 200, 10, 200);
  car = createSprite(100,200,60,40)
  gameState = "choose";
  randombutton = createSprite(200, 300, 300, 50);
  manualbutton = createSprite(600, 300, 300, 50);
  manualsimb = createSprite(500, 200, 300, 50);

  //input = createInput();
  //input.position(20, 65);
  iw = createInput();
  iw.position(50, 105);
  //is = createInput();
  //is.position(50, 105);
  button = createButton('submit');
  button.position(iw.x + iw.width, 65);
  button.mousePressed(chooser);
}

function draw() {
  background("black");
  createEdgeSprites();
  if(gameState === "choose"){
    //stroke("white"); 
    iw.position(550, 420);
    button.position(iw.x + iw.width, 430);
    wall.visible = false 
    car.visible = false
    manualbutton.visible = false
    randombutton.visible = false
    manualsimb.visible = false
    iw.hide();
    button.hide();
    fill("white");
    text("Welcome to the car crash simulator. Please choose wether you want"+ 
    " random values or manual values by clicking on the buttons below. \n Please Ignore, the bar and submit button as they are to be used within the Manual section only.", 50, 100);
    textSize(50);
    drawSprites();
    text("RANDOM",80,320);
    if(mousePressedOver(randombutton)){
      gameState = "randomvalues";
      carweight = random(400,1500)
      carspeed = random(55,90)
    }
    text("MANUAL",480,320);
    if(mousePressedOver(manualbutton)){
      gameState = "manualweight";

    }
    
  }  
  if(gameState === "manualweight"){
    background("black");
    iw.position(50, 105);
    button.position(iw.x + iw.width, 95);
    text("What is your weight?",40, 87);
    button.show();
    iw.show();
    textSize(20);
    
    fill("white");
    text("Write in the input box to change the weight. It must be an integer. Our recommendation \n is any value between a range of 400 - 1500.Enter your value in the bar, then click submit \n to change the weight.After, Press Space to start choice of Speed.", 10, 20);
    text(('Car Weight: ' + carweight), 70,150 );
    text(('Car Speed: ' + carspeed), 70,250 );
    // get the text entered 
    if(keyDown("space")){
    gameState = "manualspeed";
    }
  }
  if(gameState === "manualspeed"){
    background("black");
    text("What is your speed?",45, 95)
    iw.position(50, 105);
    button.position(iw.x + iw.width, 105);
    textSize(20);
    
    manualsimb.visible = true;
    fill("white");
    text("Write in the input box to change the speed. It must be an integer. Our recommendation \n is any value between a range of 55-90 Enter your value in the bar, then click submit to \n change the speed.After, click the Continue button to start the simulation", 10, 20);
    
    text(('Car Weight: ' + carweight), 70,150 );
    text(('Car Speed: ' + carspeed), 70,250 );

    drawSprites();
    // get the text entered 
    textSize(50);
    text("CONTINUE",370,220);
    if(mousePressedOver(manualsimb)){
      gameState = "manualsim";
      if(carspeed< 65){
        car.velocityX = 6;
      }
      
      if((carspeed< 77)&& (carspeed> 65)){
        car.velocityX = 8;
      }
      
      if(carspeed > 77){
        car.velocityX = 10 ;
      }
      
      wall.visible = true;
      car.visible = true;
      manualsimb.visible = false;
      cardeformation = ((0.5*(carweight*(carspeed*carspeed)))/22500);
    }
  }
  if(gameState === "manualsim"){
    background("black");
    iw.position(550, 420);
    button.position(iw.x + iw.width, 430);
    iw.hide();
    button.hide();
    drawSprites();
    textSize(20);
    
    if(car.overlap(wall)){
      console.log(car.velocityX)
      car.velocityX = 0 ;
      if(cardeformation<80){
        car.shapeColor = "green";
        carcrashstate = "good";
      }
      if((cardeformation<= 180)&& (cardeformation >= 80)){
        car.shapeColor = "yellow";
        carcrashstate = "average";
      }
      
      if(cardeformation>180){
        car.shapeColor = "red";
       carcrashstate = "lethal for passengers" ;
      }
    }
    car.collide(wall);

    
    text("Car Weight: " + Math.round(carweight),80, 330);
    text("Car Speed: " + Math.round(carspeed) + " kph", 280, 330);
    text("Car Deformation: " + Math.round(cardeformation), 480, 330);
    text("The deformation is " + carcrashstate, 300, 200 );
    text("Press Space to Start a New Simulation", 30, 300);
    if(keyDown("space")){
      gameState = "choose"
      carcrashstate = "..."
      car.x = 100
      car.y = 200
      car.shapeColor = "gray"
      carspeed = 0
      carweight = 0
    }
  }
  if(gameState === "randomvalues"){
    manualsimb.visible = true
    textSize(20);
    fill("white");
    text("Your random values for this simulation are:",80, 100)
    text("Car Weight: " + Math.round(carweight),120, 150)
    text("Car Speed: " + Math.round(carspeed) + " kph", 120, 230)
    //text("Press Space to Start Simulation", 80, 330)
    text("CONTINUE",370,220);
    drawSprites();
    // get the text entered 
    textSize(50);

    text("CONTINUE",370,220);
    if(mousePressedOver(manualsimb)){
      gameState = "randomsim";
      cardeformation = ((0.5*(carweight*(carspeed*carspeed)))/22500)
      
    if(carspeed< 65){
      car.velocityX = 6;
    }
    
    if((carspeed< 77)&& (carspeed> 65)){
      car.velocityX = 8;
    }
    
    if(carspeed > 77){
      car.velocityX = 10 ;
    }
    wall.visible = true;
    car.visible = true;
    manualsimb.visible = false;
    }
  }
  if(gameState === "randomsim"){
    background("black");
    drawSprites();
    textSize(20);
    
    if(car.overlap(wall)){
      console.log(car.velocityX)
      car.velocityX = 0 
      if(cardeformation<80){
        car.shapeColor = "green"
        carcrashstate = "good"
      }
      if((cardeformation<= 180)&& (cardeformation >= 80)){
        car.shapeColor = "yellow"
        carcrashstate = "average"
      }
      
      if(cardeformation>180){
        car.shapeColor = "red"
       carcrashstate = "lethal for passengers" 
      }
    }
    car.collide(wall);

    
    text("Car Weight: " + Math.round(carweight),80, 330)
    text("Car Speed: " + Math.round(carspeed) + " kph", 280, 330)
    text("Car Deformation: " + Math.round(cardeformation), 480, 330)
    text("The deformation is " + carcrashstate, 300, 200 )
    text("Press Space to Start a New Simulation", 80, 270)
    if(keyDown("space")){
      gameState = "choose"
      carcrashstate = "..."
      car.x = 100
      car.y = 200
      car.shapeColor = "gray"
      carspeed = 0
      carweight = 0
    }
  }
  
}
function chooser() {
  const weightinput = iw.value();
  if(gameState === "manualweight"){
  carweight = iw.value();
  }
  if(gameState === "manualspeed"){
    carspeed = iw.value();
  }
  //text(('hello ' + weightinput), 100,100 );
  iw.value('');
}
 
