uniform sampler2D globeTexture;
varying vec2 vUV;
varying vec3 vNormal;

float noise(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    float i = 1.05 - dot(vNormal, vec3(0.9843, 0.9451, 0.3804));
    float n = noise(vUV.xy);
    vec3 atmosphere = vec3(1.0, 0.349, 0.0) * pow(i + n, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vUV.xy).xyz, n);
}