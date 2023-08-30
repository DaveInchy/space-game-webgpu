import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Scene from "mods@core/Scene";
import { Environment, FirstPersonControls, OrbitControls, PerspectiveCamera } from "@react-three/drei/web";
import { extend } from "@react-three/fiber";
import { MeshCollider, RapierCollider, RapierContext, RigidBody, RigidBodyAutoCollider, RigidBodyProps, RigidBodyTypeString, useRapier } from "@react-three/rapier";
import { useGameStore } from "mods@utils/states";
import { DoubleSide, MeshToonMaterial } from "three";

export default function TestEnvironment({
    children,
}: {
  children?: React.ReactNode
}): JSX.Element
{

    extend({ MeshToonMaterial });

    const gameState = useGameStore((state: any) => state.GameState);
    const [state, setState] = useState(gameState as unknown as any);

    useEffect(() => {
        (async () => {
            setState(gameState);
        })();
    }, [gameState]);

    const cameraRef = useRef();
    const physics: RapierContext = useRapier();

    const RigidProps: RigidBodyProps = {
        "ccd": true,
        "colliders": "trimesh",
        "type": "fixed",
    }


    return (<>
        <div className={"min-w-[100vw] min-h-[100vh] p-0 m-0 fixed overflow-hidden"}>
            <Scene usePhysics={true}>
                <Environment preset="studio" />
                <PerspectiveCamera ref={cameraRef} />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <group visible position={[0, -1, 0]}>
                    <RigidBody {...RigidProps}>
                        <mesh visible userData={{}}>
                            <planeGeometry args={[100, 100, 64, 64]} />
                            <meshToonMaterial color={0x009F09} vertexColors={true} side={DoubleSide} />
                        </mesh>
                    </RigidBody>
                </group>
            </Scene>
        </div>
        <div className={"min-w-[100vw] min-h-[100vh] p-0 m-0 fixed overflow-hidden hidden"}>
            <code>
                {new String(state)}
            </code>
        </div>
    </>)
}