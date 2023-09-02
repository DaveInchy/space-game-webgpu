import { useGameStore } from "mods@utils/states";
import { useEffect, useState } from "react";

export default function OverlayUI({
  children,
  props,
  hidden = false,
}: {
  children?: React.ReactNode,
  props?: any,
  hidden?: boolean;
}): JSX.Element {

    const gameState = useGameStore((state: any) => state.GameState);
    const [state, setState] = useState(gameState as unknown as any);

    useEffect(() => {
        (async () => {
            setState(gameState);
        })();
    }, [gameState]);

  return (<>
      <div className={"min-w-[100vw] min-h-[100vh] p-0 m-0 fixed overflow-hidden" + (hidden? " hidden": "")}>
          <code>
              {state && JSON.stringify(state)}
          </code>
      </div>
  </>)
}