import { useLoader } from "@react-three/fiber";
import { Texture, TextureLoader } from "three";

export const useTextureMap = (sources: (string)[]): (Texture | Texture[])[] => {
    return useLoader(TextureLoader, sources) as (Texture | Texture[])[];
}