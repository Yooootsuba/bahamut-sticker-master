import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";

import useStickerListAtom from "../../atoms/stickerListAtom";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((item, index) => ({
        ...item,
        order: index + 1,
    }));
};

export default function StickerDndList() {
    const { getTransformedStickerList, setTransformedStickerList } =
        useStickerListAtom();

    const [stickerList, setStickerList] = useState(
        getTransformedStickerList().sort((a, b) => a.order - b.order) // 根據 order 進行初始排序
    );

    const onDragEnd = (result) => {
        if (!result.destination) return;

        // Reorder the sticker list
        const reorderedItems = reorder(
            stickerList,
            result.source.index,
            result.destination.index
        );

        setStickerList(reorderedItems);
        setTransformedStickerList(reorderedItems);
    };

    // Handle visibility toggle
    const handleToggle = (id) => {
        const updatedItems = stickerList.map((item) =>
            item.id === id ? { ...item, visible: !item.visible } : item
        );

        // Update the atom state with the new visibility and order
        setStickerList(updatedItems);
        setTransformedStickerList(updatedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <List
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            width: "100%",
                            backgroundColor: "#f4f4f4",
                        }}
                    >
                        {stickerList.map((item, index) => (
                            <Draggable
                                index={index}
                                key={item.id}
                                draggableId={item.id.toString()} // draggableId 必須是字串
                            >
                                {(provided, snapshot) => (
                                    <ListItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        sx={{
                                            backgroundColor: snapshot.isDragging
                                                ? "#e0e0e0"
                                                : item.visible
                                                ? "#ffffff"
                                                : "#f0f0f0",
                                            marginBottom: "8px",
                                            borderRadius: "4px",
                                            opacity: item.visible ? 1 : 0.5,
                                            border: "solid black",
                                        }}
                                    >
                                        <Checkbox
                                            checked={item.visible}
                                            onChange={() =>
                                                handleToggle(item.id)
                                            }
                                        />
                                        <ListItemText
                                            primary={item.name}
                                            secondary={`序列 : ${item.order}`}
                                        />
                                    </ListItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}
