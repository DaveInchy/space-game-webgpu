"use client";
import CameraController from "./Camera";
import CelestialObject from "mods@components/objects/Planet";
import Ceres from "mods@core/systems/Ceres";
import Earth from "mods@core/systems/Earth";
import Jupiter from "mods@core/systems/Jupiter";
import Mars from "mods@core/systems/Mars";
import Mercury from "mods@core/systems/Mercury";
import Moon from "mods@core/systems/Moon";
import Neptune from "mods@core/systems/Neptune";
import Saturn from "mods@core/systems/Saturn";
import Scene from "mods@components/Scene";
import Sun from "mods@core/systems/Sun";
import Uranus from "mods@core/systems/Uranus";
import Venus from "mods@core/systems/Venus";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, Ref, Suspense, createRef, useEffect, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Vector2, Vector3 } from "three";

export default function Core({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {

    /* A Game where you can buy universe in a box to power your other projects in a box
     * https://rickandmorty.fandom.com/wiki/Microverse_Battery
     * > This perhaps themed as an Rick and Morty fandom.
     * * * */

    const distanceMultiplier = 10;
    const scaleMultiplier = 0.3;

    return (<>
        <main style={style ? style : null} className={`${className?.toString()}` + " " + ""}>

            <Scene>
                <Suspense fallback={null}>

                    <CameraController/>

                    {/* scene */}
                    <Stars />
                    <ambientLight
                        intensity={0.5} />

                    {/* planets */}
                    <CelestialObject scale={3.88 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={true} hasAtmosphere={true} location={new Vector3(30.18 * distanceMultiplier, 0, 0)} name={"neptune"} />
                    <CelestialObject scale={4.01 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={true} hasAtmosphere={true} location={new Vector3(19.17 * distanceMultiplier, 0, 0)} name={"uranus"} />
                    <CelestialObject scale={9.45 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={true} hasAtmosphere={true} location={new Vector3(9.57 * distanceMultiplier, 0, 0)} name={"saturn"} />
                    <CelestialObject scale={11.21 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={true} hasAtmosphere={true} location={new Vector3(5.20 * distanceMultiplier, 0, 0)} name={"jupiter"} />
                    <CelestialObject scale={0.532 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={false} hasAtmosphere={true} location={new Vector3(1.52 * distanceMultiplier, 0, 0)} name={"mars"} />
                    <CelestialObject scale={1.0 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={false} hasAtmosphere={true} location={new Vector3(1 * distanceMultiplier, 0, 0)} name={"earth"} />
                    <CelestialObject scale={0.949 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={false} hasAtmosphere={true} location={new Vector3(0.723 * distanceMultiplier, 0, 0)} name={"venus"} />
                    <CelestialObject scale={0.383 * scaleMultiplier} refCallback={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={false} hasAtmosphere={false} location={new Vector3(0.387 * distanceMultiplier, 0, 0)} name={"mercury"} />
                    <Sun forwardRef={target => console.log(`Acquired target ${target.current} =>`, target.current)} hasRings={false} hasAtmosphere={true} location={new Vector3(0.001 * distanceMultiplier, 0, 0)} />
                </Suspense>
            </Scene>

            <span className={"fixed bottom-0 mx-auto w-auto"}><h3>Author: github.com/daveinchy</h3></span>
        </main>
    </>) as JSX.Element;
}