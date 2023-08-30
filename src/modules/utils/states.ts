import create from "zustand";

const defaultStateProps = ({
    currentScene: undefined,
    isMenuOpen: true,
    gameHasStarted: false,
    gameHasEnded: false,
    window3dSize: [1920, 1080],
});

export const useGameStore = create((set: CallableFunction) => ({
    GameState: {
        ...defaultStateProps,
    },
    update: () => set((state:any) => ({ GameState: { ...state.GameState } })),
    writeGameState: (data: any) => set((state: any) => ({ GameState: { ...state.GameState, ...data } })),
    resetGameState: () => set((state:any) => ({ GameState: { ...defaultStateProps } })),
}))