import { Canvas } from "@react-three/fiber";
import { Physics, PhysicsProps } from "@react-three/rapier";
import { Suspense } from "react";

export default function Component({
  children,
  props,
  usePhysics = false,
}: {
  children?: React.ReactNode,
  props?: any,
  usePhysics?: boolean,
}): JSX.Element {

    const PhysicsConfig: PhysicsProps = ({
        "gravity": [0, 10, 0],
        "debug": true,
        "colliders": "ball",
        "children": children,
    })

  return (<>
    <Suspense fallback={<>Loading</>}>
      <Canvas shadows {...props} style={{ width: "100vw", height: "100vh", minWidth: "100vw", minHeight: "100vh" }} className={"w-[100vw] h-[100vh] p-0 m-0 relative"}>
        {usePhysics ? <><Physics {...PhysicsConfig} /></> : children}
      </Canvas>
    </Suspense>
  </>)
}