/* * ==========================================
 * 全能小學霸 - 純雲端題庫版 (data.js)
 * 英文題目完全從 Google Sheets 讀取
 * ==========================================
 */

// 🔴 請在這裡填入您的 Google Sheet 資訊
const CLOUD_CONFIG = {
    // 您的試算表 ID (在網址列 /d/ 和 /edit 之間的那串亂碼)
    SHEET_ID: "1bGCAc8NfSmsHtZhXJlyUUonbYyCRq7MCGxwQWOZMpN4", 
    
    // 分頁 GID (請看試算表網址列最後面的 gid=...)
    GID_QA: "538396553",          // QA 對話練習的分頁
    GID_SORT: "1804170933" // Sort 分類練習的分頁
};

// 🟢 資料庫骨架 (預設英文是空的，數學與練字保留本地設定)
let GAME_DATA = {
    // --- 🔠 英文科 (將由雲端填入) ---
    ENGLISH: {
        QA_LIST: [],   // 預設為空，等待下載
        SORT_LIST: []  // 預設為空，等待下載
    },

    // --- 🧮 數學科 (邏輯設定，建議保留在本地) ---
    MATH: {
        LEVELS: {
            1: { title: "L1: 基礎加法 (進位)", type: "ADD_CARRY", min: 10, max: 30 },
            2: { title: "L2: 基礎減法 (退位)", type: "SUB_BORROW", min: 20, max: 50 },
            3: { title: "L3: 混合挑戰 (三數運算)", type: "MIXED_3", min: 10, max: 20 }
        }
    },

    // --- ✍️ 練字設定 (字母表，建議保留在本地) ---
    WRITING: {
        EN: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        ZH: ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ", "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ", "ㄧ", "ㄨ", "ㄩ", "ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ", "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ"]
    }
};

// 🔵 雲端同步程式 (自動執行)
(async function syncData() {
    // 防呆：如果 ID 還沒填，就停止
    if (CLOUD_CONFIG.SHEET_ID.includes("請在此填入")) {
        console.warn("⚠️ 尚未設定 Google Sheet ID，英文題庫將為空！");
        return;
    }

    const BASE_URL = `https://docs.google.com/spreadsheets/d/e/${CLOUD_CONFIG.SHEET_ID}/pub?gid=`;
    const FORMAT = "&single=true&output=csv";

    // CSV 解析工具
    const parseCSV = (text) => {
        const rows = text.split('\n').map(r => r.trim()).filter(r => r);
        if (rows.length < 2) return [];
        // 處理 header
        const headers = rows[0].split(',').map(h => h.trim());
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            // 簡易逗號處理 (若內容有逗號建議用引號包起)
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
            let obj = {};
            headers.forEach((h, idx) => obj[h] = cols[idx] || "");
            result.push(obj);
        }
        return result;
    };

    try {
        console.log("☁️ 開始下載雲端題庫...");

        // 1. 下載 QA 資料
        const resQA = await fetch(BASE_URL + CLOUD_CONFIG.GID_QA + FORMAT);
        if (resQA.ok) {
            const rawData = await resQA.text();
            const data = parseCSV(rawData);
            
            // 轉換格式以符合 App 需求
            const cleanQA = data.map(r => ({
                q: r.question || r.q, 
                a: r.answer || r.a,
                wrong: [r.wrong1, r.wrong2].filter(w => w)
            })).filter(item => item.q && item.a); // 過濾掉沒題目或沒答案的

            if (cleanQA.length > 0) {
                GAME_DATA.ENGLISH.QA_LIST = cleanQA;
                console.log(`✅ QA 更新成功: 載入 ${cleanQA.length} 題`);
            }
        }

        // 2. 下載 Sort 資料
        const resSort = await fetch(BASE_URL + CLOUD_CONFIG.GID_SORT + FORMAT);
        if (resSort.ok) {
            const rawData = await resSort.text();
            const data = parseCSV(rawData);

            // 轉換格式
            const cleanSort = data.map(r => ({
                theme: r.theme,
                targets: r.targets ? r.targets.split(',').map(s => s.trim()) : [],
                decoys: r.decoys ? r.decoys.split(',').map(s => s.trim()) : []
            })).filter(item => item.theme);

            if (cleanSort.length > 0) {
                GAME_DATA.ENGLISH.SORT_LIST = cleanSort;
                console.log(`✅ Sort 更新成功: 載入 ${cleanSort.length} 組`);
            }
        }

    } catch (error) {
        console.error("❌ 雲端下載失敗 (請檢查網路或 ID)", error);
        alert("連線錯誤：無法讀取雲端題庫，請檢查網路連線。");
    }
})();
