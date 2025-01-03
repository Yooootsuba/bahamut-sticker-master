import _ from "lodash";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initialState = {
    data: { list: {} },
};

const stateAtom = atomWithStorage("bsm_sticker_list", initialState, undefined, {
    getOnInit: true,
});

const useStickerListAtom = () => {
    const [data, setData] = useAtom(stateAtom);

    const getTransformedStickerList = () => {
        return _.map(data.data.list, (value, key) => ({
            id: key,
            ...value,
        }));
    };

    const setTransformedStickerList = (stickerList) => {
        setData({
            data: {
                list: _.keyBy(stickerList, "id"),
            },
        });
    };

    return { getTransformedStickerList, setTransformedStickerList };
};

export default useStickerListAtom;
