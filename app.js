// ============================================================
// BANCO DE COMIDAS (70+ opções)
// ============================================================
const BANCO_DE_COMIDAS = [
    { nome: 'Pizza', icone: '🍕' }, { nome: 'Hambúrguer', icone: '🍔' },
    { nome: 'Sushi', icone: '🍣' }, { nome: 'Sorvete', icone: '🍦' },
    { nome: 'Taco', icone: '🌮' }, { nome: 'Burrito', icone: '🌯' },
    { nome: 'Salada', icone: '🥗' }, { nome: 'Frango Assado', icone: '🍗' },
    { nome: 'Espaguete', icone: '🍝' }, { nome: 'Bolo', icone: '🍰' },
    { nome: 'Rosquinha', icone: '🍩' }, { nome: 'Pipoca', icone: '🍿' },
    { nome: 'Batata Frita', icone: '🍟' }, { nome: 'Cachorro Quente', icone: '🌭' },
    { nome: 'Lasanha', icone: '🍛' }, { nome: 'Sopa Quente', icone: '🍜' },
    { nome: 'Arroz e Feijão', icone: '🍲' }, { nome: 'Churrasco', icone: '🥩' },
    { nome: 'Camarão', icone: '🍤' }, { nome: 'Panqueca', icone: '🥞' },
    { nome: 'Sanduíche', icone: '🥪' }, { nome: 'Omelete', icone: '🍳' },
    { nome: 'Peixe Grelhado', icone: '🐟' }, { nome: 'Costela', icone: '🍖' },
    { nome: 'Risoto', icone: '🍚' }, { nome: 'Polenta', icone: '🌽' },
    { nome: 'Quiche', icone: '🥧' }, { nome: 'Nhoque', icone: '🥟' },
    { nome: 'Empada', icone: '🥮' }, { nome: 'Pão de Queijo', icone: '🧀' },
    { nome: 'Coxinha', icone: '🍗' }, { nome: 'Pastel', icone: '🥟' },
    { nome: 'Açaí', icone: '🫐' }, { nome: 'Frutas', icone: '🍇' },
    { nome: 'Smoothie', icone: '🥤' }, { nome: 'Café da Manhã', icone: '🥓' },
    { nome: 'Wrap', icone: '🌯' }, { nome: 'Ceviche', icone: '🐠' },
    { nome: 'Tiramisù', icone: '🍰' }, { nome: 'Cheesecake', icone: '🍰' },
    { nome: 'Brownie', icone: '🍫' }, { nome: 'Cookie', icone: '🍪' },
    { nome: 'Milkshake', icone: '🥛' }, { nome: 'Refrigerante', icone: '🥤' },
    { nome: 'Água de Coco', icone: '🥥' }, { nome: 'Chá Gelado', icone: '🍵' },
    { nome: 'Pudim', icone: '🍮' }, { nome: 'Mousse', icone: '🍮' },
    { nome: 'Torta de Limão', icone: '🥧' }, { nome: 'Pavê', icone: '🍰' },
    { nome: 'Feijoada', icone: '🍲' }, { nome: 'Baião de Dois', icone: '🍚' },
    { nome: 'Acarajé', icone: '🫓' }, { nome: 'Vatapá', icone: '🍛' },
    { nome: 'Moqueca', icone: '🐟' }, { nome: 'Bobó de Camarão', icone: '🍤' },
    { nome: 'Carne de Sol', icone: '🥩' }, { nome: 'Buchada', icone: '🍖' },
    { nome: 'Sarapatel', icone: '🥘' }, { nome: 'Tapioca', icone: '🫓' },
    { nome: 'Beiju', icone: '🥞' }, { nome: 'Cuscuz', icone: '🌾' },
    { nome: 'Canjica', icone: '🌽' }, { nome: 'Pamonha', icone: '🌽' },
    { nome: 'Quentão', icone: '🍷' }, { nome: 'Caldo de Cana', icone: '🥤' }
];

let comidasSelecionadasTemporarias = [];

