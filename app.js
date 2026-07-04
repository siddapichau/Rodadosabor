'use strict';
console.log('🚀 app.js carregado');

// ========== FUNÇÕES GLOBAIS DE RENDERIZAÇÃO ==========

window.renderFoodList = function() {
    console.log('🔄 renderFoodList chamada');
    const container = document.getElementById('foodListContainer');
    if (!container) {
        console.warn('❌ foodListContainer não encontrado');
        return;
    }
    container.innerHTML = '';
    const foods = window.appState?.foods || [];
    if (foods.length === 0) {
        container.innerHTML = '<span style="color:var(--text-muted);">Nenhuma comida selecionada.</span>';
    }
    foods.forEach((food, idx) => {
        const tag = document.createElement('div');
        tag.className = 'food-tag';
        tag.innerHTML = `${food} <i class="fas fa-times" onclick="window.removeFood(${idx})"></i>`;
        container.appendChild(tag);
    });
    console.log('✅ renderFoodList concluída, comidas:', foods.length);
    // Tenta desenhar a roleta depois
    if (typeof window.drawRoulette === 'function') {
        try { window.drawRoulette(); } catch(e) { console.error('Erro ao desenhar roleta após foodList:', e); }
    }
};

window.removeFood = function(idx) {
    console.log('Removendo comida índice', idx);
    if (window.appState && window.appState.foods) {
        window.appState.foods.splice(idx, 1);
        window.saveData();
        window.renderFoodList();
    }
};

window.renderModalFoodOptions = function(filterText = '') {
    console.log('🔄 renderModalFoodOptions chamada, filtro:', filterText);
    const modalGrid = document.getElementById('modalFoodOptionsGrid');
    if (!modalGrid) return;
    modalGrid.innerHTML = '';
    // Monta lista de comidas disponíveis
    let allItems = [];
    if (window.BANCO_DE_COMIDAS) allItems = allItems.concat(window.BANCO_DE_COMIDAS);
    if (window.appState && window.appState.customFoods) {
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
        });
        modalGrid.appendChild(card);
    });
};

