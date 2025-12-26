/* * ==========================================
 * 全能小學霸 - 核心資料庫 (data.js)
 * 包含：英文(QA/分類)、數學(難度設定)、練字(字母表)
 * ==========================================
 */

// 🔴 第一區：雲端設定 (想用 Google Sheet 管理題目時才需修改)
// 網址格式: https://docs.google.com/spreadsheets/d/[您的ID]/edit#gid=0
const CLOUD_CONFIG = {
    ENABLED: true, // 如果不想連網，改成 false
    SHEET_ID: "1bGCAc8NfSmsHtZhXJlyUUonbYyCRq7MCGxwQWOZMpN4", // 您的試算表 ID
    GID_QA: "538396553",          // QA 分頁的 gid (通常是 0)
    GID_SORT: "1804170933" // Sort 分頁的 gid (請看網址列)
};

// 🟢 第二區：本地預設題庫 (沒網路時會用這裡的題目)
// 這裡已經預先填入了 Unit 1-7 的重點內容
let GAME_DATA = {

    // --- 🔠 英文科 (English) ---
    ENGLISH: {
        // 模式一：對話與問答 (Q&A)
        QA_LIST: [
            // Unit 1: Feelings & Health
            { q: "How are you?", a: "I am happy.", wrong: ["I am a pencil.", "It is red."] },
            { q: "Are you sad?", a: "No, I am happy.", wrong: ["Yes, I don't.", "It is a dog."] },
            { q: "What's the matter?", a: "I have a headache.", wrong: ["I am happy.", "It is a book."] },
            { q: "I feel hot.", a: "You have a fever.", wrong: ["You are cold.", "It is blue."] },
            
            // Unit 2: Things
            { q: "Is this your ruler?", a: "Yes, it is.", wrong: ["No, I don't.", "I am running."] },
            { q: "Where is the eraser?", a: "Here it is.", wrong: ["Yes, it is.", "I am hungry."] },
            
            // Unit 3: Jobs & Time
            { q: "What time is it?", a: "It's 7 o'clock.", wrong: ["It's a pencil.", "I am 7."] },
            { q: "What do you want to be?", a: "I want to be a doctor.", wrong: ["I want a pizza.", "Yes, I do."] },
            { q: "Who helps sick animals?", a: "A vet.", wrong: ["A cook.", "A book."] },

            // Unit 4: Food
            { q: "What do you want?", a: "I want noodles.", wrong: ["I want happy.", "It is blue."] },
            { q: "Do you like pizza?", a: "Yes, I do.", wrong: ["Yes, I am.", "No, it isn't."] },
            { q: "Are you thirsty?", a: "I want juice.", wrong: ["I want pizza.", "I am sad."] },

            // Unit 5: Pets & Zoo
            { q: "What says Meow?", a: "A cat.", wrong: ["A dog.", "A cow."] },
            { q: "Is the lion scary?", a: "Yes, it is.", wrong: ["No, it is cute.", "I am a lion."] },
            
            // Unit 6: Sports & Actions
            { q: "What are you doing?", a: "I am running.", wrong: ["I am happy.", "It is a ball."] },
            { q: "Can you jump?", a: "Yes, I can.", wrong: ["Yes, I do.", "No, it isn't."] },
            { q: "Do you like baseball?", a: "Yes, I do.", wrong: ["Yes, I can.", "I am baseball."] },

            // Unit 7: Clothes
            { q: "What are you wearing?", a: "I'm wearing a jacket.", wrong: ["I'm wearing a pizza.", "Yes, I am."] },
            { q: "Put on your shoes.", a: "Okay, Mom.", wrong: ["No, I am not.", "It is a shoe."] }
        ],

        // 模式二：單字分類 (Sorting)
        SORT_LIST: [
            { 
                theme: "Unit 1: Feelings (感覺)", 
                targets: ["Happy", "Sad", "Angry", "Sleepy", "Hungry"], 
                decoys: ["Pizza", "Pen", "Cat", "Run", "Desk"] 
            },
            { 
                theme: "Unit 2: Things (文具)", 
                targets: ["Ruler", "Eraser", "Pencil", "Bag", "Glue"], 
                decoys: ["Doctor", "Noodles", "Eye", "Jump", "Fever"] 
            },
            { 
                theme: "Unit 3: Jobs (職業)", 
                targets: ["Doctor", "Nurse", "Police", "Farmer", "Vet"], 
                decoys: ["Apple", "Ball", "Cat", "Dad", "Red"] 
            },
            { 
                theme: "Unit 4: Food (食物)", 
                targets: ["Pizza", "Noodles", "Rice", "Bread", "Cake"], 
                decoys: ["Book", "Pen", "Shoe", "Hat", "Dog"] 
            },
            { 
                theme: "Unit 5: Zoo Animals (動物)", 
                targets: ["Lion", "Tiger", "Bear", "Elephant", "Giraffe"], 
                decoys: ["Car", "Bus", "Pencil", "Ruler", "Apple"] 
            },
            { 
                theme: "Unit 6: Sports (運動)", 
                targets: ["Baseball", "Tennis", "Golf", "Football"], 
                decoys: ["Swimming", "Running", "Dancing", "Pizza"] 
            },
            { 
                theme: "Unit 7: Clothes (衣服)", 
                targets: ["Jacket", "Pants", "Skirt", "Shirt", "T-shirt"], 
                decoys: ["Shoes", "Socks", "Hat", "Glasses", "Book"] 
            }
        ]
    },

    // --- 🧮 數學科設定 (Math) ---
    MATH: {
        LEVELS: {
            1: { title: "L1: 基礎加法 (進位)", type: "ADD_CARRY", min: 10, max: 30 },
            2: { title: "L2: 基礎減法 (退位)", type: "SUB_BORROW", min: 20, max: 50 },
            3: { title: "L3: 混合挑戰 (三數運算)", type: "MIXED_3", min: 10, max: 20 }
        }
    },

    // --- ✍️ 練字設定 (Writing) ---
    WRITING: {
        EN: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        ZH: ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ", "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ", "ㄧ", "ㄨ", "ㄩ", "ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ", "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ"]
    }
};