// ============================================================
// RECEITAS (10 completas)
// ============================================================
const RECEITAS = [
    {
        id: 'rec-1',
        nome: 'Pizza Caseira',
        icone: '🍕',
        ingredientes: ['Farinha (500g)', 'Água morna (300ml)', 'Fermento (10g)', 'Sal (1 colher)', 'Azeite (2 colheres)', 'Molho de tomate', 'Queijo mussarela', 'Presunto', 'Orégano'],
        preparo: '1. Misture a farinha, sal, fermento e água. Sove até homogeneizar. Deixe descansar 1h.\n2. Abra a massa, coloque em uma forma, espalhe o molho, adicione os ingredientes e leve ao forno a 200°C por 20 min.'
    },
    {
        id: 'rec-2',
        nome: 'Hambúrguer Artesanal',
        icone: '🍔',
        ingredientes: ['Carne moída (500g)', 'Cebola picada', 'Alho', 'Pão de hambúrguer', 'Alface', 'Tomate', 'Queijo cheddar', 'Maionese', 'Ketchup'],
        preparo: '1. Tempere a carne com cebola, alho e sal. Modele os hambúrgueres.\n2. Grelhe em fogo alto até o ponto desejado.\n3. Monte com pão, alface, tomate, queijo e molhos.'
    },
    {
        id: 'rec-3',
        nome: 'Tacos Mexicanos',
        icone: '🌮',
        ingredientes: ['Tortilhas de milho', 'Carne moída', 'Pimenta', 'Cebola', 'Coentro', 'Limão', 'Queijo', 'Guacamole'],
        preparo: '1. Refogue a carne com cebola e pimenta.\n2. Aqueça as tortilhas.\n3. Recheie com a carne, queijo, guacamole e finalize com coentro e limão.'
    },
    {
        id: 'rec-4',
        nome: 'Sushi Especial',
        icone: '🍣',
        ingredientes: ['Arroz próprio', 'Alga nori', 'Salmão', 'Atum', 'Pepino', 'Cream cheese', 'Shoyu', 'Gengibre'],
        preparo: '1. Cozinhe o arroz e tempere com vinagre, açúcar e sal.\n2. Coloque a alga na esteira, espalhe o arroz, adicione os recheios e enrole.\n3. Corte em fatias e sirva com shoyu e gengibre.'
    },
    {
        id: 'rec-5',
        nome: 'Bolo de Morango',
        icone: '🍰',
        ingredientes: ['Farinha (2 xícaras)', 'Açúcar (2 xícaras)', 'Ovos (3)', 'Leite (1 xícara)', 'Manteiga (1 colher)', 'Fermento (1 colher)', 'Morangos', 'Creme de leite'],
        preparo: '1. Bata a manteiga com o açúcar, adicione os ovos, a farinha e o leite. Por fim, o fermento.\n2. Asse em forno 180°C por 35 min.\n3. Recheie e cubra com morangos e creme.'
    },
    {
        id: 'rec-6',
        nome: 'Lasanha à Bolonhesa',
        icone: '🍝',
        ingredientes: ['Massa para lasanha', 'Carne moída (500g)', 'Molho de tomate', 'Cebola', 'Alho', 'Queijo parmesão', 'Queijo mussarela', 'Leite', 'Manteiga'],
        preparo: '1. Refogue a carne com cebola e alho, acrescente o molho e cozinhe.\n2. Em uma forma, alterne camadas de massa, molho e queijos.\n3. Leve ao forno a 200°C por 30 min.'
    },
    {
        id: 'rec-7',
        nome: 'Salada Caesar',
        icone: '🥗',
        ingredientes: ['Alface americana', 'Frango desfiado', 'Croutons', 'Queijo parmesão', 'Molho Caesar', 'Limão'],
        preparo: '1. Lave e seque a alface.\n2. Misture com o frango, croutons e queijo.\n3. Regue com o molho Caesar e sirva.'
    },
    {
        id: 'rec-8',
        nome: 'Churrasco de Picanha',
        icone: '🥩',
        ingredientes: ['Picanha (1kg)', 'Sal grosso', 'Carvão', 'Alho', 'Limonada'],
        preparo: '1. Tempere a picanha com sal grosso e alho.\n2. Asse na churrasqueira até o ponto desejado (selar a gordura).\n3. Sirva com arroz, farofa e vinagrete.'
    },
    {
        id: 'rec-9',
        nome: 'Risoto de Camarão',
        icone: '🍛',
        ingredientes: ['Arroz arbóreo (2 xícaras)', 'Camarão (300g)', 'Cebola', 'Alho', 'Vinho branco', 'Caldo de legumes', 'Parmesão', 'Salsinha'],
        preparo: '1. Refogue cebola e alho, adicione o arroz e refogue.\n2. Adicione o vinho e, aos poucos, o caldo, mexendo sempre.\n3. Quando estiver al dente, acrescente o camarão e o parmesão.'
    },
    {
        id: 'rec-10',
        nome: 'Sopa de Legumes',
        icone: '🍜',
        ingredientes: ['Cenoura', 'Batata', 'Abobrinha', 'Cebola', 'Alho', 'Caldo de carne', 'Creme de leite', 'Salsinha'],
        preparo: '1. Cozinhe os legumes com caldo de carne até ficarem macios.\n2. Bata no liquidificador até ficar cremoso.\n3. Volte ao fogo, adicione creme de leite e finalize com salsinha.'
    }
];

