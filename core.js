'use strict';
console.log('core.js carregado');

// Tudo dentro desta função é INVISÍVEL para o console do navegador
(function() {
    const _rawState = {
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

    const proxyState = new Proxy(_rawState, {
        set(target, prop, value) {
            if (prop === 'coins') {
                console.warn('🛑 Operação bloqueada. Sistema de segurança ativo.');
                return false; 
            }
            target[prop] = value;
            return true;
        }
    });

    Object.defineProperty(window, 'appState', {
        value: proxyState,
        writable: false,
        configurable: false
    });

    window.gastarMoedasSeguro = function(qnt) {
        if (_rawState.coins >= qnt) {
            _rawState.coins -= qnt;
            window.saveData();
            return true;
        }
        return false;
    };

    window.ganharMoedasAnuncio = function() {
        _rawState.coins += 3;
        window.saveData();
    };

    if (window.firebaseConfig && !firebase.apps.length) {
        firebase.initializeApp(window.firebaseConfig);
    }
    const auth = window.firebaseConfig ? firebase.auth() : null;
    const database = window.firebaseConfig ? firebase.database() : null;
    let currentUserUid = null;

    function garantirArraysNoEstado() {
        if (!Array.isArray(_rawState.unlockedEffects) || _rawState.unlockedEffects.length === 0) _rawState.unlockedEffects = ["effect-1"];
        if (!_rawState.currentEffect) _rawState.currentEffect = "effect-1";
        if (!Array.isArray(_rawState.unlockedSpinSounds) || _rawState.unlockedSpinSounds.length === 0) _rawState.unlockedSpinSounds = ["spin-1"];
        if (!_rawState.currentSpinSound) _rawState.currentSpinSound = "spin-1";
        if (!Array.isArray(_rawState.unlockedEndSounds) || _rawState.unlockedEndSounds.length === 0) _rawState.unlockedEndSounds = ["end-1"];
        if (!_rawState.currentEndSound) _rawState.currentEndSound = "end-1";
        if (!Array.isArray(_rawState.unlockedWinSounds) || _rawState.unlockedWinSounds.length === 0) _rawState.unlockedWinSounds = ["win-1"];
        if (!_rawState.currentWinSound) _rawState.currentWinSound = "win-1";
        if (!Array.isArray(_rawState.unlockedPageThemes) || _rawState.unlockedPageThemes.length === 0) _rawState.unlockedPageThemes = ["theme-1"];
        if (!_rawState.currentPageTheme) _rawState.currentPageTheme = "theme-1";
        if (!Array.isArray(_rawState.unlockedRouletteThemes) || _rawState.unlockedRouletteThemes.length === 0) _rawState.unlockedRouletteThemes = ["theme-1"];
        if (!_rawState.currentRouletteTheme) _rawState.currentRouletteTheme = "theme-1";
        if (!Array.isArray(_rawState.foods) || _rawState.foods.length === 0) _rawState.foods = ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"];
        if (!Array.isArray(_rawState.customFoods)) _rawState.customFoods = [];
        if (!Array.isArray(_rawState.unlockedRecipes)) _rawState.unlockedRecipes = [];
    }

    window.loadData = function() {
        try {
            const saved = localStorage.getItem('rodaDoSaborState');
            if (saved) {
                Object.assign(_rawState, JSON.parse(saved));
            }
            garantirArraysNoEstado();
        } catch (e) {
            console.warn('Erro ao carregar estado local:', e);
        }

        if (auth && database) {
            auth.signInAnonymously().catch(err => console.warn("Erro Auth Anônima:", err));
            auth.onAuthStateChanged((user) => {
                if (user) {
                    currentUserUid = user.uid;
                    database.ref('users/' + currentUserUid + '/appState').once('value').then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            Object.assign(_rawState, data); 
                            garantirArraysNoEstado();
                            
                            // 👇 Mostra no F12 o saldo blindado real
                            console.log(`☁️ DADOS DO BANCO: Você tem exatamente ${data.coins} moedas no servidor Firebase.`);
                            
                            if (typeof window.renderAll === 'function') window.renderAll();
                        } else {
                            window.saveData(); 
                        }
                    });
                }
            });
        }
    };

    let saveTimeout = null;
    window.saveData = function() {
        const coinEl = document.getElementById('coin-balance');
        if (coinEl) coinEl.textContent = _rawState.coins;
        
        try {
            localStorage.setItem('rodaDoSaborState', JSON.stringify(_rawState));
        } catch (e) {}

        if (saveTimeout) clearTimeout(saveTimeout);

        saveTimeout = setTimeout(() => {
            if (currentUserUid && database) {
                database.ref('users/' + currentUserUid + '/appState').set(_rawState)
                    .then(() => {
                        console.log('☁️ Sincronizado com a nuvem!');
                    })
                    .catch((error) => {
                        if (error.code === "PERMISSION_DENIED" || error.message.includes("Permission denied")) {
                            console.error("🛑 O Firebase bloqueou esta ação por fraude:", error.message);
                            
                            // 👇 SE O FIREBASE NEGAR, DESTRÓI OS DADOS FALSOS E RECARREGA A PÁGINA
                            alert("⚠️ ALERTA DE SEGURANÇA: Saldo adulterado detectado! Limpando dados falsos e restaurando do servidor...");
                            localStorage.removeItem('rodaDoSaborState'); 
                            window.location.reload(); 
                        } else {
                            console.warn("⚠️ Falha temporária de conexão:", error.message);
                        }
                    });
            }
        }, 100);
    };

    window.loadData();

    // ========================== SINTETIZADOR DE ÁUDIO ==========================
    let audioCtx = null;
    window.getAudioContext = function() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        return audioCtx;
    };

    window.playSynthesizedSound = function(soundType) {
        try {
            const ctx = window.getAudioContext();
            const now = ctx.currentTime;
            switch (soundType) {
                case 'click': osc(ctx, now, 400, 80, 0.04, 'sine', 0.3); break;
                case 'swoosh': osc(ctx, now, 80, 250, 0.08, 'triangle', 0.2); break;
                case 'arcade': oscSquare(ctx, now, 600, 900, 0.06, 0.15); break;
                case 'motor': oscSquare(ctx, now, 100, 50, 0.08, 0.2); break;
                case 'whoosh': osc(ctx, now, 60, 350, 0.15, 'sawtooth', 0.15); break;
                case 'digital': oscSquare(ctx, now, 500, 1200, 0.05, 0.1); break;
                case 'end-chord': [392, 493, 587].forEach((f) => osc(ctx, now, f, f, 0.3, 'sine', 0.2)); break;
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
                default: osc(ctx, now, 400, 400, 0.1, 'sine', 0.2); break;
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

    window.applyThemes = function() {
        const themes = window.listTemas || [];
        if (themes.length === 0) return;
        const pageTheme = themes.find(t => t.id === _rawState.currentPageTheme) || themes[0];
        const rouletteTheme = themes.find(t => t.id === _rawState.currentRouletteTheme) || themes[0];
        const mode = _rawState.darkMode ? 'dark' : 'light';
        
        const pageData = pageTheme[mode];
        if (pageData && pageData.style) {
            const root = document.documentElement;
            root.style.setProperty('--bg-body', pageData.style.bg);
            root.style.setProperty('--bg-card', pageData.style.card);
            root.style.setProperty('--text-primary', pageData.style.text);
            root.style.setProperty('--accent', pageData.style.accent);
            const color1 = pageData.colors[0] || '#f5d742';
            const color2 = pageData.colors[1] || '#7b9e5a';
            root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${color1}, ${color2})`);
        }

        const rouletteData = rouletteTheme[mode];
        if (rouletteData && rouletteData.colors) {
            const root = document.documentElement;
            root.style.setProperty('--wheel-border', rouletteData.colors[0]);
            root.style.setProperty('--wheel-center', rouletteData.colors[2] || rouletteData.colors[1] || '#f5d742');
        }

        if (typeof window.drawRoulette === 'function') {
            window.drawRoulette();
        }
    };
})();
