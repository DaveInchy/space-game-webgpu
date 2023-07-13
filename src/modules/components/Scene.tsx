import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

export default function Scene({
    children,
    props,
}: {
    children?: React.ReactNode
    props?: any
}): JSX.Element {
    return (<>
        <Canvas {...props} style={{ width: "100vw", height: "100vh", minWidth: "100vw", minHeight: "100vh" }}>
            {children}
        </Canvas>
    </>)
}