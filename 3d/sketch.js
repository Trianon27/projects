var modelo3D;
var cam;
var moveSpeed = 0.1;
var rotateSpeed = 0.01;
var camX = 0;
var camY = 0;
var camZ = 0;

function preload() {
  modelo3D = loadModel('../3d_model/Backrooms_Original_Baked.obj');
}

/* Camera movement */
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    camX -= moveSpeed;
  } else if (keyCode === RIGHT_ARROW) {
    camX += moveSpeed;
  } else if (keyCode === UP_ARROW) {
    camY -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    camY += moveSpeed;
  }
}


function setup() {
  createCanvas(800, 800, WEBGL);
  cam = createCamera(); // Crear la cámara
  camX = 0;
  camY = 0;
  camZ = 0;
  cam.setPosition(camX, camY, camZ);  
}

function draw() {
  
  background(220);
  orbitControl(); // Habilitar el control de órbita de la cámara
  scale(200);
  keyPressed();
  model(modelo3D);
 
  

}
