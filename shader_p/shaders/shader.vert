precision mediump float;

attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  gl_Position = vec4(aPosition, 1.0);
  vTexCoord = (aPosition.xy) / -1.0;
}