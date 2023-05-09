let img;
let canvas;

function preload(){
  img = loadImage('assets/shitzu_lindo.jpg');

}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);
  noLoop();

}

function draw() {

  image(img, 0, 0); 

    for(let col = 0; col < img.width; col++){
      for(let row = 0; row < img.height; row++){
        let xPos  = random(col);
        let yPos = random(row);

        let c = img.get(xPos, yPos);
        /* rotate(radians(random(360))); */
        noFill(c);
        strokeWeight(random(5));
        strokeWeight(random(3));
        stroke(color(c));      
        curve(xPos + random(160), yPos + random(90), xPos  - random(90), yPos - + random(160), 
        xPos + + random(160), yPos + + random(90), xPos - + random(90), yPos - + random(160));
      }
    }
}

