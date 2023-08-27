varying vec3 vNormal;

void main() {
  float i = pow(1.5 - dot(vNormal, vec3(1.0, 1.0, 1.0)), 1.0);
  gl_FragColor = vec4(0.4, 0.4, 0.4, 0.4) * i;
}