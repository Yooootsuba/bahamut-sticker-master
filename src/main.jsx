import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { fetchInterceptor } from "./app/services/fetchInterceptor";

/*
 * 攔截 https://api.gamer.com.tw/mobile_app/im/v1/my_sticker.php
 *
 */
fetchInterceptor();

const app = document.createElement("div");
const targetSelector = ".sticker-wrapper";

const observer = new MutationObserver((mutations) => {
    const target = document.querySelector(targetSelector);

    if (target) {
        target.before(app);
        ReactDOM.createRoot(app).render(<App />);
        observer.disconnect(); // 停止觀察
    }
});

// 開始觀察 DOM 變化
observer.observe(document.body, { childList: true, subtree: true });
