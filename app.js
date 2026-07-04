'use strict';
console.log('app.js carregado');

// ========== FUNÇÃO GLOBAL DE ATUALIZAÇÃO DE MOEDAS ==========
window.updateCoinsDisplay = function() {
    const coinBalance = document.getElementById('coin-balance');
    if (coinBalance) coinBalance.textContent = window.appState.coins;
};

document.addEventListener('DOMContentLoaded', function() {
    let comidasSelecionadasTemporarias = [];

    // ---------- BOTÃO GIRO ----------
    const btnSpinEl = document.getElementById('btnSpin');
    if (btnSpinEl) btnSpinEl.addEventListener('click', window.spinRoulette);

    // ---------- MODO CLARO/ESCURO ----------
    const btnModeToggle = document.getElementById('btnModeToggle');
    if (btnModeToggle) {
        btnModeToggle.addEventListener('click', () => {
            window.appState.darkMode = !window.appState.darkMode;
            window.applyThemes();
        });
    }

    // ---------- ANÚNCIO (com cancelamento seguro) ----------
    const btnWatchAd = document.getElementById('btnWatchAd');
    if (btnWatchAd) {
        btnWatchAd.addEventListener('click', function() {
            const adCountdown = document.getElementById('adCountdown');
            const adOverlay = document.getElementById('adOverlay');
            let secondsLeft = 30;
            adCountdown.textContent = secondsLeft;
            document.getElementById('adFrame').src = "anuncio.html";
            adOverlay.style.display = 'flex';
            
            let adInterval = setInterval(() => {
                secondsLeft--;
                adCountdown.textContent = secondsLeft;
                if (secondsLeft <= 0) {
                    clearInterval(adInterval);
                    adOverlay.style.display = 'none';
                    document.getElementById('adFrame').src = 'about:blank';
                    window.appState.coins += 3;
                    window.saveData();
                    window.updateCoinsDisplay();
                    alert("🎉 Você ganhou 3 moedas! Use na loja.");
                }
            }, 1000);

            // Função para fechar manualmente (cancela o timer)
            const closeAd = () => {
                clearInterval(adInterval);
                adOverlay.style.display = 'none';
                document.getElementById('adFrame').src = 'about:blank';
            };

            // Fecha se clicar no backdrop
            adOverlay.addEventListener('click', function handler(e) {
                if (e.target === adOverlay) {
                    closeAd();
                    adOverlay.removeEventListener('click', handler);
                }
            });

            // Guarda referência para uso futuro (ex: fechar via tecla ESC)
            adOverlay._closeAd = closeAd;
        });
    }

    // ---------- MODAL DE SELEÇÃO DE COMIDAS ----------
    const foodModal = document.getElementById('foodSelectionModal');
    document.getElementById('btnOpenFoodModal')?.addEventListener('click', () => {
        comidasSelecionadasTemporarias = [...window.appState.foods];
        foodModal.style.display = 'flex';
        renderModalFoodOptions();
    });

    document.getElementById('btnCloseFoodModal')?.addEventListener('click', () => {
        foodModal.style.display = 'none';
    });

    // Fecha o modal de comidas se clicar no fundo
    foodModal?.addEventListener('click', function(e) {
        if (e.target === foodModal) {
            foodModal.style.display = 'none';
        }
    });

    document.getElementById('searchFoodInput')?.addEventListener('input', e => {
        renderModalFoodOptions(e.target.value);
    });

    document.getElementById('btnSaveFoodSelection')?.addEventListener('click', () => {
        const count = comidasSelecionadasTemporarias.length;
        if (count < 2) {
            alert("Selecione pelo menos 2 comidas!"); return;
        }
        if (count > 6) {
            alert("Máximo permitido é 6 comidas na roleta!"); return;
        }
        window.appState.foods = [...comidasSelecionadasTemporarias];
        window.saveData();
        renderFoodList();
        foodModal.style.display = 'none';
    });

    // ---------- MODAL DE RESULTADO ----------
    const resultOverlay = document.getElementById('resultOverlay');
    document.getElementById('btnCloseModal')?.addEventListener('click', () => {
        resultOverlay.style.display = 'none';
    });

    // Fecha o resultado se clicar no fundo
    resultOverlay?.addEventListener('click', function(e) {
        if (e.target === resultOverlay) {
            resultOverlay.style.display = 'none';
        }
    });

    // ---------- ADIÇÃO DE COMIDA PERSONALIZADA ----------
    const emojiInput = document.getElementById('newFoodEmoji');
    if (emojiInput) {
        emojiInput.placeholder = '🍽️ (ou digite outro)';
    }

    document.getElementById('btnAddCustomFood')?.addEventListener('click', () => {
        const nome = document.getElementById('newFoodName').value.trim();
        const emoji = emojiInput.value.trim() || '🍽️';
        if (!nome) { alert('Digite o nome da comida.'); return; }
        
        const itemString = `${nome} ${emoji}`;
        if (!window.appState.customFoods.some(f => f === itemString)) {
            window.appState.customFoods.push(itemString);
            window.saveData();
            renderModalFoodOptions(document.getElementById('searchFoodInput')?.value || '');
            document.getElementById('newFoodName').value = '';
            emojiInput.value = '';
        } else {
            alert('Esta comida já foi adicionada.');
        }
    });

    // ---------- RENDERIZAÇÃO DA LISTA DE COMIDAS ----------
    function renderFoodList() {
        const container = document.getElementById('foodListContainer');
        if (!container) return;
        container.innerHTML = '';
        window.appState.foods.forEach((food, idx) => {
            const tag = document.createElement('div');
            tag.className = 'food-tag';
            tag.innerHTML = `${food} <i class="fas fa-times" onclick="removeFood(${idx})"></i>`;
            container.appendChild(tag);
        });
        window.drawRoulette();
    }
    
    window.removeFood = function(idx) {
        window.appState.foods.splice(idx, 1);
        window.saveData();
        renderFoodList();
    };

    // ---------- RENDERIZAÇÃO DO MODAL DE COMIDAS ----------
    function renderModalFoodOptions(filterText = '') {
        const modalGrid = document.getElementById('modalFoodOptionsGrid');
        if (!modalGrid) return;
        modalGrid.innerHTML = '';

        const allItems = [...(window.BANCO_DE_COMIDAS || [])];
        window.appState.customFoods.forEach(custom => {
            const match = custom.match(/\p{Emoji}/u);
            if (match) {
                const nome = custom.replace(/\p{Emoji}/u, '').trim();
                allItems.push({ nome: nome, icone: match[0] });
            } else {
                allItems.push({ nome: custom, icone: '🍽️' });
            }
        });

        const filtradas = allItems.filter(item => item.nome.toLowerCase().includes(filterText.toLowerCase()));

        filtradas.forEach(item => {
            const itemString = `${item.nome} ${item.icone}`;
            const card = document.createElement('div');
            card.className = 'food-option-card';
            if (comidasSelecionadasTemporarias.includes(itemString)) card.classList.add('selected');
            
            card.innerHTML = `<span>${item.icone}</span> ${item.nome}`;
            card.addEventListener('click', () => {
                const idx = comidasSelecionadasTemporarias.indexOf(itemString);
                if (idx > -1) {
                    comidasSelecionadasTemporarias.splice(idx, 1);
                    card.classList.remove('selected');
                } else {
                    if (comidasSelecionadasTemporarias.length >= 6) {
                        alert("Máximo de 6 itens permitidos na roleta!");
                        return;
                    }
                    comidasSelecionadasTemporarias.push(itemString);
                    card.classList.add('selected');
                }
            });
            modalGrid.appendChild(card);
        });
    }

    // ---------- LOJA DE SONS ----------
    function renderSounds() {
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
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useSpinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
            spinGrid.appendChild(card);
        });

        (window.SONS_FIM || []).forEach(sound => {
            const isUnlocked = window.appState.unlockedEndSounds.includes(sound.id);
            const isActive = window.appState.currentEndSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useEndSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyEndSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
            endGrid.appendChild(card);
        });

        (window.SONS_VITORIA || []).forEach(sound => {
            const isUnlocked = window.appState.unlockedWinSounds.includes(sound.id);
            const isActive = window.appState.currentWinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive ? `<button class="btn-action btn-active">Ativo</button>` : isUnlocked ? `<button class="btn-action btn-use" onclick="useWinSound('${sound.id}')">Usar</button>` : `<button class="btn-action btn-buy" onclick="buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4></div>${btnHTML}`;
            winGrid.appendChild(card);
        });
    }

    window.buySpinSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedSpinSounds.push(id); window.useSpinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
    window.useSpinSound = (id) => { window.appState.currentSpinSound = id; window.saveData(); renderSounds(); };
    
    window.buyEndSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedEndSounds.push(id); window.useEndSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
    window.useEndSound = (id) => { window.appState.currentEndSound = id; window.saveData(); renderSounds(); };

    window.buyWinSound = (id, price) => { if (window.appState.coins >= price) { window.appState.coins -= price; window.appState.unlockedWinSounds.push(id); window.useWinSound(id); window.updateCoinsDisplay(); } else alert("Moedas insuficientes!"); };
    window.useWinSound = (id) => { window.appState.currentWinSound = id; window.saveData(); renderSounds(); };

    // ---------- LOJA DE RECEITAS ----------
    function renderRecipes() {
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
                        window.saveData(); renderRecipes(); window.updateCoinsDisplay();
                        alert(`🎉 Receita "${rec.nome}" desbloqueada!`);
                    } else alert("Moedas insuficientes!");
                };
            }
            card.appendChild(btn);
            grid.appendChild(card);
        });
    }

    // ---------- PWA ----------
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); deferredPrompt = e;
        const installAppBtn = document.getElementById('installAppBtn');
        if (installAppBtn) installAppBtn.style.display = 'flex';
    });

    document.getElementById('installAppBtn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            document.getElementById('installAppBtn').style.display = 'none';
        }
    });

    // ---------- INICIALIZAÇÃO ----------
    // Receitas gratuitas
    (window.RECEITAS || []).forEach(rec => {
        if (rec.preco === 0 && !window.appState.unlockedRecipes.includes(rec.id)) {
            window.appState.unlockedRecipes.push(rec.id);
        }
    });

    renderFoodList();
    renderThemes();
    renderSounds();
    renderRecipes();
    window.applyThemes();
    window.updateCoinsDisplay();
});