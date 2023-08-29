export default async function RootTemplate({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {
    "use client"
    return (<>
        <main style={style ? style : null} className={`${className?.toString()}` + " " + "relative flex flex-col items-center justify-between min-w-full min-h-[100vh] p-0 m-0 overflow-hidden tw-container"}>
            {children}
        </main>
    </>) as JSX.Element;
}