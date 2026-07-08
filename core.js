'use strict';
console.log('core.js carregado (v15 - VIP Oculta Loja e NoAds Mensal)');

(function() {
    window.isServerSynced = false;

    const _rawState = {
        coins: 0, vipUntil: 0, noAdsUntil: 0, darkMode: false, displayName: '',
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

    Object.defineProperty(window, 'appState', { value: proxyState, writable: false, configurable: false });

    window.toggleDarkModeSeguro = function() { _rawState.darkMode = !_rawState.darkMode; window.saveData(); window.applyThemes(); };
    window.isVipAtivo = function() { return _rawState.vipUntil > Date.now(); };
    window.isNoAdsAtivo = function() { return window.isVipAtivo() || _rawState.noAdsUntil > Date.now(); };
    window.isItemLiberado = function(nomeDoArray, idDoItem) { if (window.isVipAtivo()) return true; return _rawState[nomeDoArray].includes(idDoItem); };

    // ========================== SISTEMA PREMIUM MENSAL (R$ 10 e R$ 5) ==========================
    window.comprarPacoteReal = function(tipo) {
        if (!window.isServerSynced) { alert("Aguarde a sincronização com o servidor."); return; }
        
        const trintaDias = 30 * 24 * 60 * 60 * 1000;

        if (tipo === 'vip') {
            _rawState.vipUntil = Date.now() + trintaDias;
            alert("👑 Compra Concluída!\nVocê agora é VIP por 30 dias. Loja liberada e sem anúncios forçados!");
        } else if (tipo === 'no_ads') {
            _rawState.noAdsUntil = Date.now() + trintaDias;
            alert("🚫 Compra Concluída!\nOs anúncios forçados foram removidos por 30 dias.");
        }
        
        window.saveData();
        window.atualizarBannersEAnuncios();
        window.renderAll();
    };

    window.atualizarBannersEAnuncios = async function() {
        if (!window.isAppNativo()) return;
        try {
            const { AdMob } = window.Capacitor.Plugins;
            if (window.isNoAdsAtivo()) {
                await AdMob.hideBanner().catch(()=>{});
            } else {
                await AdMob.showBanner({ adId: ADMOB_BANNER, adPosition: 'BOTTOM_CENTER', isTesting: true, margin: 0 }).catch(()=>{});
            }
        } catch(e){}
    };

    // ========================== LOJA DE MOEDAS ==========================
    window.comprarItemSeguro = function(categoria, id) {
        if (!window.isServerSynced) return false;
        if (window.isVipAtivo()) { alert("👑 VIP Ativo! Todos os itens estão liberados para você."); return false; }
        let preco = 0; let arrayDestravados = ''; let itemAtual = '';
        if (categoria === 'spinSound') { const i = window.SONS_GIRO?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedSpinSounds'; itemAtual = 'currentSpinSound'; }
        else if (categoria === 'endSound') { const i = window.SONS_FIM?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedEndSounds'; itemAtual = 'currentEndSound'; }
        else if (categoria === 'winSound') { const i = window.SONS_VITORIA?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedWinSounds'; itemAtual = 'currentWinSound'; }
        else if (categoria === 'effect') { const i = window.EFEITOS_VISUAIS?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedEffects'; itemAtual = 'currentEffect'; }
        else if (categoria === 'pageTheme') { const i = window.listTemas?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedPageThemes'; itemAtual = 'currentPageTheme'; }
        else if (categoria === 'rouletteTheme') { const i = window.listTemas?.find(x => x.id === id); if(!i) return false; preco = i.price; arrayDestravados = 'unlockedRouletteThemes'; itemAtual = 'currentRouletteTheme'; }
        else if (categoria === 'recipe') { const i = window.RECEITAS?.find(x => x.id === id); if(!i) return false; preco = i.preco; arrayDestravados = 'unlockedRecipes'; itemAtual = null; }

        if (_rawState.coins >= preco) { _rawState.coins -= preco; if (!_rawState[arrayDestravados].includes(id)) _rawState[arrayDestravados].push(id); if (itemAtual) _rawState[itemAtual] = id; window.saveData(); return true; }
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

        if (window.isItemLiberado(arrayDestravados, id)) { _rawState[itemAtual] = id; window.saveData(); return true; }
        return false;
    };

    window.gastarMoedaGiro = function() {
        if (window.isVipAtivo()) return true; 
        if (!window.isServerSynced) return false;
        if (_rawState.coins >= 1) { _rawState.coins -= 1; window.saveData(); return true; }
        return false;
    };

    // ========================== ADMOB E RECOMPENSAS ==========================
    const ADMOB_BANNER = 'ca-app-pub-3940256099942544/6300978111';
    const ADMOB_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712';
    const ADMOB_REWARDED = 'ca-app-pub-3940256099942544/5224354917';

    window.isAppNativo = function() {
        return typeof window.Capacitor !== 'undefined' && 
               typeof window.Capacitor.isNativePlatform === 'function' && 
               window.Capacitor.isNativePlatform();
    };

    window.spinCounter = 0; 
    let resolveAdPromise = null;

    if (window.isAppNativo()) {
        try {
            const { AdMob } = window.Capacitor.Plugins;
            AdMob.initialize().then(async () => {
                console.log("✅ AdMob Inicializado");
                
                try { await AdMob.prepareInterstitial({ adId: ADMOB_INTERSTITIAL, isTesting: true }); } catch(e){}
                try { await AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true }); } catch(e){}

                // App Open Ad (Exibe passados 2 segundos se não for VIP ou NoAds)
                setTimeout(async () => {
                    if (!window.isNoAdsAtivo()) {
                        try { await AdMob.showInterstitial(); } catch(e){}
                    }
                    window.atualizarBannersEAnuncios();
                }, 2000);

                const handleReward = (reward) => {
                    try {
                        let recompensa = 3;
                        if (reward && reward.amount) recompensa = parseInt(reward.amount) || 3;
                        _rawState.coins += recompensa; window.saveData();
                        if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
                        if (resolveAdPromise) { resolveAdPromise(true); resolveAdPromise = null; }
                    } catch (err) { if (resolveAdPromise) { resolveAdPromise(true); resolveAdPromise = null; } }
                };

                const handleClose = () => {
                    try {
                        if (resolveAdPromise) { resolveAdPromise(false); resolveAdPromise = null; }
                        setTimeout(() => { AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true }).catch(()=>{}); }, 2000);
                    } catch (err) {}
                };

                AdMob.addListener('rewardedVideoAdReward', handleReward);
                AdMob.addListener('rewardedAdReward', handleReward);
                AdMob.addListener('rewardedVideoAdDismissed', handleClose);
                AdMob.addListener('rewardedAdDismissed', handleClose);
                AdMob.addListener('rewardedVideoAdShowFailed', handleClose);
            }).catch(console.error);
        } catch(e) {}
    }

    // Chamado agora DEPOIS que a roleta para!
    window.mostrarAdAposGiro = async function() {
        if (!window.isAppNativo() || window.isNoAdsAtivo()) return;
        if (window.spinCounter > 0 && window.spinCounter % 3 === 0) {
            try {
                const { AdMob } = window.Capacitor.Plugins;
                await AdMob.showInterstitial();
                AdMob.prepareInterstitial({ adId: ADMOB_INTERSTITIAL, isTesting: true }).catch(()=>{});
            } catch(e) {}
        }
    };

    window.ganharMoedasAnuncioWeb = function() {
        if (!window.isServerSynced) return false;
        _rawState.coins += 3; window.saveData(); return true;
    };

    window.mostrarAdMobNativo = async function() {
        if (!window.isAppNativo()) return false;
        try {
            const { AdMob } = window.Capacitor.Plugins;
            try { await AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true }); } catch(e) {}
            return new Promise((resolve) => {
                resolveAdPromise = resolve;
                setTimeout(() => {
                    if (resolveAdPromise) { resolveAdPromise(false); resolveAdPromise = null; }
                }, 90000);
                AdMob.showRewardVideoAd().catch((err) => {
                    if (resolveAdPromise) { resolveAdPromise(false); resolveAdPromise = null; }
                });
            });
        } catch (error) { return false; }
    };

    // ========================== FIREBASE & GOOGLE ==========================
    if (window.firebaseConfig && !firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
    const auth = window.firebaseConfig ? firebase.auth() : null;
    const database = window.firebaseConfig ? firebase.database() : null;
    let currentUserUid = null; let anonymousSignInAttempted = false;

    if (auth) auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(e => console.warn(e));

    function updateUserInterface(user) {
        const userArea = document.getElementById('userArea');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const btnGoogle = document.getElementById('btnGoogleLogin');

        if (!user) { if (userArea) userArea.style.display = 'none'; return; }
        let displayName = _rawState.displayName || user.displayName || '';
        if (!displayName) displayName = user.isAnonymous ? 'Convidado' : 'Usuário';

        if (userArea) {
            userArea.style.display = 'flex';
            if (userAvatar) userAvatar.textContent = displayName.charAt(0).toUpperCase();
            if (userName) {
                userName.textContent = displayName.split(' ')[0];
                if (!user.isAnonymous) userName.innerHTML += ' <i class="fas fa-check-circle" style="color:#27ae60;" title="Conta Segura"></i>';
            }
        }
        if (btnGoogle) btnGoogle.style.display = user.isAnonymous ? 'flex' : 'none';
    }

    window.editarNomeUsuario = function(novoNome) {
        if (!novoNome || typeof novoNome !== 'string') return false;
        let nomeLimpo = novoNome.replace(/[^a-zA-Z\s]/g, '').trim().replace(/\s+/g, ' ');
        if (nomeLimpo.length < 3 || nomeLimpo.length > 16) return false;
        _rawState.displayName = nomeLimpo; window.saveData();
        if (auth?.currentUser) updateUserInterface(auth.currentUser);
        return true;
    };

    function _mergeData(anonData, googleData) {
        const mergedCoins = (anonData.coins || 0) + (googleData.coins || 0);
        const mergeArray = (arr1, arr2) => Array.from(new Set([...(arr1 || []), ...(arr2 || [])]));
        const arrayFields = ['foods', 'customFoods', 'unlockedPageThemes', 'unlockedRouletteThemes', 'unlockedSpinSounds', 'unlockedEndSounds', 'unlockedWinSounds', 'unlockedEffects', 'unlockedRecipes'];
        const merged = { ...anonData, coins: mergedCoins };
        
        if (googleData.vipUntil && googleData.vipUntil > (merged.vipUntil || 0)) merged.vipUntil = googleData.vipUntil;
        if (googleData.noAdsUntil && googleData.noAdsUntil > (merged.noAdsUntil || 0)) merged.noAdsUntil = googleData.noAdsUntil;
        
        if (googleData.darkMode !== undefined) merged.darkMode = googleData.darkMode;
        if (googleData.displayName) merged.displayName = googleData.displayName;
        arrayFields.forEach(field => { merged[field] = mergeArray(anonData[field], googleData[field]); });
        return merged;
    }

    window.conectarGoogle = function() {
        if (!auth) return;
        if (window.isAppNativo()) {
            alert("⚠️ Segurança Android:\n\nPara vincular a sua conta, acesse nosso site pelo navegador.\n\nSeus dados vão sincronizar com o aplicativo automaticamente!");
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        const currentUser = auth.currentUser;
        if (!currentUser || !currentUser.isAnonymous) { alert("Sua conta já está protegida!"); return; }

        const modal = document.getElementById('mergeAccountModal');
        if (!modal) return;
        
        function proceedWithChoice(choice) {
            modal.style.display = 'none';
            const estadoAnonimo = JSON.parse(JSON.stringify(_rawState));
            
            auth.signInWithPopup(provider).then((result) => {
                const googleUser = result.user;
                database.ref('users/' + googleUser.uid + '/appState').once('value').then((snapshot) => {
                    const googleData = snapshot.val() || {};
                    let finalData;
                    if (choice === 'keep') finalData = { ...estadoAnonimo };
                    else if (choice === 'overwrite') finalData = { ...googleData };
                    else if (choice === 'merge') finalData = _mergeData(estadoAnonimo, googleData);
                    
                    finalData.displayName = googleUser.displayName || 'Usuário';
                    database.ref('users/' + googleUser.uid + '/appState').set(finalData).then(() => {
                        alert("✅ Conta vinculada e dados sincronizados com sucesso!");
                        window.location.reload(); 
                    });
                });
            }).catch((error) => { alert("❌ Erro ao conectar com o Google."); });
        }

        document.getElementById('mergeKeepAnon').onclick = () => proceedWithChoice('keep');
        document.getElementById('mergeOverwrite').onclick = () => proceedWithChoice('overwrite');
        document.getElementById('mergeCombine').onclick = () => proceedWithChoice('merge');
        document.getElementById('btnMergeCancel').onclick = () => modal.style.display = 'none';
        modal.style.display = 'flex';
    };

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
        
        if (!window.isItemLiberado('unlockedEffects', _rawState.currentEffect)) _rawState.currentEffect = "effect-1";
        if (!window.isItemLiberado('unlockedPageThemes', _rawState.currentPageTheme)) _rawState.currentPageTheme = "theme-1";
        if (!window.isItemLiberado('unlockedRouletteThemes', _rawState.currentRouletteTheme)) _rawState.currentRouletteTheme = "theme-1";
    }

    function ativarModoOffline() {
        if (!window.isServerSynced) {
            window.isServerSynced = true; 
            if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
            if (typeof window.renderAll === 'function') window.renderAll();
        }
    }

    window.loadData = function() {
        try {
            const saved = localStorage.getItem('rodaDoSaborState');
            if (saved) Object.assign(_rawState, JSON.parse(saved));
            garantirArraysNoEstado();
            if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
            if (typeof window.applyThemes === 'function') window.applyThemes();
            window.atualizarBannersEAnuncios();
        } catch (e) {}

        setTimeout(ativarModoOffline, 4000);

        if (auth && database) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    currentUserUid = user.uid;
                    updateUserInterface(user);
                    database.ref('users/' + currentUserUid + '/appState').on('value', (snapshot) => {
                        window.isServerSynced = true;
                        if (snapshot.exists()) {
                            Object.assign(_rawState, snapshot.val());
                        } else {
                            if (_rawState.coins === 0) _rawState.coins = 20;
                            window.saveData();
                        }
                        garantirArraysNoEstado();
                        if (typeof window.renderAll === 'function') window.renderAll();
                        window.atualizarBannersEAnuncios();
                        updateUserInterface(user);
                    });
                } else {
                    if (!anonymousSignInAttempted) {
                        anonymousSignInAttempted = true;
                        auth.signInAnonymously().catch(() => ativarModoOffline());
                    }
                }
            });
        } else { ativarModoOffline(); }
    };

    let saveTimeout = null;
    window.saveData = function() {
        const coinEl = document.getElementById('coin-balance');
        if (coinEl) coinEl.textContent = _rawState.coins;
        try { localStorage.setItem('rodaDoSaborState', JSON.stringify(_rawState)); } catch (e) {}
        
        if (saveTimeout) clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            if (currentUserUid && database && window.isServerSynced) {
                database.ref('users/' + currentUserUid + '/appState').set(_rawState).catch((error) => {
                    if (error.code === "PERMISSION_DENIED") { localStorage.removeItem('rodaDoSaborState'); window.location.reload(); }
                });
            }
        }, 100);
    };

    window.loadData();

    // ========================== ÁUDIO E SINTETIZADOR ==========================
    let audioCtx = null;
    window.getAudioContext = function() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; };

    window.playSynthesizedSound = function(soundType) {
        try {
            const ctx = window.getAudioContext(); const now = ctx.currentTime;
            switch (soundType) {
                case 'click': osc(ctx, now, 400, 80, 0.04, 'sine', 0.3); break;
                case 'end-chord': [392, 493, 587].forEach((f) => osc(ctx, now, f, f, 0.3, 'sine', 0.2)); break;
                case 'win-tada': [523.25, 659.25, 783.99].forEach(f => osc(ctx, now, f, f, 0.1, 'sine', 0.2)); [523.25, 659.25, 783.99, 1046.50].forEach(f => osc(ctx, now + 0.15, f, f, 0.8, 'sine', 0.2)); break;
                default: osc(ctx, now, 400, 400, 0.1, 'sine', 0.2); break;
            }
        } catch (e) {}
    };

    function osc(ctx, start, fStart, fEnd, duration, type, gain) {
        const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = type;
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
            root.style.setProperty('--bg-body', pageData.style.bg); 
            root.style.setProperty('--bg-card', pageData.style.card);
            root.style.setProperty('--text-primary', pageData.style.text); 
            root.style.setProperty('--accent', pageData.style.accent);
            root.style.setProperty('--accent-gradient', pageData.style.accentGradient);
        }
        const rouletteData = rouletteTheme[mode];
        if (rouletteData && rouletteData.colors) {
            const root = document.documentElement;
            root.style.setProperty('--wheel-border', rouletteData.wheelBorder || rouletteData.colors[0]); 
            root.style.setProperty('--wheel-center', rouletteData.wheelCenter || rouletteData.colors[1]);
        }
        if (typeof window.drawRoulette === 'function') window.drawRoulette();
    };
})();
