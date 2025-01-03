import _ from "lodash";

import { getDefaultStore } from "jotai";
import { localStorageStickerListAtom } from "../../atoms/stickerListAtom";

const mergeStickerList = (localStorageStickerList, responseStickerList) => {
    const mergedList = { ...localStorageStickerList.data.list };

    _.forEach(responseStickerList.data.list, (value, key) => {
        if (!localStorageStickerList.data.list[key]) {
            mergedList[key] = value;
        }
    });

    return {
        ...localStorageStickerList,
        data: {
            ...localStorageStickerList.data,
            list: mergedList,
        },
    };
};

export const syncResponseWithStorage = (responseStickerList) => {
    const store = getDefaultStore();
    const localStorageStickerList = store.get(localStorageStickerListAtom);

    /*
     * 狀況 1
     *
     * localStorage 沒有自訂貼圖列表，先儲存一份副本就回傳
     *
     */
    if (_.size(localStorageStickerList.data.list) == 0) {
        console.log("Bahamut Sticker Master: 初始化 localStorage 的資料");

        store.set(localStorageStickerListAtom, responseStickerList);

        return responseStickerList;
    }

    /*
     * 狀況 2
     *
     * localStorage 和 response 的貼圖列表長度不同，代表使用者購入新貼圖
     *
     * 這時需要進行合併
     *
     */
    if (
        _.size(localStorageStickerList.data.list) !==
        _.size(responseStickerList.data.list)
    ) {
        console.log("Bahamut Sticker Master: 偵測到新貼圖");

        const mergedStickerList = mergeStickerList(
            localStorageStickerList,
            responseStickerList
        );

        store.set(localStorageStickerListAtom, mergedStickerList);

        return mergedStickerList;
    }

    /*
     * 狀況 3
     *
     * 直接回傳自訂的貼圖列表
     *
     */
    console.log("Bahamut Sticker Master: 回傳自訂貼圖列表");

    return localStorageStickerList;
};
