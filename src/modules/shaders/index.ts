import atmosFrag from "./fragment/atmosphere.glsl";
import atmosVert from "./vertex/atmosphere.glsl";
import cloudsFrag from "./fragment/clouds.glsl";
import cloudsVert from "./vertex/clouds.glsl";
import globeFrag from "./fragment/globe.glsl";
import globeVert from "./vertex/globe.glsl";
import noiseFrag from "./noise.ffx";
import normalVert from "./normalized.vfx";
import sunFrag from "./fragment/sun.glsl";
import sunVert from "./vertex/sun.glsl";

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