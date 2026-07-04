'use strict';
console.log('core.js carregado');

// ========================== ESTADO GLOBAL ==========================
window.appState = {
    coins: 20,
    darkMode: false,
    foods: ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"],
    unlockedPageThemes: ["theme-1"],
    currentPageTheme: "theme-1",
    unlockedRouletteThemes: ["theme-1"],
    currentRouletteTheme: "theme-1",
    unlockedSpinSounds: ["spin-1"],
    currentSpinSound: "spin-1",
    unlockedEndSounds: ["end-1"],
    currentEndSound: "end-1",
    unlockedWinSounds: ["win-1"],
    currentWinSound: "win-1",
    unlockedEffects: ["effect-1"],
    currentEffect: "effect-1",
    unlockedRecipes: [],
    customFoods: []
};

window.loadData = function() {
    try {
        const saved = localStorage.getItem('rodaDoSaborState');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Mescla mantendo as chaves padrão para as que faltarem
            window.appState = { ...window.appState, ...parsed };
        }
        // Garantia de que arrays essenciais existam e estejam com valores padrão
        if (!Array.isArray(window.appState.unlockedEffects) || window.appState.unlockedEffects.length === 0) {
            window.appState.unlockedEffects = ["effect-1"];
        }
        if (!window.appState.currentEffect) {
            window.appState.currentEffect = "effect-1";
        }
        if (!Array.isArray(window.appState.unlockedSpinSounds) || window.appState.unlockedSpinSounds.length === 0) {
            window.appState.unlockedSpinSounds = ["spin-1"];
        }
        if (!window.appState.currentSpinSound) {
            window.appState.currentSpinSound = "spin-1";
        }
        if (!Array.isArray(window.appState.unlockedEndSounds) || window.appState.unlockedEndSounds.length === 0) {
            window.appState.unlockedEndSounds = ["end-1"];
        }
        if (!window.appState.currentEndSound) {
            window.appState.currentEndSound = "end-1";
        }
        if (!Array.isArray(window.appState.unlockedWinSounds) || window.appState.unlockedWinSounds.length === 0) {
            window.appState.unlockedWinSounds = ["win-1"];
        }
        if (!window.appState.currentWinSound) {
            window.appState.currentWinSound = "win-1";
        }
        if (!Array.isArray(window.appState.unlockedPageThemes) || window.appState.unlockedPageThemes.length === 0) {
            window.appState.unlockedPageThemes = ["theme-1"];
        }
        if (!window.appState.currentPageTheme) {
            window.appState.currentPageTheme = "theme-1";
        }
        if (!Array.isArray(window.appState.unlockedRouletteThemes) || window.appState.unlockedRouletteThemes.length === 0) {
            window.appState.unlockedRouletteThemes = ["theme-1"];
        }
        if (!window.appState.currentRouletteTheme) {
            window.appState.currentRouletteTheme = "theme-1";
        }
        if (!Array.isArray(window.appState.foods) || window.appState.foods.length === 0) {
            window.appState.foods = ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"];
        }
        if (!Array.isArray(window.appState.customFoods)) {
            window.appState.customFoods = [];
        }
        if (!Array.isArray(window.appState.unlockedRecipes)) {
            window.appState.unlockedRecipes = [];
        }
        console.log('📦 Estado carregado:', window.appState);
    } catch (e) {
        console.warn('Erro ao carregar estado, usando padrão:', e);
    }
};

window.saveData = function() {
    try {
        localStorage.setItem('rodaDoSaborState', JSON.stringify(window.appState));
        // Atualiza o display de moedas se o elemento existir
        const coinEl = document.getElementById('coin-balance');
        if (coinEl) coinEl.textContent = window.appState.coins;
    } catch (e) {
        console.warn('Erro ao salvar estado:', e);
    }
};

// Carrega imediatamente
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
            default: // fallback para tipo desconhecido
                osc(ctx, now, 400, 400, 0.1, 'sine', 0.2);
                break;
        }
    } catch (e) {
        console.warn('Erro ao reproduzir som:', e);
    }
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
    // Verifica se listTemas existe, senão usa um fallback
    const themes = window.listTemas || [];
    if (themes.length === 0) {
        console.warn('Nenhum tema definido. Usando valores padrão.');
        // Define cores padrão (modo claro)
        const root = document.documentElement;
        root.style.setProperty('--bg-body', '#f3e7da');
        root.style.setProperty('--bg-card', 'rgba(255,255,255,0.88)');
        root.style.setProperty('--text-primary', '#1e2a3a');
        root.style.setProperty('--accent', '#7b9e5a');
        root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #f5d742, #7b9e5a)');
        root.style.setProperty('--wheel-border', '#f5b342');
        root.style.setProperty('--wheel-center', '#f5d742');
        return;
    }

    const pageTheme = themes.find(t => t.id === window.appState.currentPageTheme) || themes[0];
    const rouletteTheme = themes.find(t => t.id === window.appState.currentRouletteTheme) || themes[0];
    const mode = window.appState.darkMode ? 'dark' : 'light';
    
    // Aplica tema da página
    const pageData = pageTheme[mode];
    if (pageData && pageData.style) {
        const root = document.documentElement;
        root.style.setProperty('--bg-body', pageData.style.bg);
        root.style.setProperty('--bg-card', pageData.style.card);
        root.style.setProperty('--text-primary', pageData.style.text);
        root.style.setProperty('--accent', pageData.style.accent);
        root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${pageData.colors[0]}, ${pageData.colors[1]})`);
    }

    // Aplica tema da roleta
    const rouletteData = rouletteTheme[mode];
    if (rouletteData && rouletteData.colors) {
        const root = document.documentElement;
        root.style.setProperty('--wheel-border', rouletteData.colors[0]);
        root.style.setProperty('--wheel-center', rouletteData.colors[2] || '#f5d742');
    }

    window.saveData();
    if (typeof window.drawRoulette === 'function') {
        window.drawRoulette();
    }
};