// 🔵 第三區：雲端同步邏輯 (自動執行，不用動)
(async function initData() {
    // 如果沒開雲端或 ID 還是預設值，就只用本地資料
    if (!CLOUD_CONFIG.ENABLED || CLOUD_CONFIG.SHEET_ID.includes("請在此填入")) {
        console.log("📂 使用本地預設題庫");
        return;
    }

    const BASE_URL = `https://docs.google.com/spreadsheets/d/e/${CLOUD_CONFIG.SHEET_ID}/pub?gid=`;
    const FORMAT = "&single=true&output=csv";

    // 解析 CSV 的小工具
    const parseCSV = (text) => {
        const rows = text.split('\n').map(r => r.trim()).filter(r => r);
        if (rows.length < 2) return [];
        const headers = rows[0].split(',').map(h => h.trim());
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            // 處理逗號分隔 (簡易版)
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
            let obj = {};
            headers.forEach((h, idx) => obj[h] = cols[idx] || "");
            result.push(obj);
        }
        return result;
    };

    try {
        console.log("☁️ 正在檢查雲端題庫...");
        
        // 1. 抓 QA
        const resQA = await fetch(BASE_URL + CLOUD_CONFIG.GID_QA + FORMAT);
        if (resQA.ok) {
            const data = parseCSV(await resQA.text());
            const cleanData = data.map(r => ({
                q: r.question || r.q, // 相容兩種欄位名
                a: r.answer || r.a,
                wrong: [r.wrong1, r.wrong2].filter(w => w)
            })).filter(i => i.q && i.a);
            
            if (cleanData.length > 0) {
                GAME_DATA.ENGLISH.QA_LIST = cleanData;
                console.log(`✅ 雲端 QA 更新成功: ${cleanData.length} 題`);
            }
        }

        // 2. 抓 Sort
        const resSort = await fetch(BASE_URL + CLOUD_CONFIG.GID_SORT + FORMAT);
        if (resSort.ok) {
            const data = parseCSV(await resSort.text());
            const cleanData = data.map(r => ({
                theme: r.theme,
                targets: r.targets ? r.targets.split(',').map(s => s.trim()) : [],
                decoys: r.decoys ? r.decoys.split(',').map(s => s.trim()) : []
            })).filter(i => i.theme);

            if (cleanData.length > 0) {
                GAME_DATA.ENGLISH.SORT_LIST = cleanData;
                console.log(`✅ 雲端 Sort 更新成功: ${cleanData.length} 組`);
            }
        }

    } catch (e) {
        console.warn("⚠️ 雲端同步失敗 (可能是網路問題)，維持本地資料。", e);
    }
})();
