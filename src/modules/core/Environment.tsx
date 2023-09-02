import Camera from "mods@core/Camera";
import OverlayUI from "./Overlay2D";
import React, { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import Scene from "mods@core/Scene";
import THREE, { BufferGeometry, DoubleSide, Group, MeshToonMaterial, Vector3 } from "three";
import Window3D from "./Window3D";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei/web";
import { extend, useFrame } from "@react-three/fiber";
import { MeshCollider, RapierCollider, RapierContext, RigidBody, RigidBodyAutoCollider, RigidBodyProps, RigidBodyTypeString, Vector3Tuple, useRapier } from "@react-three/rapier";
import { useGameStore } from "mods@utils/states";

export default function Environment({
    children,
}: {
  children?: React.ReactNode
}): JSX.Element
{

    extend({ MeshToonMaterial, BufferGeometry });

    const gameState = useGameStore((state: any) => state.GameState);
    const shareState = useGameStore((state: any) => state.writeGameState);
    const [state, setState] = useState(gameState as unknown as any);

    useEffect(() => {
        (async () => {
            setState(gameState);
        })();
    }, [gameState]);

    useEffect(() => {
        (async () => {
            shareState(state);
        })();
    }, [state]);

    const cameraComponent = useRef();
    const playerComponent = useRef(undefined as unknown as Group);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const storePlayerPosition = (vec3: {x: number, y: number, z: number}): void => {
        try {
            let state = ({
                ...gameState,
                ...{
                    "player": {
                        "position": ({ "x": vec3.x, "y": vec3.y, "z": vec3.z}),
                    }
                }
            });
            setState(state);
        } catch(e: any)
        {
            throw new Error(e.message);
        }
    }

    return (<>
        <div className={"min-w-[100vw] min-h-[100vh] p-0 m-0 fixed overflow-hidden"}>
            <Window3D usePhysics={true}>
                <PerspectiveCamera ref={cameraComponent} lookAt={state.player.position} />
                <ambientLight intensity={0.5} />
                <pointLight args={[0xFFFFFF, 0.8, 1]} />
                <group visible position={[0, 0, -5]}>
                    <RigidBody {...{ "ccd": true, "colliders": "trimesh", "type": "fixed"}}>
                        <mesh visible userData={{}}>
                            <planeGeometry args={[100, 100, 64, 64]} />
                            <meshToonMaterial color={0x009F09} vertexColors={false} side={DoubleSide} />
                        </mesh>
                    </RigidBody>
                </group>
                <group ref={playerComponent} onUpdate={(i) => storePlayerPosition(i.getWorldPosition(i.position))} visible position={[0, 5, 5]}>
                    <RigidBody {...{ "ccd": true, "colliders": "trimesh", "type": "dynamic"}}>
                        <mesh visible userData={{}}>
                            <boxGeometry  args={[1, 1, 1, 1, 1, 1,]}/>
                            <meshToonMaterial color={0x3F3F00} vertexColors={false} side={DoubleSide} />
                        </mesh>
                    </RigidBody>
                </group>
            </Window3D>
        </div>
        <OverlayUI hidden />
    </>)
}