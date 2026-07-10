'use strict';
console.log('app.js carregado (v14 - Temas Separados via Firebase)');

window.updateCoinsDisplay = function() {
    const coinBalance = document.getElementById('coin-balance');
    if (coinBalance) coinBalance.textContent = window.appState.coins;
};

// ========================== RENDERIZADORES ==========================
window.renderFoodList = function() {
    const container = document.getElementById('foodListContainer');
    if (!container) return;
    container.innerHTML = '';
    const foods = window.appState?.foods || [];
    if (foods.length === 0) {
        container.innerHTML = '<span style="color:var(--text-muted);">Nenhuma comida selecionada.</span>'; return;
    }
    foods.forEach((food, idx) => {
        const tag = document.createElement('div'); tag.className = 'food-tag';
        tag.innerHTML = `${food} <i class="fas fa-times" onclick="window.removeFood(${idx})"></i>`;
        container.appendChild(tag);
    });
    if (typeof window.drawRoulette === 'function') { try { window.drawRoulette(); } catch(e) {} }
};

window.removeFood = function(idx) {
    if (window.appState && window.appState.foods) {
        const novasComidas = [...window.appState.foods];
        novasComidas.splice(idx, 1);
        window._comidasSelecionadasTemporarias = novasComidas;
        document.getElementById('btnSaveFoodSelection')?.click();
    }
};

window.renderModalFoodOptions = function(filterText = '') {
    const modalGrid = document.getElementById('modalFoodOptionsGrid');
    if (!modalGrid) return;
    modalGrid.innerHTML = '';
    let allItems = window.BANCO_DE_COMIDAS ? [...window.BANCO_DE_COMIDAS] : [];
    if (window.appState?.customFoods) {
        window.appState.customFoods.forEach(custom => {
            const match = custom.match(/\p{Emoji}/u);
            if (match) { allItems.push({ nome: custom.replace(/\p{Emoji}/u, '').trim(), icone: match[0] }); } 
            else { allItems.push({ nome: custom, icone: '🍽️' }); }
        });
    }
    const filtradas = allItems.filter(item => item.nome.toLowerCase().includes(filterText.toLowerCase()));
    const selecionadas = window._comidasSelecionadasTemporarias || [];
    filtradas.forEach(item => {
        const itemString = `${item.nome} ${item.icone}`;
        const card = document.createElement('div'); card.className = 'food-option-card';
        if (selecionadas.includes(itemString)) card.classList.add('selected');
        card.innerHTML = `<span>${item.icone}</span> ${item.nome}`;
        card.addEventListener('click', () => {
            const idx = selecionadas.indexOf(itemString);
            if (idx > -1) { selecionadas.splice(idx, 1); card.classList.remove('selected'); } 
            else {
                if (selecionadas.length >= 6) { alert("Máximo de 6 itens permitidos!"); return; }
                selecionadas.push(itemString); card.classList.add('selected');
            }
            window._comidasSelecionadasTemporarias = selecionadas;
            const info = document.getElementById('foodSelectionCount');
            if (info) info.textContent = `${window._comidasSelecionadasTemporarias.length} / 6 selecionadas`;
        });
        modalGrid.appendChild(card);
    });
};

