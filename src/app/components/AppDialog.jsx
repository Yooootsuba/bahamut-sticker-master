import React from "react";

import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

import StickerDndList from "./StickerDndList";

import useAppDialogAtom from "../../atoms/appDialogAtom";

export default function AppDialog() {
    const { openState, closeAppDialog } = useAppDialogAtom();

    return (
        <Dialog
            open={openState}
            onClose={closeAppDialog}
            PaperProps={{
                sx: {
                    position: "absolute",
                    left: 0,

                    width: "400px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "15px",
                    padding: "20px",
                    border: "5px solid gray",
                },
            }}
        >
            <DialogContent
                sx={{
                    color: "#333",
                    fontSize: "18px",
                    textAlign: "center",
                }}
            >
                <StickerDndList />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
                <Button
                    variant="outlined"
                    onClick={closeAppDialog}
                    sx={{
                        borderWidth: "2px",
                    }}
                >
                    關閉視窗
                </Button>
            </DialogActions>
        </Dialog>
    );
}
