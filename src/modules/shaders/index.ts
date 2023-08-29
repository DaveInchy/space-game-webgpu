import atmosFrag from "./bin/fragment/atmosphere.bin";
import atmosVert from "./bin/vertex/atmosphere.bin";
import cloudsFrag from "./bin/fragment/clouds.bin";
import cloudsVert from "./bin/vertex/clouds.bin";
import globeFrag from "./bin/fragment/globe.bin";
import globeVert from "./bin/vertex/globe.bin";
import noiseFrag from "./bin/noise.ffx";
import normalVert from "./bin/normalized.vfx";
import sunFrag from "./bin/fragment/sun.bin";
import sunVert from "./bin/vertex/sun.bin";

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