let img;
let canvas;

function preload(){
  img = loadImage('assets/shitzu_lindo.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
 

}

function draw() {
  background(220);
  image(img, 0, 0); 
  let newCanvasX = (windowWidth - img.width)/2;
  let newCanvasY = (windowHeight - img.height)/2;
  canvas.position(newCanvasX, newCanvasY);

  for(let col = 0; col < img.width; col++){
    for(let row = 0; row < img.height; row++){
      let xPos  = col;
      let yPos = row;

      let c = img.get(xPos, yPos);
      push(c);
      translate(Xpos, yPos);
      rotate(radians(random(360)));
      nonfill(c);
      strokeWeight(random(5));
      point(xPos, yPos);
      strokeWeight(random(3));
      stroke(color(c));      
      curve(xPos, yPos, random(20), yPos, xPos, sin(yPos), xPos, cos(yPos));
      pop();
    }
  }
}
