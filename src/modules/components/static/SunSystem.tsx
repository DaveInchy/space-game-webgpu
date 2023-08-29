import Planet from "../Planet";
import Sun from "./Sun";
import { ReactNode } from "react";
import { Vector3 } from "three";

export default function SunSystem({ scaleMultiplier, distanceMultiplier, children, className, style }: { scaleMultiplier: number, distanceMultiplier: number, children?: ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
        <Sun forwardRef={
            target => console.log(`Acquired target ${target.current} =>`, target.current)
        } hasRings={
            false
        } hasAtmosphere={
            true
        } location={
            new Vector3(0, 0, 0)
        } />

        <Planet location={new Vector3(1 + 30.18 * distanceMultiplier / 4,
            0,
            0)
        } scale={
            3.88 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "neptune"
        } defaultAtmosphere={
            true
        } defaultRings={
            true
        } hasRings={
            true
        } hasAtmosphere={
            true
        } />
        <Planet location={new Vector3(1 + 19.17 * distanceMultiplier / 3,
            0,
            0)
        } scale={
            4.01 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "uranus"
        } defaultAtmosphere={
            true
        } defaultRings={
            true
        } hasRings={
            true
        } hasAtmosphere={
            false
        } />
        <Planet location={new Vector3(1 + 9.57 * distanceMultiplier / 2.5,
            0,
            0)
        } scale={
            9.45 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "saturn"
        } defaultAtmosphere={
            true
        } defaultRings={
            false
        } hasRings={
            true
        } hasAtmosphere={
            true
        } />
        <Planet location={new Vector3(1 + 5.20 * distanceMultiplier / 2.5,
            0,
            0)
        } scale={
            11.21 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "jupiter"
        } defaultAtmosphere={
            true
        } defaultRings={
            true
        } hasRings={
            true
        } hasAtmosphere={
            false
        } />
        <Planet location={new Vector3(1 + 1.52 * distanceMultiplier / 1.5,
            0,
            0)
        } scale={
            0.532 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "mars"
        } defaultAtmosphere={
            true
        } defaultRings={
            true
        } hasRings={
            false
        } hasAtmosphere={
            false
        } />
        <Planet location={new Vector3(1 + 1 * distanceMultiplier / 1.5,
            0,
            0)
        } scale={
            1.0 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "earth"
        } defaultAtmosphere={
            false
        } defaultRings={
            true
        } hasRings={
            false
        } hasAtmosphere={
            true
        } />
        <Planet location={new Vector3(1 + 0.723 * distanceMultiplier / 1,
            0,
            0)
        } scale={
            0.949 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "venus"
        } defaultAtmosphere={
            false
        } defaultRings={
            true
        } hasRings={
            false
        } hasAtmosphere={
            true
        } />
        <Planet location={new Vector3(1 + 0.5 * distanceMultiplier / 1,
            0,
            0)
        } scale={
            0.383 * scaleMultiplier
        } refCallback={target => console.log(`Acquired target ${target.current
            } =>`, target.current)
        } name={
            "mercury"
        } defaultAtmosphere={
            true
        } defaultRings={
            true
        } hasRings={
            false
        } hasAtmosphere={
            false
        } />
    </>) as JSX.Element;
}