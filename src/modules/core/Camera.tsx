import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { OrthographicCameraProps } from "@react-three/fiber";

export default function CameraController({
  children,
  props,
}: {
  children?: React.ReactNode,
  props?: any,
}): JSX.Element {
  return (<>
      {/* camera controller */}
      <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          enableRotate={true}
          zoomSpeed={5}
          rotateSpeed={1.5}
          panSpeed={5} />
  </>)
}