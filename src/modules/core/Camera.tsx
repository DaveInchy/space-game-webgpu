import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { OrthographicCameraProps } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraController({
  children,
  props,
}: {
  children?: React.ReactNode,
  props?: any,
}): JSX.Element {

  const cameraRef = useRef(undefined as unknown as any)

  return (<>
      <orthographicCamera ref={cameraRef}
        args={[0, window.innerWidth, 0, window.innerHeight, 0, 1000]} />
      {/* camera controller */}
      <OrbitControls
          camera={cameraRef.current}
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          enableRotate={true}
          zoomSpeed={5}
          rotateSpeed={1.5}
          panSpeed={5} />
  </>)
}