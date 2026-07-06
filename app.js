'use strict';
console.log('app.js carregado (v6)');

window.updateCoinsDisplay = function() {
    // Agora ele apenas joga o valor na tela imediatamente sem checar isServerSynced (Otimista)
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
    let allItems = [];
    if (window.BANCO_DE_COMIDAS) allItems = allItems.concat(window.BANCO_DE_COMIDAS);
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
        const isUnlocked = window.isItemLiberado('unlockedRecipes', rec.id);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<div class="recipe-info"><span class="recipe-icon">${rec.icone}</span><span class="recipe-name">${rec.nome}</span></div>`;
        let btn = document.createElement('button');
        
        if (isUnlocked) {
            btn.className = 'btn-action btn-recipe-open'; btn.textContent = 'Ver';
            btn.onclick = () => window.location.href = rec.link;
        } else {
            btn.className = 'btn-action btn-buy'; btn.innerHTML = `<i class="fas fa-coins"></i> ${rec.preco}`;
            btn.onclick = () => window.comprarEAtualizar('recipe', rec.id);
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

    const renderThemeGrid = (grid, arrayName, currentKey, category) => {
        if (!grid) return;
        grid.innerHTML = '';
        sorted.forEach(theme => {
            const isUnlocked = window.isItemLiberado(arrayName, theme.id);
            const isActive = window.appState?.[currentKey] === theme.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>`
                        : isUnlocked ? `<button class="btn-action btn-use" onclick="window.equiparEAtualizar('${category}', '${theme.id}')">Usar</button>`
                        : `<button class="btn-action btn-buy" onclick="window.comprarEAtualizar('${category}', '${theme.id}')"><i class="fas fa-coins"></i> ${theme.price || 0}</button>`;
            
            card.innerHTML = `
                <div class="item-info">
                    <h4>${theme.nome}</h4>
                    <p style="font-size:0.65rem; color:var(--text-muted);">${theme.price === 0 ? 'Grátis' : `${theme.price} moedas`}</p>
                </div>
                ${btnHTML}
            `;
            grid.appendChild(card);
        });
    };

    renderThemeGrid(pageGrid, 'unlockedPageThemes', 'currentPageTheme', 'pageTheme');
    renderThemeGrid(rouletteGrid, 'unlockedRouletteThemes', 'currentRouletteTheme', 'rouletteTheme');
};

window.comprarEAtualizar = function(categoria, id) {
    if (window.comprarItemSeguro(categoria, id)) {
        window.renderAll();
    } else {
        if(!window.isVipAtivo()) alert("Não foi possível realizar a compra. Moedas insuficientes.");
    }
};

window.equiparEAtualizar = function(categoria, id) {
    if (window.equiparItemSeguro(categoria, id)) {
        window.renderAll();
    }
};

window.renderAll = function() {
    window.updateCoinsDisplay();
    try { window.renderFoodList(); } catch(e) {}
    try { window.renderThemes(); } catch(e) {}
    try { window.renderSounds(); } catch(e) {}
    try { window.renderEffects(); } catch(e) {}
    try { window.renderRecipes(); } catch(e) {}
    try { if (typeof window.applyThemes === 'function') window.applyThemes(); } catch(e) {}
    
    const btnVip = document.getElementById('btnTestVip');
    if (btnVip) {
        if (window.isVipAtivo()) {
            btnVip.innerHTML = '<i class="fas fa-crown"></i> VIP Ativo';
            btnVip.style.background = 'linear-gradient(135deg, #f5b342, #f5d742)';
            btnVip.disabled = true;
        }
    }
};

