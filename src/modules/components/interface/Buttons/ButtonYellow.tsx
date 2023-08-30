import "mods@css/button.yellow.css";
import React from "react";

export const ButtonYellow = ({ children, useIcon, onClick, style, className }: { children: any, useIcon?: any | JSX.Element, onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, style?: any, className?: string }) => {
    const [coords, setCoords] = React.useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = React.useState(false);

    React.useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), 300);
        } else setIsRippling(false);
    }, [coords]);

    React.useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    return (
        <button
            style={style ? style : {
                content: '',
            }}
            className={`${className?.toString()} btn-yellow relative p-3 px-1 text-2xl text-white rounded-sm font-bold ease-linear transform-gpu transition-all hover:-translate-y-2`}
            onClick={e => {
                const target: any = e.target;
                const rect = target.getBoundingClientRect();
                setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                onClick && onClick(e);
            }}
        >
            {isRippling ? (
                <span
                    className="ripple"
                    style={{
                        left: coords.x,
                        top: coords.y
                    }}
                />
            ) : (
                ''
            )}
            <span className="content flex flex-row justify-between items-evenly w-full"><span className={"mr-4"}>{children}</span> {useIcon}</span>
        </button>
    );
};