window.renderSounds = function() {
    console.log('🔄 renderSounds chamada');
    const spinGrid = document.getElementById('spinSoundsGrid');
    const endGrid = document.getElementById('endSoundsGrid');
    const winGrid = document.getElementById('winSoundsGrid');
    if (!spinGrid || !endGrid || !winGrid) {
        console.warn('❌ Algum grid de sons não encontrado');
        return;
    }
    spinGrid.innerHTML = ''; endGrid.innerHTML = ''; winGrid.innerHTML = '';

    const renderSoundCards = (grid, soundList, unlockedArray, currentKey, useFn, buyFn) => {
        (soundList || []).forEach(sound => {
            const isUnlocked = (unlockedArray || []).includes(sound.id);
            const isActive = window.appState?.[currentKey] === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
            } else if (isUnlocked) {
                btnHTML = `<button class="btn-action btn-use" onclick="window.${useFn}('${sound.id}')">Usar</button>`;
            } else {
                btnHTML = `<button class="btn-action btn-buy" onclick="window.${buyFn}('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            }
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
            grid.appendChild(card);
        });
    };

    renderSoundCards(spinGrid, window.SONS_GIRO, window.appState?.unlockedSpinSounds, 'currentSpinSound', 'useSpinSound', 'buySpinSound');
    renderSoundCards(endGrid, window.SONS_FIM, window.appState?.unlockedEndSounds, 'currentEndSound', 'useEndSound', 'buyEndSound');
    renderSoundCards(winGrid, window.SONS_VITORIA, window.appState?.unlockedWinSounds, 'currentWinSound', 'useWinSound', 'buyWinSound');
    console.log('✅ renderSounds concluída');
};

window.renderEffects = function() {
    console.log('🔄 renderEffects chamada');
    const grid = document.getElementById('effectsGrid');
    if (!grid) {
        console.warn('❌ effectsGrid não encontrado');
        return;
    }
    grid.innerHTML = '';
    const effects = window.EFEITOS_VISUAIS || [];
    effects.forEach(effect => {
        const isUnlocked = (window.appState?.unlockedEffects || []).includes(effect.id);
        const isActive = window.appState?.currentEffect === effect.id;
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        let btnHTML = '';
        if (isActive) {
            btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
        } else if (isUnlocked) {
            btnHTML = `<button class="btn-action btn-use" onclick="window.useEffect('${effect.id}')">Usar</button>`;
        } else {
            btnHTML = `<button class="btn-action btn-buy" onclick="window.buyEffect('${effect.id}', ${effect.price})"><i class="fas fa-coins"></i> ${effect.price}</button>`;
        }
        card.innerHTML = `<div class="item-info"><h4>${effect.name}</h4><p>${effect.price === 0 ? 'Grátis' : effect.price + ' moedas'}</p></div>${btnHTML}`;
        grid.appendChild(card);
    });
    console.log('✅ renderEffects concluída');
};

window.renderRecipes = function() {
    console.log('🔄 renderRecipes chamada');
    const grid = document.getElementById('recipesGrid');
    if (!grid) {
        console.warn('❌ recipesGrid não encontrado');
        return;
    }
    grid.innerHTML = '';
    (window.RECEITAS || []).forEach(rec => {
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
                if (window.appState && window.appState.coins >= rec.preco) {
                    window.appState.coins -= rec.preco;
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
    console.log('✅ renderRecipes concluída');
};

window.renderThemes = function() {
    console.log('🔄 renderThemes chamada');
    const pageGrid = document.getElementById('pageThemesGrid');
    const rouletteGrid = document.getElementById('rouletteThemesGrid');
    const themes = window.listTemas || [];
    if (themes.length === 0) {
        console.warn('⚠️ Nenhum tema definido');
        if (pageGrid) pageGrid.innerHTML = '<p style="grid-column:1/-1; color:var(--text-muted);">Nenhum tema disponível.</p>';
        if (rouletteGrid) rouletteGrid.innerHTML = '<p style="grid-column:1/-1; color:var(--text-muted);">Nenhum tema disponível.</p>';
        return;
    }

    const renderThemeGrid = (grid, type) => {
        if (!grid) return;
        grid.innerHTML = '';
        themes.forEach(theme => {
            const unlocked = (type === 'page' ? window.appState?.unlockedPageThemes : window.appState?.unlockedRouletteThemes) || [];
            const current = type === 'page' ? window.appState?.currentPageTheme : window.appState?.currentRouletteTheme;
            const isUnlocked = unlocked.includes(theme.id);
            const isActive = current === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
            } else if (isUnlocked) {
                btnHTML = `<button class="btn-action btn-use" onclick="window.${type === 'page' ? 'usePageTheme' : 'useRouletteTheme'}('${theme.id}')">Usar</button>`;
            } else {
                btnHTML = `<button class="btn-action btn-buy" onclick="window.${type === 'page' ? 'buyPageTheme' : 'buyRouletteTheme'}('${theme.id}', ${theme.price || 0})"><i class="fas fa-coins"></i> ${theme.price || 0}</button>`;
            }
            card.innerHTML = `<div class="item-info"><h4>${theme.nome}</h4></div>${btnHTML}`;
            grid.appendChild(card);
        });
    };

    renderThemeGrid(pageGrid, 'page');
    renderThemeGrid(rouletteGrid, 'roulette');
    console.log('✅ renderThemes concluída');
};

// ========== FUNÇÕES DE COMPRA/USO ==========
window.buySpinSound = (id, price) => {
    if (window.appState.coins >= price) {
        window.appState.coins -= price;
        window.appState.unlockedSpinSounds.push(id);
        window.useSpinSound(id);
        window.updateCoinsDisplay();
    } else alert("Moedas insuficientes!");
};
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

// ========== FUNÇÃO DE ATUALIZAÇÃO DE MOEDAS ==========
window.updateCoinsDisplay = function() {
    const coinBalance = document.getElementById('coin-balance');
    if (coinBalance) coinBalance.textContent = window.appState?.coins || 0;
};

// ========== FUNÇÃO DE LANÇAR EFEITO ==========
window.launchCurrentEffect = function() {
    const effectId = window.appState?.currentEffect || 'effect-1';
    switch (effectId) {
        case 'effect-1': if (typeof window.launchConfetti === 'function') window.launchConfetti(); break;
        case 'effect-2': if (typeof window.launchFireworks === 'function') window.launchFireworks(); break;
        case 'effect-3': if (typeof window.launchStars === 'function') window.launchStars(); break;
        default: if (typeof window.launchConfetti === 'function') window.launchConfetti();
    }
};

// ========== INICIALIZAÇÃO PRINCIPAL ==========
function initializeApp() {
    console.log('🚀 Inicializando aplicação...');

    // Verifica se o appState existe, senão recarrega
    if (!window.appState) {
        console.error('❌ window.appState não definido! Verifique core.js');
        return;
    }

    // Carregar dados (já foi chamado em core.js, mas garantimos)
    if (typeof window.loadData === 'function') {
        try { window.loadData(); } catch(e) { console.error('Erro ao loadData:', e); }
    }

    // Garantir receitas gratuitas
    if (window.RECEITAS) {
        window.RECEITAS.forEach(rec => {
            if (rec.preco === 0 && !window.appState.unlockedRecipes.includes(rec.id)) {
                window.appState.unlockedRecipes.push(rec.id);
            }
        });
    }

    // Garantir temas iniciais
    if (!window.appState.unlockedPageThemes || window.appState.unlockedPageThemes.length === 0) {
        window.appState.unlockedPageThemes = ['theme-1'];
    }
    if (!window.appState.unlockedRouletteThemes || window.appState.unlockedRouletteThemes.length === 0) {
        window.appState.unlockedRouletteThemes = ['theme-1'];
    }

    // Atualizar moedas
    window.updateCoinsDisplay();

    // Renderizar todos os componentes
    try { window.renderFoodList(); } catch(e) { console.error('Erro renderFoodList:', e); }
    try { window.renderThemes(); } catch(e) { console.error('Erro renderThemes:', e); }
    try { window.renderSounds(); } catch(e) { console.error('Erro renderSounds:', e); }
    try { window.renderEffects(); } catch(e) { console.error('Erro renderEffects:', e); }
    try { window.renderRecipes(); } catch(e) { console.error('Erro renderRecipes:', e); }

    // Aplicar temas e desenhar roleta
    try {
        if (typeof window.applyThemes === 'function') window.applyThemes();
    } catch(e) { console.error('Erro applyThemes:', e); }
    try {
        if (typeof window.drawRoulette === 'function') window.drawRoulette();
    } catch(e) { console.error('Erro drawRoulette:', e); }

    console.log('✅ Inicialização concluída.');
}

// ========== EXECUÇÃO ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp(); // já carregado
}

// Fallback: se após 3 segundos ainda não renderizou, forçar novamente
setTimeout(function() {
    console.log('⏰ Fallback: forçando renderização...');
    try { window.renderFoodList(); } catch(e) { console.error('Fallback renderFoodList:', e); }
    try { window.renderThemes(); } catch(e) { console.error('Fallback renderThemes:', e); }
    try { window.renderSounds(); } catch(e) { console.error('Fallback renderSounds:', e); }
    try { window.renderEffects(); } catch(e) { console.error('Fallback renderEffects:', e); }
    try { window.renderRecipes(); } catch(e) { console.error('Fallback renderRecipes:', e); }
    try { if (typeof window.drawRoulette === 'function') window.drawRoulette(); } catch(e) { console.error('Fallback drawRoulette:', e); }
}, 3000);

// ========== EVENTOS DO DOM ==========
// Serão adicionados após o DOM carregar (mas as funções já estão globais)
document.addEventListener('DOMContentLoaded', function() {
    // Botão girar
    document.getElementById('btnSpin')?.addEventListener('click', window.spinRoulette);

    // Modo claro/escuro
    document.getElementById('btnModeToggle')?.addEventListener('click', () => {
        if (window.appState) {
            window.appState.darkMode = !window.appState.darkMode;
            window.applyThemes();
            window.saveData();
        }
    });

    // Anúncio (mantenha seu código original aqui, mas vou deixar um esqueleto)
    document.getElementById('btnWatchAd')?.addEventListener('click', function() {
        alert('Função de anúncio será implementada.');
        // seu código de anúncio...
    });

    // Modal de comidas
    const foodModal = document.getElementById('foodSelectionModal');
    document.getElementById('btnOpenFoodModal')?.addEventListener('click', () => {
        if (window.appState) {
            window._comidasSelecionadasTemporarias = [...window.appState.foods];
            foodModal.style.display = 'flex';
            window.renderModalFoodOptions(document.getElementById('searchFoodInput')?.value || '');
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

    // Resultado
    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => resultOverlay.style.display = 'none');
    resultOverlay?.addEventListener('click', (e) => { if (e.target === resultOverlay) resultOverlay.style.display = 'none'; });

    console.log('🎯 Eventos do DOM configurados.');
});

console.log('🏁 app.js completamente carregado.');