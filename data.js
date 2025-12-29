/* * ==========================================
 * 全能小學霸 - 雲端版 (data.js)
 * 修復版：使用 Export 模式
 * ==========================================
 */

// 1. 您的設定 (保持不變)
const CLOUD_CONFIG = {
    SHEET_ID: "1bGCAc8NfSmsHtZhXJlyUUonbYyCRq7MCGxwQWOZMpN4", 
    GID_QA: "538396553",   
    GID_SORT: "1804170933" 
};

// 2. 本地預設資料 (英文留空，等待雲端下載)
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
    }
};

// 3. 雲端同步程式
(async function syncData() {
    console.log("☁️ 準備連線到 Google Sheets...");

    // 🔴 關鍵修改：改用 export 格式，這對應您的 ID 絕對沒問題
    const BASE_URL = `https://docs.google.com/spreadsheets/d/${CLOUD_CONFIG.SHEET_ID}/export?format=csv&gid=`;

    const parseCSV = (text) => {
        const rows = text.split('\n').map(r => r.trim()).filter(r => r);
        if (rows.length < 2) return [];
        const headers = rows[0].split(',').map(h => h.trim());
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            // 處理逗號 (簡易版: 遇到引號內的逗號不切分)
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
            let obj = {};
            headers.forEach((h, idx) => obj[h] = cols[idx] || "");
            result.push(obj);
        }
        return result;
    };

    try {
        // 下載 QA
        console.log("正在下載 QA...");
        const resQA = await fetch(BASE_URL + CLOUD_CONFIG.GID_QA);
        
        if (!resQA.ok) throw new Error(`QA 下載失敗: ${resQA.status}`);
        
        const txtQA = await resQA.text();
        const cleanQA = parseCSV(txtQA).map(r => ({
            q: r.question || r.q, 
            a: r.answer || r.a,
            wrong: [r.wrong1, r.wrong2].filter(w => w)
        })).filter(i => i.q && i.a);

        if (cleanQA.length > 0) {
            GAME_DATA.ENGLISH.QA_LIST = cleanQA;
            console.log(`✅ QA 載入成功: ${cleanQA.length} 題`);
        }

        // 下載 Sort
        console.log("正在下載 Sort...");
        const resSort = await fetch(BASE_URL + CLOUD_CONFIG.GID_SORT);
        
        if (!resSort.ok) throw new Error(`Sort 下載失敗: ${resSort.status}`);

        const txtSort = await resSort.text();
        const cleanSort = parseCSV(txtSort).map(r => ({
            theme: r.theme,
            targets: r.targets ? r.targets.split(',').map(s => s.trim()) : [],
            decoys: r.decoys ? r.decoys.split(',').map(s => s.trim()) : []
        })).filter(i => i.theme);

        if (cleanSort.length > 0) {
            GAME_DATA.ENGLISH.SORT_LIST = cleanSort;
            console.log(`✅ Sort 載入成功: ${cleanSort.length} 組`);
        }

    } catch (e) {
        console.error("❌ 同步發生錯誤:", e);
        // 如果是 404 或 CORS 錯誤，通常是權限沒開
        if(e.message.includes("404") || e.message.includes("Failed")) {
            alert("讀取失敗！請確認 Google Sheet 有開啟「知道連結的人都能檢視」權限。");
        }
    }
})();
