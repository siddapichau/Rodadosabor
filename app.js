// ============================================================
// app.js â€“ Interface, loja, modais, interaÃ§Ãµes
// ============================================================
'use strict';

console.log('app.js carregado');

// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM pronto, iniciando app...');

    // --- BANCO DE COMIDAS (70+) ---
    const BANCO_DE_COMIDAS = [
        { nome: 'Pizza', icone: 'ðŸ•' }, { nome: 'HambÃºrguer', icone: 'ðŸ”' },
        { nome: 'Sushi', icone: 'ðŸ£' }, { nome: 'Sorvete', icone: 'ðŸ¦' },
        { nome: 'Taco', icone: 'ðŸŒ®' }, { nome: 'Burrito', icone: 'ðŸŒ¯' },
        { nome: 'Salada', icone: 'ðŸ¥—' }, { nome: 'Frango Assado', icone: 'ðŸ—' },
        { nome: 'Espaguete', icone: 'ðŸ' }, { nome: 'Bolo', icone: 'ðŸ°' },
        { nome: 'Rosquinha', icone: 'ðŸ©' }, { nome: 'Pipoca', icone: 'ðŸ¿' },
        { nome: 'Batata Frita', icone: 'ðŸŸ' }, { nome: 'Cachorro Quente', icone: 'ðŸŒ­' },
        { nome: 'Lasanha', icone: 'ðŸ›' }, { nome: 'Sopa Quente', icone: 'ðŸœ' },
        { nome: 'Arroz e FeijÃ£o', icone: 'ðŸ²' }, { nome: 'Churrasco', icone: 'ðŸ¥©' },
        { nome: 'CamarÃ£o', icone: 'ðŸ¤' }, { nome: 'Panqueca', icone: 'ðŸ¥ž' },
        { nome: 'SanduÃ­che', icone: 'ðŸ¥ª' }, { nome: 'Omelete', icone: 'ðŸ³' },
        { nome: 'Peixe Grelhado', icone: 'ðŸŸ' }, { nome: 'Costela', icone: 'ðŸ–' },
        { nome: 'Risoto', icone: 'ðŸš' }, { nome: 'Polenta', icone: 'ðŸŒ½' },
        { nome: 'Quiche', icone: 'ðŸ¥§' }, { nome: 'Nhoque', icone: 'ðŸ¥Ÿ' },
        { nome: 'Empada', icone: 'ðŸ¥®' }, { nome: 'PÃ£o de Queijo', icone: 'ðŸ§€' },
        { nome: 'Coxinha', icone: 'ðŸ—' }, { nome: 'Pastel', icone: 'ðŸ¥Ÿ' },
        { nome: 'AÃ§aÃ­', icone: 'ðŸ«' }, { nome: 'Frutas', icone: 'ðŸ‡' },
        { nome: 'Smoothie', icone: 'ðŸ¥¤' }, { nome: 'CafÃ© da ManhÃ£', icone: 'ðŸ¥“' },
        { nome: 'Wrap', icone: 'ðŸŒ¯' }, { nome: 'Ceviche', icone: 'ðŸ ' },
        { nome: 'TiramisÃ¹', icone: 'ðŸ°' }, { nome: 'Cheesecake', icone: 'ðŸ°' },
        { nome: 'Brownie', icone: 'ðŸ«' }, { nome: 'Cookie', icone: 'ðŸª' },
        { nome: 'Milkshake', icone: 'ðŸ¥›' }, { nome: 'Refrigerante', icone: 'ðŸ¥¤' },
        { nome: 'Ãgua de Coco', icone: 'ðŸ¥¥' }, { nome: 'ChÃ¡ Gelado', icone: 'ðŸµ' },
        { nome: 'Pudim', icone: 'ðŸ®' }, { nome: 'Mousse', icone: 'ðŸ®' },
        { nome: 'Torta de LimÃ£o', icone: 'ðŸ¥§' }, { nome: 'PavÃª', icone: 'ðŸ°' },
        { nome: 'Feijoada', icone: 'ðŸ²' }, { nome: 'BaiÃ£o de Dois', icone: 'ðŸš' },
        { nome: 'AcarajÃ©', icone: 'ðŸ«“' }, { nome: 'VatapÃ¡', icone: 'ðŸ›' },
        { nome: 'Moqueca', icone: 'ðŸŸ' }, { nome: 'BobÃ³ de CamarÃ£o', icone: 'ðŸ¤' },
        { nome: 'Carne de Sol', icone: 'ðŸ¥©' }, { nome: 'Buchada', icone: 'ðŸ–' },
        { nome: 'Sarapatel', icone: 'ðŸ¥˜' }, { nome: 'Tapioca', icone: 'ðŸ«“' },
        { nome: 'Beiju', icone: 'ðŸ¥ž' }, { nome: 'Cuscuz', icone: 'ðŸŒ¾' },
        { nome: 'Canjica', icone: 'ðŸŒ½' }, { nome: 'Pamonha', icone: 'ðŸŒ½' },
        { nome: 'QuentÃ£o', icone: 'ðŸ·' }, { nome: 'Caldo de Cana', icone: 'ðŸ¥¤' }
    ];

    // --- RECEITAS (10 completas) ---
    const RECEITAS = [
        {
            id: 'rec-1',
            nome: 'Pizza Caseira',
            icone: 'ðŸ•',
            ingredientes: ['Farinha (500g)', 'Ãgua morna (300ml)', 'Fermento (10g)', 'Sal (1 colher)', 'Azeite (2 colheres)', 'Molho de tomate', 'Queijo mussarela', 'Presunto', 'OrÃ©gano'],
            preparo: '1. Misture a farinha, sal, fermento e Ã¡gua. Sove atÃ© homogeneizar. Deixe descansar 1h.\n2. Abra a massa, coloque em uma forma, espalhe o molho, adicione os ingredientes e leve ao forno a 200Â°C por 20 min.'
        },
        {
            id: 'rec-2',
            nome: 'HambÃºrguer Artesanal',
            icone: 'ðŸ”',
            ingredientes: ['Carne moÃ­da (500g)', 'Cebola picada', 'Alho', 'PÃ£o de hambÃºrguer', 'Alface', 'Tomate', 'Queijo cheddar', 'Maionese', 'Ketchup'],
            preparo: '1. Tempere a carne com cebola, alho e sal. Modele os hambÃºrgueres.\n2. Grelhe em fogo alto atÃ© o ponto desejado.\n3. Monte com pÃ£o, alface, tomate, queijo e molhos.'
        },
        {
            id: 'rec-3',
            nome: 'Tacos Mexicanos',
            icone: 'ðŸŒ®',
            ingredientes: ['Tortilhas de milho', 'Carne moÃ­da', 'Pimenta', 'Cebola', 'Coentro', 'LimÃ£o', 'Queijo', 'Guacamole'],
            preparo: '1. Refogue a carne com cebola e pimenta.\n2. AqueÃ§a as tortilhas.\n3. Recheie com a carne, queijo, guacamole e finalize com coentro e limÃ£o.'
        },
        {
            id: 'rec-4',
            nome: 'Sushi Especial',
            icone: 'ðŸ£',
            ingredientes: ['Arroz prÃ³prio', 'Alga nori', 'SalmÃ£o', 'Atum', 'Pepino', 'Cream cheese', 'Shoyu', 'Gengibre'],
            preparo: '1. Cozinhe o arroz e tempere com vinagre, aÃ§Ãºcar e sal.\n2. Coloque a alga na esteira, espalhe o arroz, adicione os recheios e enrole.\n3. Corte em fatias e sirva com shoyu e gengibre.'
        },
        {
            id: 'rec-5',
            nome: 'Bolo de Morango',
            icone: 'ðŸ°',
            ingredientes: ['Farinha (2 xÃ­caras)', 'AÃ§Ãºcar (2 xÃ­caras)', 'Ovos (3)', 'Leite (1 xÃ­cara)', 'Manteiga (1 colher)', 'Fermento (1 colher)', 'Morangos', 'Creme de leite'],
            preparo: '1. Bata a manteiga com o aÃ§Ãºcar, adicione os ovos, a farinha e o leite. Por fim, o fermento.\n2. Asse em forno 180Â°C por 35 min.\n3. Recheie e cubra com morangos e creme.'
        },
        {
            id: 'rec-6',
            nome: 'Lasanha Ã  Bolonhesa',
            icone: 'ðŸ',
            ingredientes: ['Massa para lasanha', 'Carne moÃ­da (500g)', 'Molho de tomate', 'Cebola', 'Alho', 'Queijo parmesÃ£o', 'Queijo mussarela', 'Leite', 'Manteiga'],
            preparo: '1. Refogue a carne com cebola e alho, acrescente o molho e cozinhe.\n2. Em uma forma, alterne camadas de massa, molho e queijos.\n3. Leve ao forno a 200Â°C por 30 min.'
        },
        {
            id: 'rec-7',
            nome: 'Salada Caesar',
            icone: 'ðŸ¥—',
            ingredientes: ['Alface americana', 'Frango desfiado', 'Croutons', 'Queijo parmesÃ£o', 'Molho Caesar', 'LimÃ£o'],
            preparo: '1. Lave e seque a alface.\n2. Misture com o frango, croutons e queijo.\n3. Regue com o molho Caesar e sirva.'
        },
        {
            id: 'rec-8',
            nome: 'Churrasco de Picanha',
            icone: 'ðŸ¥©',
            ingredientes: ['Picanha (1kg)', 'Sal grosso', 'CarvÃ£o', 'Alho', 'Limonada'],
            preparo: '1. Tempere a picanha com sal grosso e alho.\n2. Asse na churrasqueira atÃ© o ponto desejado (selar a gordura).\n3. Sirva com arroz, farofa e vinagrete.'
        },
        {
            id: 'rec-9',
            nome: 'Risoto de CamarÃ£o',
            icone: 'ðŸ›',
            ingredientes: ['Arroz arbÃ³reo (2 xÃ­caras)', 'CamarÃ£o (300g)', 'Cebola', 'Alho', 'Vinho branco', 'Caldo de legumes', 'ParmesÃ£o', 'Salsinha'],
            preparo: '1. Refogue cebola e alho, adicione o arroz e refogue.\n2. Adicione o vinho e, aos poucos, o caldo, mexendo sempre.\n3. Quando estiver al dente, acrescente o camarÃ£o e o parmesÃ£o.'
        },
        {
            id: 'rec-10',
            nome: 'Sopa de Legumes',
            icone: 'ðŸœ',
            ingredientes: ['Cenoura', 'Batata', 'Abobrinha', 'Cebola', 'Alho', 'Caldo de carne', 'Creme de leite', 'Salsinha'],
            preparo: '1. Cozinhe os legumes com caldo de carne atÃ© ficarem macios.\n2. Bata no liquidificador atÃ© ficar cremoso.\n3. Volte ao fogo, adicione creme de leite e finalize com salsinha.'
        }
    ];

    // --- ELEMENTOS DA INTERFACE ---
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

    // --- VERIFICAÃ‡ÃƒO DE ELEMENTOS ---
    console.log('Elementos encontrados:', {
        btnOpenFoodModal: !!btnOpenFoodModal,
        btnWatchAd: !!btnWatchAd,
        btnSpin: !!document.getElementById('btnSpin'),
        canvas: !!document.getElementById('rouletteCanvas'),
        foodList: !!document.getElementById('foodListContainer'),
        themesGrid: !!document.getElementById('themesGrid')
    });

    // --- ANÃšNCIO RECOMPENSADO ---
    if (btnWatchAd) {
        btnWatchAd.addEventListener('click', function() {
            let secondsLeft = 20;
            adCountdown.textContent = secondsLeft;
            adFrame.src = "https://example.com"; // substitua pelo link do anÃºncio
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
                    alert("ðŸŽ‰ VocÃª ganhou 3 moedas! Use na loja de temas e sons.");
                }
            }, 1000);
        });
    }

    // --- SELEÃ‡ÃƒO DE COMIDAS (MODAL) ---
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

    function renderModalFoodOptions(filterText = '') {
        if (!modalFoodOptionsGrid) return;
        modalFoodOptionsGrid.innerHTML = '';
        const filtradas = BANCO_DE_COMIDAS.filter(item =>
            item.nome.toLowerCase().includes(filterText.toLowerCase())
        );

        filtradas.forEach(item => {
            const itemString = `${item.nome} ${item.icone}`;
            const card = document.createElement('div');
            card.className = 'food-option-card';
            const isSelected = comidasSelecionadasTemporarias.includes(itemString);
            if (isSelected) card.classList.add('selected');

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

    if (searchFoodInput) {
        searchFoodInput.addEventListener('input', function(e) {
            renderModalFoodOptions(e.target.value);
        });
    }

    if (btnSaveFoodSelection) {
        btnSaveFoodSelection.addEventListener('click', function() {
            if (comidasSelecionadasTemporarias.length < 2) {
                alert("Selecione pelo menos 2 comidas para girar a roleta!");
                return;
            }
            state.foods = [...comidasSelecionadasTemporarias];
            saveToStorage();
            renderFoodList();
            foodSelectionModal.style.display = 'none';
        });
    }

    // --- RENDERIZAÃ‡ÃƒO DA LISTA DE COMIDAS ---
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

    // --- RENDERIZAÃ‡ÃƒO DOS TEMAS ---
    function renderThemes() {
        const grid = document.getElementById('themesGrid');
        if (!grid) return;
        grid.innerHTML = '';
        listTemas.forEach(tema => {
            const isUnlocked = state.unlockedThemes.includes(tema.id);
            const isActive = state.currentTheme === tema.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;

            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
            } else if (isUnlocked) {
                btnHTML = `<button class="btn-action btn-use" onclick="useTheme('${tema.id}')">Usar</button>`;
            } else {
                btnHTML = `<button class="btn-action btn-buy" onclick="buyTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
            }

            const coresPreview = tema.light.colors.slice(0, 4).map(c =>
                `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`
            ).join('');

            card.innerHTML = `
                <div class="item-info">
                    <h4>${tema.name}</h4>
                    <p>${tema.price === 0 ? 'GrÃ¡tis' : `${tema.price} moedas`}</p>
                    <div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div>
                </div>
                ${btnHTML}
            `;
            grid.appendChild(card);
        });
    }

    window.buyTheme = function(id, price) {
        if (state.coins >= price) {
            state.coins -= price;
            state.unlockedThemes.push(id);
            applyTheme(id, state.darkMode);
            saveToStorage();
            renderThemes();
            drawRoulette();
        } else {
            alert("Moedas insuficientes! Assista a anÃºncios para ganhar mais.");
        }
    };

    window.useTheme = function(id) {
        applyTheme(id, state.darkMode);
        saveToStorage();
        renderThemes();
        drawRoulette();
    };

    // --- RENDERIZAÃ‡ÃƒO DOS SONS ---
    function renderSounds() {
        const spinGrid = document.getElementById('spinSoundsGrid');
        const winGrid = document.getElementById('winSoundsGrid');
        if (!spinGrid || !winGrid) return;

        spinGrid.innerHTML = '';
        listSpinSounds.forEach(sound => {
            const isUnlocked = state.unlockedSpinSounds.includes(sound.id);
            const isActive = state.currentSpinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;

            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
            } else if (isUnlocked) {
                btnHTML = `<button class="btn-action btn-use" onclick="useSpinSound('${sound.id}')">Usar</button>`;
            } else {
                btnHTML = `<button class="btn-action btn-buy" onclick="buySpinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            }
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
        listWinSounds.forEach(sound => {
            const isUnlocked = state.unlockedWinSounds.includes(sound.id);
            const isActive = state.currentWinSound === sound.id;
            const card = document.createElement('div');
            card.className = `item-card ${isActive ? 'active' : ''}`;

            let btnHTML = '';
            if (isActive) {
                btnHTML = `<button class="btn-action btn-active">Ativo</button>`;
            } else if (isUnlocked) {
                btnHTML = `<button class="btn-action btn-use" onclick="useWinSound('${sound.id}')">Usar</button>`;
            } else {
                btnHTML = `<button class="btn-action btn-buy" onclick="buyWinSound('${sound.id}', ${sound.price})"><i class="fas fa-coins"></i> ${sound.price}</button>`;
            }
            card.innerHTML = `
                <div class="item-info">
                    <h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:var(--accent);" onclick="playSynthesizedSound('${sound.type}')"></i></h4>
                    <p>VitÃ³ria</p>
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
        } else {
            alert("Moedas insuficientes!");
        }
    };

    window.useWinSound = function(id) {
        state.currentWinSound = id;
        saveToStorage();
        renderSounds();
    };

    // --- RENDERIZAÃ‡ÃƒO DAS RECEITAS ---
    function renderRecipes() {
        if (!recipesGrid) return;
        recipesGrid.innerHTML = '';
        RECEITAS.forEach(rec => {
            const div = document.createElement('div');
            div.className = 'recipe-link';
            div.innerHTML = `<span class="icon">${rec.icone}</span><span class="name">${rec.nome}</span>`;
            div.addEventListener('click', function() { openRecipeModal(rec.id); });
            recipesGrid.appendChild(div);
        });
    }

    function openRecipeModal(id) {
        const rec = RECEITAS.find(r => r.id === id);
        if (!rec) return;
        if (recipeModalTitle) recipeModalTitle.textContent = `${rec.icone} ${rec.nome}`;
        if (recipeIngredients) recipeIngredients.innerHTML = rec.ingredientes.map(ing => `<li>${ing}</li>`).join('');
        if (recipeInstructions) recipeInstructions.textContent = rec.preparo;
        if (recipeModal) recipeModal.style.display = 'flex';
    }

    if (btnCloseRecipeModal) {
        btnCloseRecipeModal.addEventListener('click', function() {
            recipeModal.style.display = 'none';
        });
    }

    // Fecha modais clicando fora
    document.querySelectorAll('.result-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.style.display = 'none';
        });
    });

    // --- MODO CLARO/ESCURO ---
    function toggleDarkMode() {
        state.darkMode = !state.darkMode;
        applyTheme(state.currentTheme, state.darkMode);
        saveToStorage();
        updateModeButton();
    }

    function updateModeButton() {
        if (btnModeToggle) {
            btnModeToggle.innerHTML = state.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    if (btnModeToggle) {
        btnModeToggle.addEventListener('click', toggleDarkMode);
    }

    // --- EVENTOS DA ROLETA ---
    const btnSpin = document.getElementById('btnSpin');
    if (btnSpin) {
        btnSpin.addEventListener('click', spin);
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', function() {
            resultOverlay.style.display = 'none';
        });
    }

    // --- INICIALIZAÃ‡ÃƒO COMPLETA ---
    function init() {
        console.log('Inicializando app...');
        // Atualizar saldo
        const coinEl = document.getElementById('coin-balance');
        if (coinEl) coinEl.textContent = state.coins;

        // Aplicar tema
        applyTheme(state.currentTheme, state.darkMode);
        updateModeButton();

        // Renderizar tudo
        renderFoodList();
        renderThemes();
        renderSounds();
        renderRecipes();

        console.log('App inicializado com sucesso!');
    }

    // Executa
    init();

}); // fim DOMContentLoaded
