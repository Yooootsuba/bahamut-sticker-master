import React, { useState } from "react";

import _ from "lodash";

import useStickerListAtom from "../../atoms/stickerListAtom";

const reorder = (list, startIndex, endIndex) => {
    // 複製陣列
    const result = _.clone(list);

    // 移除 startIndex 的元素
    const [removed] = result.splice(startIndex, 1);

    // 將元素插入到 endIndex
    result.splice(endIndex, 0, removed);

    // 更新每個項目的順序
    return _.map(result, (item, index) => ({
        ...item,
        order: index + 1,
    }));
};

export const useStickerDndList = () => {
    /*
     * 存在 localStorage 的真實資料
     *
     */
    const { getTransformedStickerList, setTransformedStickerList } =
        useStickerListAtom();

    /*
     * 經過轉化，顯示在前端給使用者看的資料
     *
     */
    const [stickerList, setStickerList] = useState(
        _.sortBy(getTransformedStickerList(), "order")
    );

    /*
     * 更新時一次要更新到 2 個列表
     *
     */
    const updateStickerList = (updatedStickerList) => {
        setStickerList(updatedStickerList);
        setTransformedStickerList(updatedStickerList);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        updateStickerList(
            reorder(stickerList, result.source.index, result.destination.index)
        );
    };

    /*
     * 切換勾選狀態，有勾選的貼圖才會被顯示
     *
     */
    const handleToggle = (id) => {
        updateStickerList(
            stickerList.map((item) =>
                item.id === id ? { ...item, visible: !item.visible } : item
            )
        );
    };

    return { stickerList, onDragEnd, handleToggle };
};
