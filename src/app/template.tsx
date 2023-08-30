export default async function RootTemplate({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
        <main style={style ? style : null} className={"relative w-[100%] min-h-[100vh] p-0 m-0 overflow-hidden"}>
            {children}
        </main>
    </>) as JSX.Element;
}