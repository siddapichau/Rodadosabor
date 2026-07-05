'use strict';
console.log('app.js carregado');

window.updateCoinsDisplay = function() {
    const coinBalance = document.getElementById('coin-balance');
    if (coinBalance) coinBalance.textContent = window.appState.coins;
};

window.launchCurrentEffect = function() {
    const effectId = window.appState.currentEffect || 'effect-1';
    switch (effectId) {
        case 'effect-1': window.launchConfetti(); break;
        case 'effect-2': window.launchFireworks(); break;
        case 'effect-3': window.launchStars(); break;
        case 'effect-4': window.launchNeonLights(); break;
        case 'effect-5': window.launchLaser(); break;
        case 'effect-6': window.launchGlitter(); break;
        case 'effect-7': window.launchFireworks(); break; 
        case 'effect-8': window.launchStars(); break;    
        case 'effect-9': window.launchRainbow(); break;
        default: window.launchConfetti();
    }
};

window.renderFoodList = function() {
    const container = document.getElementById('foodListContainer');
    if (!container) return;
    container.innerHTML = '';
    const foods = window.appState?.foods || [];
    if (foods.length === 0) {
        container.innerHTML = '<span style="color:var(--text-muted);">Nenhuma comida selecionada. Adicione pelo menos 2.</span>';
        return;
    }
    foods.forEach((food, idx) => {
        const tag = document.createElement('div');
        tag.className = 'food-tag';
        tag.innerHTML = `${food} <i class="fas fa-times" onclick="window.removeFood(${idx})"></i>`;
        container.appendChild(tag);
    });
    if (typeof window.drawRoulette === 'function') {
        try { window.drawRoulette(); } catch(e) {}
    }
};

window.removeFood = function(idx) {
    if (window.appState && window.appState.foods) {
        window.appState.foods.splice(idx, 1);
        window.saveData();
        window.renderFoodList();
    }
};

window.renderModalFoodOptions = function(filterText = '') {
    const modalGrid = document.getElementById('modalFoodOptionsGrid');
    if (!modalGrid) return;
    modalGrid.innerHTML = '';
    let allItems = [];
    if (window.BANCO_DE_COMIDAS) allItems = allItems.concat(window.BANCO_DE_COMIDAS);
    if (window.appState?.customFoods) {
        window.appState.customFoods.forEach(custom => {
            const match = custom.match(/\p{Emoji}/u);
            if (match) {
                const nome = custom.replace(/\p{Emoji}/u, '').trim();
                allItems.push({ nome, icone: match[0] });
            } else {
                allItems.push({ nome: custom, icone: '🍽️' });
            }
        });
    }
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
            const count = window._comidasSelecionadasTemporarias.length;
            const info = document.getElementById('foodSelectionCount');
            if (info) info.textContent = `${count} / 6 selecionadas`;
        });
        modalGrid.appendChild(card);
    });
};

window.renderSounds = function() {
    const spinGrid = document.getElementById('spinSoundsGrid');
    const endGrid = document.getElementById('endSoundsGrid');
    const winGrid = document.getElementById('winSoundsGrid');
    if (!spinGrid || !endGrid || !winGrid) return;

    const renderSoundCards = (grid, soundList, unlockedArray, currentKey, useFn, buyFn) => {
        grid.innerHTML = '';
        if (!soundList || soundList.length === 0) return;
        const sorted = [...soundList].sort((a, b) => (a.price || 0) - (b.price || 0));
        sorted.forEach(sound => {
            const isUnlocked = (unlockedArray || []).includes(sound.id);
            const isActive = window.appState?.[currentKey] === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` 
                        : isUnlocked ? `<button class="btn-action btn-use" onclick="window.${useFn}('${sound.id}')">Usar</button>` 
                        : `<button class="btn-action btn-buy" onclick="window.${buyFn}('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            const priceTag = sound.price === 0 ? 'Grátis' : `${sound.price} moedas`;
            card.innerHTML = `
                <div class="item-info">
                    <h4>${sound.name}</h4>
                    <p style="font-size:0.65rem; color:var(--text-muted);">${priceTag}</p>
                    <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i>
                </div>
                ${btnHTML}
            `;
            grid.appendChild(card);
        });
    };

    renderSoundCards(spinGrid, window.SONS_GIRO, window.appState?.unlockedSpinSounds, 'currentSpinSound', 'useSpinSound', 'buySpinSound');
    renderSoundCards(endGrid, window.SONS_FIM, window.appState?.unlockedEndSounds, 'currentEndSound', 'useEndSound', 'buyEndSound');
    renderSoundCards(winGrid, window.SONS_VITORIA, window.appState?.unlockedWinSounds, 'currentWinSound', 'useWinSound', 'buyWinSound');
};

