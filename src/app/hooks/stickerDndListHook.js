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
    const { stickerList, setStickerList } = useStickerListAtom();

    const onDragEnd = (result) => {
        if (!result.destination) return;

        setStickerList(
            reorder(stickerList, result.source.index, result.destination.index)
        );
    };

    /*
     * 切換勾選狀態，有勾選的貼圖才會被顯示
     *
     */
    const handleToggle = (id) => {
        setStickerList(
            stickerList.map((item) =>
                item.id === id ? { ...item, visible: !item.visible } : item
            )
        );
    };

    return { stickerList, onDragEnd, handleToggle };
};
