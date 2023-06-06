precision mediump float;

uniform sampler2D u_texture;
varying vec2 vTexCoord;

void main() {
  vec2 flippedTexCoord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec4 color = texture2D(u_texture, flippedTexCoord);
  
  gl_FragColor = color;
}