// ========================== EVENTOS PRINCIPAIS ==========================
document.addEventListener('DOMContentLoaded', function() {
    window.renderAll();

    const actionRow = document.querySelector('.action-row-buttons');
    if (actionRow) {
        const btnVip = document.createElement('button');
        btnVip.id = 'btnTestVip';
        btnVip.className = 'btn-gradient-action';
        btnVip.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
        btnVip.innerHTML = '<i class="fas fa-crown"></i> Assinar VIP (Teste)';
        btnVip.onclick = () => {
            window.ativarVipMensal();
            alert("👑 VIP Ativado por 30 dias! Toda a loja e roleta ilimitada foram liberadas.");
            window.renderAll();
        };
        actionRow.appendChild(btnVip);
    }

    document.getElementById('btnEditName')?.addEventListener('click', function() {
        const nomeAtual = document.getElementById('userName')?.textContent?.replace(' ✓', '').trim() || '';
        const novoNome = prompt('Digite seu novo nome (3 a 16 caracteres, apenas letras):', nomeAtual);
        if (novoNome !== null && novoNome.trim() !== '') {
            window.editarNomeUsuario(novoNome.trim());
        }
    });

    document.getElementById('btnGoogleLogin')?.addEventListener('click', function() {
        if (typeof window.conectarGoogle === 'function') {
            window.conectarGoogle();
        }
    });

    document.getElementById('btnSpin')?.addEventListener('click', function() {
        if (!window.gastarMoedaGiro()) {
            if(!window.isServerSynced) {
                alert("⏳ Conectando ao servidor... Aguarde um instante.");
            } else {
                alert("Você precisa de 1 moeda para girar! Assista a um anúncio para ganhar moedas.");
            }
            return;
        }
        window.updateCoinsDisplay();
        window.spinRoulette();
    });
    
    // 👇 O SEGREDO DO MODO NOTURNO RÁPIDO ESTÁ AQUI 👇
    document.getElementById('btnModeToggle')?.addEventListener('click', () => {
        if (typeof window.toggleDarkModeSeguro === 'function') {
            window.toggleDarkModeSeguro(); // Chama a porta segura sem recarregar a tela!
        }
    });

    const btnWatchAd = document.getElementById('btnWatchAd');
    btnWatchAd?.addEventListener('click', async function() {
        if (!window.isServerSynced) {
            alert("⏳ Conectando ao servidor... Tente novamente em alguns instantes.");
            return;
        }

        if (window.isAppNativo && window.isAppNativo()) {
            btnWatchAd.disabled = true;
            const textoOriginal = btnWatchAd.innerHTML;
            btnWatchAd.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            
            const recompensaGanha = await window.mostrarAdMobNativo();
            
            btnWatchAd.innerHTML = textoOriginal;
            btnWatchAd.disabled = false;
            if (recompensaGanha) {
                alert("🎉 Recompensa recebida: Você ganhou +3 moedas!");
            }
            return;
        }

        const overlay = document.getElementById('adOverlay');
        const countdownSpan = document.getElementById('adCountdown');
        
        if (!overlay || !countdownSpan) return;
        
        btnWatchAd.disabled = true;
        overlay.style.display = 'flex';
        let timeLeft = 30;
        countdownSpan.textContent = timeLeft;
        
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
                
                if (window.ganharMoedasAnuncioWeb()) {
                    window.updateCoinsDisplay();
                    alert("🎉 Recompensa recebida: Você ganhou +3 moedas!");
                } else {
                    alert("⚠️ Falha ao resgatar. Aguarde uns instantes antes de assistir outro.");
                }
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
    
    const saveFoodHack = (novasComidas) => {
        const data = JSON.parse(localStorage.getItem('rodaDoSaborState'));
        data.foods = novasComidas;
        localStorage.setItem('rodaDoSaborState', JSON.stringify(data));
        window.location.reload(); 
    }

    document.getElementById('btnSaveFoodSelection')?.addEventListener('click', () => {
        if (!window._comidasSelecionadasTemporarias) return;
        const count = window._comidasSelecionadasTemporarias.length;
        if (count < 2) { alert("Selecione pelo menos 2 comidas!"); return; }
        if (count > 6) { alert("Máximo permitido é 6 comidas na roleta!"); return; }
        
        saveFoodHack([...window._comidasSelecionadasTemporarias]);
    });

    document.getElementById('btnAddCustomFood')?.addEventListener('click', () => {
        const nome = document.getElementById('newFoodName').value.trim();
        const emoji = document.getElementById('newFoodEmoji').value.trim() || '🍽️';
        if (!nome) { alert('Digite o nome da comida.'); return; }
        const itemString = `${nome} ${emoji}`;
        
        const data = JSON.parse(localStorage.getItem('rodaDoSaborState'));
        if (!data.customFoods) data.customFoods = [];
        
        if (!data.customFoods.some(f => f === itemString)) {
            data.customFoods.push(itemString);
            localStorage.setItem('rodaDoSaborState', JSON.stringify(data));
            window.location.reload(); 
        } else alert('Esta comida já foi adicionada.');
    });

    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => resultOverlay.style.display = 'none');
    resultOverlay?.addEventListener('click', (e) => { if (e.target === resultOverlay) resultOverlay.style.display = 'none'; });
});

// ========================== AVISO DIÁRIO DO GOOGLE ==========================
const checarAvisoDiarioGoogle = () => {
    if (!window.isServerSynced) {
        setTimeout(checarAvisoDiarioGoogle, 1000);
        return;
    }
    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
        return;
    }
    const AGORA = Date.now();
    const UMA_HORA_EM_MS = 60 * 60 * 1000;
    const VINTE_QUATRO_HORAS = 24 * UMA_HORA_EM_MS;
    const ultimoAviso = localStorage.getItem('rodaSabor_ultimoAvisoGoogle');
    if (!ultimoAviso || (AGORA - parseInt(ultimoAviso)) > VINTE_QUATRO_HORAS) {
        setTimeout(() => {
            const modalGoogle = document.getElementById('googleReminderModal');
            if (modalGoogle) {
                modalGoogle.style.display = 'flex';
                localStorage.setItem('rodaSabor_ultimoAvisoGoogle', AGORA.toString());
            }
        }, 2000);
    }
};

checarAvisoDiarioGoogle();

document.getElementById('btnGoogleModalLogin')?.addEventListener('click', function() {
    document.getElementById('googleReminderModal').style.display = 'none';
    if (typeof window.conectarGoogle === 'function') {
        window.conectarGoogle();
    }
});

document.getElementById('btnGoogleModalClose')?.addEventListener('click', function() {
    document.getElementById('googleReminderModal').style.display = 'none';
});
