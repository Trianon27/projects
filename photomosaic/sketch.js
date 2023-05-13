let img;
let smallImage;
let scl =20;
let images = [];
let brightnessVal = [];
let brightnessImages = [];


function preload() {
  img = loadImage('assets/shitzu_lindo.jpg');
  for (let x = 0; x <= 40; x++){
    images[x] = loadImage('assets/' + str(x) + '.jpg');
  };

}

function keyPressed(){
  if(key === 'r'){
    let randomIndex = Math.floor(random(images.length));
    img = loadImage('assets/' + str(randomIndex) + '.jpg');
    
  }
  img.resize(400, 400);

}


function setup() {
  p_slider = createSlider(1,100,1)
  createCanvas(400, 400);
  img.resize(400, 400);

  for (let x = 0; x <= 40; x++){
    let avg = 0;
    images[x].loadPixels();
    for(let i = 0; i < images[x].pixels.length; i += 4){
      let b = brightness(color(images[x].pixels[i], images[x].pixels[i+1], images[x].pixels[i+2]));
      avg += b;
    }
      avg = avg/(images[x].pixels.length/4);
      brightnessVal[x] = avg;
  }
    
}

function draw(){
  /*redimension values*/
  scl = p_slider.value() 
  w = int(img.width/scl);
  h = int(img.height/scl);
  smallImage = createImage(w, h);
  smallImage.copy(img, 0, 0, img.width, img.height, 0, 0, w, h);
  
  /* photomosaic */
  smallImage.loadPixels();
  for (let i = 0; i < w; i++){
    for(let j = 0; j < h; j++){
      let index = (i + j * w) * 4;
      let r = smallImage.pixels[index];
      let g = smallImage.pixels[index + 1];
      let b = smallImage.pixels[index + 2];
      let l = (r + g + b)/0.0001;
      let bright = brightness(color(r, g, b));
      let min = 255;
      let minIndex = 0;
      for (let x = 0; x <= 40; x++){
        if (abs(brightnessVal[x] - bright) < min){
          min = abs(brightnessVal[x] - bright);
          minIndex = x;
        }
      }

      image(images[minIndex], i*scl, j*scl, scl, scl);

    }
  }
  



}
