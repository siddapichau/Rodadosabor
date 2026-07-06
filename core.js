'use strict';
console.log('core.js carregado');

(function() {
    window.isServerSynced = false;

    const _rawState = {
        coins: 0, 
        vipUntil: 0,
        darkMode: false,
        foods: ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"],
        unlockedPageThemes: ["theme-1"], currentPageTheme: "theme-1",
        unlockedRouletteThemes: ["theme-1"], currentRouletteTheme: "theme-1",
        unlockedSpinSounds: ["spin-1"], currentSpinSound: "spin-1",
        unlockedEndSounds: ["end-1"], currentEndSound: "end-1",
        unlockedWinSounds: ["win-1"], currentWinSound: "win-1",
        unlockedEffects: ["effect-1"], currentEffect: "effect-1",
        unlockedRecipes: [], customFoods: []
    };

    const proxyState = new Proxy(_rawState, {
        set(target, prop, value) { return false; }, 
        get(target, prop) {
            const value = target[prop];
            if (Array.isArray(value)) return Object.freeze([...value]); 
            return value;
        }
    });

    Object.defineProperty(window, 'appState', {
        value: proxyState, writable: false, configurable: false
    });

    window.isVipAtivo = function() { return _rawState.vipUntil > Date.now(); };

    window.isItemLiberado = function(nomeDoArray, idDoItem) {
        if (window.isVipAtivo()) return true; 
        return _rawState[nomeDoArray].includes(idDoItem);
    };

    window.ativarVipMensal = function() {
        const trintaDiasEmMs = 30 * 24 * 60 * 60 * 1000;
        _rawState.vipUntil = Date.now() + trintaDiasEmMs;
        window.saveData();
        return true;
    };

    window.comprarItemSeguro = function(categoria, id) {
        if (!window.isServerSynced) {
            alert("Aguarde a sincronização com o servidor.");
            return false; 
        }

        if (window.isVipAtivo()) {
            alert("Você é VIP! Não precisa gastar moedas. O item já está liberado.");
            return false;
        }

        let preco = 0; let arrayDestravados = ''; let itemAtual = '';
        if (categoria === 'spinSound') { const i = window.SONS_GIRO?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedSpinSounds'; itemAtual = 'currentSpinSound'; }
        else if (categoria === 'endSound') { const i = window.SONS_FIM?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedEndSounds'; itemAtual = 'currentEndSound'; }
        else if (categoria === 'winSound') { const i = window.SONS_VITORIA?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedWinSounds'; itemAtual = 'currentWinSound'; }
        else if (categoria === 'effect') { const i = window.EFEITOS_VISUAIS?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedEffects'; itemAtual = 'currentEffect'; }
        else if (categoria === 'pageTheme') { const i = window.listTemas?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedPageThemes'; itemAtual = 'currentPageTheme'; }
        else if (categoria === 'rouletteTheme') { const i = window.listTemas?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedRouletteThemes'; itemAtual = 'currentRouletteTheme'; }
        else if (categoria === 'recipe') { const i = window.RECEITAS?.find(x => x.id === id); if(!i) return false; preco = i.preco; arrayDestravados = 'unlockedRecipes'; itemAtual = null; }

        if (_rawState.coins >= preco) {
            _rawState.coins -= preco;
            if (!_rawState[arrayDestravados].includes(id)) _rawState[arrayDestravados].push(id);
            if (itemAtual) _rawState[itemAtual] = id;
            window.saveData();
            return true;
        }
        return false;
    };

    window.equiparItemSeguro = function(categoria, id) {
        let arrayDestravados = ''; let itemAtual = '';
        if (categoria === 'spinSound') { arrayDestravados = 'unlockedSpinSounds'; itemAtual = 'currentSpinSound'; }
        else if (categoria === 'endSound') { arrayDestravados = 'unlockedEndSounds'; itemAtual = 'currentEndSound'; }
        else if (categoria === 'winSound') { arrayDestravados = 'unlockedWinSounds'; itemAtual = 'currentWinSound'; }
        else if (categoria === 'effect') { arrayDestravados = 'unlockedEffects'; itemAtual = 'currentEffect'; }
        else if (categoria === 'pageTheme') { arrayDestravados = 'unlockedPageThemes'; itemAtual = 'currentPageTheme'; }
        else if (categoria === 'rouletteTheme') { arrayDestravados = 'unlockedRouletteThemes'; itemAtual = 'currentRouletteTheme'; }

        if (window.isItemLiberado(arrayDestravados, id)) {
            _rawState[itemAtual] = id;
            window.saveData();
            return true;
        }
        return false;
    };

    window.gastarMoedaGiro = function() {
        if (window.isVipAtivo()) return true; 
        if (!window.isServerSynced) return false;
        
        if (_rawState.coins >= 1) { 
            _rawState.coins -= 1; 
            window.saveData(); 
            return true; 
        }
        return false;
    };

    // ========================== ADMOB E RECOMPENSAS ==========================
    let lastAdTime = 0;
    let rewardedAdLoaded = false;
    const ADMOB_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917'; // ID de teste

    window.ganharMoedasAnuncio = async function() {
        console.log("📢 ganharMoedasAnuncio chamado");

        // Verifica se está no Capacitor (app nativo Android/iOS)
        const isNative = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();

        if (!isNative) {
            // === MODO WEB (SIMULAÇÃO DE 30s) ===
            if (!window.isServerSynced) {
                console.warn("❌ Servidor não sincronizado");
                return false;
            }
            const now = Date.now();
            const diff = now - lastAdTime;
            if (diff < 25000) {
                console.warn("🛑 SPAM Bloqueado (menos de 25s)");
                return false;
            }
            lastAdTime = now;
            _rawState.coins += 3;
            window.saveData();
            return true;
        }

        // === MODO NATIVO (ADMOB REAL) ===
        try {
            // Carrega o anúncio se não estiver carregado
            if (!rewardedAdLoaded) {
                const { AdMob } = window.Capacitor.Plugins;
                await AdMob.loadRewardedAd({
                    adId: ADMOB_REWARDED_ID,
                    isTest: true, // Mude para false em produção quando publicar nas lojas
                });
                rewardedAdLoaded = true;
                console.log('✅ Anúncio recompensado carregado');
            }

            // Exibe o anúncio e aguarda recompensa
            return new Promise((resolve) => {
                const { AdMob } = window.Capacitor.Plugins;

                // Listener para recompensa
                const rewardListener = AdMob.addListener('rewardedAdReward', (reward) => {
                    console.log('🎁 Recompensa concedida:', reward.amount);
                    _rawState.coins += reward.amount || 3;
                    window.saveData();
                    window.updateCoinsDisplay();
                    rewardListener.remove();
                    resolve(true); // Retorna true para o app.js exibir o alerta de sucesso
                });

                // Listener para fechamento sem recompensa
                const closeListener = AdMob.addListener('rewardedAdClosed', () => {
                    console.log('🚪 Anúncio fechado sem recompensa');
                    closeListener.remove();
                    resolve(false); // Retorna false para não dar moedas
                });

                AdMob.showRewardedAd().catch((err) => {
                    console.error('Erro ao exibir anúncio:', err);
                    _rawState.coins += 3; // Fallback
                    window.saveData();
                    window.updateCoinsDisplay();
                    resolve(true);
                });
            });
        } catch (error) {
            console.error('❌ Erro no AdMob:', error);
            _rawState.coins += 3; // Fallback se o plugin falhar
            window.saveData();
            window.updateCoinsDisplay();
            return true;
        }
    };

    // ========================== FIREBASE & DADOS ==========================
    if (window.firebaseConfig && !firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
    const auth = window.firebaseConfig ? firebase.auth() : null;
    const database = window.firebaseConfig ? firebase.database() : null;
    let currentUserUid = null;

    window.conectarGoogle = function() {
        if (!auth) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        
        if (auth.currentUser && auth.currentUser.isAnonymous) {
            auth.currentUser.linkWithPopup(provider).then((result) => {
                alert("✅ Conta salva e vinculada ao Google com sucesso!");
                window.location.reload(); 
            }).catch((error) => {
                if (error.code === 'auth/credential-already-in-use') {
                    if (confirm("Esse e-mail do Google já tem um progresso salvo. Deseja trocar para ele? (Você perderá o progresso anônimo atual).")) {
                        auth.signInWithCredential(error.credential).then(() => {
                            window.location.reload();
                        });
                    }
                } else {
                    console.error("Erro no Login com Google:", error);
                    alert("❌ Ocorreu um erro ao conectar com o Google. Certifique-se de ter adicionado os domínios autorizados no Firebase.");
                }
            });
        } else {
            alert("Sua conta já está protegida pelo Google!");
        }
    };

    function reverterItensVencidos() {
        if (!window.isItemLiberado('unlockedEffects', _rawState.currentEffect)) _rawState.currentEffect = "effect-1";
        if (!window.isItemLiberado('unlockedSpinSounds', _rawState.currentSpinSound)) _rawState.currentSpinSound = "spin-1";
        if (!window.isItemLiberado('unlockedEndSounds', _rawState.currentEndSound)) _rawState.currentEndSound = "end-1";
        if (!window.isItemLiberado('unlockedWinSounds', _rawState.currentWinSound)) _rawState.currentWinSound = "win-1";
        if (!window.isItemLiberado('unlockedPageThemes', _rawState.currentPageTheme)) _rawState.currentPageTheme = "theme-1";
        if (!window.isItemLiberado('unlockedRouletteThemes', _rawState.currentRouletteTheme)) _rawState.currentRouletteTheme = "theme-1";
    }

    function garantirArraysNoEstado() {
        if (!Array.isArray(_rawState.unlockedEffects)) _rawState.unlockedEffects = ["effect-1"];
        if (!Array.isArray(_rawState.unlockedSpinSounds)) _rawState.unlockedSpinSounds = ["spin-1"];
        if (!Array.isArray(_rawState.unlockedEndSounds)) _rawState.unlockedEndSounds = ["end-1"];
        if (!Array.isArray(_rawState.unlockedWinSounds)) _rawState.unlockedWinSounds = ["win-1"];
        if (!Array.isArray(_rawState.unlockedPageThemes)) _rawState.unlockedPageThemes = ["theme-1"];
        if (!Array.isArray(_rawState.unlockedRouletteThemes)) _rawState.unlockedRouletteThemes = ["theme-1"];
        if (!Array.isArray(_rawState.foods) || _rawState.foods.length === 0) _rawState.foods = ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"];
        if (!Array.isArray(_rawState.customFoods)) _rawState.customFoods = [];
        if (!Array.isArray(_rawState.unlockedRecipes)) _rawState.unlockedRecipes = [];
        reverterItensVencidos();
    }

    function ativarModoOffline() {
        if (!window.isServerSynced) {
            console.warn("⚠️ Firebase não respondeu a tempo. Entrando no modo Offline.");
            window.isServerSynced = true; 
            if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
            if (typeof window.renderAll === 'function') window.renderAll();
        }
    }

    window.loadData = function() {
        try {
            const saved = localStorage.getItem('rodaDoSaborState');
            if (saved) {
                const parsed = JSON.parse(saved);
                delete parsed.coins;
                delete parsed.vipUntil;
                Object.assign(_rawState, parsed);
            }
            garantirArraysNoEstado();
            
            const coinEl = document.getElementById('coin-balance');
            if (coinEl) coinEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        } catch (e) {}

        setTimeout(ativarModoOffline, 4000);

        if (auth && database) {
            auth.signInAnonymously().catch(err => {
                console.error("🛑 Erro Auth:", err);
                ativarModoOffline(); 
            });

            auth.onAuthStateChanged((user) => {
                if (user) {
                    currentUserUid = user.uid;
                    
                    const btnGoogle = document.getElementById('btnGoogleLogin');
                    if (btnGoogle) {
                        btnGoogle.style.display = user.isAnonymous ? 'flex' : 'none';
                    }

                    database.ref('users/' + currentUserUid + '/appState').on('value', (snapshot) => {
                        window.isServerSynced = true; 
                        
                        if (snapshot.exists()) {
                            const serverData = snapshot.val();
                            Object.assign(_rawState, serverData); 
                            garantirArraysNoEstado();
                            if (typeof window.renderAll === 'function') window.renderAll();
                        } else {
                            _rawState.coins = 20; _rawState.vipUntil = 0;
                            _rawState.unlockedPageThemes = ["theme-1"]; _rawState.unlockedEffects = ["effect-1"];
                            garantirArraysNoEstado();
                            window.saveData(); 
                            if (typeof window.renderAll === 'function') window.renderAll();
                        }
                    });
                }
            });
        } else {
            ativarModoOffline();
        }
    };

    let saveTimeout = null;
    window.saveData = function() {
        const coinEl = document.getElementById('coin-balance');
        if (coinEl && window.isServerSynced) coinEl.textContent = _rawState.coins;
        
        try { localStorage.setItem('rodaDoSaborState', JSON.stringify(_rawState)); } catch (e) {}
        
        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            if (currentUserUid && database && window.isServerSynced) {
                database.ref('users/' + currentUserUid + '/appState').set(_rawState)
                    .catch((error) => {
                        if (error.code === "PERMISSION_DENIED") {
                            console.warn("Transação negada pelo servidor.");
                            localStorage.removeItem('rodaDoSaborState'); window.location.reload(); 
                        }
                    });
            }
        }, 100);
    };

    window.loadData();

    // ========================== SINTETIZADOR DE ÁUDIO ==========================
    let audioCtx = null;
    window.getAudioContext = function() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; };

    window.playSynthesizedSound = function(soundType) {
        try {
            const ctx = window.getAudioContext(); const now = ctx.currentTime;
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
                case 'win-tada': [523.25, 659.25, 783.99].forEach(f => osc(ctx, now, f, f, 0.1, 'sine', 0.2)); [523.25, 659.25, 783.99, 1046.50].forEach(f => osc(ctx, now + 0.15, f, f, 0.8, 'sine', 0.2)); break;
                case 'win-applause': playNoise(ctx, now, 2.5, 0.3); break;
                case 'win-arcade': [261.63, 329.63, 392.00, 523.25, 659.25, 783.99].forEach((f, i) => oscSquare(ctx, now + i * 0.1, f, f, 0.15, 0.15)); break;
                case 'win-epic': [261.63, 392, 523.25, 783.99].forEach((f, i) => osc(ctx, now + i * 0.2, f, f, 1.2, 'triangle', 0.2)); break;
                case 'win-party': [440, 440, 440, 554, 659, 554, 659, 880].forEach((f, i) => osc(ctx, now + i * 0.12, f, f, 0.1, 'square', 0.15)); break;
                default: osc(ctx, now, 400, 400, 0.1, 'sine', 0.2); break;
            }
        } catch (e) {}
    };

    function playNoise(ctx, start, duration, gainValue) {
        const bufferSize = ctx.sampleRate * duration; const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate); const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource(); noise.buffer = buffer; const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1000;
        const g = ctx.createGain(); g.gain.setValueAtTime(gainValue, start); g.gain.exponentialRampToValueAtTime(0.01, start + duration);
        noise.connect(filter); filter.connect(g); g.connect(ctx.destination); noise.start(start);
    }

    function osc(ctx, start, fStart, fEnd, duration, type, gain) {
        const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = type;
        o.frequency.setValueAtTime(fStart, start); o.frequency.exponentialRampToValueAtTime(fEnd, start + duration);
        g.gain.setValueAtTime(gain, start); g.gain.exponentialRampToValueAtTime(0.001, start + duration);
        o.connect(g); g.connect(ctx.destination); o.start(start); o.stop(start + duration);
    }
    function oscSquare(ctx, start, fStart, fEnd, duration, gain) {
        const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = 'square';
        o.frequency.setValueAtTime(fStart, start); o.frequency.exponentialRampToValueAtTime(fEnd, start + duration);
        g.gain.setValueAtTime(gain, start); g.gain.exponentialRampToValueAtTime(0.001, start + duration);
        o.connect(g); g.connect(ctx.destination); o.start(start); o.stop(start + duration);
    }

    window.applyThemes = function() {
        const themes = window.listTemas || []; if (themes.length === 0) return;
        const pageTheme = themes.find(t => t.id === _rawState.currentPageTheme) || themes[0];
        const rouletteTheme = themes.find(t => t.id === _rawState.currentRouletteTheme) || themes[0];
        const mode = _rawState.darkMode ? 'dark' : 'light';
        
        const pageData = pageTheme[mode];
        if (pageData && pageData.style) {
            const root = document.documentElement;
            root.style.setProperty('--bg-body', pageData.style.bg); root.style.setProperty('--bg-card', pageData.style.card);
            root.style.setProperty('--text-primary', pageData.style.text); root.style.setProperty('--accent', pageData.style.accent);
            root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${pageData.colors[0] || '#f5d742'}, ${pageData.colors[1] || '#7b9e5a'})`);
        }

        const rouletteData = rouletteTheme[mode];
        if (rouletteData && rouletteData.colors) {
            const root = document.documentElement;
            root.style.setProperty('--wheel-border', rouletteData.colors[0]); root.style.setProperty('--wheel-center', rouletteData.colors[2] || rouletteData.colors[1] || '#f5d742');
        }

        if (typeof window.drawRoulette === 'function') window.drawRoulette();
    };
})();