window.renderEffects = function() {
    const grid = document.getElementById('effectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const effects = window.EFEITOS_VISUAIS || [];
    if (effects.length === 0) return;
    
    const sorted = [...effects].sort((a, b) => (a.price || 0) - (b.price || 0));
    sorted.forEach(effect => {
        const isUnlocked = (window.appState?.unlockedEffects || []).includes(effect.id);
        const isActive = window.appState?.currentEffect === effect.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` 
                    : isUnlocked ? `<button class="btn-action btn-use" onclick="window.useEffect('${effect.id}')">Usar</button>` 
                    : `<button class="btn-action btn-buy" onclick="window.buyEffect('${effect.id}', ${effect.price})"><i class="fas fa-coins"></i> ${effect.price}</button>`;
        const priceTag = effect.price === 0 ? 'Grátis' : `${effect.price} moedas`;
        card.innerHTML = `
            <div class="item-info">
                <h4>${effect.name}</h4>
                <p style="font-size:0.65rem; color:var(--text-muted);">${priceTag}</p>
                <p style="font-size:0.6rem; color:var(--text-muted);">${effect.description || ''}</p>
            </div>
            ${btnHTML}
        `;
        grid.appendChild(card);
    });
};

window.renderRecipes = function() {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const recipes = window.RECEITAS || [];
    if (recipes.length === 0) return;
    
    const sorted = [...recipes].sort((a, b) => (a.preco || 0) - (b.preco || 0));
    sorted.forEach(rec => {
        const isUnlocked = (window.appState?.unlockedRecipes || []).includes(rec.id);
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
                if (window.gastarMoedasSeguro(rec.preco)) {
                    if (!window.appState.unlockedRecipes.includes(rec.id)) window.appState.unlockedRecipes.push(rec.id);
                    window.saveData();
                    window.renderRecipes();
                    window.updateCoinsDisplay();
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
    const rouletteGrid = document.getElementById('rouletteThemesGrid');
    const themes = window.listTemas || [];
    if (themes.length === 0) return;
    const sorted = [...themes].sort((a, b) => (a.price || 0) - (b.price || 0));

    const renderThemeGrid = (grid, type) => {
        if (!grid) return;
        grid.innerHTML = '';
        sorted.forEach(theme => {
            const unlocked = (type === 'page' ? window.appState?.unlockedPageThemes : window.appState?.unlockedRouletteThemes) || [];
            const current = type === 'page' ? window.appState?.currentPageTheme : window.appState?.currentRouletteTheme;
            const isUnlocked = unlocked.includes(theme.id);
            const isActive = current === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>`
                        : isUnlocked ? `<button class="btn-action btn-use" onclick="window.${type === 'page' ? 'usePageTheme' : 'useRouletteTheme'}('${theme.id}')">Usar</button>`
                        : `<button class="btn-action btn-buy" onclick="window.${type === 'page' ? 'buyPageTheme' : 'buyRouletteTheme'}('${theme.id}', ${theme.price || 0})"><i class="fas fa-coins"></i> ${theme.price || 0}</button>`;
            const priceTag = theme.price === 0 ? 'Grátis' : `${theme.price} moedas`;
            card.innerHTML = `
                <div class="item-info">
                    <h4>${theme.nome}</h4>
                    <p style="font-size:0.65rem; color:var(--text-muted);">${priceTag}</p>
                </div>
                ${btnHTML}
            `;
            grid.appendChild(card);
        });
    };

    renderThemeGrid(pageGrid, 'page');
    renderThemeGrid(rouletteGrid, 'roulette');
};

