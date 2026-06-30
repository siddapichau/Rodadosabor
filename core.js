'use strict';
console.log('core.js carregado');

// ========================== ESTADO GLOBAL ==========================
window.appState = {
    coins: 20,
    darkMode: false,
    foods: ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"],
    unlockedPageThemes: ["theme-1"], currentPageTheme: "theme-1",
    unlockedRouletteThemes: ["theme-1"], currentRouletteTheme: "theme-1",
    unlockedSpinSounds: ["spin-1"], currentSpinSound: "spin-1",
    unlockedEndSounds: ["end-1"], currentEndSound: "end-1",
    unlockedWinSounds: ["win-1"], currentWinSound: "win-1",
    unlockedRecipes: [], customFoods: []
};

window.loadData = function() {
    try {
        const saved = localStorage.getItem('rodaDoSaborState');
        if (saved) {
            window.appState = { ...window.appState, ...JSON.parse(saved) };
            if (!window.appState.unlockedEndSounds) {
                window.appState.unlockedEndSounds = ["end-1"];
                window.appState.currentEndSound = "end-1";
            }
        }
        if (!window.appState.foods || window.appState.foods.length === 0) {
            window.appState.foods = ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"];
        }
    } catch (e) {}
};

window.saveData = function() {
    try {
        localStorage.setItem('rodaDoSaborState', JSON.stringify(window.appState));
        const coinEl = document.getElementById('coin-balance');
        if (coinEl) coinEl.textContent = window.appState.coins;
    } catch (e) {}
};

window.loadData();

// ========================== SINTETIZADOR DE ÁUDIO ==========================
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

window.playSynthesizedSound = function(soundType) {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        switch (soundType) {
            case 'click': osc(ctx, now, 400, 80, 0.04, 'sine', 0.3); break;
            case 'swoosh': osc(ctx, now, 80, 250, 0.08, 'triangle', 0.2); break;
            case 'arcade': oscSquare(ctx, now, 600, 900, 0.06, 0.15); break;
            case 'motor': oscSquare(ctx, now, 100, 50, 0.08, 0.2); break;
            case 'whoosh': osc(ctx, now, 60, 350, 0.15, 'sawtooth', 0.15); break;
            case 'digital': oscSquare(ctx, now, 500, 1200, 0.05, 0.1); break;
            case 'end-chord': [392, 493, 587].forEach((f, i) => osc(ctx, now, f, f, 0.3, 'sine', 0.2)); break;
            case 'end-bell': osc(ctx, now, 987.77, 987.77, 0.6, 'triangle', 0.4); break;
            case 'end-coin': [987.77, 1318.51].forEach((f, i) => oscSquare(ctx, now + i * 0.1, f, f, 0.2, 0.15)); break;
            case 'end-thud': osc(ctx, now, 150, 40, 0.2, 'square', 0.4); break;
            case 'end-zap': oscSquare(ctx, now, 800, 100, 0.3, 0.2); break;
            case 'win-tada': 
                [523.25, 659.25, 783.99].forEach((f) => osc(ctx, now, f, f, 0.1, 'sine', 0.2)); 
                [523.25, 659.25, 783.99, 1046.50].forEach((f) => osc(ctx, now + 0.15, f, f, 0.8, 'sine', 0.2)); 
                break;
            case 'win-applause': playNoise(ctx, now, 2.5, 0.3); break;
            case 'win-arcade': [261.63, 329.63, 392.00, 523.25, 659.25, 783.99].forEach((f, i) => oscSquare(ctx, now + i * 0.1, f, f, 0.15, 0.15)); break;
            case 'win-epic': [261.63, 392, 523.25, 783.99].forEach((f, i) => osc(ctx, now + i * 0.2, f, f, 1.2, 'triangle', 0.2)); break;
            case 'win-party': [440, 440, 440, 554, 659, 554, 659, 880].forEach((f, i) => osc(ctx, now + i * 0.12, f, f, 0.1, 'square', 0.15)); break;
        }
    } catch (e) {}
};

function playNoise(ctx, start, duration, gainValue) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource(); noise.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1000;
    const g = ctx.createGain(); g.gain.setValueAtTime(gainValue, start); g.gain.exponentialRampToValueAtTime(0.01, start + duration);
    noise.connect(filter); filter.connect(g); g.connect(ctx.destination);
    noise.start(start);
}

function osc(ctx, start, freqStart, freqEnd, duration, type, gain) {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freqStart, start); o.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    g.gain.setValueAtTime(gain, start); g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    o.connect(g); g.connect(ctx.destination); o.start(start); o.stop(start + duration);
}
function oscSquare(ctx, start, freqStart, freqEnd, duration, gain) {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(freqStart, start); o.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    g.gain.setValueAtTime(gain, start); g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    o.connect(g); g.connect(ctx.destination); o.start(start); o.stop(start + duration);
}

// ========================== APLICAÇÃO DE TEMAS ==========================
window.applyThemes = function() {
    const pageTheme = window.listTemas.find(t => t.id === window.appState.currentPageTheme) || window.listTemas[0];
    const rouletteTheme = window.listTemas.find(t => t.id === window.appState.currentRouletteTheme) || window.listTemas[0];
    const mode = window.appState.darkMode ? 'dark' : 'light';
    
    const pageData = pageTheme[mode];
    const root = document.documentElement;
    root.style.setProperty('--bg-body', pageData.style.bg);
    root.style.setProperty('--bg-card', pageData.style.card);
    root.style.setProperty('--text-primary', pageData.style.text);
    root.style.setProperty('--accent', pageData.style.accent);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${pageData.colors[0]}, ${pageData.colors[1]})`);
    
    const rouletteData = rouletteTheme[mode];
    root.style.setProperty('--wheel-border', rouletteData.colors[0]);
    root.style.setProperty('--wheel-center', rouletteData.colors[2] || '#f5d742');

    window.saveData();
    if (typeof window.drawRoulette === 'function') {
        window.drawRoulette();
    }
};
