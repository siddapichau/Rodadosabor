'use strict';
console.log('app.js carregado');

// ========== FUNÇÃO GLOBAL DE ATUALIZAÇÃO DE MOEDAS ==========
window.updateCoinsDisplay = function() {
    const coinBalance = document.getElementById('coin-balance');
    if (coinBalance) coinBalance.textContent = window.appState.coins;
};

// ========== FUNÇÃO PARA LANÇAR EFEITO VISUAL ATUAL ==========
window.launchCurrentEffect = function() {
    const effectId = window.appState.currentEffect || 'effect-1';
    switch (effectId) {
        case 'effect-1': window.launchConfetti(); break;
        case 'effect-2': window.launchFireworks(); break;
        case 'effect-3': window.launchStars(); break;
        default: window.launchConfetti();
    }
};

// ========== FUNÇÕES DE RENDERIZAÇÃO (GLOBAIS) ==========
window.renderFoodList = function() {
    const container = document.getElementById('foodListContainer');
    if (!container) return;
    container.innerHTML = '';
    const foods = window.appState.foods || [];
    foods.forEach((food, idx) => {
        const tag = document.createElement('div');
        tag.className = 'food-tag';
        tag.innerHTML = `${food} <i class="fas fa-times" onclick="window.removeFood(${idx})"></i>`;
        container.appendChild(tag);
    });
    if (typeof window.drawRoulette === 'function') window.drawRoulette();
};

window.removeFood = function(idx) {
    window.appState.foods.splice(idx, 1);
    window.saveData();
    window.renderFoodList();
};

window.renderModalFoodOptions = function(filterText = '') {
    const modalGrid = document.getElementById('modalFoodOptionsGrid');
    if (!modalGrid) return;
    modalGrid.innerHTML = '';
    const allItems = [...(window.BANCO_DE_COMIDAS || [])];
    (window.appState.customFoods || []).forEach(custom => {
        const match = custom.match(/\p{Emoji}/u);
        if (match) {
            const nome = custom.replace(/\p{Emoji}/u, '').trim();
            allItems.push({ nome, icone: match[0] });
        } else {
            allItems.push({ nome: custom, icone: '🍽️' });
        }
    });
    const filtradas = allItems.filter(item => item.nome.toLowerCase().includes(filterText.toLowerCase()));
    const selecionadas = window._comidasSelecionadasTemporarias || [];
    filtradas.forEach(item => {
        const itemString = `${item.nome} ${item.icone}`;
        const card = document.createElement('div');
        card.className = 'food-option-card';
        if (selecionadas.includes(itemString)) card.classList.add('selected');
        card.innerHTML = `<span>${item.icone}</span> ${item.nome}`;
        card.addEventListener('click', () => {
            const idx = selecionadas.indexOf(itemString);
            if (idx > -1) {
                selecionadas.splice(idx, 1);
                card.classList.remove('selected');
            } else {
                if (selecionadas.length >= 6) {
                    alert("Máximo de 6 itens permitidos na roleta!");
                    return;
                }
                selecionadas.push(itemString);
                card.classList.add('selected');
            }
            window._comidasSelecionadasTemporarias = selecionadas;
        });
        modalGrid.appendChild(card);
    });
};

window.renderSounds = function() {
    const spinGrid = document.getElementById('spinSoundsGrid');
    const endGrid = document.getElementById('endSoundsGrid');
    const winGrid = document.getElementById('winSoundsGrid');
    if (!spinGrid || !winGrid || !endGrid) return;
    spinGrid.innerHTML = ''; endGrid.innerHTML = ''; winGrid.innerHTML = '';
    (window.SONS_GIRO || []).forEach(sound => {
        const isUnlocked = window.appState.unlockedSpinSounds.includes(sound.id);
        const isActive = window.appState.currentSpinSound === sound.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="window.useSpinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="window.buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
        card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
        spinGrid.appendChild(card);
    });
    (window.SONS_FIM || []).forEach(sound => {
        const isUnlocked = window.appState.unlockedEndSounds.includes(sound.id);
        const isActive = window.appState.currentEndSound === sound.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="window.useEndSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="window.buyEndSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
        card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
        endGrid.appendChild(card);
    });
    (window.SONS_VITORIA || []).forEach(sound => {
        const isUnlocked = window.appState.unlockedWinSounds.includes(sound.id);
        const isActive = window.appState.currentWinSound === sound.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="window.useWinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="window.buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
        card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
        winGrid.appendChild(card);
    });
};

