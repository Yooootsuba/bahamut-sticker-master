import { URL_MY_STICKER } from "../constants/bahamut";
import { ORIGINAL_FETCH, SESSION_STORAGE_STICKERS } from "../constants/browser";

/*
 * args[0] 是 url
 *
 * 當 url 是 https://api.gamer.com.tw/mobile_app/im/v1/my_sticker.php 的時候
 *
 * 會把 Response 存進 sessionStorage 提供使用者做排序
 *
 * 如果 localStorage 已經有使用者偏好的貼圖順序，就用來當作 Response 回傳給前端
 *
 * 達到自訂貼圖順序的功能
 *
 */
export const fetchInterceptor = () => {
    window.fetch = (...args) => {
        if (args[0] === URL_MY_STICKER) {
            console.log("Bahamut Sticker Master: 偵測到取得貼圖的 Request");

            return ORIGINAL_FETCH(...args).then((response) => {
                return response.json().then((data) => {
                    // 將使用者的貼圖列表存放到 sessionStorage
                    sessionStorage.setItem(
                        SESSION_STORAGE_STICKERS,
                        JSON.stringify(data)
                    );

                    // 回傳新的 Response 物件
                    return new Response(JSON.stringify(data), {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers,
                    });
                });
            });
        }

        return ORIGINAL_FETCH(...args);
    };
};
