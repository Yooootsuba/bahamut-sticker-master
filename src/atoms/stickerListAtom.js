import _ from "lodash";

import { atom, useSetAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { LOCAL_STORAGE_STICKERS } from "../app/constants/browser";

/*
 * 存在 localStorage 的貼圖列表狀態
 *
 * 資料結構來自於巴哈姆特的 API，是一整個物件
 *
 */
const localStorageStickerListAtom = atomWithStorage(
    LOCAL_STORAGE_STICKERS,
    { data: { list: {} } },
    undefined,
    { getOnInit: true }
);

/*
 * localStorage 貼圖列表的衍生原子
 *
 * 資料結構會被轉換成物件陣列，讓前端的 Dnd List 可以被使用
 *
 */
const stickerListAtom = atom((get) => {
    const localStorageStickerList = get(localStorageStickerListAtom);

    return _.sortBy(
        _.map(localStorageStickerList.data.list, (value, key) => ({
            id: key,
            ...value,
        })),
        "order"
    );
});

/*
 * 前端看到的會是一個物件陣列
 *
 * 實際儲存的是一個物件
 *
 */
const useStickerListAtom = () => {
    const stickerList = useAtomValue(stickerListAtom);
    const setLocalStorageStickerList = useSetAtom(localStorageStickerListAtom);

    const setStickerList = (stickerList) => {
        setLocalStorageStickerList({
            data: {
                list: _.keyBy(stickerList, "id"),
            },
        });
    };

    return { stickerList, setStickerList };
};

export default useStickerListAtom;
