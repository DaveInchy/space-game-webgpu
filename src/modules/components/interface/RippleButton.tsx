import "mods@css/ripple.button.css";
import React from "react";

export const RippleButton = ({ children, onClick, style, className }: { children: any, onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, style?: any, className?: string }) => {
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
                content: '<span class="text-red-800"',
            }}
            className={`${className?.toString()} ripple-button`}
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
            <span className="content">{children}</span>
        </button>
    );
};