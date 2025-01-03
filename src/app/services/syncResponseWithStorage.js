import { LOCAL_STORAGE_STICKERS } from "../constants/browser";

import _ from "lodash";

const mergeList = (localStickerList, responseStickerList) => {
    const mergedList = _.merge(
        {},
        localStickerList.data.list,
        responseStickerList.data.list
    );

    _.forEach(responseStickerList.data.list, (value, key) => {
        if (!localStickerList.data.list[key]) {
            mergedList[key] = value;
        }
    });

    return {
        ...localStickerList,
        data: {
            ...localStickerList.data,
            list: mergedList,
        },
    };
};

export const syncResponseWithStorage = (responseStickerList) => {
    const localStickerList = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_STICKERS)
    );

    /*
     * 狀況 1
     *
     * localStorage 沒有自訂貼圖列表，先儲存一份副本就回傳
     *
     */
    if (localStickerList == null) {
        localStorage.setItem(
            LOCAL_STORAGE_STICKERS,
            JSON.stringify(responseStickerList)
        );

        console.log("s1");
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
        _.size(localStickerList.data.list) !==
        _.size(responseStickerList.data.list)
    ) {
        const mergedList = mergeList();

        localStorage.setItem(
            LOCAL_STORAGE_STICKERS,
            JSON.stringify(mergedList)
        );

        console.log("s2");
        return mergedList;
    }

    /*
     * 狀況 3
     *
     * 直接回傳自訂的貼圖列表
     *
     */
    console.log("s3");
    return localStickerList;
};
