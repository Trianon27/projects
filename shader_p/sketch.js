let img;
let shaderProgram;
let currentEffect = 'vignette';
let toggleButton;

function preload() {
  shaderProgram = loadShader('shaders/shader.vert', 'shaders/unfocus.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  noLoop();

  toggleButton = createButton('Cambiar efecto');
  toggleButton.position(10, height + 10);
  toggleButton.mousePressed(toggleEffect);
}

function loadImageAndApplyEffect() {
  loadImage('https://upload.wikimedia.org/wikipedia/commons/3/30/Shih-Tzu.JPG', function(loadedImg) {
    img = loadedImg;
    redraw();
  });
}

function applyVignetteEffect() {
  shaderProgram = loadShader('shaders/shader.vert', 'shaders/vignette.frag');
  currentEffect = 'vignette';
  loadImageAndApplyEffect();
}

function applyUnfocusEffect() {
  shaderProgram = loadShader('shaders/shader.vert', 'shaders/unfocus.frag');
  currentEffect = 'unfocus';
  loadImageAndApplyEffect();
}

function applyZoomEffect() {
  shaderProgram = loadShader('shaders/shader.vert', 'shaders/zoom.frag');
  currentEffect = 'zoom';
  loadImageAndApplyEffect();
}

function draw() {
  if (!img) return;

  shader(shaderProgram);
  shaderProgram.setUniform('u_texture', img);

  if (currentEffect === 'vignette') {
    background(255);
    shaderProgram.setUniform('u_radius', 0.5);
    shaderProgram.setUniform('u_softness', 0.2);
  } else if (currentEffect === 'unfocus') {
    shaderProgram.setUniform('u_blurAmount', 0.02);
  } else if (currentEffect === 'zoom') {
    shaderProgram.setUniform('u_zoomAmount', 1.5); // Ajusta el valor de zoom aquí
  }

  beginShape();
  vertex(-1, -1, 0, 0);
  vertex(1, -1, 1, 0);
  vertex(1, 1, 1, 1);
  vertex(-1, 1, 0, 1);
  endShape(CLOSE);
}

function toggleEffect() {
  if (currentEffect === 'vignette') {
    applyUnfocusEffect();
  } else if (currentEffect === 'unfocus') {
    applyZoomEffect();
  } else {
    applyVignetteEffect();
  }
}

loadImageAndApplyEffect();