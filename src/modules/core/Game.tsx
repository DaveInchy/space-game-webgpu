import "mods@css/main.css";
import "mods@css/tw.css";
import Camera from "mods@core/Camera";
import Icons from "mods@utils/jsx/VectorIcons";
import Image from "next/image";
import Lighting from "mods@core/Lighting";
import Scene from "mods@core/Scene";
import { OrbitControls, Stars, useCubeTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Button } from "mods@components/interface/Buttons/Button";
import { ButtonBlue } from "mods@components/interface/Buttons/ButtonBlue";
import { ButtonGreen } from "mods@components/interface/Buttons/ButtonGreen";
import { ButtonRed } from "mods@components/interface/Buttons/ButtonRed";
import { ButtonYellow } from "mods@components/interface/Buttons/ButtonYellow";
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
                    <Image alt={"splashvector"} src={"/ThreeJS.svg"} width={320} height={320} className={"h-auto mx-auto my-0 mb-5"} />
                    <h1 className={"text-4xl font-black"} style={roboto.style}>{title}</h1>
                    <h3>Author: <span className={"text-red-800"}><a href={"https://github.com/daveinchy"}>Space Dave</a></span></h3>
                </div>
                <div className={"mt-4 text-center flex flex-row"}>
                    <ButtonBlue style={roboto_mono.style} onClick={() => setScene(getSceneJSX("buy"))}><span className={"float-left mr-2"}>Buy</span> <Icons.Webshop.Cart iconSize={"28"} /></ButtonBlue>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("store"))}><span className={"float-left mr-2"}>Store</span> <Icons.Webshop.Bag iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("menu_asset"))}><span className={"float-left mr-2 "}>Studio</span> <Icons.Actions.Edit iconSize={"28"} /></Button>
                </div>
            </div>
        </>)],
        ["menu_asset", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center"}>
                <div className={"list-none text-center"}>
                    <h1 className={"text-4xl font-black"} style={roboto.style}>Menu</h1>
                </div>
                <div className={"mt-4 text-center flex flex-col justify-center items-evenly"}>
                    <ButtonBlue style={roboto_mono.style} onClick={() => setScene(getSceneJSX("menu_studio"))}><span className={"float-left mr-2 "}>Studio</span> <Icons.Arrows.ChevRight iconSize={"28"} /></ButtonBlue>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_object"))}><span className={"float-left mr-2 "}>Models</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_scene"))}><span className={"float-left mr-2 "}>Scenes</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_materials"))}><span className={"float-left mr-2 "}>Materials</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_materials"))}><span className={"float-left mr-2 "}>Textures</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_materials"))}><span className={"float-left mr-2 "}>Shaders</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <ButtonRed style={roboto_mono.style} onClick={() => setScene(getSceneJSX("splash"))}><span className={"float-left mr-2 -ml-4 uppercase"}><Icons.Arrows.ChevLeft iconSize={"28"} /></span><span className={"float-left uppercase"}> Back</span></ButtonRed>
                </div>
            </div>
        </>)],
        ["menu_studio", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center"}>
                <div className={"list-none text-center"}>
                    <h1 className={"text-4xl font-black"} style={roboto.style}>Menu</h1>
                </div>
                <div className={"mt-4 text-center flex flex-col justify-center items-evenly"}>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_premium"))}><span className={"float-left mr-2 "}>New Project</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getSceneJSX("editor_premium"))}><span className={"float-left mr-2 "}>Edit Project</span> <Icons.Arrows.ChevRight iconSize={"28"} /></Button>
                    <ButtonRed style={roboto_mono.style} onClick={() => setScene(getSceneJSX("splash"))}><span className={"float-left mr-2 uppercase"}>Close</span> <Icons.Actions.Cross iconSize={"28"} /></ButtonRed>
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