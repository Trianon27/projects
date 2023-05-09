let img;
let smallImage;
let scl =20;
let images = [];
let brightness = [];
let brightnessImages = [];


function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/3/30/Shih-Tzu.JPG');
    /*for (let x = 0; x <= 10; x++){
      images[x] = loadImage('assets/' + str(x) + '.jpg');
      let avg = 0;
      for(let i = 0; i < images[x].width; i++){
      images[x].loadPixels();
      let b = brightness(images[x].pixels[i]);
      avg += b;
    };
    avg = avg/ (images[x].width * images[x].height);
    brightness[x] = avg;
  };*/
}

function setup() {
  p_slider = createSlider(1,100,1)
  createCanvas(400, 400);
  img.resize(400, 400);
  brightness = [256];
  
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
      let l = (r + g + b)/0.0000001;
      let col = color(r, g, b, l);
      fill(col);
      noStroke();
      rect(i*scl, j*scl , scl, scl)
    }
  }
  


}
