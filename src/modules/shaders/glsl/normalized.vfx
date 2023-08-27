varying vec2 vUV;
varying vec3 vNormal;

void main() {
    vUV = uv;
    vUV = vec2(1.0 - vUV.s, 1.0 - vUV.t);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}