let img;
let shaderProgram;
let reloadButton;
let intervalSlider;

let vertices = [];
let interval = 1000;
let intervalId; // Variable para almacenar el ID del intervalo

function preload() {
  let randomNum = Math.floor(random(0, 40));
  img = loadImage('assets/' + str(randomNum) + '.jpg');
  shaderProgram = loadShader('shaders/shader.vert', 'shaders/shader.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);

  reloadButton = createButton('Recargar');
  reloadButton.position(10, height + 10);
  reloadButton.mousePressed(reloadImageAndPage);

  interval = 1000; // Establece el intervalo inicial en 1000
  intervalSlider = createSlider(0.1, 1000, interval, 1);
  intervalSlider.position(10, height + 40);
  intervalSlider.style('width', '380px');
  intervalSlider.input(changeInterval);

  // Inicializa los vértices del dibujo con valores aleatorios
  for (let i = 0; i < 4; i++) {
    vertices.push([random(-1, 1), random(-1, 1)]);
  }

  intervalId = setInterval(changeVertexValues, interval); // Almacena el ID del intervalo
}

function draw() {
  shader(shaderProgram);
  shaderProgram.setUniform('u_texture', img);

  beginShape();
  for (let i = 0; i < 4; i++) {
    let vertexData = vertices[i];
    vertex(vertexData[0], vertexData[1], i % 2, floor(i / 2));
  }
  endShape(CLOSE);
}

function changeVertexValues() {
  // Genera nuevos valores aleatorios para los vértices
  for (let i = 0; i < 4; i++) {
    vertices[i] = [random(-1, 1), random(-1, 1)];
  }

  redraw(); // Vuelve a dibujar la escena con los nuevos valores
}

function reloadImageAndPage() {
  // Recarga la imagen
  let randomNum = Math.floor(random(0, 40));
  img = loadImage('assets/' + str(randomNum) + '.jpg');

  // Recarga la página
  location.reload();
}

function changeInterval() {
  // Cambia el intervalo del setInterval
  interval = intervalSlider.value();
  clearInterval(intervalId); // Cancela el intervalo actual utilizando el ID almacenado
  intervalId = setInterval(changeVertexValues, interval); // Establece el nuevo intervalo
}
