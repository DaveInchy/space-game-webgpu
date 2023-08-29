import { ReactNode } from "react";

export default async function Player({ children, className, style }: { children?: ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
        {children}
    </>) as JSX.Element;
}