import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const initialState = {
    openState: false,
};

const stateAtom = atom(initialState, async (get, set, data) => {
    let state = get(stateAtom);
    set(stateAtom, { ...state, ...data });
});

const useAppDialogAtom = () => {
    const setData = useSetAtom(stateAtom);

    const openAppDialog = () => {
        setData({ openState: true });
    };

    const closeAppDialog = () => {
        setData({ openState: false });
    };

    return { ...useAtomValue(stateAtom), openAppDialog, closeAppDialog };
};

export default useAppDialogAtom;