// ============================================================
// ELEMENTOS DA INTERFACE
// ============================================================
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

// ============================================================
// ANÚNCIO RECOMPENSADO
// ============================================================
btnWatchAd.addEventListener('click', () => {
    let secondsLeft = 20;
    adCountdown.textContent = secondsLeft;
    adFrame.src = "https://example.com"; // substitua pelo link do anúncio
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
            alert("🎉 Você ganhou 3 moedas! Use na loja de temas e sons.");
        }
    }, 1000);
});

// ============================================================
// SELEÇÃO DE COMIDAS (MODAL)
// ============================================================
btnOpenFoodModal.addEventListener('click', () => {
    comidasSelecionadasTemporarias = [...state.foods];
    foodSelectionModal.style.display = 'flex';
    renderModalFoodOptions();
});

btnCloseFoodModal.addEventListener('click', () => {
    foodSelectionModal.style.display = 'none';
});

function renderModalFoodOptions(filterText = '') {
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
        card.addEventListener('click', () => {
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

searchFoodInput.addEventListener('input', (e) => {
    renderModalFoodOptions(e.target.value);
});

btnSaveFoodSelection.addEventListener('click', () => {
    if (comidasSelecionadasTemporarias.length < 2) {
        alert("Selecione pelo menos 2 comidas para girar a roleta!");
        return;
    }
    state.foods = [...comidasSelecionadasTemporarias];
    saveToStorage();
    renderFoodList();
    foodSelectionModal.style.display = 'none';
});

// ============================================================
// RENDERIZAÇÃO DA LISTA DE COMIDAS
// ============================================================
function renderFoodList() {
    const container = document.getElementById('foodListContainer');
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

// ============================================================
// RENDERIZAÇÃO DOS TEMAS (com claro/escuro integrado)
// ============================================================
function renderThemes() {
    const grid = document.getElementById('themesGrid');
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

        // Mostra amostra das cores (modo claro)
        const coresPreview = tema.light.colors.slice(0, 4).map(c =>
            `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`
        ).join('');

        card.innerHTML = `
            <div class="item-info">
                <h4>${tema.name}</h4>
                <p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p>
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
        alert("Moedas insuficientes! Assista a anúncios para ganhar mais.");
    }
};

window.useTheme = function(id) {
    applyTheme(id, state.darkMode);
    saveToStorage();
    renderThemes();
    drawRoulette();
};

// ============================================================
// RENDERIZAÇÃO DOS SONS
// ============================================================
function renderSounds() {
    // Sons de giro
    const spinGrid = document.getElementById('spinSoundsGrid');
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

    // Sons de vitória
    const winGrid = document.getElementById('winSoundsGrid');
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

// ============================================================
// RENDERIZAÇÃO DAS RECEITAS
// ============================================================
function renderRecipes() {
    recipesGrid.innerHTML = '';
    RECEITAS.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'recipe-link';
        div.innerHTML = `<span class="icon">${rec.icone}</span><span class="name">${rec.nome}</span>`;
        div.addEventListener('click', () => openRecipeModal(rec.id));
        recipesGrid.appendChild(div);
    });
}

function openRecipeModal(id) {
    const rec = RECEITAS.find(r => r.id === id);
    if (!rec) return;
    recipeModalTitle.textContent = `${rec.icone} ${rec.nome}`;
    recipeIngredients.innerHTML = rec.ingredientes.map(ing => `<li>${ing}</li>`).join('');
    recipeInstructions.textContent = rec.preparo;
    recipeModal.style.display = 'flex';
}

btnCloseRecipeModal.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

// Fecha modais clicando fora
document.querySelectorAll('.result-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.style.display = 'none';
    });
});

// ============================================================
// MODO CLARO/ESCURO (alterna dentro do tema atual)
// ============================================================
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    applyTheme(state.currentTheme, state.darkMode);
    saveToStorage();
    updateModeButton();
}

function updateModeButton() {
    btnModeToggle.innerHTML = state.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

btnModeToggle.addEventListener('click', toggleDarkMode);

// ============================================================
// EVENTOS DA ROLETA E RESULTADO
// ============================================================
document.getElementById('btnSpin').addEventListener('click', spin);
btnCloseModal.addEventListener('click', () => {
    resultOverlay.style.display = 'none';
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.getElementById('coin-balance').textContent = state.coins;
updateModeButton();
applyTheme(state.currentTheme, state.darkMode);
renderFoodList();
renderThemes();
renderSounds();
renderRecipes();