// RENDERIZADOR DE TEMAS SEPARADOS
window.renderThemes = function() {
    const pageGrid = document.getElementById('pageThemesGrid');
    const rouletteGrid = document.getElementById('rouletteThemesGrid');
    
    const activePageThemes = (window.DYNAMIC_PAGE_THEMES && window.DYNAMIC_PAGE_THEMES.length > 0) ? window.DYNAMIC_PAGE_THEMES : (window.listTemas || []);
    const activeRouletteThemes = (window.DYNAMIC_ROULETTE_THEMES && window.DYNAMIC_ROULETTE_THEMES.length > 0) ? window.DYNAMIC_ROULETTE_THEMES : (window.listTemas || []);
    
    const renderThemeGrid = (grid, themeList, arrayName, currentKey, category) => {
        if (!grid) return;
        if (themeList.length === 0) {
            grid.innerHTML = '<span style="color:var(--text-muted); font-size: 0.85rem;">Carregando temas da nuvem...</span>';
            return;
        }
        grid.innerHTML = '';
        themeList.forEach(theme => {
            const isUnlocked = window.isItemLiberado(arrayName, theme.id);
            const isActive = window.appState?.[currentKey] === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            
            const precoExibicao = (theme.price !== undefined) ? theme.price : (theme.preco || 0);

            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>`
                        : isUnlocked ? `<button class="btn-action btn-use" onclick="window.equiparEAtualizar('${category}', '${theme.id}')">Usar</button>`
                        : `<button class="btn-action btn-buy" onclick="window.comprarEAtualizar('${category}', '${theme.id}')"><i class="fas fa-coins"></i> ${precoExibicao}</button>`;
            
            card.innerHTML = `<div class="item-info"><h4>${theme.nome || theme.id}</h4><p style="font-size:0.65rem; color:var(--text-muted);">${precoExibicao === 0 ? 'Grátis' : `${precoExibicao} moedas`}</p></div>${btnHTML}`;
            grid.appendChild(card);
        });
    };

    renderThemeGrid(pageGrid, activePageThemes, 'unlockedPageThemes', 'currentPageTheme', 'pageTheme');
    renderThemeGrid(rouletteGrid, activeRouletteThemes, 'unlockedRouletteThemes', 'currentRouletteTheme', 'rouletteTheme');
};

window.renderSounds = function() {
    const spinGrid = document.getElementById('spinSoundsGrid');
    const endGrid = document.getElementById('endSoundsGrid');
    const winGrid = document.getElementById('winSoundsGrid');
    if (!spinGrid || !endGrid || !winGrid) return;

    const renderSoundCards = (grid, soundList, arrayName, currentKey, category) => {
        grid.innerHTML = '';
        if (!soundList || soundList.length === 0) return;
        const sorted = [...soundList].sort((a, b) => (a.price || 0) - (b.price || 0));
        sorted.forEach(sound => {
            const isUnlocked = window.isItemLiberado(arrayName, sound.id);
            const isActive = window.appState?.[currentKey] === sound.id;
            
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` 
                        : isUnlocked ? `<button class="btn-action btn-use" onclick="window.equiparEAtualizar('${category}', '${sound.id}')">Usar</button>` 
                        : `<button class="btn-action btn-buy" onclick="window.comprarEAtualizar('${category}', '${sound.id}')"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            
            card.innerHTML = `
                <div class="item-info">
                    <h4>${sound.name}</h4>
                    <p style="font-size:0.65rem; color:var(--text-muted);">${sound.price === 0 ? 'Grátis' : `${sound.price} moedas`}</p>
                    <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="window.playSynthesizedSound('${sound.type}')"></i>
                </div>
                ${btnHTML}
            `;
            grid.appendChild(card);
        });
    };

    renderSoundCards(spinGrid, window.SONS_GIRO, 'unlockedSpinSounds', 'currentSpinSound', 'spinSound');
    renderSoundCards(endGrid, window.SONS_FIM, 'unlockedEndSounds', 'currentEndSound', 'endSound');
    renderSoundCards(winGrid, window.SONS_VITORIA, 'unlockedWinSounds', 'currentWinSound', 'winSound');
};

window.renderEffects = function() {
    const grid = document.getElementById('effectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const effects = window.EFEITOS_VISUAIS || [];
    if (effects.length === 0) return;
    
    const sorted = [...effects].sort((a, b) => (a.price || 0) - (b.price || 0));
    sorted.forEach(effect => {
        const isUnlocked = window.isItemLiberado('unlockedEffects', effect.id);
        const isActive = window.appState?.currentEffect === effect.id;
        
        const card = document.createElement('div');
        card.className = `item-card ${isActive ? 'active' : ''}`;
        
        let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` 
                    : isUnlocked ? `<button class="btn-action btn-use" onclick="window.equiparEAtualizar('effect', '${effect.id}')">Usar</button>` 
                    : `<button class="btn-action btn-buy" onclick="window.comprarEAtualizar('effect', '${effect.id}')"><i class="fas fa-coins"></i> ${effect.price}</button>`;
        
        card.innerHTML = `
            <div class="item-info">
                <h4>${effect.name}</h4>
                <p style="font-size:0.65rem; color:var(--text-muted);">${effect.price === 0 ? 'Grátis' : `${effect.price} moedas`}</p>
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
    
    const recipes = (window.DYNAMIC_RECIPES && window.DYNAMIC_RECIPES.length > 0) ? window.DYNAMIC_RECIPES : (window.RECEITAS || []);
    if (recipes.length === 0) {
        grid.innerHTML = '<span style="color:var(--text-muted); font-size: 0.85rem;">Carregando receitas exclusivas da nuvem...</span>';
        return;
    }
    
    const sorted = [...recipes].sort((a, b) => (a.preco || 0) - (b.preco || 0));
    sorted.forEach(rec => {
        const isUnlocked = window.isItemLiberado('unlockedRecipes', rec.id);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<div class="recipe-info"><span class="recipe-icon">${rec.icone}</span><span class="recipe-name">${rec.nome}</span></div>`;
        let btn = document.createElement('button');
        
        if (isUnlocked) {
            btn.className = 'btn-action btn-recipe-open'; btn.textContent = 'Ver';
            btn.onclick = () => window.location.href = rec.link;
        } else {
            btn.className = 'btn-action btn-buy'; btn.innerHTML = `<i class="fas fa-coins"></i> ${rec.preco || 0}`;
            btn.onclick = () => window.comprarEAtualizar('recipe', rec.id);
        }
        card.appendChild(btn);
        grid.appendChild(card);
    });
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
        case 'effect-7': window.launchRainbow(); break;
        default: window.launchConfetti();
    }
};

