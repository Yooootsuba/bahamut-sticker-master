import { URL_MY_STICKER } from "../constants/bahamut";
import { ORIGINAL_FETCH } from "../constants/browser";

export const fetchInterceptor = () => {
    window.fetch = (...args) => {
        const url = args[0];

        if (url === URL_MY_STICKER) {
            console.log("Bahamut Sticker Master: 偵測到取得貼圖的 Request");

            return ORIGINAL_FETCH(...args).then((response) => {
                return response;
            });
        }

        return ORIGINAL_FETCH(...args);
    };
};
