import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

export default function Scene({
    children,
    props,
    usePhysics = false,
}: {
    children?: React.ReactNode
    props?: any
    usePhysics?: true | false,
}): JSX.Element {

    const PhysicsConfig = ({
        x: 0,
        y: 1,
        z: 0,
    })

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