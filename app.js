'use strict';
console.log('app.js carregado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM pronto, iniciando app...');

    // ========================== BANCO DE COMIDAS (70 itens) ==========================
    const BANCO_DE_COMIDAS = [
        { nome: 'Pizza', icone: '🍕' },
        { nome: 'Hambúrguer', icone: '🍔' },
        { nome: 'Sushi', icone: '🍣' },
        { nome: 'Sorvete', icone: '🍦' },
        { nome: 'Taco', icone: '🌮' },
        { nome: 'Burrito', icone: '🌯' },
        { nome: 'Salada', icone: '🥗' },
        { nome: 'Frango Assado', icone: '🍗' },
        { nome: 'Espaguete', icone: '🍝' },
        { nome: 'Bolo', icone: '🍰' },
        { nome: 'Rosquinha', icone: '🍩' },
        { nome: 'Pipoca', icone: '🍿' },
        { nome: 'Batata Frita', icone: '🍟' },
        { nome: 'Cachorro Quente', icone: '🌭' },
        { nome: 'Lasanha', icone: '🍛' },
        { nome: 'Sopa Quente', icone: '🍜' },
        { nome: 'Arroz e Feijão', icone: '🍲' },
        { nome: 'Churrasco', icone: '🥩' },
        { nome: 'Camarão', icone: '🍤' },
        { nome: 'Panqueca', icone: '🥞' },
        { nome: 'Sanduíche', icone: '🥪' },
        { nome: 'Omelete', icone: '🍳' },
        { nome: 'Ovo Frito', icone: '🍳' },
        { nome: 'Macarrão', icone: '🍝' },
        { nome: 'Feijoada', icone: '🍲' },
        { nome: 'Virado à Paulista', icone: '🍛' },
        { nome: 'Pão de Queijo', icone: '🧀' },
        { nome: 'Coxinha', icone: '🍗' },
        { nome: 'Pastel', icone: '🥟' },
        { nome: 'Empada', icone: '🥧' },
        { nome: 'Quibe', icone: '🥙' },
        { nome: 'Esfiha', icone: '🥙' },
        { nome: 'Shawarma', icone: '🌯' },
        { nome: 'Kebab', icone: '🥙' },
        { nome: 'Falafel', icone: '🧆' },
        { nome: 'Hummus', icone: '🥣' },
        { nome: 'Tabule', icone: '🥗' },
        { nome: 'Ceviche', icone: '🐟' },
        { nome: 'Tiradito', icone: '🐟' },
        { nome: 'Lomo Saltado', icone: '🥩' },
        { nome: 'Arroz Chaufa', icone: '🍚' },
        { nome: 'Cuscuz', icone: '🥣' },
        { nome: 'Tapioca', icone: '🫓' },
        { nome: 'Crepe', icone: '🥞' },
        { nome: 'Fondue', icone: '🫕' },
        { nome: 'Raclette', icone: '🧀' },
        { nome: 'Pierogi', icone: '🥟' },
        { nome: 'Dumpling', icone: '🥟' },
        { nome: 'Ramen', icone: '🍜' },
        { nome: 'Udon', icone: '🍜' },
        { nome: 'Tempura', icone: '🍤' },
        { nome: 'Yakitori', icone: '🍢' },
        { nome: 'Gyoza', icone: '🥟' },
        { nome: 'Onigiri', icone: '🍙' },
        { nome: 'Mochi', icone: '🍡' },
        { nome: 'Dango', icone: '🍡' },
        { nome: 'Takoyaki', icone: '🍢' },
        { nome: 'Okonomiyaki', icone: '🥞' },
        { nome: 'Bibimbap', icone: '🍚' },
        { nome: 'Kimchi', icone: '🥬' },
        { nome: 'Bulgogi', icone: '🥩' },
        { nome: 'Banh Mi', icone: '🥖' },
        { nome: 'Pho', icone: '🍜' },
        { nome: 'Spring Roll', icone: '🥙' },
        { nome: 'Pad Thai', icone: '🍜' },
        { nome: 'Tom Yum', icone: '🥘' },
        { nome: 'Green Curry', icone: '🍛' },
        { nome: 'Massaman Curry', icone: '🍛' },
        { nome: 'Nasi Goreng', icone: '🍚' },
        { nome: 'Mie Goreng', icone: '🍝' }
    ];

    // ========================== RECEITAS (com link) ==========================
    // Função auxiliar para gerar slug a partir do nome
    function slugify(text) {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const RECEITAS = [
        {
            id: 'rec-1',
            nome: 'Pizza Caseira',
            icone: '🍕',
            ingredientes: ['Farinha', 'Água', 'Fermento', 'Molho', 'Queijo'],
            preparo: 'Asse a 200°C por 20 min.',
            preco: 0,
            link: 'pizza.html' // link personalizado (opcional, pode ser gerado automaticamente)
        },
        {
            id: 'rec-2',
            nome: 'Hambúrguer Artesanal',
            icone: '🍔',
            ingredientes: ['Carne', 'Pão', 'Queijo', 'Alface', 'Tomate'],
            preparo: 'Grelhe a carne, monte com os acompanhamentos.',
            preco: 0,
            link: 'hamburguer.html'
        },
        {
            id: 'rec-3',
            nome: 'Sushi Maki',
            icone: '🍣',
            ingredientes: ['Arroz', 'Alga Nori', 'Salmão', 'Cream Cheese', 'Gergelim'],
            preparo: 'Enrole no bambu, corte em fatias e sirva com shoyu.',
            preco: 5,
            link: 'sushi.html'
        },
        {
            id: 'rec-4',
            nome: 'Salada Caesar',
            icone: '🥗',
            ingredientes: ['Alface', 'Frango', 'Croutons', 'Parmesão', 'Molho Caesar'],
            preparo: 'Misture todos os ingredientes e sirva frio.',
            preco: 2,
            link: 'salada-caesar.html'
        },
        {
            id: 'rec-5',
            nome: 'Churrasco na Brasa',
            icone: '🥩',
            ingredientes: ['Picanha', 'Sal Grosso', 'Carvão', 'Farofa', 'Vinagrete'],
            preparo: 'Asse a carne na brasa por cerca de 40 min, sirva com farofa.',
            preco: 10,
            link: 'churrasco.html'
        },
        {
            id: 'rec-6',
            nome: 'Feijoada Completa',
            icone: '🍲',
            ingredientes: ['Feijão Preto', 'Carne Seca', 'Linguiça', 'Costela', 'Couve', 'Laranja'],
            preparo: 'Cozinhe as carnes com o feijão por 3h, sirva com couve e laranja.',
            preco: 8,
            link: 'feijoada.html'
        },
        {
            id: 'rec-7',
            nome: 'Ramen Tonkotsu',
            icone: '🍜',
            ingredientes: ['Caldo de Porco', 'Lamen', 'Ovo Cozido', 'Nori', 'Cebolinha'],
            preparo: 'Ferva o caldo, cozinhe o lamen, finalize com os acompanhamentos.',
            preco: 6,
            link: 'ramen.html'
        },
        {
            id: 'rec-8',
            nome: 'Tacos Mexicanos',
            icone: '🌮',
            ingredientes: ['Tortilha', 'Carne Moída', 'Alface', 'Tomate', 'Queijo', 'Molho Picante'],
            preparo: 'Aqueça as tortilhas, recheie com a carne e os vegetais.',
            preco: 4,
            link: 'tacos.html'
        },
        {
            id: 'rec-9',
            nome: 'Lasanha à Bolonhesa',
            icone: '🍛',
            ingredientes: ['Massa de Lasanha', 'Molho Bolonhesa', 'Bechamel', 'Queijo Mussarela', 'Parmesão'],
            preparo: 'Monte camadas e asse a 180°C por 40 min.',
            preco: 7,
            link: 'lasanha.html'
        },
        {
            id: 'rec-10',
            nome: 'Ceviche Peruano',
            icone: '🐟',
            ingredientes: ['Peixe Branco', 'Limão', 'Cebola Roxa', 'Coentro', 'Batata Doce'],
            preparo: 'Corte o peixe em cubos, tempere com limão e sal, adicione os acompanhamentos.',
            preco: 5,
            link: 'ceviche.html'
        },
        {
            id: 'rec-11',
            nome: 'Pão de Queijo Mineiro',
            icone: '🧀',
            ingredientes: ['Polvilho', 'Queijo', 'Leite', 'Óleo', 'Ovos'],
            preparo: 'Misture todos os ingredientes, modele bolinhas e asse a 180°C por 25 min.',
            preco: 2,
            link: 'pao-de-queijo.html'
        },
        {
            id: 'rec-12',
            nome: 'Sorvete Caseiro de Chocolate',
            icone: '🍦',
            ingredientes: ['Leite Condensado', 'Creme de Leite', 'Chocolate em Pó', 'Essência de Baunilha'],
            preparo: 'Bata todos os ingredientes no liquidificador e leve ao congelador por 4h.',
            preco: 3,
            link: 'sorvete.html'
        }
    ];

    // Se algum link não foi definido manualmente, geramos automaticamente
    RECEITAS.forEach(rec => {
        if (!rec.link) {
            rec.link = slugify(rec.nome) + '.html';
        }
    });

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
    // Os modais de receita não são mais usados, mas mantidos para compatibilidade
    const recipeModal = document.getElementById('recipeModal');
    const btnCloseRecipeModal = document.getElementById('btnCloseRecipeModal');
    const recipeModalTitle = document.getElementById('recipeModalTitle');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const recipeInstructions = document.getElementById('recipeInstructions');

    // Novos elementos para comida personalizada
    const btnAddCustomFood = document.getElementById('btnAddCustomFood');
    const newFoodName = document.getElementById('newFoodName');
    const newFoodEmoji = document.getElementById('newFoodEmoji');

    // Botão de instalação PWA
    const installAppBtn = document.getElementById('installAppBtn');

    let comidasSelecionadasTemporarias = [];

    // ========================== INICIALIZAÇÃO DO STATE ==========================
    if (typeof state === 'undefined') {
        window.state = {
            foods: [],
            coins: 0,
            darkMode: false,
            unlockedPageThemes: [],
            currentPageTheme: 'default',
            unlockedRouletteThemes: [],
            currentRouletteTheme: 'default',
            unlockedSpinSounds: [],
            currentSpinSound: 'default',
            unlockedWinSounds: [],
            currentWinSound: 'default',
            unlockedRecipes: [],
            customFoods: []
        };
    }
    if (!state.unlockedRecipes) {
        state.unlockedRecipes = [];
    }
    if (!state.customFoods) {
        state.customFoods = [];
    }
    // Desbloqueia receitas com preço 0 automaticamente
    RECEITAS.forEach(rec => {
        if (rec.preco === 0 && !state.unlockedRecipes.includes(rec.id)) {
            state.unlockedRecipes.push(rec.id);
        }
    });

    // ========================== FUNÇÕES AUXILIARES ==========================
    if (typeof saveToStorage !== 'function') {
        window.saveToStorage = function() {
            try {
                localStorage.setItem('appState', JSON.stringify(state));
            } catch (e) {}
        };
    }
    if (typeof loadFromStorage !== 'function') {
        window.loadFromStorage = function() {
            try {
                const data = localStorage.getItem('appState');
                if (data) {
                    const parsed = JSON.parse(data);
                    Object.assign(state, parsed);
                }
            } catch (e) {}
        };
    }
    if (typeof applyThemes !== 'function') {
        window.applyThemes = function() {
            // stub
        };
    }
    if (typeof drawRoulette !== 'function') {
        window.drawRoulette = function() {
            // stub
        };
    }
    if (typeof spin !== 'function') {
        window.spin = function() {
            alert('Função spin() não implementada!');
        };
    }
    if (typeof playSynthesizedSound !== 'function') {
        window.playSynthesizedSound = function(type) {
            console.log('Tocar som sintetizado:', type);
        };
    }

    loadFromStorage();

    // ========================== EVENTOS ==========================
    const btnSpinEl = document.getElementById('btnSpin');
    if (btnSpinEl) btnSpinEl.addEventListener('click', spin);

    if (btnModeToggle) {
        btnModeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            applyThemes();
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
        btnCloseFoodModal.addEventListener('click', function() {
            foodSelectionModal.style.display = 'none';
        });
    }

    if (searchFoodInput) {
        searchFoodInput.addEventListener('input', function(e) {
            renderModalFoodOptions(e.target.value);
        });
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

    // Fechar modal de receita (se ainda existir)
    if (btnCloseRecipeModal) {
        btnCloseRecipeModal.addEventListener('click', () => {
            if (recipeModal) recipeModal.style.display = 'none';
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
            // Cria a string no formato "Nome Emoji"
            const itemString = `${nome} ${emoji}`;
            // Evita duplicatas exatas
            if (!state.customFoods.some(f => f === itemString)) {
                state.customFoods.push(itemString);
                saveToStorage();
                // Atualiza o modal
                renderModalFoodOptions(searchFoodInput ? searchFoodInput.value : '');
                // Limpa os campos
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
        drawRoulette();
    }
    window.removeFood = function(idx) {
        state.foods.splice(idx, 1);
        saveToStorage();
        renderFoodList();
    };

    // Função renderModalFoodOptions modificada para incluir comidas personalizadas
    function renderModalFoodOptions(filterText = '') {
        if (!modalFoodOptionsGrid) return;
        modalFoodOptionsGrid.innerHTML = '';

        // Monta lista completa: banco fixo + personalizadas
        const allItems = [...BANCO_DE_COMIDAS];
        if (state.customFoods) {
            state.customFoods.forEach(custom => {
                // Tenta extrair ícone (se houver)
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

    // ---- Temas (mantido igual) ----
    function renderThemes() {
        const pageGrid = document.getElementById('pageThemesGrid');
        const rouletteGrid = document.getElementById('rouletteThemesGrid');
        if (!pageGrid || !rouletteGrid) return;
        pageGrid.innerHTML = '';
        rouletteGrid.innerHTML = '';
        if (typeof listTemas === 'undefined') window.listTemas = [];
        listTemas.forEach(tema => {
            const coresPreview = tema.light.colors.slice(0, 4)
                .map(c => `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`)
                .join('');
            const isPageUnlocked = state.unlockedPageThemes.includes(tema.id);
            const isPageActive = state.currentPageTheme === tema.id;
            const pageCard = document.createElement('div');
            pageCard.className = `item-card ${isPageActive ? 'active' : ''}`;
            let btnPageHTML = isPageActive
                ? `<button class="btn-action btn-active">Ativo</button>`
                : isPageUnlocked
                    ? `<button class="btn-action btn-use" onclick="usePageTheme('${tema.id}')">Usar</button>`
                    : `<button class="btn-action btn-buy" onclick="buyPageTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            pageCard.innerHTML = `
                <div class="item-info">
                    <h4>${tema.name}</h4>
                    <p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p>
                    <div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div>
                </div>
                ${btnPageHTML}
            `;
            pageGrid.appendChild(pageCard);

            const isRouletteUnlocked = state.unlockedRouletteThemes.includes(tema.id);
            const isRouletteActive = state.currentRouletteTheme === tema.id;
            const rouletteCard = document.createElement('div');
            rouletteCard.className = `item-card ${isRouletteActive ? 'active' : ''}`;
            let btnRouletteHTML = isRouletteActive
                ? `<button class="btn-action btn-active">Ativo</button>`
                : isRouletteUnlocked
                    ? `<button class="btn-action btn-use" onclick="useRouletteTheme('${tema.id}')">Usar</button>`
                    : `<button class="btn-action btn-buy" onclick="buyRouletteTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            rouletteCard.innerHTML = `
                <div class="item-info">
                    <h4>${tema.name}</h4>
                    <p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p>
                    <div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div>
                </div>
                ${btnRouletteHTML}
            `;
            rouletteGrid.appendChild(rouletteCard);
        });
    }

    window.buyPageTheme = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedPageThemes.push(id);
            usePageTheme(id);
            updateCoinsDisplay();
        } else {
            alert("Moedas insuficientes!");
        }
    };
    window.usePageTheme = function(id) {
        state.currentPageTheme = id;
        applyThemes();
        renderThemes();
        saveToStorage();
    };
    window.buyRouletteTheme = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedRouletteThemes.push(id);
            useRouletteTheme(id);
            updateCoinsDisplay();
        } else {
            alert("Moedas insuficientes!");
        }
    };
    window.useRouletteTheme = function(id) {
        state.currentRouletteTheme = id;
        applyThemes();
        renderThemes();
        saveToStorage();
    };

    // ---- Sons (mantido igual) ----
    function renderSounds() {
        const spinGrid = document.getElementById('spinSoundsGrid');
        const winGrid = document.getElementById('winSoundsGrid');
        if (!spinGrid || !winGrid) return;
        spinGrid.innerHTML = '';
        if (typeof listSpinSounds === 'undefined') window.listSpinSounds = [];
        listSpinSounds.forEach(sound => {
            const isUnlocked = state.unlockedSpinSounds.includes(sound.id);
            const isActive = state.currentSpinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive
                ? `<button class="btn-action btn-active">Ativo</button>`
                : isUnlocked
                    ? `<button class="btn-action btn-use" onclick="useSpinSound('${sound.id}')">Usar</button>`
                    : `<button class="btn-action btn-buy" onclick="buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `
                <div class="item-info">
                    <h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4>
                    <p>Giro</p>
                </div>
                ${btnHTML}
            `;
            spinGrid.appendChild(card);
        });
        winGrid.innerHTML = '';
        if (typeof listWinSounds === 'undefined') window.listWinSounds = [];
        listWinSounds.forEach(sound => {
            const isUnlocked = state.unlockedWinSounds.includes(sound.id);
            const isActive = state.currentWinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;
            let btnHTML = isActive
                ? `<button class="btn-action btn-active">Ativo</button>`
                : isUnlocked
                    ? `<button class="btn-action btn-use" onclick="useWinSound('${sound.id}')">Usar</button>`
                    : `<button class="btn-action btn-buy" onclick="buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            card.innerHTML = `
                <div class="item-info">
                    <h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4>
                    <p>Vitória</p>
                </div>
                ${btnHTML}
            `;
            winGrid.appendChild(card);
        });
    }

    window.buySpinSound = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedSpinSounds.push(id);
            state.currentSpinSound = id;
            saveToStorage();
            renderSounds();
            updateCoinsDisplay();
        } else {
            alert("Moedas insuficientes!");
        }
    };
    window.useSpinSound = function(id) {
        state.currentSpinSound = id;
        saveToStorage();
        renderSounds();
    };
    window.buyWinSound = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedWinSounds.push(id);
            state.currentWinSound = id;
            saveToStorage();
            renderSounds();
            updateCoinsDisplay();
        } else {
            alert("Moedas insuficientes!");
        }
    };
    window.useWinSound = function(id) {
        state.currentWinSound = id;
        saveToStorage();
        renderSounds();
    };

    // ========================== RECEITAS (com redirecionamento para link) ==========================

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
                openBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Redireciona para o link da receita
                    window.location.href = rec.link;
                });
                action = openBtn;
            } else {
                const buyBtn = document.createElement('button');
                buyBtn.className = 'btn-action btn-buy';
                buyBtn.innerHTML = `<i class="fas fa-coins"></i> ${rec.preco}`;
                buyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    buyRecipe(rec.id, rec.preco);
                });
                action = buyBtn;
            }

            card.appendChild(info);
            card.appendChild(action);
            recipesGrid.appendChild(card);
        });
    }

    // ---- Comprar receita ----
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

    // ---- Atualizar exibição de moedas ----
    function updateCoinsDisplay() {
        const display = document.getElementById('coinDisplay');
        if (display) {
            display.textContent = state.coins;
        }
        // Atualiza também o badge do header (coin-balance)
        const coinBalance = document.getElementById('coin-balance');
        if (coinBalance) coinBalance.textContent = state.coins;
    }

    // ========================== PWA - INSTALAÇÃO ==========================
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installAppBtn) {
            installAppBtn.style.display = 'flex';
        }
    });

    if (installAppBtn) {
        installAppBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('App instalado com sucesso');
                }
                deferredPrompt = null;
                installAppBtn.style.display = 'none';
            }
        });
    }

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registrado com sucesso'))
            .catch(err => console.warn('Falha ao registrar SW', err));
    }

    // ========================== INICIALIZAÇÃO FINAL ==========================
    renderFoodList();
    renderThemes();
    renderSounds();
    renderRecipes();
    applyThemes();
    updateCoinsDisplay();

    // Expor funções globalmente
    window.openRecipeModal = function(id) {
        // Não usamos mais modal, redirecionamos diretamente
        const rec = RECEITAS.find(r => r.id === id);
        if (!rec) return;
        if (!state.unlockedRecipes.includes(id)) {
            alert("Esta receita está bloqueada. Compre-a na loja de receitas!");
            return;
        }
        window.location.href = rec.link;
    };
    window.buyRecipe = buyRecipe;

    console.log('App inicializado com sucesso!');
});
