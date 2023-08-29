import "mods@css/main.css";
import "mods@css/tw.css";
import Icons from "mods@utils/jsx/VectorIcons";
import Camera from "mods@core/Camera";
import Image from "next/image";
import Lighting from "mods@core/Lighting";
import Scene from "mods@core/Scene";
import { OrbitControls, Stars, useCubeTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RippleButton } from "mods@components/interface/RippleButton";
import { metadata, roboto, roboto_mono } from "mods@core/config/globals";
import { Roboto_Mono } from "next/font/google";
import { MutableRefObject, Ref, Suspense, createRef, useEffect, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Vector2, Vector3 } from "three";

export default function GameController({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {

    "use client";
    /* A Game where you can buy universe in a box to power your other projects in a box
     * https://rickandmorty.fandom.com/wiki/Microverse_Battery
     * > This perhaps themed as an Rick and Morty fandom.
     * * * */

    const { title, description } = metadata;

    const SceneJSX: Array<[String, () => JSX.Element]> = [
        ["splash", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center"}>
                <div className={"list-none text-center"}>
                    <Image alt={"splashvector"} src={"/WhiteSplash.svg"} width={256} height={256} className={"h-auto mx-auto my-0 mb-5"} />
                    <h1 className={"text-4xl uppercase"} style={roboto.style}>{title}</h1>
                    <h3>Author: <span className={"text-red-800"}><a href={"github.com/daveinchy"}>Space Dave</a></span></h3>
                </div>
                <div className={"mt-4 text-center flex flex-row"}>
                    <RippleButton style={roboto.style} className={"relative flex flex-row justify-center items-center p-2 px-4 text-2xl text-white bg-red-700 rounded-sm font-bold uppercase mt-4 mx-2 border-4 border-red-800 hover:bg-red-900"} onClick={() => setScene(getSceneJSX("menu"))}><span className={"float-left"}>Play</span> <Icons.Arrows.ChevRight /></RippleButton>
                    <RippleButton style={roboto.style} className={"relative flex flex-row justify-center items-center p-2 px-4 text-2xl text-white bg-red-700 rounded-sm font-bold uppercase mt-4 mx-2 border-4 border-red-800 hover:bg-red-900"} onClick={() => setScene(getSceneJSX("menu"))}><span className={"float-left"}>Quit</span> <Icons.Actions.Cross /></RippleButton>
                </div>
            </div>
        </>)],
        ["menu", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center"}>
                <div className={"list-none text-center"}>
                    <h1 className={"text-4xl uppercase"} style={roboto.style}>Game Menu</h1>
                </div>
                <div className={"mt-4 text-center"}>
                    <RippleButton style={roboto.style} className={"relative flex flex-row justify-center items-center p-2 px-4 text-2xl text-white bg-red-700 rounded-sm font-bold uppercase mt-4 mx-2 border-4 border-red-800 hover:bg-red-900"} onClick={() => setScene(getSceneJSX("splash"))}><span>Back</span> <Icons.Cancel /></RippleButton>
                </div>
            </div>
        </>)],
    ];

    const getSceneJSX = (key: string) => {
        let newScene: JSX.Element | undefined = undefined;

        SceneJSX.map((v, i, a) => {
            if (v[0] === key) {
                newScene = v[1]();
            }
            return newScene;
        });

        if (newScene === undefined) {
            throw new Error(`Couldn't find scene with '${key}' as key.`);
        }
        return newScene as JSX.Element;
    };

    const [scene, setScene] = useState(undefined as unknown as JSX.Element);

    useEffect(() => {
        (async () => {
            setScene(getSceneJSX("splash"));
        })();
    }, []);

    return (<>
        <div style={style ? style : null} className={`${className?.toString()}` + " " + ""}>
            <div id="ui-overlay" className="min-w-full min-h-[100vh] z-0 p-0 m-0 overflow-hidden">
                {/* <Scene>
                    <Suspense>

                        <Camera />
                        <Lighting />
                        <SunSystem scaleMultiplier={1} distanceMultiplier={60} />

                    </Suspense>
                </Scene> */}

                {scene}
            </div>
        </div>
    </>) as JSX.Element;
}