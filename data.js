/* * ==========================================
 * 全能小學霸 - 題庫資料庫 (data.js)
 * ==========================================
 */

const GAME_DATA = {

    // --- 🔠 英文科資料 ---
    ENGLISH: {
        QA_LIST: [
            { q: "Are you happy?", a: "Yes, I am.", wrong: ["No, it isn't.", "I want pizza."] },
            { q: "Happy Birthday!", a: "Thank you!", wrong: ["I am sad.", "Yes, I do."] },
            { q: "What's the matter?", a: "I am not feeling well.", wrong: ["I am happy.", "It is a pen."] },
            { q: "Is this your ruler?", a: "Yes, it is.", wrong: ["I am sleepy.", "Here you are."] },
            { q: "Where is the eraser?", a: "Here it is.", wrong: ["Yes, I do.", "I'm running."] },
            { q: "What time is it?", a: "It's five o'clock.", wrong: ["It's a dog.", "I'm hungry."] },
            { q: "What do you want to be?", a: "I want to be a firefighter.", wrong: ["I like apples.", "No, I don't."] },
            { q: "What do you want?", a: "I want pizza.", wrong: ["I have a cat.", "It's a pencil."] },
            { q: "Do you like papayas?", a: "Yes, I do.", wrong: ["I'm wearing a skirt.", "Here it is."] },
            { q: "Do you have a pet?", a: "Yes, I have a dog.", wrong: ["It is five o'clock.", "I want juice."] },
            { q: "What are you doing?", a: "I'm singing.", wrong: ["I'm a doctor.", "Yes, please."] },
            { q: "What are you wearing?", a: "I'm wearing a skirt.", wrong: ["I like football.", "It's five o'clock."] }
        ],
        SORT_LIST: [
            { theme: "Unit 1: Feelings (感覺)", targets: ["Happy", "Sad", "Angry", "Sleepy", "Hungry"], decoys: ["Pizza", "Pen", "Cat", "Run", "Desk"] },
            { theme: "Unit 1: Health (健康)", targets: ["Headache", "Fever", "Cough", "Runny nose"], decoys: ["Happy", "Ruler", "Dog", "Jump"] },
            { theme: "Unit 2: Things (文具)", targets: ["Ruler", "Eraser", "Pencil", "Bag", "Glue", "Scissors"], decoys: ["Doctor", "Noodles", "Eye", "Jump", "Fever"] },
            { theme: "Unit 4: Food (食物)", targets: ["Pizza", "Noodles", "Milk", "Juice", "Papaya", "Grape"], decoys: ["Jacket", "Short", "Nurse", "Singing", "Ruler"] },
            { theme: "Unit 6: Sports (運動)", targets: ["Baseball", "Tennis", "Swimming", "Golf", "Football"], decoys: ["Onion", "Happy", "Jacket", "Book", "Red"] }
        ]
    },

    // --- 🧮 數學科設定 ---
    MATH: {
        LEVELS: {
            1: { title: "L1: 進位加法 (兩位數)", type: "ADD_CARRY", min: 15, max: 45 },
            2: { title: "L2: 退位減法 (兩位數)", type: "SUB_BORROW", min: 30, max: 60 },
            3: { title: "L3: 連續運算 (加減混合)", type: "MIXED_3", min: 10, max: 20 }
        }
    },

    // --- ✍️ 練字設定 (Writing) ---
    WRITING: {
        // 英文模式
        EN: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
             "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        
        // 注音模式 (新增)
        ZH: ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ",
             "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ",
             "ㄧ", "ㄨ", "ㄩ", "ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ",
             "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ"]
    }
};
