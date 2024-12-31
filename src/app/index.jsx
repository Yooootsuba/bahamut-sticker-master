import { Box, Button } from "@mui/material";

import AppButton from "./components/AppButton";

export default function index() {
    console.log("Bahamut Sticker Master: 渲染完成");

    return (
        <Box
            sx={{
                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AppButton />
        </Box>
    );
}