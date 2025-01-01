import { Button } from "@mui/material";

import useAppDialogAtom from "../../atoms/appDialogAtom";

export default function AppButton() {
    const { openAppDialog } = useAppDialogAtom();

    return (
        <Button
            sx={{
                color: "#32c6c6",
                textTransform: "none",
            }}
            onClick={openAppDialog}
        >
            用 Bahamut Sticker Master 調整貼圖順序
        </Button>
    );
}
