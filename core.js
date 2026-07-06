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

    let lastAdTime = 0;
    window.ganharMoedasAnuncio = function() {
        if (!window.isServerSynced) return false;
        const now = Date.now();
        if (now - lastAdTime < 25000) { console.warn("🛑 SPAM Bloqueado."); return false; }
        lastAdTime = now; _rawState.coins += 3; window.saveData(); return true;
    };

    if (window.firebaseConfig && !firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
    const auth = window.firebaseConfig ? firebase.auth() : null;
    const database = window.firebaseConfig ? firebase.database() : null;
    let currentUserUid = null;

    // ========== FUNÇÃO PARA ATUALIZAR A INTERFACE DO USUÁRIO ==========
    function updateUserInterface(user) {
        const userArea = document.getElementById('userArea');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const btnGoogle = document.getElementById('btnGoogleLogin');
        const reminderModal = document.getElementById('googleReminderModal');

        if (!user) {
            if (userArea) userArea.style.display = 'none';
            return;
        }

        if (!user.isAnonymous) {
            // Logado com Google/Email
            if (userArea) {
                userArea.style.display = 'flex';
                const displayName = user.displayName || 'Usuário';
                const firstName = displayName.split(' ')[0];
                userName.textContent = firstName + ' ✓';
                userName.innerHTML += ' <i class="fas fa-check-circle" style="color:#27ae60;"></i>';
                if (userAvatar) {
                    userAvatar.textContent = firstName.charAt(0).toUpperCase();
                }
            }
            // Ocultar botão Google e aviso diário
            if (btnGoogle) btnGoogle.style.display = 'none';
            if (reminderModal) reminderModal.style.display = 'none';
        } else {
            // Anônimo
            if (userArea) {
                userArea.style.display = 'flex';
                userName.textContent = 'Convidado';
                userAvatar.textContent = '?';
            }
            // Mostrar botão Google
            if (btnGoogle) btnGoogle.style.display = 'flex';
            // O aviso diário é controlado separadamente (app.js) – não escondemos aqui
        }
    }

    // ========== FUNÇÃO PARA MESCLAR DADOS ==========
    function _mergeData(anonData, googleData) {
        const mergedCoins = (anonData.coins || 0) + (googleData.coins || 0);
        const mergeArray = (arr1, arr2) => {
            const set = new Set([...(arr1 || []), ...(arr2 || [])]);
            return Array.from(set);
        };
        const arrayFields = [
            'foods', 'customFoods', 'unlockedPageThemes', 'unlockedRouletteThemes',
            'unlockedSpinSounds', 'unlockedEndSounds', 'unlockedWinSounds',
            'unlockedEffects', 'unlockedRecipes'
        ];
        const merged = { ...anonData };
        merged.coins = mergedCoins;
        if (googleData.vipUntil && googleData.vipUntil > (merged.vipUntil || 0)) {
            merged.vipUntil = googleData.vipUntil;
        }
        if (googleData.darkMode !== undefined) merged.darkMode = googleData.darkMode;
        arrayFields.forEach(field => {
            merged[field] = mergeArray(anonData[field], googleData[field]);
        });
        const currentFields = [
            'currentPageTheme', 'currentRouletteTheme', 'currentSpinSound',
            'currentEndSound', 'currentWinSound', 'currentEffect'
        ];
        currentFields.forEach(field => {
            if (googleData[field]) merged[field] = googleData[field];
        });
        return merged;
    }

    // ========== FUNÇÃO PARA VINCULAR CONTA GOOGLE COM MESCLAGEM ==========
    window.conectarGoogle = function() {
        if (!auth) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.isAnonymous) {
            alert("Sua conta já está protegida pelo Google!");
            return;
        }

        // Verifica se há dados relevantes na conta anônima
        const hasData = () => {
            if (_rawState.coins > 0) return true;
            const baseItems = ['theme-1', 'effect-1', 'spin-1', 'end-1', 'win-1'];
            const allUnlocked = [
                ..._rawState.unlockedPageThemes,
                ..._rawState.unlockedRouletteThemes,
                ..._rawState.unlockedSpinSounds,
                ..._rawState.unlockedEndSounds,
                ..._rawState.unlockedWinSounds,
                ..._rawState.unlockedEffects,
                ..._rawState.unlockedRecipes
            ];
            for (let item of allUnlocked) {
                if (!baseItems.includes(item)) return true;
            }
            if (_rawState.customFoods && _rawState.customFoods.length > 0) return true;
            if (_rawState.foods && _rawState.foods.length > 4) return true;
            return false;
        };

        // Se não tiver dados, faz link direto
        if (!hasData()) {
            currentUser.linkWithPopup(provider)
                .then(() => {
                    alert("✅ Conta salva e vinculada ao Google com sucesso!");
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.code === 'auth/credential-already-in-use') {
                        if (confirm("Esse e-mail já tem dados salvos. Deseja trocar para ele? (Seu progresso anônimo será perdido).")) {
                            auth.signInWithCredential(error.credential).then(() => window.location.reload());
                        }
                    } else {
                        console.error("Erro:", error);
                        alert("❌ Erro ao conectar com Google.");
                    }
                });
            return;
        }

        // ===== TEM DADOS: EXIBE MODAL DE MESCLAGEM =====
        const modal = document.getElementById('mergeAccountModal');
        if (!modal) {
            console.error("Modal de mesclagem não encontrado.");
            return;
        }

        // Preencher resumo da conta anônima
        const anonSummary = document.getElementById('anonSummary');
        if (anonSummary) {
            anonSummary.textContent = `${_rawState.coins} moedas, ${_rawState.unlockedEffects.length} efeitos, ${_rawState.foods.length} comidas`;
        }

        // Tentar buscar dados do Google (se houver) usando o email do usuário anônimo? 
        // Na verdade, o email do anônimo é nulo. Vamos apenas deixar "Carregando..." e após o link faremos a busca.
        const googleSummary = document.getElementById('googleSummary');
        if (googleSummary) googleSummary.textContent = "Carregando após login...";

        // Variável para armazenar a escolha
        let mergeChoice = null;

        function proceedWithChoice(choice) {
            modal.style.display = 'none';
            // Agora faz o link e depois aplica a escolha
            currentUser.linkWithPopup(provider)
                .then((result) => {
                    const googleUser = result.user;
                    // Agora temos o usuário Google. Buscar dados dele no Firebase.
                    const googleUid = googleUser.uid;
                    if (!database) {
                        alert("Banco de dados indisponível.");
                        return;
                    }
                    database.ref('users/' + googleUid + '/appState').once('value').then((snapshot) => {
                        const googleData = snapshot.val() || {};
                        let finalData;
                        if (choice === 'keep') {
                            // Manter dados anônimos e sobrescrever o Google com eles
                            finalData = { ..._rawState };
                        } else if (choice === 'overwrite') {
                            finalData = { ...googleData };
                        } else if (choice === 'merge') {
                            finalData = _mergeData(_rawState, googleData);
                        }
                        // Salvar finalData no Firebase e local
                        Object.assign(_rawState, finalData);
                        window.saveData();
                        alert("✅ Conta vinculada e dados sincronizados!");
                        window.location.reload();
                    }).catch(err => {
                        console.error("Erro ao buscar dados do Google:", err);
                        alert("Erro ao sincronizar dados. Tente novamente.");
                    });
                })
                .catch((error) => {
                    if (error.code === 'auth/credential-already-in-use') {
                        // Conta Google já existe: perguntar se quer fazer login com ela (perde anônimo)
                        if (confirm("Esse e-mail já tem dados salvos. Deseja fazer login com essa conta e perder o progresso anônimo?")) {
                            auth.signInWithCredential(error.credential).then(() => {
                                // Após login, recarregar
                                window.location.reload();
                            });
                        }
                    } else {
                        console.error("Erro:", error);
                        alert("❌ Erro ao conectar com Google.");
                    }
                });
        }

        // Configurar eventos dos botões do modal
        document.getElementById('mergeKeepAnon').onclick = () => proceedWithChoice('keep');
        document.getElementById('mergeOverwrite').onclick = () => proceedWithChoice('overwrite');
        document.getElementById('mergeCombine').onclick = () => proceedWithChoice('merge');
        document.getElementById('btnMergeCancel').onclick = () => {
            modal.style.display = 'none';
        };

        // Mostrar modal
        modal.style.display = 'flex';
    };

    // ========== FUNÇÕES DE INICIALIZAÇÃO ==========
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
                    
                    // ATUALIZA A INTERFACE DO USUÁRIO
                    updateUserInterface(user);

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
                        // Reaplicar interface (caso o nome mude)
                        updateUserInterface(user);
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

    // ... (restante do áudio e applyThemes permanece igual) ...
    // (mantenha a parte de áudio e applyThemes do código anterior)
})();