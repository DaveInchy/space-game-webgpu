import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Texture } from "three/src/textures/Texture";

export const initTexture = (Path: string, onLoaded: CallableFunction, onProgress: CallableFunction, onError: CallableFunction) => {

    const args = {
        path: Path,
        onload: (texture: Texture) => {
            onLoaded(texture);
        },
        progress: (progress: ProgressEvent<EventTarget>) => {
            onProgress(progress);
        },
        error: (error: ErrorEvent) => {
            onError(error.message);
        },
    };

    return new TextureLoader().load(
        args.path, args.onload, args.progress, args.error
    );
}

export const initTextureMap = (sources: (string)[]): (Texture | Texture[])[] => {
    let map = sources.map((v, i, a) => {
        let text = a[i] === v
            ? initTexture(
                a[i],
                (texture: Texture) => {
                    console.log(texture);
                    return texture;
                }, (progress: ProgressEvent<EventTarget>) => {
                    console.log(progress);
                }, (err: string) => {
                    console.error(err);
                })
            : new Texture;
        return text;

    }) as (Texture | Texture[])[];

    return map;
}