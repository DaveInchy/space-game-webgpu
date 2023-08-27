import atmosFrag from "./glsl/fragment/atmosphere.glsl";
import atmosVert from "./glsl/vertex/atmosphere.glsl";
import cloudsFrag from "./glsl/fragment/clouds.glsl";
import cloudsVert from "./glsl/vertex/clouds.glsl";
import globeFrag from "./glsl/fragment/globe.glsl";
import globeVert from "./glsl/vertex/globe.glsl";
import noiseFrag from "./glsl/noise.ffx";
import normalVert from "./glsl/normalized.vfx";
import sunFrag from "./glsl/fragment/sun.glsl";
import sunVert from "./glsl/vertex/sun.glsl";

const ShaderLib = ({
    Vertex: {
        normalized: normalVert,
    },
    Fragment: {
        randomNoise: noiseFrag,
    },
    Atmosphere: {
        vert: atmosVert,
        frag: atmosFrag,
    },
    Sun: {
        vert: sunVert,
        frag: sunFrag,
    },
    Globe: {
        vert: globeVert,
        frag: globeFrag,
    },
    Clouds: {
        vert: cloudsVert,
        frag: cloudsFrag,
    }
});

export default ShaderLib;