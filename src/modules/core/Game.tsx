import "mods@css/main.css";
import "mods@css/tw.css";
import Camera from "mods@core/Camera";
import Environment from "mods@core/Environment";
import Icons from "mods@utils/jsx/VectorIcons";
import Image from "next/image";
import Lighting from "mods@core/Lighting";
import Scene from "mods@core/Scene";
import THREE, { DoubleSide, Material, Mesh, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, NormalBufferAttributes, Vector2, Vector3 } from "three";
import Window3D from "mods@core/Window3D";
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { RigidBodyContext } from "@react-three/rapier/dist/declarations/src/components/RigidBody";
import { Button } from "mods@components/interface/Buttons/Button";
import { ButtonBlue } from "mods@components/interface/Buttons/ButtonBlue";
import { ButtonGreen } from "mods@components/interface/Buttons/ButtonGreen";
import { ButtonRed } from "mods@components/interface/Buttons/ButtonRed";
import { ButtonYellow } from "mods@components/interface/Buttons/ButtonYellow";
import { RippleButton } from "mods@components/interface/RippleButton";
import { metadata, roboto, roboto_mono } from "mods@core/config/globals";
import { useGameStore } from "mods@utils/states";
import { Roboto_Mono } from "next/font/google";
import { MutableRefObject, Ref, Suspense, createRef, useEffect, useRef, useState } from "react";

/* eslint-disable react-hooks/exhaustive-deps */

export default function GameController({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {

    "use client";
    /* A Game where you can buy universe in a box to power your other projects in a box
     * https://rickandmorty.fandom.com/wiki/Microverse_Battery
     * > This perhaps themed as an Rick and Morty fandom.
     * * * */

    extend({ MeshToonMaterial });

    const { title, description } = metadata;

    const SceneJSX: Array<[String, () => JSX.Element]> = [
        ["splash", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center bg-stone-900"}>
                <div className={"list-none text-center"}>
                    <Image alt={"splashvector"} src={"/ThreeJS.svg"} width={320} height={320} className={"h-auto mx-auto my-0 mb-5"} />
                    <h1 className={"text-4xl font-black"} style={roboto.style}>{title}</h1>
                    <h3>Author: <span className={"text-red-800"}><a href={"https://github.com/daveinchy"}>Space Dave</a></span></h3>
                </div>
                <div className={"mt-4 text-center flex flex-row"}>
                    <ButtonBlue style={roboto_mono.style} onClick={() => setScene(getScene("test_env"))} useIcon={<Icons.Webshop.Cart iconSize={"28"} />}>Buy</ButtonBlue>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("test_env"))} useIcon={<Icons.Webshop.Bag iconSize={"28"} />}>Store</Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("menu_assets"))} useIcon={<Icons.Actions.Edit iconSize={"28"} />}>Studio</Button>
                </div>
            </div>
        </>)],
        ["menu_assets", () => (<>
            <div className={"w-full min-h-[100vh] flex flex-col justify-center items-center bg-stone-900"}>
                <div className={"list-none text-center"}>
                    <h1 className={"text-4xl font-black"} style={roboto.style}>Menu</h1>
                </div>
                <div className={"mt-4 text-center flex flex-col justify-center items-evenly"}>
                    <ButtonBlue style={roboto_mono.style} onClick={() => setScene(getScene("test_env"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Studio</ButtonBlue>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("editor_object"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Models</Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("editor_object"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Scenes</Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("editor_object"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Materials</Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("editor_object"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Textures</Button>
                    <Button style={roboto_mono.style} onClick={() => setScene(getScene("editor_object"))} useIcon={<Icons.Arrows.ChevRight iconSize={"28"} />}>Shaders</Button>
                </div>
            </div>
        </>)],
        ["test_env", () => (<Environment />)],
    ];

    const getScene = (key: string) => {
        let newScene: [String, () => JSX.Element] | undefined = undefined;

        SceneJSX.map((v, i, a) => {
            if (v[0] === key) {
                newScene = v;
            }
            return newScene;
        });

        if (newScene === undefined) {
            throw new Error(`Couldn't find scene with '${key}' as key.`);
        }

        return newScene as [String, () => JSX.Element];
    };

    const [scene, setScene] = useState(undefined as unknown as [String, () => JSX.Element]);

    const gameState = useGameStore((state:any) => state.GameState);
    const writeGameState = useGameStore((state: any) => state.writeGameState);
    const resetGameState = useGameStore((state: any) => state.resetGameState);

    useEffect(() => {
        (async () => {
            setScene(getScene("splash"));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (scene !== undefined) {
                writeGameState({ currentScene: scene[0] });
                console.log(`[state]`, gameState);
            }
        })();
    }, [scene]);

    return (<>
        <div style={style ? style : null} className={`${className?.toString()}` + " " + "min-w-[100vw] min-h-[100vh] p-0 m-0 relative overflow-hidden"}>
            {scene ? scene[1]() : null}
        </div>
    </>) as JSX.Element;
}