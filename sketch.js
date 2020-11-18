let heroNames = [];

let checkbox;
let checkbox2;
let checkbox3;
let checkbox4;

let button;
let countMatch=0;

let rolesA = 'Support';
let rolesB = 'Initiator';
let rolesC = 'Escape';
let rolesD = 'Nuker';

//style analyse values to form diagram ; value from 0 to 100
//connect these points on lines with the center(150,435)
let verV= 30; //point on the diagram line would be (150-verV/2, 435-verV*root3) 
//root3 just as 1.7
let farV= 30; //(150+farV/2,435-farV*1.7)
let fitV= 40; //(150+fitV,435)
let supV= 30; //(150+supV/2,435+supV*1.7)
let pusV= 30; //(150-pusV/2,435+pusV*1.7)
let escV= 40; //(150-escV/2,435)

let img;
let img2;
function preload() {
  img = loadImage('banner.png');
  img2 = loadImage('dotapic.png');
}

function setup() {
  createCanvas(800, 600);
  background(220);
  image(img, 0, 0);
  image(img2, 570, 150);
  
  fill(50);
    text('Choose sentences that descibes who you are, then click the button', 35, 139); 
    text('escape',12,430);
    text('versatility',70,343);
    text('farming',190,343);
    text('fighting',250,430);
    text('pushing',80,530);
    text('supporting',180,530);
  push();
  fill(128,35,68);
  textSize(35);
  text('My hero:', 350, 400); 
  
  noStroke();
  fill(162,153,90,50);
  rect(320,350,390,170);
  pop();
  
  checkbox = createCheckbox('I love to be leaders and shoulder the responsibility.', false);
  checkbox.position(50,170);
  checkbox.changed(myCheckedEvent);
  
  checkbox2 = createCheckbox('I always have patience and persistence to do things.', false);
  checkbox2.position(50,200);
  checkbox2.changed(myCheckedEvent2);
  
  checkbox3 = createCheckbox('Fighting against fate brings me sense of accomplishment', false);
  checkbox3.position(50,230);
  checkbox3.changed(myCheckedEvent3);
  
  checkbox4 = createCheckbox('I appreciate sureness more than surprise and opportunity.', false);
  checkbox4.position(50,260);
  checkbox4.changed(myCheckedEvent4);

  
  button = createButton('Test');
  button.position(450,300);
  button.mousePressed(grabDogData);
  

}

function draw() {
  //draw diagram of play metric analyse
  push();
  noStroke();
  fill(120,197,292,50);
  quad(200,350,150,435,50,435,100,350);
  quad(200,350,150,435,200,520,250,435);
  quad(50,435,150,435,200,520,100,520);
  pop();
  
  stroke(70,100,146);
  strokeWeight(3);
  line(150-verV/2, 435-verV*1.7,150+farV/2,435-farV*1.7);
  line(150+farV/2,435-farV*1.7,150+fitV,435);
  line(150+fitV,435,150+supV/2,435+supV*1.7);
  line(150+supV/2,435+supV*1.7,150-pusV/2,435+pusV*1.7);
  line(150-pusV/2,435+pusV*1.7,150-escV,435);
  line(150-escV,435,150-verV/2, 435-verV*1.7);
  //print(countMatch);
  // if (dogImage) {
  //     image(dogImage, 0, 0, width, height);
  // }
  noStroke();
  fill(50,60,90);
  if(heroNames.length<4){
    for(let k=0; k<heroNames.length; k++){
    push();
    textSize(25);
    fill(50);
    text(heroNames[k], 350, 435+k*30); 
    pop();
  }
  }else{
      for(let h=0; h<3; h++){
    push();
    textSize(25);
    fill(50);
    text(heroNames[h], 350, 435+h*30); 
    pop();
    }

  }

}

function grabDogData() {
  console.log("FETCHING!");
  
  fetch("https://api.opendota.com/api/heroes")
  .then(response => response.json())
  .then(data => loadDogImage(data));
}

function loadDogImage (data) {

    for(let i=0; i<129; i++){
      for(let j=0; j<data[i].roles.length; j++){
        if(data[i].roles[j]===rolesA){
          //print(data[i].localized_name);
          countMatch++;
        }  
        
        if(data[i].roles[j]===rolesB){
          //print(data[i].localized_name);
          countMatch++;
        } 
        
        if(data[i].roles[j]===rolesC){
          //print(data[i].localized_name);
          countMatch++;
        } 
        
        if(data[i].roles[j]===rolesD){
          //print(data[i].localized_name);
          countMatch++;
        } 
      } 
      if(countMatch>3){
        print(data[i].localized_name);
        heroNames.push(data[i].localized_name);
 
      }
      countMatch = 0;
    }
 
}

function myCheckedEvent() {
  if (this.checked()) {
    rolesA = 'Carry';
    fitV+=15;
  }
  }

function myCheckedEvent2() {
  if (this.checked()) {
    rolesB = 'Durable';
    pusV+=15;
    supV+=10;
  }
  }

function myCheckedEvent3() {
  if (this.checked()) {
    rolesC = 'Disabler';
    escV-=15;
    pusV+=10;
    fitV+=15;
    verV+=10;
  }
  }

function myCheckedEvent4() {
  if (this.checked()) {
    rolesD = 'Pusher';
    escV+=10;
    pusV+=15;
    verV-=10;
    farV+=10;
  }
  }