window.renderEffects = function() {
    const grid = document.getElementById('effectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const effects = window.EFEITOS_VISUAIS || [];
    effects.forEach(effect => {
        const isUnlocked = window.appState.unlockedEffects.includes(effect.id);
        const isActive = window.appState.currentEffect === effect.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = '';
        if (isActive) btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
        else if (isUnlocked) btnHTML = `<button class="btn-action btn-use" onclick="window.useEffect('${effect.id}')">Usar</button>`;
        else btnHTML = `<button class="btn-action btn-buy" onclick="window.buyEffect('${effect.id}', ${effect.price})"><i class="fas fa-coins"></i> ${effect.price}</button>`;
        card.innerHTML = `<div class="item-info"><h4>${effect.name}</h4><p>${effect.price === 0 ? 'Grátis' : effect.price + ' moedas'}</p></div>${btnHTML}`;
        grid.appendChild(card);
    });
};

window.renderRecipes = function() {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    (window.RECEITAS || []).forEach(rec => {
        const isUnlocked = window.appState.unlockedRecipes.includes(rec.id);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<div class="recipe-info"><span class="recipe-icon">${rec.icone}</span><span class="recipe-name">${rec.nome}</span></div>`;
        let btn = document.createElement('button');
        if (isUnlocked) {
            btn.className = 'btn-action btn-recipe-open'; btn.textContent = 'Ver';
            btn.onclick = () => window.location.href = rec.link;
        } else {
            btn.className = 'btn-action btn-buy'; btn.innerHTML = `<i class="fas fa-coins"></i> ${rec.preco}`;
            btn.onclick = () => {
                if (window.appState.coins >= rec.preco) {
                    window.appState.coins -= rec.preco;
                    window.appState.unlockedRecipes.push(rec.id);
                    window.saveData(); window.renderRecipes(); window.updateCoinsDisplay();
                    alert(`🎉 Receita "${rec.nome}" desbloqueada!`);
                } else alert("Moedas insuficientes!");
            };
        }
        card.appendChild(btn);
        grid.appendChild(card);
    });
};

window.renderThemes = function() {
    const pageGrid = document.getElementById('pageThemesGrid');
    if (pageGrid) {
        pageGrid.innerHTML = '';
        (window.listTemas || []).forEach(theme => {
            const isUnlocked = window.appState.unlockedPageThemes.includes(theme.id);
            const isActive = window.appState.currentPageTheme === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="window.usePageTheme('${theme.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="window.buyPageTheme('${theme.id}', ${theme.price || 0})"><i class="fas fa-coins"></i> ${theme.price || 0}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${theme.nome}</h4></div>${btnHTML}`;
            pageGrid.appendChild(card);
        });
    }
    const rouletteGrid = document.getElementById('rouletteThemesGrid');
    if (rouletteGrid) {
        rouletteGrid.innerHTML = '';
        (window.listTemas || []).forEach(theme => {
            const isUnlocked = window.appState.unlockedRouletteThemes.includes(theme.id);
            const isActive = window.appState.currentRouletteTheme === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="window.useRouletteTheme('${theme.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="window.buyRouletteTheme('${theme.id}', ${theme.price || 0})"><i class="fas fa-coins"></i> ${theme.price || 0}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${theme.nome}</h4></div>${btnHTML}`;
            rouletteGrid.appendChild(card);
        });
    }
};

