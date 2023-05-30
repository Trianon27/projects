let player = {
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  state: 'move'
};

let keysDown = {
  LR: [0, 0],
  UD: [0, 0],
  v: [0, 0]   // [ sum(LR), sum(UD)]
};

let camTheta = 0;
let camDist = 250;

let buildings = [];

function Building(x, y, z, width, height, depth) {
  this.pos = createVector(x, y, z);
  this.width = width;
  this.height = height;
  this.depth = depth;

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.width, this.height, this.depth);
    pop();
  };
}

function preload() {
  chess = loadImage('./3d_model/baldosa.jpg');
}

function setup() {
  createCanvas(600, 400, WEBGL);
  camera(0, 500, 500, 0, 0, 0, 0, 0, -1);

  buildings.push(new Building(0, 0, 0, 100, 200, 100));
}

function draw() {
  background(220);
  
  if (mouseIsPressed && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    camTheta += (mouseX - pmouseX) / 100;
  }
  
  camera(
    camDist * cos(camTheta) + player.pos.x,
    camDist * sin(camTheta) + player.pos.y,
    camDist / 1.5 + player.pos.z,
    player.pos.x,
    player.pos.y,
    player.pos.z,
    0, 0, -1
  );
  
  let vmag = dist(0, 0, keysDown.v[0], keysDown.v[1]);
  vmag = vmag > 1 ? 1 : vmag;  // Normalizar vmag a 1
  
  let vth = atan2(keysDown.v[0], keysDown.v[1]);
  
  player.pos.x -= vmag * cos(vth + camTheta);
  player.pos.y -= vmag * sin(vth + camTheta);
  
  // Dibujar el tablero
  texture(chess);
  noStroke();
  plane(500);
  
  // Dibujar los edificios
  fill('red');
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].display();
  }
  
  // Dibujar al jugador
  fill('blue');
  translate(0, 0, 25);
  translate(player.pos.x, player.pos.y, player.pos.z);
  rotateX(PI / 2);
  frame(100, 5);
  fill(0, 0, 255, 200);
  noStroke();
  cylinder(20, 50);
}

function keyPressed() {
  if (keyCode === 87) { // W
    keysDown.UD[0] = 1;
  }
  if (keyCode === 83) { // S
    keysDown.UD[1] = -1;
  }
  if (keyCode === 65) { // A
    keysDown.LR[0] = -1;
  }
  if (keyCode === 68) { // D
    keysDown.LR[1] = 1;
  }
  
  keysDown.v = [keysDown.LR[0] + keysDown.LR[1], keysDown.UD[0] + keysDown.UD[1]];
}

function keyReleased() {
  if (keyCode === 87) { // W
    keysDown.UD[0] = 0;
  }
  if (keyCode === 83) { // S
    keysDown.UD[1] = 0;
  }
  if (keyCode === 65) { // A
    keysDown.LR[0] = 0;
  }
  if (keyCode === 68) { // D
    keysDown.LR[1] = 0;
  }
  
  keysDown.v = [keysDown.LR[0] + keysDown.LR[1], keysDown.UD[0] + keysDown.UD[1]];
}

function frame(n, w) {
  fill(0);
  strokeWeight(w);
  stroke('red');
  line(0, 0, 0, n, 0, 0);
  stroke('green');
  line(0, 0, 0, 0, n, 0);
  stroke('blue');
  line(0, 0, 0, 0, 0, n);
}
