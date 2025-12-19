/* * 🔊 全能小學霸 - 音效與音樂控制中心 (sound.js)
 * 使用 Web Audio API 產生聲音，無需外部 MP3 檔案
 */

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

// --- 🎵 背景音樂 (簡單的八音盒旋律) ---
let bgmInterval = null;
let isMusicPlaying = false;
const melody = [
    {n: 261.63, d: 0.5}, {n: 329.63, d: 0.5}, {n: 392.00, d: 0.5}, // C4, E4, G4
    {n: 523.25, d: 1.0}, {n: 392.00, d: 0.5}, {n: 329.63, d: 0.5}  // C5, G4, E4
];
let noteIndex = 0;

function playNote(freq, duration) {
    if(ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; // 柔和的正弦波
    osc.frequency.value = freq;
    
    // 音量包絡 (淡入淡出)
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1); // 音量很小，當背景
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
}

function startBGM() {
    if (isMusicPlaying) return;
    isMusicPlaying = true;
    // 每 3 秒播放一段小旋律
    bgmInterval = setInterval(() => {
        let timeOffset = 0;
        melody.forEach(note => {
            setTimeout(() => playNote(note.n, note.d), timeOffset * 1000);
            timeOffset += note.d;
        });
    }, 4000); 
}

function stopBGM() {
    isMusicPlaying = false;
    clearInterval(bgmInterval);
}

function toggleBGM() {
    if(isMusicPlaying) stopBGM();
    else startBGM();
    return isMusicPlaying;
}

// --- 🔊 點擊與互動音效 ---
function playClick() {
    if(ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle'; // 三角波，聲音比較清脆
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // 音調上揚

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

function playSuccess() {
    if(ctx.state === 'suspended') ctx.resume();
    // 播放一個簡單的琶音
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C Major Chord
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const startTime = ctx.currentTime + (i * 0.1);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
    });
}
