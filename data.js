/* * ==========================================
 * 全能小學霸 - 題庫資料庫 (data.js)
 * 請在這裡修改或新增題目
 * ==========================================
 */

const GAME_DATA = {

    // --- 🔠 英文科資料 (English) ---
    ENGLISH: {
        // 模式一：對話配對 (QA Mode)
        // q: 問題, a: 正確回答, wrong: 錯誤的干擾選項
        QA_LIST: [
            // Unit 1: Feelings [cite: 1]
            { q: "Are you happy?", a: "Yes, I am.", wrong: ["No, it isn't.", "I want pizza."] },
            { q: "Happy Birthday!", a: "Thank you!", wrong: ["I am sad.", "Yes, I do."] },
            { q: "What's the matter?", a: "I am not feeling well.", wrong: ["I am happy.", "It is a pen."] }, // [cite: 3]
            
            // Unit 2: Things [cite: 7]
            { q: "Is this your ruler?", a: "Yes, it is.", wrong: ["I am sleepy.", "Here you are."] },
            { q: "Where is the eraser?", a: "Here it is.", wrong: ["Yes, I do.", "I'm running."] }, // [cite: 8]
            
            // Unit 3: Jobs / Time [cite: 14, 18]
            { q: "What time is it?", a: "It's five o'clock.", wrong: ["It's a dog.", "I'm hungry."] },
            { q: "What do you want to be?", a: "I want to be a firefighter.", wrong: ["I like apples.", "No, I don't."] },
            
            // Unit 4: Food [cite: 21, 25]
            { q: "What do you want?", a: "I want pizza.", wrong: ["I have a cat.", "It's a pencil."] },
            { q: "Do you like papayas?", a: "Yes, I do.", wrong: ["I'm wearing a skirt.", "Here it is."] },
            
            // Unit 5: Pets [cite: 28]
            { q: "Do you have a pet?", a: "Yes, I have a dog.", wrong: ["It is five o'clock.", "I want juice."] },
            
            // Unit 6: Actions [cite: 33]
            { q: "What are you doing?", a: "I'm singing.", wrong: ["I'm a doctor.", "Yes, please."] },
            
            // Unit 7: Clothes [cite: 39]
            { q: "What are you wearing?", a: "I'm wearing a skirt.", wrong: ["I like football.", "It's five o'clock."] }
        ],

        // 模式二：單字分類 (Sorting Mode)
        // theme: 主題名稱, targets: 屬於該主題的字, decoys: 不屬於該主題的干擾字
        SORT_LIST: [
            { 
                theme: "Unit 1: Feelings (感覺)", // [cite: 2]
                targets: ["Happy", "Sad", "Angry", "Sleepy", "Hungry"], 
                decoys: ["Pizza", "Pen", "Cat", "Run", "Desk"] 
            },
            { 
                theme: "Unit 1: Health (健康)", // [cite: 4]
                targets: ["Headache", "Fever", "Cough", "Runny nose"], 
                decoys: ["Happy", "Ruler", "Dog", "Jump"] 
            },
            { 
                theme: "Unit 2: Things (文具)", // [cite: 8]
                targets: ["Ruler", "Eraser", "Pencil", "Bag", "Glue", "Scissors"], 
                decoys: ["Doctor", "Noodles", "Eye", "Jump", "Fever"] 
            },
            { 
                theme: "Unit 4: Food (食物)", // [cite: 22, 26]
                targets: ["Pizza", "Noodles", "Milk", "Juice", "Papaya", "Grape"], 
                decoys: ["Jacket", "Short", "Nurse", "Singing", "Ruler"] 
            },
            { 
                theme: "Unit 6: Sports (運動)", // [cite: 37]
                targets: ["Baseball", "Tennis", "Swimming", "Golf", "Football"], 
                decoys: ["Onion", "Happy", "Jacket", "Book", "Red"] 
            }
        ]
    },

    // --- 🧮 數學科設定 (Math) ---
    MATH: {
        LEVELS: {
            1: { title: "L1: 進位加法 (兩位數)", type: "ADD_CARRY", min: 15, max: 45 },
            2: { title: "L2: 退位減法 (兩位數)", type: "SUB_BORROW", min: 30, max: 60 },
            3: { title: "L3: 連續運算 (加減混合)", type: "MIXED_3", min: 10, max: 20 }
        }
    },

    // --- ✍️ 練字設定 (Writing) ---
    WRITING: {
        // 如果想練小寫，可以在這裡改成 ["a", "b", "c"...]
        LETTERS: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    }
};
