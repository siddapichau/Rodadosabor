'use strict';
console.log('app.js carregado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM pronto, iniciando app...');

    // Puxa as listas globais do comidas.js e sons.js
    const BANCO_DE_COMIDAS = window.BANCO_DE_COMIDAS || [];
    const RECEITAS = window.RECEITAS || [];
    const SONS_GIRO = window.SONS_GIRO || [];
    const SONS_VITORIA = window.SONS_VITORIA || [];

    // ========================== REFERÊNCIAS DO DOM ==========================
    const btnOpenFoodModal = document.getElementById('btnOpenFoodModal');
    const btnCloseFoodModal = document.getElementById('btnCloseFoodModal');
    const foodSelectionModal = document.getElementById('foodSelectionModal');
    const modalFoodOptionsGrid = document.getElementById('modalFoodOptionsGrid');
    const searchFoodInput = document.getElementById('searchFoodInput');
    const btnSaveFoodSelection = document.getElementById('btnSaveFoodSelection');
    const btnWatchAd = document.getElementById('btnWatchAd');
    const adOverlay = document.getElementById('adOverlay');
    const adCountdown = document.getElementById('adCountdown');
    const adFrame = document.getElementById('adFrame');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const resultOverlay = document.getElementById('resultOverlay');
    const btnModeToggle = document.getElementById('btnModeToggle');
    const recipesGrid = document.getElementById('recipesGrid');

    const btnAddCustomFood = document.getElementById('btnAddCustomFood');
    const newFoodName = document.getElementById('newFoodName');
    const newFoodEmoji = document.getElementById('newFoodEmoji');
    const installAppBtn = document.getElementById('installAppBtn');

    let comidasSelecionadasTemporarias = [];

    // ========================== INICIALIZAÇÃO DO STATE ==========================
    if (typeof state === 'undefined') {
        window.state = {
            foods: [], coins: 0, darkMode: false,
            unlockedPageThemes: [], currentPageTheme: 'default',
            unlockedRouletteThemes: [], currentRouletteTheme: 'default',
            unlockedSpinSounds: [], currentSpinSound: 'default',
            unlockedWinSounds: [], currentWinSound: 'default',
            unlockedRecipes: [], customFoods: []
        };
    }
    if (!state.unlockedRecipes) state.unlockedRecipes = [];
    if (!state.customFoods) state.customFoods = [];
    
    // Desbloqueia receitas com preço 0 automaticamente
    RECEITAS.forEach(rec => {
        if (rec.preco === 0 && !state.unlockedRecipes.includes(rec.id)) {
            state.unlockedRecipes.push(rec.id);
        }
    });

    // ========================== FUNÇÕES AUXILIARES ==========================
    if (typeof saveToStorage !== 'function') {
        window.saveToStorage = function() {
            try { localStorage.setItem('appState', JSON.stringify(state)); } catch (e) {}
        };
    }
    if (typeof loadFromStorage !== 'function') {
        window.loadFromStorage = function() {
            try {
                const data = localStorage.getItem('appState');
                if (data) { const parsed = JSON.parse(data); Object.assign(state, parsed); }
            } catch (e) {}
        };
    }
    
    loadFromStorage();

    // ========================== EVENTOS ==========================
    const btnSpinEl = document.getElementById('btnSpin');
    if (btnSpinEl) btnSpinEl.addEventListener('click', typeof spin !== 'undefined' ? spin : () => console.log('Spin'));

    if (btnModeToggle) {
        btnModeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            if(typeof applyThemes !== 'undefined') applyThemes();
        });
    }

    if (btnWatchAd) {
        btnWatchAd.addEventListener('click', function() {
            let secondsLeft = 30;
            adCountdown.textContent = secondsLeft;
            adFrame.src = "anuncio.html";
            adOverlay.style.display = 'flex';
            const adInterval = setInterval(() => {
                secondsLeft--;
                adCountdown.textContent = secondsLeft;
                if (secondsLeft <= 0) {
                    clearInterval(adInterval);
                    adOverlay.style.display = 'none';
                    adFrame.src = 'about:blank';
                    state.coins += 3;
                    saveToStorage();
                    updateCoinsDisplay();
                    alert("🎉 Você ganhou 3 moedas! Use na loja.");
                }
            }, 1000);
        });
    }

    if (btnOpenFoodModal) {
        btnOpenFoodModal.addEventListener('click', function() {
            comidasSelecionadasTemporarias = [...state.foods];
            foodSelectionModal.style.display = 'flex';
            renderModalFoodOptions();
        });
    }
    if (btnCloseFoodModal) {
        btnCloseFoodModal.addEventListener('click', () => foodSelectionModal.style.display = 'none');
    }

    if (searchFoodInput) {
        searchFoodInput.addEventListener('input', e => renderModalFoodOptions(e.target.value));
    }

    if (btnSaveFoodSelection) {
        btnSaveFoodSelection.addEventListener('click', function() {
            if (comidasSelecionadasTemporarias.length < 2) {
                alert("Selecione pelo menos 2 comidas!");
                return;
            }
            state.foods = [...comidasSelecionadasTemporarias];
            saveToStorage();
            renderFoodList();
            foodSelectionModal.style.display = 'none';
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            if (resultOverlay) resultOverlay.style.display = 'none';
        });
    }

    // ========================== ADICIONAR COMIDA PERSONALIZADA ==========================
    if (btnAddCustomFood) {
        btnAddCustomFood.addEventListener('click', function() {
            const nome = newFoodName.value.trim();
            const emoji = newFoodEmoji.value.trim() || '🍽️';
            if (!nome) {
                alert('Digite o nome da comida.');
                return;
            }
            const itemString = `${nome} ${emoji}`;
            if (!state.customFoods.some(f => f === itemString)) {
                state.customFoods.push(itemString);
                saveToStorage();
                renderModalFoodOptions(searchFoodInput ? searchFoodInput.value : '');
                newFoodName.value = '';
                newFoodEmoji.value = '';
            } else {
                alert('Esta comida já foi adicionada como personalizada.');
            }
        });
    }

    // ========================== FUNÇÕES DE RENDERIZAÇÃO ==========================
    function renderFoodList() {
        const container = document.getElementById('foodListContainer');
        if (!container) return;
        container.innerHTML = '';
        state.foods.forEach((food, idx) => {
            const tag = document.createElement('div');
            tag.className = 'food-tag';
            tag.innerHTML = `${food} <i class="fas fa-times" onclick="removeFood(${idx})"></i>`;
            container.appendChild(tag);
        });
        if (typeof drawRoulette !== 'undefined') drawRoulette();
    }
    
    window.removeFood = function(idx) {
        state.foods.splice(idx, 1);
        saveToStorage();
        renderFoodList();
    };

    function renderModalFoodOptions(filterText = '') {
        if (!modalFoodOptionsGrid) return;
        modalFoodOptionsGrid.innerHTML = '';

        const allItems = [...BANCO_DE_COMIDAS];
        if (state.customFoods) {
            state.customFoods.forEach(custom => {
                const match = custom.match(/^(.*?)\s+([\p{Emoji_Presentation}\p{Emoji}☀-➿])$/u);
                if (match) {
                    allItems.push({ nome: match[1], icone: match[2] });
                } else {
                    allItems.push({ nome: custom, icone: '🍽️' });
                }
            });
        }

        const filtradas = allItems.filter(item =>
            item.nome.toLowerCase().includes(filterText.toLowerCase())
        );

        filtradas.forEach(item => {
            const itemString = `${item.nome} ${item.icone}`;
            const card = document.createElement('div');
            card.className = 'food-option-card';
            if (comidasSelecionadasTemporarias.includes(itemString)) {
                card.classList.add('selected');
            }
            card.innerHTML = `<span>${item.icone}</span> ${item.nome}`;
            card.addEventListener('click', function() {
                const idx = comidasSelecionadasTemporarias.indexOf(itemString);
                if (idx > -1) {
                    comidasSelecionadasTemporarias.splice(idx, 1);
                    card.classList.remove('selected');
                } else {
                    comidasSelecionadasTemporarias.push(itemString);
                    card.classList.add('selected');
                }
            });
            modalFoodOptionsGrid.appendChild(card);
        });
    }

    // ---- Temas ----
    function renderThemes() {
        const pageGrid = document.getElementById('pageThemesGrid');
        const rouletteGrid = document.getElementById('rouletteThemesGrid');
        if (!pageGrid || !rouletteGrid) return;
        pageGrid.innerHTML = ''; rouletteGrid.innerHTML = '';
        
        if (typeof listTemas === 'undefined') window.listTemas = [];
        listTemas.forEach(tema => {
            const coresPreview = tema.light.colors.slice(0, 4).map(c => `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`).join('');
            
            // Render Página
            const isPageUnlocked = state.unlockedPageThemes.includes(tema.id);
            const isPageActive = state.currentPageTheme === tema.id;
            const pageCard = document.createElement('div');
            pageCard.className = `item-card ${isPageActive ? 'active' : ''}`;
            let btnPageHTML = isPageActive ? `<button class="btn-action btn-active">Ativo</button>` : isPageUnlocked ? `<button class="btn-action btn-use" onclick="usePageTheme('${tema.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyPageTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            pageCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnPageHTML}`;
            pageGrid.appendChild(pageCard);

            // Render Roleta
            const isRouletteUnlocked = state.unlockedRouletteThemes.includes(tema.id);
            const isRouletteActive = state.currentRouletteTheme === tema.id;
            const rouletteCard = document.createElement('div');
            rouletteCard.className = `item-card ${isRouletteActive ? 'active' : ''}`;
            let btnRouletteHTML = isRouletteActive ? `<button class="btn-action btn-active">Ativo</button>` : isRouletteUnlocked ? `<button class="btn-action btn-use" onclick="useRouletteTheme('${tema.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyRouletteTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            rouletteCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnRouletteHTML}`;
            rouletteGrid.appendChild(rouletteCard);
        });
    }

    window.buyPageTheme = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedPageThemes.push(id); usePageTheme(id); updateCoinsDisplay(); } else { alert("Moedas insuficientes!"); }
    };
    window.usePageTheme = function(id) { state.currentPageTheme = id; if(typeof applyThemes !== 'undefined') applyThemes(); renderThemes(); saveToStorage(); };
    window.buyRouletteTheme = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedRouletteThemes.push(id); useRouletteTheme(id); updateCoinsDisplay(); } else { alert("Moedas insuficientes!"); }
    };
    window.useRouletteTheme = function(id) { state.currentRouletteTheme = id; if(typeof applyThemes !== 'undefined') applyThemes(); renderThemes(); saveToStorage(); };

    // ---- Sons (Agora lendo das novas variáveis globais) ----
    function renderSounds() {
        const spinGrid = document.getElementById('spinSoundsGrid');
        const winGrid = document.getElementById('winSoundsGrid');
        if (!spinGrid || !winGrid) return;
        spinGrid.innerHTML = ''; winGrid.innerHTML = '';
        
        SONS_GIRO.forEach(sound => {
            const isUnlocked = state.unlockedSpinSounds.includes(sound.id);
            const isActive = state.currentSpinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useSpinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Giro</p></div>${btnHTML}`;
            spinGrid.appendChild(card);
        });

        SONS_VITORIA.forEach(sound => {
            const isUnlocked = state.unlockedWinSounds.includes(sound.id);
            const isActive = state.currentWinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useWinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Vitória</p></div>${btnHTML}`;
            winGrid.appendChild(card);
        });
    }

    window.buySpinSound = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedSpinSounds.push(id); state.currentSpinSound = id; saveToStorage(); renderSounds(); updateCoinsDisplay(); } else { alert("Moedas insuficientes!"); }
    };
    window.useSpinSound = function(id) { state.currentSpinSound = id; saveToStorage(); renderSounds(); };
    window.buyWinSound = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedWinSounds.push(id); state.currentWinSound = id; saveToStorage(); renderSounds(); updateCoinsDisplay(); } else { alert("Moedas insuficientes!"); }
    };
    window.useWinSound = function(id) { state.currentWinSound = id; saveToStorage(); renderSounds(); };

    // ---- Receitas ----
    function renderRecipes() {
        if (!recipesGrid) return;
        recipesGrid.innerHTML = '';
        RECEITAS.forEach(rec => {
            const isUnlocked = state.unlockedRecipes.includes(rec.id);
            const card = document.createElement('div');
            card.className = 'recipe-card';
            const info = document.createElement('div');
            info.className = 'recipe-info';
            info.innerHTML = `<span class="recipe-icon">${rec.icone}</span><span class="recipe-name">${rec.nome}</span>`;
            
            let action;
            if (isUnlocked) {
                const openBtn = document.createElement('button');
                openBtn.className = 'btn-action btn-recipe-open';
                openBtn.textContent = 'Ver';
                openBtn.addEventListener('click', e => { e.stopPropagation(); window.location.href = rec.link; });
                action = openBtn;
            } else {
                const buyBtn = document.createElement('button');
                buyBtn.className = 'btn-action btn-buy';
                buyBtn.innerHTML = `<i class="fas fa-coins"></i> ${rec.preco}`;
                buyBtn.addEventListener('click', e => { e.stopPropagation(); buyRecipe(rec.id, rec.preco); });
                action = buyBtn;
            }
            card.appendChild(info);
            card.appendChild(action);
            recipesGrid.appendChild(card);
        });
    }

    window.buyRecipe = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedRecipes.push(id);
            saveToStorage();
            renderRecipes();
            updateCoinsDisplay();
            alert(`🎉 Receita "${RECEITAS.find(r => r.id === id).nome}" desbloqueada!`);
        } else {
            alert("Moedas insuficientes! Assista a um anúncio para ganhar mais.");
        }
    };

    function updateCoinsDisplay() {
        const display = document.getElementById('coinDisplay');
        if (display) display.textContent = state.coins;
        const coinBalance = document.getElementById('coin-balance');
        if (coinBalance) coinBalance.textContent = state.coins;
    }

    // ========================== PWA - INSTALAÇÃO ==========================
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installAppBtn) installAppBtn.style.display = 'flex';
    });

    if (installAppBtn) {
        installAppBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') console.log('App instalado com sucesso');
                deferredPrompt = null;
                installAppBtn.style.display = 'none';
            }
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('SW registrado com sucesso'))
            .catch(err => console.warn('Falha ao registrar SW', err));
    }

    // ========================== INICIALIZAÇÃO FINAL ==========================
    renderFoodList();
    renderThemes();
    renderSounds();
    renderRecipes();
    if(typeof applyThemes !== 'undefined') applyThemes();
    updateCoinsDisplay();

    console.log('App inicializado com sucesso!');
});
