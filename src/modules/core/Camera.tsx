import { FlyControls, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { OrthographicCameraProps } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderChunk, ShaderLib } from "three";

export default function Camera({
  children,
  props,
}: {
  children?: React.ReactNode,
  props?: any,
}): JSX.Element {

  const cameraRef = useRef(undefined as unknown as any);
  const currentControls = useRef(undefined as unknown as any);

  return (<>
      <orthographicCamera ref={cameraRef}
          args={[0, window.innerWidth / 100 * 80, 0, window.innerHeight / 100 * 80, 0, 10000]} />

      {/* camera controller */}
      <OrbitControls ref={currentControls}
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