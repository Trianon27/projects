/* import image */
let img;
function preload() {
  img = loadImage('assets/shitzu_lindo.jpg');
}

function setup() {
  createCanvas(400, 400);
  noLoop(); 
}

function draw() {
  background(220);
  img.resize(400, 400);
  image(img, 0, 0); 

  for (let i = 0; i < width; i+= 10) {
    stripeXPosition = int(random(0, img.width-10));
    stripx = img.get(stripeXPosition, 0, 10, img.height);
    image(stripx, i, 0);
  }
}
