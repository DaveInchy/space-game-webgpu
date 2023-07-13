uniform sampler2D globeTexture;
varying vec2 vUV;
varying vec3 vNormal;

float noise(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    float n = noise(vUV);
    float i = 1.25 - dot(vNormal, vec3(0.9, 0.9, 0.9));
    vec3 fade = vec3(0.4, 0.4, 0.4) * pow(i, 1.0);
    gl_FragColor = vec4(fade + texture2D(globeTexture, vUV).xyz, n);
}