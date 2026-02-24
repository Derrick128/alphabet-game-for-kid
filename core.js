/* 
 * Luke's Learning - Core Logic (core.js)
 * Central management for Sound, Stars, and Data
 * Added: Multi-Profile Support
 */

const LukeCore = {
    // --- 👥 Profile Management ---
    Profile: {
        current: 'luke', // Default

        init() {
            this.current = localStorage.getItem('luke_active_profile') || 'luke';
        },

        set(profileId) {
            this.current = profileId;
            localStorage.setItem('luke_active_profile', profileId);
            location.reload(); // Reload to refresh all system states
        },

        getPrefix() {
            return this.current + '_';
        }
    },

    // --- 🔊 Sound Management ---
    Audio: {
        ctx: null,
        melody: [
            { n: 261.63, d: 0.5 }, { n: 329.63, d: 0.5 }, { n: 392.00, d: 0.5 },
            { n: 523.25, d: 1.0 }, { n: 392.00, d: 0.5 }, { n: 329.63, d: 0.5 }
        ],
        bgmInterval: null,
        isMusicPlaying: false,

        init() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
            }
        },

        playNote(freq, duration) {
            this.init();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },

        playClick() {
            this.init();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        },

        playSuccess() {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => this.playNote(freq, 0.4), i * 100);
            });
        },

        toggleBGM() {
            if (this.isMusicPlaying) {
                clearInterval(this.bgmInterval);
                this.isMusicPlaying = false;
            } else {
                this.isMusicPlaying = true;
                this.bgmInterval = setInterval(() => {
                    let offset = 0;
                    this.melody.forEach(note => {
                        setTimeout(() => this.playNote(note.n, note.d), offset * 1000);
                        offset += note.d;
                    });
                }, 4000);
            }
            return this.isMusicPlaying;
        },

        speak(text, lang = 'en-US') {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            u.rate = 0.9;
            window.speechSynthesis.speak(u);
        }
    },

    // --- 🕒 Timer Management ---
    Timer: {
        startTime: 0,
        start() {
            this.startTime = Date.now();
        },
        stop() {
            if (this.startTime === 0) return 0;
            const duration = Math.floor((Date.now() - this.startTime) / 1000);
            this.startTime = 0;
            return duration; // return seconds
        }
    },

    // --- 🗓️ Daily Progress & Rewards ---
    Daily: {
        getToday() {
            return new Date().toISOString().split('T')[0];
        },
        getTaskKey(taskId) {
            return `daily_${this.getToday()}_${LukeCore.Profile.current}_${taskId}`;
        },
        markComplete(taskId, duration) {
            const data = { completed: true, duration: duration, starsEarned: 0 };
            localStorage.setItem(this.getTaskKey(taskId), JSON.stringify(data));
        },
        getTaskStatus(taskId) {
            const data = localStorage.getItem(this.getTaskKey(taskId));
            return data ? JSON.parse(data) : { completed: false, duration: 0 };
        },
        isChestReady() {
            const tasks = ['english', 'math', 'write-en', 'write-zh'];
            const allDone = tasks.every(t => this.getTaskStatus(t).completed);
            const chestOpened = localStorage.getItem(`chest_${this.getToday()}_${LukeCore.Profile.current}`);
            return allDone && !chestOpened;
        },
        openChest() {
            if (!this.isChestReady()) return 0;
            const reward = Math.floor(Math.random() * 5) + 1;
            LukeCore.Stats.addStars(reward);
            localStorage.setItem(`chest_${this.getToday()}_${LukeCore.Profile.current}`, 'true');
            return reward;
        }
    },

    // --- ⭐ Star & Progress Management ---
    Stats: {
        _key(label) {
            return LukeCore.Profile.getPrefix() + label;
        },
        getStars() {
            return parseInt(localStorage.getItem(this._key('stars')) || '0');
        },
        addStars(count) {
            const current = this.getStars();
            localStorage.setItem(this._key('stars'), current + count);
            console.log(`⭐ Stars Added: ${count}. Total: ${current + count}`);
            return current + count;
        },
        // --- 🛍️ Shop & Inventory ---
        getInventory() {
            return JSON.parse(localStorage.getItem(this._key('inventory')) || '[]');
        },
        buyItem(itemId, price) {
            const stars = this.getStars();
            const inventory = this.getInventory();
            if (stars >= price && !inventory.includes(itemId)) {
                localStorage.setItem(this._key('stars'), stars - price);
                inventory.push(itemId);
                localStorage.setItem(this._key('inventory'), JSON.stringify(inventory));
                return { success: true, stars: stars - price };
            }
            return { success: false, reason: stars < price ? '星星不夠喔！' : '已經擁有了' };
        },
        saveOutfit(outfit) {
            localStorage.setItem(this._key('outfit'), JSON.stringify(outfit));
        },
        getOutfit() {
            return JSON.parse(localStorage.getItem(this._key('outfit')) || '[]');
        },
        toggleEquip(itemId) {
            let outfit = this.getOutfit();
            if (outfit.includes(itemId)) {
                outfit = outfit.filter(id => id !== itemId);
            } else {
                outfit.push(itemId);
            }
            this.saveOutfit(outfit);
            return outfit;
        }
    },

    // --- 🛠️ UI Helpers ---
    UI: {
        showFeedback(msg, duration = 2000) {
            const el = document.getElementById('feedback-msg');
            if (el) {
                el.innerText = msg;
                el.style.display = 'block';
                setTimeout(() => el.style.display = 'none', duration);
            }
        }
    },

    init() {
        this.Profile.init();
    }
};

// Auto-init
LukeCore.init();

// Global shorthand for games to use
const playClick = () => LukeCore.Audio.playClick();
const playSuccess = () => LukeCore.Audio.playSuccess();
const showFeedback = (msg) => LukeCore.UI.showFeedback(msg);
