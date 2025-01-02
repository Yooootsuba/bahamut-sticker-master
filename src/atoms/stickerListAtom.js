import { atomWithStorage } from "jotai/utils";
import { useAtom, useAtomValue } from "jotai";

const initialState = {
    data: { list: {} },
};

const stateAtom = atomWithStorage("bsm_sticker_list", initialState, undefined, {
    getOnInit: true,
});

const useStickerListAtom = () => {
    const [data, setData] = useAtom(stateAtom);

    const getTransformedStickerList = () => {
        const transformedData = Object.entries(data.data.list).map(
            ([id, item]) => ({
                id,
                ...item,
            })
        );
        return [...transformedData];
    };

    const setTransformedStickerList = (stickerList) => {
        setData((prevData) => ({
            data: {
                list: stickerList.reduce((acc, item) => {
                    // 以 item.id 為 key，將剩餘資料直接放入物件內
                    const { id, ...rest } = item;
                    acc[id] = rest; // 使用 id 作為鍵，rest 只包含除了 id 之外的資料
                    return acc;
                }, {}),
            },
        }));

        console.log(data);
    };

    return { getTransformedStickerList, setTransformedStickerList };
};

export default useStickerListAtom;
