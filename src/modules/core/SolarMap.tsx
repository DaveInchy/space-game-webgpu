import Mars from "mods@core/systems/Mars";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export default function SolarMap({
  children,
  props,
}: {
  children?: React.ReactNode,
  props?: any,
}): JSX.Element {

    let mars = useRef(undefined as any);

    useEffect(() => {
        console.log(`[update]`, `found mars: `, mars);
    }, [mars]);

    return (<>
        <Mars location={new Vector3(0, 0, 0)} forwardRef={(ref) => mars = ref}/>
    </>)
}