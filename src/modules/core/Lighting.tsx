import { ReactNode } from "react";

export default function Lighting({ children, className, style }: { children?: ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
        <ambientLight intensity={0.1} />
    </>) as JSX.Element;
}