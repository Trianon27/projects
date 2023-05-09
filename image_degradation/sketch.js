let img;

function preload() {
  img = loadImage('assets/shitzu_lindo.jpg');
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  image(img, 0, 0);
  noLoop();
}

function draw() {
  const range =250;
  for (let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++){
    const pixelColor = img.get(i + random(range), j + random(range));
    stroke(pixelColor);
    point(i, j);
    } 
  }
}

