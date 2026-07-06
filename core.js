'use strict';
console.log('core.js carregado (v7 - AdMob Full + Google Popup)');

(function() {
    window.isServerSynced = false;

    const _rawState = {
        coins: 0, vipUntil: 0, darkMode: false, displayName: '',
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
    window.isItemLiberado = function(nomeDoArray, idDoItem) { if (window.isVipAtivo()) return true; return _rawState[nomeDoArray].includes(idDoItem); };
    window.ativarVipMensal = function() { _rawState.vipUntil = Date.now() + (30 * 24 * 60 * 60 * 1000); window.saveData(); return true; };

    window.comprarItemSeguro = function(categoria, id) {
        if (!window.isServerSynced) return false; 
        if (window.isVipAtivo()) { alert("VIP Ativo! Item já liberado."); return false; }

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
        if (_rawState.coins >= 1) { _rawState.coins -= 1; window.saveData(); return true; }
        return false;
    };

    // ========================== ADMOB CONFIG (v5 Syntax) ==========================
    // IDs de TESTE da Google
    const ADMOB_BANNER = 'ca-app-pub-3940256099942544/6300978111';
    const ADMOB_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712';
    const ADMOB_REWARDED = 'ca-app-pub-3940256099942544/5224354917';

    window.isAppNativo = function() {
        return typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();
    };

    window.spinCounter = 0; // Contador para o anúncio de tela cheia

    if (window.isAppNativo()) {
        try {
            const { AdMob } = window.Capacitor.Plugins;
            AdMob.initialize().then(async () => {
                console.log("✅ Motor do AdMob ligado");

                // 1. Banner no Rodapé
                try {
                    await AdMob.showBanner({
                        adId: ADMOB_BANNER,
                        adPosition: 'BOTTOM_CENTER',
                        isTesting: true,
                        margin: 0
                    });
                } catch(e) { console.warn("Erro Banner", e); }

                // 2. Pré-carrega o Anúncio Premiado (Deixa ele engatilhado para abrir rápido)
                try {
                    await AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true });
                } catch(e) {}

            }).catch(console.error);
        } catch(e) {}
    }

    // Intersticial (A cada 3 rodadas)
    window.mostrarIntersticialSeNecessario = async function() {
        if (!window.isAppNativo() || window.isVipAtivo()) return;
        window.spinCounter++;
        
        if (window.spinCounter % 3 === 0) {
            try {
                const { AdMob } = window.Capacitor.Plugins;
                await AdMob.prepareInterstitial({ adId: ADMOB_INTERSTITIAL, isTesting: true });
                await AdMob.showInterstitial();
            } catch(e) { console.warn("Erro Intersticial", e); }
        }
    };

    // Premiado (Botão de +3 Moedas)
    let lastAdTime = 0;
    window.ganharMoedasAnuncioWeb = function() {
        if (!window.isServerSynced) return false;
        const now = Date.now();
        if (now - lastAdTime < 25000) return false;
        lastAdTime = now; _rawState.coins += 3; window.saveData(); return true;
    };

    window.mostrarAdMobNativo = async function() {
        try {
            const { AdMob } = window.Capacitor.Plugins;
            
            // Tenta preparar o anúncio novamente caso a internet tenha falhado na abertura do app
            try { await AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true }); } catch(e) {}

            return new Promise((resolve) => {
                // Escuta o momento em que o vídeo termina e entrega a recompensa
                const rewardListener = AdMob.addListener('rewardedVideoAdRewarded', (reward) => {
                    _rawState.coins += (reward.amount || 3);
                    window.saveData();
                    if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
                    rewardListener.remove(); 
                    resolve(true);
                });
                
                // Escuta se o usuário fechou o vídeo (sem ganhar ou após ganhar)
                const closeListener = AdMob.addListener('rewardedVideoAdClosed', () => {
                    closeListener.remove(); 
                    resolve(false);
                    // Prepara o próximo vídeo silenciosamente
                    AdMob.prepareRewardVideoAd({ adId: ADMOB_REWARDED, isTesting: true }).catch(()=>{});
                });
                
                // Exibe o vídeo
                AdMob.showRewardVideoAd().catch((err) => {
                    console.error('Erro ao exibir Premiado:', err);
                    // Failsafe: Se der erro, dá a moeda por causa do transtorno
                    _rawState.coins += 3; window.saveData(); 
                    if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
                    resolve(true);
                });
            });
        } catch (error) { 
            // Failsafe absoluto
            _rawState.coins += 3; window.saveData(); 
            if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();
            return true; 
        }
    };
    // ========================== FIREBASE & GOOGLE ==========================
    // (O resto do seu core.js continua igual daqui para baixo)
    if (window.firebaseConfig && !firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
    const auth = window.firebaseConfig ? firebase.auth() : null;
    const database = window.firebaseConfig ? firebase.database() : null;
    let currentUserUid = null;
    let anonymousSignInAttempted = false;

    if (auth) auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(e => console.warn(e));

    function updateUserInterface(user) {
        const userArea = document.getElementById('userArea');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const btnGoogle = document.getElementById('btnGoogleLogin');
        const reminderModal = document.getElementById('googleReminderModal');

        if (!user) { if (userArea) userArea.style.display = 'none'; return; }

        let displayName = _rawState.displayName || user.displayName || '';
        if (!displayName) displayName = user.isAnonymous ? 'Convidado' : 'Usuário';

        if (userArea) {
            userArea.style.display = 'flex';
            if (userAvatar) userAvatar.textContent = displayName.charAt(0).toUpperCase();
            if (userName) {
                userName.textContent = displayName.split(' ')[0];
                if (!user.isAnonymous) userName.innerHTML += ' <i class="fas fa-check-circle" style="color:#27ae60;"></i>';
            }
        }
        if (btnGoogle) btnGoogle.style.display = user.isAnonymous ? 'flex' : 'none';
        if (reminderModal && !user.isAnonymous) reminderModal.style.display = 'none';
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
        if (googleData.darkMode !== undefined) merged.darkMode = googleData.darkMode;
        if (googleData.displayName) merged.displayName = googleData.displayName;
        arrayFields.forEach(field => { merged[field] = mergeArray(anonData[field], googleData[field]); });
        return merged;
    }

    window.conectarGoogle = function() {
        if (!auth) return;

        // Se estiver no APK, bloqueia o popup e avisa para usar a Web
        if (window.isAppNativo()) {
            alert("⚠️ Segurança Android:\n\nPara proteger sua conta, o vínculo com o Google deve ser feito pelo navegador.\n\nAcesse nosso site (rodadosabor.vercel.app) pelo navegador do celular ou PC, faça o login, e seus dados sincronizarão aqui automaticamente!");
            return;
        }window.conectarGoogle = function() {
        if (!auth) return;

        // Se estiver no APK, bloqueia o popup e avisa para usar a Web
        if (window.isAppNativo()) {
            alert("⚠️ Segurança Android:\n\nPara proteger sua conta, o vínculo com o Google deve ser feito pelo navegador.\n\nAcesse nosso site (rodadosabor.vercel.app) pelo navegador do celular ou PC, faça o login, e seus dados sincronizarão aqui automaticamente!");
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        const currentUser = auth.currentUser;
        if (!currentUser || !currentUser.isAnonymous) { 
            alert("Sua conta já está protegida!"); 
            return; 
        }

        const modal = document.getElementById('mergeAccountModal');
        if (!modal) return;
        
        const anonSummary = document.getElementById('anonSummary');
        if (anonSummary) anonSummary.textContent = `${_rawState.coins} moedas`;
        
        const googleSummary = document.getElementById('googleSummary');
        if (googleSummary) googleSummary.textContent = "Aguardando login...";

        // Mostramos o modal primeiro. Quando ele clicar em uma opção, disparamos o Popup
        function proceedWithChoice(choice) {
            modal.style.display = 'none';
            
            // Abre a janela do Google
            currentUser.linkWithPopup(provider).then((result) => {
                const googleUser = result.user;
                
                database.ref('users/' + googleUser.uid + '/appState').once('value').then((snapshot) => {
                    const googleData = snapshot.val() || {};
                    let finalData;
                    if (choice === 'keep') finalData = { ..._rawState };
                    else if (choice === 'overwrite') finalData = { ...googleData };
                    else if (choice === 'merge') finalData = _mergeData(_rawState, googleData);
                    
                    finalData.displayName = googleUser.displayName || 'Usuário';
                    Object.assign(_rawState, finalData);
                    window.saveData();
                    
                    alert("✅ Conta vinculada e dados sincronizados!");
                    // Força o reload para limpar o "fantasma" do usuário anônimo e puxar a HUD correta
                    window.location.reload(); 
                });
            }).catch((error) => {
                // Se a pessoa tentou logar num Google que JÁ TEM uma conta registrada
                if (error.code === 'auth/credential-already-in-use') {
                    if (confirm("Esse e-mail do Google já tem dados salvos no nosso sistema.\n\nDeseja entrar com ele agora? (Atenção: o progresso atual de Convidado será perdido).")) {
                        
                        // Faz o login forçado passando por cima do usuário anônimo
                        auth.signInWithPopup(provider).then(() => {
                            window.location.reload(); // Recarrega a página para puxar os dados antigos da pessoa
                        }).catch((err) => {
                            console.error("Erro ao forçar login:", err);
                            alert("❌ Erro ao tentar entrar com o Google.");
                        });
                    }
                } else {
                    console.error("Erro no Popup:", error);
                    alert("❌ Erro ao conectar com o Google. Tente novamente.");
                }
            });
        }

        document.getElementById('mergeKeepAnon').onclick = () => proceedWithChoice('keep');
        document.getElementById('mergeOverwrite').onclick = () => proceedWithChoice('overwrite');
        document.getElementById('mergeCombine').onclick = () => proceedWithChoice('merge');
        document.getElementById('btnMergeCancel').onclick = () => modal.style.display = 'none';
        
        modal.style.display = 'flex';
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
                            garantirArraysNoEstado();
                            if (typeof window.renderAll === 'function') window.renderAll();
                            updateUserInterface(user);
                        } else {
                            if (_rawState.coins === 0) _rawState.coins = 20;
                            garantirArraysNoEstado(); window.saveData();
                            if (typeof window.renderAll === 'function') window.renderAll();
                            updateUserInterface(user);
                        }
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

    // ========================== ÁUDIO E EFEITOS ==========================
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
