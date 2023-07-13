import THREE, { AdditiveBlending, BackSide, DoubleSide, Euler, Group, Mesh, NormalBlending, Object3D, SubtractiveBlending, Texture, TextureLoader, Vector3 } from "three";
import ambient from "mods@shaders/textures/ceres_ambient.jpg";
import clouds from "mods@shaders/textures/8k_clouds.jpg";
import color from "mods@shaders/textures/ceres_colormap.jpg";
import depth from "mods@shaders/textures/ceres_displacement.jpg";
import normal from "mods@shaders/textures/ceres_normal.jpg";
import rings from "mods@shaders/textures/ring_colormap.png";
import shaders from "mods@shaders";
import specular from "mods@shaders/textures/ceres_specular.jpg";
import { RootState, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function CelestialObject({
    name,
    hasAtmosphere = true,
    hasRings = false,
    location = new Vector3(0, 0, 0),
    forwardRef,
}: {
    name: string,
    hasAtmosphere: boolean,
    hasRings: boolean,
    location?: Vector3,
    forwardRef: (target: MutableRefObject<any>) => void,
}): JSX.Element {

    // Load Textures
    // const [T_COLOR, T_NORMAL, T_AMBIENT, T_SPECULAR, T_DEPTH, T_CLOUDS, T_RINGS]: (Texture | undefined | null)[]
    //     = useTextureMap([color.src, normal.src, ambient.src, specular.src, depth.src, clouds.src, rings.src]) as (Texture | undefined | null)[];

    // Weather 'n Clouds movement.
    const [offSet, setOffSet] = useState(0);
    const [{ T_COLOR, T_ClOUDS, T_RINGS }, setTextures] = useState({ T_COLOR: typeof Texture, T_ClOUDS: typeof Texture, T_RINGS: typeof Texture, } as any);

    // Group of Meshes passback to parent.
    const backwardRef = useRef(undefined as unknown as any);

    // Mesh references for use in react state
    const ringRef = useRef(undefined as unknown as any);
    const surfaceRef = useRef(undefined as unknown as any);
    const atmosRef = useRef(undefined as unknown as any);
    const atmosRef2 = useRef(undefined as unknown as any);

    // loading textures;
    useEffect(() => {
        const loader = new TextureLoader();
        setTextures({
            T_COLOR: loader.load(`/textures/${name}_colormap.jpg`, (texture: Texture) => {
                console.log(`[loading]`, "texture:", texture);
            }, (progress: ProgressEvent<EventTarget>) => {
                var total = progress.total;
                var units = progress.loaded;
                var unitPercent = total / 100;
                var totalPercent = units * unitPercent;
                console.log(`[loading]`, `texture loading: ${totalPercent}\%`);
            }, (event: ErrorEvent) => {
                if (event.error) {
                    var a = event.message;
                    var b: any = event.error;
                    if (b === typeof String) {
                        console.error(`${b}`);
                    } else {
                        console.error(`${a}`);
                    }
                }
            }) as Texture,
            T_ClOUDS: loader.load(`/textures/2k_clouds.jpg`, (texture: Texture) => {
                console.log(`[loading]`, "texture:", texture);
            }, (progress: ProgressEvent<EventTarget>) => {
                var total = progress.total;
                var units = progress.loaded;
                var unitPercent = total / 100;
                var totalPercent = units * unitPercent;
                console.log(`[loading]`, `texture loading: ${totalPercent}\%`);
            }, (event: ErrorEvent) => {
                if (event.error) {
                    var a = event.message;
                    var b: any = event.error;
                    if (b === typeof String) {
                        console.error(`${b}`);
                    } else {
                        console.error(`${a}`);
                    }
                }
            }),
            T_RINGS: loader.load(`/textures/ring_colormap.png`, (texture: Texture) => {
                console.log(`[loading]`, "texture:", texture);
            }, (progress: ProgressEvent<EventTarget>) => {
                var total = progress.total;
                var units = progress.loaded;
                var unitPercent = total / 100;
                var totalPercent = units * unitPercent;
                console.log(`[loading]`, `texture loading: ${totalPercent}\%`);
            }, (event: ErrorEvent) => {
                if (event.error) {
                    var a = event.message;
                    var b: any = event.error;
                    if (b === typeof String) {
                        console.error(`${b}`);
                    } else {
                        console.error(`${a}`);
                    }
                }
            })
        })
    }, [name]);

    // Backwards Reference.
    useEffect(() => {
        forwardRef(backwardRef)
    }, [forwardRef, backwardRef])

    // Frame Modifiers
    useFrame(async (state: RootState, timeDelta: number, frame: any) => {
        // positioning should be done once

        // Define
        let rings: Mesh;
        var atmosphere: Mesh;
        var geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;


        // Group & children
        var group: Group = backwardRef.current;
        var children: Object3D<THREE.Event>[] = group.children;

        group.position.setX(location.x);
        group.position.setY(location.y);
        group.position.setZ(location.z);

        var wPos = group.getWorldPosition(group.position);

        type x = number;
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
            rotAtmos.z = x + cloudAnim.z;
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

        setOffSet(offSet + timeDelta / 8);

    })

    // Render Geometry Component.
    return (
        <group ref={backwardRef}>

            {(hasRings) ? <>
                {/* Body Rings */}
                <mesh ref={ringRef}>
                    <ringGeometry
                        args={[1.5, 2.5, 128]}
                    />
                    <meshStandardMaterial
                        transparent={true}
                        map={T_RINGS}
                        alphaMap={T_RINGS}
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
                                value: T_ClOUDS,
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
                            value: T_COLOR,
                        },
                    }}
                    shadowSide={DoubleSide}
                    clipShadows={true} />
            </mesh>

        </group>
    )
}