window.comprarEAtualizar = function(categoria, id) {
    if (window.comprarItemSeguro(categoria, id)) window.renderAll();
    else if(!window.isVipAtivo()) alert("Não foi possível realizar a compra. Moedas insuficientes.");
};

window.equiparEAtualizar = function(categoria, id) {
    if (window.equiparItemSeguro(categoria, id)) window.renderAll();
};

window.renderAll = function() {
    window.updateCoinsDisplay();
    try { window.renderFoodList(); } catch(e) {}
    try { window.renderThemes(); } catch(e) {}
    try { window.renderSounds(); } catch(e) {}
    try { window.renderEffects(); } catch(e) {}
    try { window.renderRecipes(); } catch(e) {}
    
    const vipStatus = document.getElementById('vipStatusTag');
    if (vipStatus) {
        if (window.isVipAtivo()) {
            vipStatus.style.display = 'inline-block';
            vipStatus.textContent = '👑 VIP ATIVO';
        } else {
            vipStatus.style.display = 'none';
        }
    }

    const premiumStore = document.querySelector('.premium-store');
    if (premiumStore) {
        premiumStore.style.display = window.isVipAtivo() ? 'none' : 'block';
    }
    
    try { if (typeof window.applyThemes === 'function') window.applyThemes(); } catch(e) {}
};

document.addEventListener('DOMContentLoaded', function() {
    window.renderAll();

    document.getElementById('btnEditName')?.addEventListener('click', function() {
        const nomeAtual = document.getElementById('userName')?.textContent?.replace(' ✓', '').trim() || '';
        const novoNome = prompt('Digite seu novo nome:', nomeAtual);
        if (novoNome !== null && novoNome.trim() !== '') window.editarNomeUsuario(novoNome.trim());
    });

    document.getElementById('btnGoogleLogin')?.addEventListener('click', function() {
        if (typeof window.conectarGoogle === 'function') window.conectarGoogle();
    });

    document.getElementById('btnSpin')?.addEventListener('click', async function() {
        if (!window.gastarMoedaGiro()) {
            if(!window.isServerSynced) alert("⏳ Conectando ao servidor... Aguarde um instante.");
            else alert("Você precisa de 1 moeda para girar! Assista a um anúncio para ganhar.");
            return;
        }
        window.updateCoinsDisplay();
        if (typeof window.spinCounter !== 'undefined') window.spinCounter++;
        window.spinRoulette();
    });
    
    document.getElementById('btnModeToggle')?.addEventListener('click', () => {
        if (typeof window.toggleDarkModeSeguro === 'function') window.toggleDarkModeSeguro(); 
    });

    const btnWatchAd = document.getElementById('btnWatchAd');
    btnWatchAd?.addEventListener('click', async function() {
        if (!window.isServerSynced) { alert("⏳ Conectando ao servidor..."); return; }

        if (window.isAppNativo && window.isAppNativo()) {
            btnWatchAd.disabled = true;
            const textoOriginal = btnWatchAd.innerHTML;
            btnWatchAd.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            
            const recompensaGanha = await window.mostrarAdMobNativo();
            
            btnWatchAd.innerHTML = textoOriginal;
            btnWatchAd.disabled = false;
            
            if (recompensaGanha) alert("🎉 Recompensa recebida: Você ganhou +3 moedas!");
            return;
        }

        const overlay = document.getElementById('adOverlay');
        const countdownSpan = document.getElementById('adCountdown');
        if (!overlay || !countdownSpan) return;
        
        btnWatchAd.disabled = true; overlay.style.display = 'flex';
        let timeLeft = 30; countdownSpan.textContent = timeLeft;
        
        const preventClose = (e) => e.stopPropagation();
        overlay.addEventListener('click', preventClose);
        
        const timer = setInterval(() => {
            timeLeft--; countdownSpan.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                overlay.removeEventListener('click', preventClose);
                overlay.style.display = 'none';
                btnWatchAd.disabled = false;
                
                if (window.ganharMoedasAnuncioWeb()) {
                    window.updateCoinsDisplay(); alert("🎉 Recompensa recebida: Você ganhou +3 moedas!");
                } else alert("⚠️ Falha ao resgatar. Aguarde um instante.");
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
    document.getElementById('searchFoodInput')?.addEventListener('input', e => window.renderModalFoodOptions(e.target.value));
    
    document.getElementById('btnSaveFoodSelection')?.addEventListener('click', () => {
        if (!window._comidasSelecionadasTemporarias) return;
        const count = window._comidasSelecionadasTemporarias.length;
        if (count < 2) { alert("Selecione pelo menos 2 comidas!"); return; }
        if (count > 6) { alert("Máximo permitido é 6 comidas na roleta!"); return; }
        
        const data = JSON.parse(localStorage.getItem('rodaDoSaborState'));
        data.foods = [...window._comidasSelecionadasTemporarias];
        localStorage.setItem('rodaDoSaborState', JSON.stringify(data));
        window.location.reload(); 
    });

    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => resultOverlay.style.display = 'none');
});
