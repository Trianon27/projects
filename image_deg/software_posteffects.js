

let img;
let canvas;

let effect = 0; // Variable para controlar el efecto activo

function preload(){
  img = loadImage('assets/shitzu_lindo.jpg');
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);
  noLoop();
}

function draw() {
  background(220);
  image(img, 0, 0);
  
  switch (effectIndex) {
    case 0:
      applyEffect1();
      break;
    case 1:
      applyEffect2();
      break;
    case 2:
      applyEffect3();
      break;
    default:
      break;
  }
}



function applyEffect1() {
  img.resize(400, 400);
  image(img, 0, 0);

  for (let i = 0; i < width; i += 10) {
    let stripeXPosition = int(random(0, img.width - 10));
    let stripx = img.get(stripeXPosition, 0, 10, img.height);
    image(stripx, i, 0);
  }
}

function applyEffect2() {
  img.resize(width, height);
  image(img, 0, 0);

  const range = 250;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pixelColor = img.get(i + random(range), j + random(range));
      stroke(pixelColor);
      point(i, j);
    }
  }
}

function applyEffect3() {
  let resultImg = createGraphics(img.width, img.height);

  for (let col = 0; col < img.width; col++) {
    for (let row = 0; row < img.height; row++) {
      let xPos = random(col);
      let yPos = random(row);

      let c = img.get(xPos, yPos);
      resultImg.noFill();
      resultImg.strokeWeight(random(5));
      resultImg.stroke(color(c));
      resultImg.curve(
        xPos + random(160),
        yPos + random(90),
        xPos - random(90),
        yPos - random(160),
        xPos + random(160),
        yPos + random(90),
        xPos - random(90),
        yPos - random(160)
      );
    }
  }
  
  image(resultImg, 0, 0);
}
function keyPressed(event) {
  if (event.keyCode === 49) { // Tecla "1"
    effectIndex = 0;
    redraw();
  } else if (event.keyCode === 50) { // Tecla "2"
    effectIndex = 1;
    redraw();
  } else if (event.keyCode === 51) { // Tecla "3"
    effectIndex = 2;
    redraw();
  }
}
