import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    Box,
    Link,
    List,
    ListItem,
    ListItemText,
    Checkbox,
} from "@mui/material";

import { useStickerDndList } from "../hooks/stickerDndListHook";

export default function StickerDndList() {
    const { stickerList, onDragEnd, handleToggle } = useStickerDndList();

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

                                        <Link
                                            href={`https://home.gamer.com.tw/sticker_detail.php?sticker=${item.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                padding: "10px",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={`https://im.bahamut.com.tw/sticker/${item.id}/sticker_${item.id}.png`}
                                                sx={{
                                                    width: "50px", // 設定圖片的寬度
                                                    height: "50px", // 設定圖片的高度
                                                    objectFit: "cover", // 確保圖片填滿框框
                                                }}
                                            />
                                        </Link>

                                        <ListItemText
                                            primary={item.name}
                                            secondary={`貼圖序列 : ${
                                                item.order
                                            } ${
                                                !item.visible
                                                    ? "（隱藏中）"
                                                    : ""
                                            }`}
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