// Funções de compra/uso (globais)
window.buySpinSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedSpinSounds.push(id); window.useSpinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useSpinSound = (id) => { window.appState.currentSpinSound = id; window.saveData(); window.renderSounds(); };
window.buyEndSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedEndSounds.push(id); window.useEndSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useEndSound = (id) => { window.appState.currentEndSound = id; window.saveData(); window.renderSounds(); };
window.buyWinSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedWinSounds.push(id); window.useWinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useWinSound = (id) => { window.appState.currentWinSound = id; window.saveData(); window.renderSounds(); };
window.buyEffect = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; if (!window.appState.unlockedEffects.includes(id)) window.appState.unlockedEffects.push(id); window.useEffect(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useEffect = (id) => { window.appState.currentEffect = id; window.saveData(); window.renderEffects(); };
window.buyPageTheme = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; if (!window.appState.unlockedPageThemes.includes(id)) window.appState.unlockedPageThemes.push(id); window.usePageTheme(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.usePageTheme = (id) => { window.appState.currentPageTheme = id; window.saveData(); window.applyThemes(); window.renderThemes(); };
window.buyRouletteTheme = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; if (!window.appState.unlockedRouletteThemes.includes(id)) window.appState.unlockedRouletteThemes.push(id); window.useRouletteTheme(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useRouletteTheme = (id) => { window.appState.currentRouletteTheme = id; window.saveData(); window.applyThemes(); window.renderThemes(); };

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded disparado');

    // Carrega dados (já foi chamado em core.js, mas garantimos)
    if (typeof window.loadData === 'function') window.loadData();

    // Garantir receitas gratuitas
    (window.RECEITAS || []).forEach(rec => {
        if (rec.preco === 0 && !window.appState.unlockedRecipes.includes(rec.id)) {
            window.appState.unlockedRecipes.push(rec.id);
        }
    });

    // Garantir temas iniciais
    if (!window.appState.unlockedPageThemes || window.appState.unlockedPageThemes.length === 0) {
        window.appState.unlockedPageThemes = ['theme-1'];
    }
    if (!window.appState.unlockedRouletteThemes || window.appState.unlockedRouletteThemes.length === 0) {
        window.appState.unlockedRouletteThemes = ['theme-1'];
    }

    // Atualiza moedas
    window.updateCoinsDisplay();

    // Renderiza tudo
    window.renderFoodList();
    window.renderThemes();
    window.renderSounds();
    window.renderEffects();
    window.renderRecipes();

    // Aplica temas e desenha roleta
    if (typeof window.applyThemes === 'function') window.applyThemes();
    if (typeof window.drawRoulette === 'function') window.drawRoulette();

    // ---------- EVENTOS ----------
    document.getElementById('btnSpin')?.addEventListener('click', window.spinRoulette);
    document.getElementById('btnModeToggle')?.addEventListener('click', () => {
        window.appState.darkMode = !window.appState.darkMode;
        window.applyThemes();
        window.saveData();
    });
    document.getElementById('btnWatchAd')?.addEventListener('click', function() {
        // ... (mantenha o código do anúncio igual ao que você já tem)
        // Por brevidade, não vou replicar aqui, mas você pode manter o seu.
    });

    // Modal de comidas
    const foodModal = document.getElementById('foodSelectionModal');
    document.getElementById('btnOpenFoodModal')?.addEventListener('click', () => {
        window._comidasSelecionadasTemporarias = [...window.appState.foods];
        foodModal.style.display = 'flex';
        window.renderModalFoodOptions(document.getElementById('searchFoodInput')?.value || '');
    });
    document.getElementById('btnCloseFoodModal')?.addEventListener('click', () => foodModal.style.display = 'none');
    foodModal?.addEventListener('click', (e) => { if (e.target === foodModal) foodModal.style.display = 'none'; });
    document.getElementById('searchFoodInput')?.addEventListener('input', e => window.renderModalFoodOptions(e.target.value));
    document.getElementById('btnSaveFoodSelection')?.addEventListener('click', () => {
        const count = window._comidasSelecionadasTemporarias.length;
        if (count < 2) { alert("Selecione pelo menos 2 comidas!"); return; }
        if (count > 6) { alert("Máximo permitido é 6 comidas na roleta!"); return; }
        window.appState.foods = [...window._comidasSelecionadasTemporarias];
        window.saveData();
        window.renderFoodList();
        foodModal.style.display = 'none';
    });
    document.getElementById('btnAddCustomFood')?.addEventListener('click', () => {
        const nome = document.getElementById('newFoodName').value.trim();
        const emoji = document.getElementById('newFoodEmoji').value.trim() || '🍽️';
        if (!nome) { alert('Digite o nome da comida.'); return; }
        const itemString = `${nome} ${emoji}`;
        if (!window.appState.customFoods.some(f => f === itemString)) {
            window.appState.customFoods.push(itemString);
            window.saveData();
            window.renderModalFoodOptions(document.getElementById('searchFoodInput')?.value || '');
            document.getElementById('newFoodName').value = '';
            document.getElementById('newFoodEmoji').value = '';
        } else alert('Esta comida já foi adicionada.');
    });

    // Modal de resultado
    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => resultOverlay.style.display = 'none');
    resultOverlay?.addEventListener('click', (e) => { if (e.target === resultOverlay) resultOverlay.style.display = 'none'; });

    // PWA
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); deferredPrompt = e;
        document.getElementById('installAppBtn').style.display = 'flex';
    });
    document.getElementById('installAppBtn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            document.getElementById('installAppBtn').style.display = 'none';
        }
    });

    console.log('✅ Inicialização completa.');
});

// Fallback: se mesmo assim não renderizar, tenta novamente após 2s
setTimeout(() => {
    if (document.getElementById('foodListContainer')?.children.length === 0) {
        console.warn('Fallback: forçando renderização...');
        window.renderFoodList();
        window.renderThemes();
        window.renderSounds();
        window.renderEffects();
        window.renderRecipes();
        if (typeof window.drawRoulette === 'function') window.drawRoulette();
    }
}, 2000);