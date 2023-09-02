import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, PhysicsProps, RapierContext, useRapier } from "@react-three/rapier";

export default function Scene({
    children,
    props,
    usePhysics = false,
}: {
    children?: React.ReactNode
    props?: any
    usePhysics?: true | false,
}): JSX.Element {

    const PhysicsConfig: PhysicsProps = ({
        "gravity": [0, 10, 0],
        "debug": true,
        "colliders": "ball",
        "children": children,
    })

    const physicsInterface: RapierContext = useRapier();

    useFrame((_state, delta, frame) => {
        physicsInterface.step(delta);
        physicsInterface.world.step();
    }, 1);

    return (<>
        <Suspense fallback={<>Loading</>}>
            <Canvas shadows {...props} style={{ width: "100vw", height: "100vh", minWidth: "100vw", minHeight: "100vh" }} className={"w-[100vw] h-[100vh] p-0 m-0 relative"}>
                {usePhysics ? <><Physics {...PhysicsConfig}>
                    {children}
                </Physics></> : children}
            </Canvas>
        </Suspense>
    </>)
}