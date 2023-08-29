import { ReactNode } from "react";

export default async function Object3D({ children, className, style }: { children?: ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
            {children}
    </>) as JSX.Element;
}