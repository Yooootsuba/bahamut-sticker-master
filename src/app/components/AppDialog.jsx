import React from "react";

import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";

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
                    border: "3px solid #4caf50",
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
                這是一個自訂樣式的 Dialog
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
                <Button onClick={closeAppDialog} sx={{ color: "#4caf50" }}>
                    取消
                </Button>
                <Button onClick={closeAppDialog} sx={{ color: "#4caf50" }}>
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    );
}
