/* * ==========================================
 * 全能小學霸 - 終極雲端版 (data.js)
 * 直接使用 Google 發布的長網址 (2PACX...)
 * ==========================================
 */

// 🔴 請在這裡貼上您剛剛複製的兩個長網址
const CLOUD_URLS = {
    // 1. QA 分頁的網址 (請確認結尾是 output=csv)
    QA: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJlOQX4hEEg1qqajECCgWXHnLfPlwlVmroRA56t3i3oizWcO6Wsk_Y9E3cKQJGsKMm_hwTz2OY8IPI/pub?gid=538396553&single=true&output=csv",

    // 2. Sort 分頁的網址 (請去發布視窗切換到 Sort 分頁再複製)
    SORT: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJlOQX4hEEg1qqajECCgWXHnLfPlwlVmroRA56t3i3oizWcO6Wsk_Y9E3cKQJGsKMm_hwTz2OY8IPI/pub?gid=1804170933&single=true&output=csv"
};

// 商店物品清單
const SHOP_DATA = [
    { id: 'bowtie', name: '紅領結', price: 10, icon: '🎀' },
    { id: 'pencil', name: '大鉛筆', price: 20, icon: '✏️' },
    { id: 'eraser', name: '橡皮擦', price: 20, icon: '🧼' },
    { id: 'hat', name: '小草帽', price: 50, icon: '👒' },
    { id: 'glasses', name: '墨鏡', price: 100, icon: '😎' }
];

// 本地預設資料
let GAME_DATA = {
    ENGLISH: { QA_LIST: [], SORT_LIST: [] },
    MATH: {
        LEVELS: {
            1: { title: "L1: 基礎加法 (進位)", type: "ADD_CARRY", min: 10, max: 30 },
            2: { title: "L2: 基礎減法 (退位)", type: "SUB_BORROW", min: 20, max: 50 },
            3: { title: "L3: 混合挑戰 (三數運算)", type: "MIXED_3", min: 10, max: 20 }
        }
    },
    WRITING: {
        EN: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        ZH: ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ", "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ", "ㄧ", "ㄨ", "ㄩ", "ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ", "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ"]
    },
    loadFromCloud: null,
    isLoaded: false
};

const parseCSV = (text) => {
    const rows = text.split('\n').map(r => r.trim()).filter(r => r);
    if (rows.length < 2) return [];
    const headers = rows[0].split(',').map(h => h.trim());
    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
        let obj = {};
        headers.forEach((h, idx) => obj[h] = cols[idx] || "");
        result.push(obj);
    }
    return result;
};

GAME_DATA.loadFromCloud = async function () {
    try {
        if (CLOUD_URLS.QA && CLOUD_URLS.QA.startsWith("http")) {
            const resQA = await fetch(CLOUD_URLS.QA + "&t=" + new Date().getTime());
            if (resQA.ok) {
                const text = await resQA.text();
                const cleanQA = parseCSV(text).map(r => ({
                    q: r.question || r.q,
                    a: r.answer || r.a,
                    wrong: [r.wrong1, r.wrong2].filter(w => w)
                })).filter(i => i.q && i.a);
                if (cleanQA.length > 0) GAME_DATA.ENGLISH.QA_LIST = cleanQA;
            }
        }

        if (CLOUD_URLS.SORT && CLOUD_URLS.SORT.startsWith("http")) {
            const resSort = await fetch(CLOUD_URLS.SORT + "&t=" + new Date().getTime());
            if (resSort.ok) {
                const text = await resSort.text();
                const cleanSort = parseCSV(text).map(r => ({
                    theme: r.theme,
                    targets: r.targets ? r.targets.split(',').map(s => s.trim()) : [],
                    decoys: r.decoys ? r.decoys.split(',').map(s => s.trim()) : []
                })).filter(i => i.theme);
                if (cleanSort.length > 0) GAME_DATA.ENGLISH.SORT_LIST = cleanSort;
            }
        }
        GAME_DATA.isLoaded = true;
    } catch (e) {
        console.error("❌ 連線錯誤:", e);
    }
};
