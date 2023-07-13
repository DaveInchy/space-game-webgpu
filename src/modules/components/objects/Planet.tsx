import THREE, { AdditiveBlending, BackSide, DoubleSide, Euler, Group, Mesh, Object3D, Texture, TextureLoader, Vector3 } from "three";
import shaders from "mods@shaders";
import { RootState, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Planet({
    name,
    scale = 1,
    location = new Vector3(0, 0, 0),
    hasAtmosphere = true,
    hasRings = false,
    refCallback,
}: {
    name: string,
    location?: Vector3,
    scale?: number,
    hasAtmosphere: boolean,
    hasRings: boolean,
    refCallback: (target: MutableRefObject<any>) => void,
}): JSX.Element {

    // Load Textures
    // const [T_COLOR, T_NORMAL, T_AMBIENT, T_SPECULAR, T_DEPTH, T_CLOUDS, T_RINGS]: (Texture | undefined | null)[]
    //     = useTextureMap([color.src, normal.src, ambient.src, specular.src, depth.src, clouds.src, rings.src]) as (Texture | undefined | null)[];

    // Weather 'n Clouds movement.
    const [offSet, setOffSet] = useState(0);

    const [globeTex, setGlobeTexture] = useState(undefined as unknown as Texture);
    const [cloudsTex, setCloudsTexture] = useState(undefined as unknown as Texture);
    const [ringsTex, setRingsTexture] = useState(undefined as unknown as Texture);

    const [orbitAngle, setOrbitAngle] = useState(0);

    // Group of Meshes passback to parent.
    const objectRef = useRef(undefined as unknown as any);

    // Mesh references for use in react state
    const ringRef = useRef(undefined as unknown as any);
    const surfaceRef = useRef(undefined as unknown as any);
    const atmosRef = useRef(undefined as unknown as any);
    const atmosRef2 = useRef(undefined as unknown as any);

    var objectOrbitRadius = location.x;

    const loadTexture = (public_path: string) => {
        return new TextureLoader().load(
            // The nextjs public location of the texture image.
            `${public_path}`,

            // onLoaded, onProgress, onError
            (tex) => console.log(tex),
            (progress) => console.log(progress),
            (error) => console.error(error.message)
        );
    }

    // onStartLifeCycle;
    useEffect(() => {

        try {

            var globe = loadTexture(`/textures/${name}_colormap.jpg`);
            var clouds = loadTexture(`/textures/2k_clouds.jpg`);
            var rings = loadTexture(`/textures/ring_colormap.png`);

            setGlobeTexture(globe);
            setCloudsTexture(clouds);
            setRingsTexture(rings);

        } catch(e)
        {
            console.error(`Exception Caught while Loading textures: ${name}\n\rError: ${e}`);
        }

        try {

            // Group & children
            var group: Group = objectRef.current;
            var children: Object3D<THREE.Event>[] = group.children;

            if (location !== undefined) {

                group.position.setX(location.x);
                group.position.setY(location.y);
                group.position.setZ(location.z);

            }

            group.scale.setX(scale);
            group.scale.setY(scale);
            group.scale.setZ(scale);

            var wPos = group.getWorldPosition(group.position);
            console.log(`Placed ${name} in World at Location:`, wPos);

        } catch (e) {
            console.error(`Exception Caught while setting initial world position: ${name}\n\rError: ${e}`);
        }

    }, [location, name, scale]);

    // Backwards Reference.
    useEffect(() => {
        refCallback(objectRef)
    }, [refCallback, objectRef])

    // Frame Modifiers
    useFrame(async (state: RootState, timeDelta: number, frame: any) => {

        // Define
        let rings: Mesh;
        var atmosphere: Mesh;
        var geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;

        type x = typeof Math.PI;
        type y = typeof Math.PI;
        type z = typeof Math.PI;

        const alpha: x = Math.PI / 2;
        const beta: y = Math.PI;
        const gamma: z = Math.PI / 2;
        const [x, y, z]: [x, y, z] = [alpha, beta, gamma];

        var sphereAnim = new Vector3(alpha, (offSet) * beta, gamma * 1);
        var cloudAnim = new Vector3(alpha, (offSet * 1.25) * beta, gamma * 1);
        var ringAnim = new Euler(alpha * 0.95, beta * 0.05, (-offSet) * gamma, "XYZ");

        // Planet Surface
        var surface: Mesh = surfaceRef.current;
        var geometry = surface.geometry;
        geometry.center();

        var rotSurface = surface.rotation;
        rotSurface.x = x + sphereAnim.x;
        rotSurface.y = y + sphereAnim.y;
        rotSurface.z = z + sphereAnim.z;

        // Planet Atmosphere
        (hasAtmosphere) ? (() => {
            atmosphere = atmosRef.current;
            geometry = atmosphere.geometry;
            geometry.center();

            atmosphere = atmosRef2.current;
            geometry = atmosphere.geometry;
            geometry.center();

            var rotAtmos = atmosRef.current.rotation;
            rotAtmos.x = x + cloudAnim.x;
            rotAtmos.y = y + cloudAnim.y;
            rotAtmos.z = z + cloudAnim.z;
        })() : null;

        // Planet Rings
        (hasRings) ? (() => {
            rings = ringRef.current;
            geometry = rings.geometry;
            geometry.center();

            var rotRings = rings.rotation;
            rotRings.x = ringAnim.x;
            rotRings.y = ringAnim.y;
            rotRings.z = ringAnim.z;
        })() : null;

        //run the earth's orbit around the Sun
        var speed = (objectOrbitRadius / 10 < 2) ? 10 * objectOrbitRadius : 0.1 * objectOrbitRadius;
        setOrbitAngle(orbitAngle - (timeDelta * speed));
        var radians = orbitAngle * Math.PI / 180;

        var object = objectRef.current;
        var position = object.position;

        position.x = Math.cos(radians) * objectOrbitRadius;
        position.z = Math.sin(radians) * objectOrbitRadius;

        setOffSet(offSet + timeDelta / 8);

    })

    useFrame(() => {
    })

    // Render Geometry Component.
    return (
        <group ref={objectRef}>

            {(hasRings) ? <>
                {/* Body Rings */}
                <mesh ref={ringRef}>
                    <ringGeometry
                        args={[1.5, 2.5, 128]}
                    />
                    <meshStandardMaterial
                        transparent={true}
                        map={ringsTex}
                        alphaMap={ringsTex}
                        roughness={1}
                        side={DoubleSide}
                    />
                </mesh>
            </> : null}

            {(hasAtmosphere) ? <>
                {/* Clouds & Atmosphere */}
                <mesh ref={atmosRef}>
                    <sphereGeometry
                        args={[1.025, 128,128]}
                    />
                    <shaderMaterial
                        vertexShader={shaders.Clouds.vert}
                        fragmentShader={shaders.Clouds.frag}
                        uniforms={{
                            "cloudsTexture": {
                                value: cloudsTex,
                            }
                        }}
                        transparent={true}
                        opacity={0.5}
                        blending={AdditiveBlending} />
                </mesh>
                <mesh ref={atmosRef2}>
                    <sphereGeometry
                        args={[1.05, 128, 128]}
                    />
                    <shaderMaterial
                        vertexShader={shaders.Atmosphere.vert}
                        fragmentShader={shaders.Atmosphere.frag}
                        blending={AdditiveBlending}
                        side={BackSide} />
                </mesh>
            </> : null}

            {/* Surface & Water */}
            <mesh ref={surfaceRef}>
                <sphereGeometry
                    args={[1, 128, 128]}
                />
                <shaderMaterial
                    vertexShader={shaders.Globe.vert}
                    fragmentShader={shaders.Globe.frag}
                    uniforms={{
                        "globeTexture": {
                            value: globeTex,
                        },
                    }}
                    shadowSide={DoubleSide}
                    clipShadows={true} />
            </mesh>

        </group>
    )
}