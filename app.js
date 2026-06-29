'use strict';
console.log('app.js carregado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM pronto, iniciando app...');

    const BANCO_DE_COMIDAS = [
        { nome: 'Pizza', icone: '🍕' }, { nome: 'Hambúrguer', icone: '🍔' }, { nome: 'Sushi', icone: '🍣' }, { nome: 'Sorvete', icone: '🍦' },
        { nome: 'Taco', icone: '🌮' }, { nome: 'Burrito', icone: '🌯' }, { nome: 'Salada', icone: '🥗' }, { nome: 'Frango Assado', icone: '🍗' },
        { nome: 'Espaguete', icone: '🍝' }, { nome: 'Bolo', icone: '🍰' }, { nome: 'Rosquinha', icone: '🍩' }, { nome: 'Pipoca', icone: '🍿' },
        { nome: 'Batata Frita', icone: '🍟' }, { nome: 'Cachorro Quente', icone: '🌭' }, { nome: 'Lasanha', icone: '🍛' }, { nome: 'Sopa Quente', icone: '🍜' },
        { nome: 'Arroz e Feijão', icone: '🍲' }, { nome: 'Churrasco', icone: '🥩' }, { nome: 'Camarão', icone: '🍤' }, { nome: 'Panqueca', icone: '🥞' },
        { nome: 'Sanduíche', icone: '🥪' }, { nome: 'Omelete', icone: '🍳' }
    ];

    const RECEITAS = [
        { id: 'rec-1', nome: 'Pizza Caseira', icone: '🍕', ingredientes: ['Farinha', 'Água', 'Fermento', 'Molho', 'Queijo'], preparo: 'Asse a 200°C por 20 min.' },
        { id: 'rec-2', nome: 'Hambúrguer Artesanal', icone: '🍔', ingredientes: ['Carne', 'Pão', 'Queijo'], preparo: 'Grelhe e monte o lanche.' }
    ];

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
    const recipeModal = document.getElementById('recipeModal');
    const btnCloseRecipeModal = document.getElementById('btnCloseRecipeModal');
    const recipeModalTitle = document.getElementById('recipeModalTitle');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const recipeInstructions = document.getElementById('recipeInstructions');

    let comidasSelecionadasTemporarias = [];

    // Adiciona evento de giro no botão da roleta
    const btnSpinEl = document.getElementById('btnSpin');
    if (btnSpinEl) btnSpinEl.addEventListener('click', spin);

    // Evento de Alternar Tema (Dark Mode)
    if (btnModeToggle) {
        btnModeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            applyThemes();
        });
    }

    if (btnWatchAd) {
        btnWatchAd.addEventListener('click', function() {
            let secondsLeft = 20; adCountdown.textContent = secondsLeft;
            adFrame.src = "https://example.com"; adOverlay.style.display = 'flex';
            const adInterval = setInterval(() => {
                secondsLeft--; adCountdown.textContent = secondsLeft;
                if (secondsLeft <= 0) {
                    clearInterval(adInterval); adOverlay.style.display = 'none'; adFrame.src = 'about:blank';
                    state.coins += 3; saveToStorage(); alert("🎉 Você ganhou 3 moedas! Use na loja.");
                }
            }, 1000);
        });
    }

    if (btnOpenFoodModal) {
        btnOpenFoodModal.addEventListener('click', function() {
            comidasSelecionadasTemporarias = [...state.foods]; foodSelectionModal.style.display = 'flex'; renderModalFoodOptions();
        });
    }
    if (btnCloseFoodModal) { btnCloseFoodModal.addEventListener('click', function() { foodSelectionModal.style.display = 'none'; }); }

    function renderModalFoodOptions(filterText = '') {
        if (!modalFoodOptionsGrid) return;
        modalFoodOptionsGrid.innerHTML = '';
        const filtradas = BANCO_DE_COMIDAS.filter(item => item.nome.toLowerCase().includes(filterText.toLowerCase()));
        filtradas.forEach(item => {
            const itemString = `${item.nome} ${item.icone}`;
            const card = document.createElement('div');
            card.className = 'food-option-card';
            if (comidasSelecionadasTemporarias.includes(itemString)) card.classList.add('selected');
            card.innerHTML = `<span>${item.icone}</span> ${item.nome}`;
            card.addEventListener('click', function() {
                const idx = comidasSelecionadasTemporarias.indexOf(itemString);
                if (idx > -1) { comidasSelecionadasTemporarias.splice(idx, 1); card.classList.remove('selected'); } 
                else { comidasSelecionadasTemporarias.push(itemString); card.classList.add('selected'); }
            });
            modalFoodOptionsGrid.appendChild(card);
        });
    }

    if (searchFoodInput) { searchFoodInput.addEventListener('input', function(e) { renderModalFoodOptions(e.target.value); }); }
    if (btnSaveFoodSelection) {
        btnSaveFoodSelection.addEventListener('click', function() {
            if (comidasSelecionadasTemporarias.length < 2) { alert("Selecione pelo menos 2 comidas!"); return; }
            state.foods = [...comidasSelecionadasTemporarias]; saveToStorage(); renderFoodList(); foodSelectionModal.style.display = 'none';
        });
    }

    function renderFoodList() {
        const container = document.getElementById('foodListContainer'); if (!container) return;
        container.innerHTML = '';
        state.foods.forEach((food, idx) => {
            const tag = document.createElement('div'); tag.className = 'food-tag';
            tag.innerHTML = `${food} <i class="fas fa-times" onclick="removeFood(${idx})"></i>`;
            container.appendChild(tag);
        });
        drawRoulette();
    }
    window.removeFood = function(idx) { state.foods.splice(idx, 1); saveToStorage(); renderFoodList(); };

    // --- NOVA RENDERIZAÇÃO: TEMAS SEPARADOS ---
    function renderThemes() {
        const pageGrid = document.getElementById('pageThemesGrid');
        const rouletteGrid = document.getElementById('rouletteThemesGrid');
        if (!pageGrid || !rouletteGrid) return;

        pageGrid.innerHTML = ''; rouletteGrid.innerHTML = '';

        listTemas.forEach(tema => {
            const coresPreview = tema.light.colors.slice(0, 4).map(c => `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`).join('');
            
            // 1. Temas da Página
            const isPageUnlocked = state.unlockedPageThemes.includes(tema.id);
            const isPageActive = state.currentPageTheme === tema.id;
            const pageCard = document.createElement('div');
            pageCard.className = `item-card ${isPageActive ? 'active' : ''}`;
            let btnPageHTML = isPageActive ? `<button class="btn-action btn-active">Ativo</button>` :
                isPageUnlocked ? `<button class="btn-action btn-use" onclick="usePageTheme('${tema.id}')">Usar</button>` :
                `<button class="btn-action btn-buy" onclick="buyPageTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            
            pageCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnPageHTML}`;
            pageGrid.appendChild(pageCard);

            // 2. Temas da Roleta
            const isRouletteUnlocked = state.unlockedRouletteThemes.includes(tema.id);
            const isRouletteActive = state.currentRouletteTheme === tema.id;
            const rouletteCard = document.createElement('div');
            rouletteCard.className = `item-card ${isRouletteActive ? 'active' : ''}`;
            let btnRouletteHTML = isRouletteActive ? `<button class="btn-action btn-active">Ativo</button>` :
                isRouletteUnlocked ? `<button class="btn-action btn-use" onclick="useRouletteTheme('${tema.id}')">Usar</button>` :
                `<button class="btn-action btn-buy" onclick="buyRouletteTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            
            rouletteCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnRouletteHTML}`;
            rouletteGrid.appendChild(rouletteCard);
        });
    }

    // Funções de Compra e Uso
    window.buyPageTheme = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedPageThemes.push(id); usePageTheme(id); } else alert("Moedas insuficientes!");
    };
    window.usePageTheme = function(id) { state.currentPageTheme = id; applyThemes(); renderThemes(); };
    
    window.buyRouletteTheme = function(id, price) {
        if (state.coins >= price) { state.coins -= price; state.unlockedRouletteThemes.push(id); useRouletteTheme(id); } else alert("Moedas insuficientes!");
    };
    window.useRouletteTheme = function(id) { state.currentRouletteTheme = id; applyThemes(); renderThemes(); };

    function renderSounds() {
        const spinGrid = document.getElementById('spinSoundsGrid'); const winGrid = document.getElementById('winSoundsGrid');
        if (!spinGrid || !winGrid) return;
        spinGrid.innerHTML = '';
        listSpinSounds.forEach(sound => {
            const isUnlocked = state.unlockedSpinSounds.includes(sound.id); const isActive = state.currentSpinSound === sound.id;
            const card = document.createElement('div'); card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useSpinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Giro</p></div>${btnHTML}`;
            spinGrid.appendChild(card);
        });
        winGrid.innerHTML = '';
        listWinSounds.forEach(sound => {
            const isUnlocked = state.unlockedWinSounds.includes(sound.id); const isActive = state.currentWinSound === sound.id;
            const card = document.createElement('div'); card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useWinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Vitória</p></div>${btnHTML}`;
            winGrid.appendChild(card);
        });
    }

    window.buySpinSound = function(id, price) { if (state.coins >= price) { state.coins -= price; state.unlockedSpinSounds.push(id); state.currentSpinSound = id; saveToStorage(); renderSounds(); } else alert("Moedas insuficientes!"); };
    window.useSpinSound = function(id) { state.currentSpinSound = id; saveToStorage(); renderSounds(); };
    window.buyWinSound = function(id, price) { if (state.coins >= price) { state.coins -= price; state.unlockedWinSounds.push(id); state.currentWinSound = id; saveToStorage(); renderSounds(); } else alert("Moedas insuficientes!"); };
    window.useWinSound = function(id) { state.currentWinSound = id; saveToStorage(); renderSounds(); };

    function renderRecipes() {
        if (!recipesGrid) return;
        recipesGrid.innerHTML = '';
        RECEITAS.forEach(rec => {
            const div = document.createElement('div'); div.className = 'recipe-link';
            div.innerHTML = `<span class="icon">${rec.icone}</span><span class="name">${rec.nome}</span>`;
            div.addEventListener('click', function() { openRecipeModal(rec.id); });
            recipesGrid.appendChild(div);
        });
    }

    function openRecipeModal(id) {
        const rec = RECEITAS.find(r => r.id === id); if (!rec) return;
        if (recipeModalTitle) recipeModalTitle.textContent = `${rec.icone} ${rec.nome}`;
        if (recipeIngredients) recipeIngredients.innerHTML = rec.ingredientes.map(ing => `<li>${ing}</li>`).join('');
        if (recipeInstructions) recipeInstructions.textContent = rec.preparo;
        if (recipeModal) recipeModal.style.display = 'flex';
    }

    if (btnCloseRecipeModal) btnCloseRecipeModal.addEventListener('click', () => { if (recipeModal) recipeModal.style.display = 'none'; });
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => { if (resultOverlay) resultOverlay.style.display = 'none'; });

    // Inicia tudo
    renderFoodList();
    renderThemes();
    renderSounds();
    renderRecipes();
    applyThemes();
});