// ========== COMPRAS SEGURAS ==========
window.buySpinSound = (id, price) => { if (window.gastarMoedasSeguro(price)) { window.appState.unlockedSpinSounds.push(id); window.useSpinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useSpinSound = (id) => { window.appState.currentSpinSound = id; window.saveData(); window.renderSounds(); };
window.buyEndSound = (id, price) => { if (window.gastarMoedasSeguro(price)) { window.appState.unlockedEndSounds.push(id); window.useEndSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useEndSound = (id) => { window.appState.currentEndSound = id; window.saveData(); window.renderSounds(); };
window.buyWinSound = (id, price) => { if (window.gastarMoedasSeguro(price)) { window.appState.unlockedWinSounds.push(id); window.useWinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useWinSound = (id) => { window.appState.currentWinSound = id; window.saveData(); window.renderSounds(); };
window.buyEffect = (id, price) => { if (window.gastarMoedasSeguro(price)) { if (!window.appState.unlockedEffects.includes(id)) window.appState.unlockedEffects.push(id); window.useEffect(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useEffect = (id) => { window.appState.currentEffect = id; window.saveData(); window.renderEffects(); };
window.buyPageTheme = (id, price) => { if (window.gastarMoedasSeguro(price)) { if (!window.appState.unlockedPageThemes.includes(id)) window.appState.unlockedPageThemes.push(id); window.usePageTheme(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.usePageTheme = (id) => { window.appState.currentPageTheme = id; window.saveData(); window.applyThemes(); window.renderThemes(); };
window.buyRouletteTheme = (id, price) => { if (window.gastarMoedasSeguro(price)) { if (!window.appState.unlockedRouletteThemes.includes(id)) window.appState.unlockedRouletteThemes.push(id); window.useRouletteTheme(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
window.useRouletteTheme = (id) => { window.appState.currentRouletteTheme = id; window.saveData(); window.applyThemes(); window.renderThemes(); };

window.renderAll = function() {
    window.updateCoinsDisplay();
    try { window.renderFoodList(); } catch(e) {}
    try { window.renderThemes(); } catch(e) {}
    try { window.renderSounds(); } catch(e) {}
    try { window.renderEffects(); } catch(e) {}
    try { window.renderRecipes(); } catch(e) {}
    try { if (typeof window.applyThemes === 'function') window.applyThemes(); } catch(e) {}
};

document.addEventListener('DOMContentLoaded', function() {
    window.renderAll();

    document.getElementById('btnSpin')?.addEventListener('click', window.spinRoulette);
    
    document.getElementById('btnModeToggle')?.addEventListener('click', () => {
        if (window.appState) {
            window.appState.darkMode = !window.appState.darkMode;
            window.applyThemes();
            window.saveData();
        }
    });

    // 👇 LÓGICA DO ANÚNCIO COM CRONÔMETRO
    const btnWatchAd = document.getElementById('btnWatchAd');
    btnWatchAd?.addEventListener('click', function() {
        const overlay = document.getElementById('adOverlay');
        const countdownSpan = document.getElementById('adCountdown');
        
        if (!overlay || !countdownSpan) return;
        
        btnWatchAd.disabled = true; // Impede duplo clique
        overlay.style.display = 'flex';
        
        let timeLeft = 30; // 30 segundos
        countdownSpan.textContent = timeLeft;
        
        // Bloqueia o clique fora do modal para não roubar
        const preventClose = (e) => e.stopPropagation();
        overlay.addEventListener('click', preventClose);
        
        const timer = setInterval(() => {
            timeLeft--;
            countdownSpan.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                overlay.removeEventListener('click', preventClose);
                overlay.style.display = 'none';
                btnWatchAd.disabled = false;
                
                // Concede a recompensa
                window.ganharMoedasAnuncio();
                window.updateCoinsDisplay();
                alert("🎉 Recompensa recebida: Você ganhou +3 moedas!");
            }
        }, 1000);
    });

    const foodModal = document.getElementById('foodSelectionModal');
    document.getElementById('btnOpenFoodModal')?.addEventListener('click', () => {
        if (window.appState) {
            window._comidasSelecionadasTemporarias = [...window.appState.foods];
            foodModal.style.display = 'flex';
            window.renderModalFoodOptions(document.getElementById('searchFoodInput')?.value || '');
            let countEl = document.getElementById('foodSelectionCount');
            if (countEl) countEl.textContent = `${window._comidasSelecionadasTemporarias.length} / 6 selecionadas`;
        }
    });
    
    document.getElementById('btnCloseFoodModal')?.addEventListener('click', () => foodModal.style.display = 'none');
    foodModal?.addEventListener('click', (e) => { if (e.target === foodModal) foodModal.style.display = 'none'; });
    document.getElementById('searchFoodInput')?.addEventListener('input', e => window.renderModalFoodOptions(e.target.value));
    
    document.getElementById('btnSaveFoodSelection')?.addEventListener('click', () => {
        if (!window._comidasSelecionadasTemporarias) return;
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

    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => resultOverlay.style.display = 'none');
    resultOverlay?.addEventListener('click', (e) => { if (e.target === resultOverlay) resultOverlay.style.display = 'none'; });
});
