// BANCO DE DADOS GLOBAL DE COMIDAS COM ÍCONES E EMOJIS (MILHARES DE OPÇÕES SIMULADAS)
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
    { nome: 'Camarão', icone: '🍤' }, { nome: 'Pancqueca', icone: '🥞' }
];

let comidasSelecionadasTemporarias = [];

// ELEMENTOS DA INTERFACE INTERATIVA
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

// --- SISTEMA DE ANÚNCIO (20 SEGUNDOS EM IFRAME) ---
btnWatchAd.addEventListener('click', () => {
    let secondsLeft = 20;
    adCountdown.textContent = secondsLeft;
    
    // Altere para a URL real do anúncio se preferir
    adFrame.src = "https://example.com"; 
    adOverlay.style.display = 'flex';
    
    const adInterval = setInterval(() => {
        secondsLeft--;
        adCountdown.textContent = secondsLeft;
        
        if (secondsLeft <= 0) {
            clearInterval(adInterval);
            adOverlay.style.display = 'none';
            adFrame.src = 'about:blank';
            
            // Recompensa com exatamente +3 Moedas por Anúncio assistido
            state.coins += 3;
            saveToStorage();
            alert("Parabéns! Você assistiu ao anúncio completo e ganhou 3 moedas! 🪙");
        }
    }, 1000);
});

// --- LÓGICA DE GIRO DA ROLETA (SEM RECOMPENSA DE MOEDA) ---
let spinSpeed = 0;
let spinTimeTotal = 0;
let spinTimeCount = 0;
let lastSoundAngle = 0;

function spin() {
    if (isSpinning || state.foods.length === 0) return;
    isSpinning = true;

    spinTimeCount = 0;
    spinTimeTotal = Math.random() * 1000 + 4000; 
    spinSpeed = Math.random() * 0.3 + 0.4; 

    lastSoundAngle = startAngle;
    animateSpin();
}

function animateSpin() {
    spinTimeCount += 20;
    if (spinTimeCount >= spinTimeTotal) {
        isSpinning = false;
        finalizeSpin();
        return;
    }

    let progress = spinTimeCount / spinTimeTotal;
    let currentVelocity = spinSpeed * Math.pow(1 - progress, 2);

    startAngle += currentVelocity;
    drawRoulette();

    const arcSize = (2 * Math.PI) / state.foods.length;
    if (Math.abs(startAngle - lastSoundAngle) >= arcSize) {
        const activeSpinSound = listSpinSounds.find(s => s.id === state.currentSpinSound) || listSpinSounds[0];
        playSynthesizedSound(activeSpinSound.type);
        lastSoundAngle = startAngle;
    }

    requestAnimationFrame(animateSpin);
}

function finalizeSpin() {
    const numSegments = state.foods.length;
    let degrees = (startAngle * 180 / Math.PI) % 360;
    let index = Math.floor((360 - (degrees - 90)) % 360 / (360 / numSegments));
    if (index < 0) index = numSegments + index;
    
    const winningFood = state.foods[index];

    const activeWinSound = listWinSounds.find(s => s.id === state.currentWinSound) || listWinSounds[0];
    playSynthesizedSound(activeWinSound.type);

    // IMPORTANTE: NÃO HÁ MAIS GANHO DE MOEDAS AQUI!

    setTimeout(() => {
        document.getElementById('modalFoodName').textContent = winningFood;
        const emojiMatch = winningFood.match(/[\p{Emoji_Presentation}\p{Emoji}☀-➿]/u);
        document.getElementById('modalEmoji').textContent = emojiMatch ? emojiMatch[0] : "🍽️";
        document.getElementById('resultOverlay').style.display = 'flex';
    }, 300);
}

// --- POP-UP MODAL SELEÇÃO DE COMIDAS (MENU COMPLETO) ---
btnOpenFoodModal.addEventListener('click', () => {
    // Clona o array original para manipulação temporária
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
            const index = comidasSelecionadasTemporarias.indexOf(itemString);
            if (index > -1) {
                comidasSelecionadasTemporarias.splice(index, 1);
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
        alert("Por favor, selecione ao menos 2 comidas para que a roleta possa girar!");
        return;
    }
    state.foods = [...comidasSelecionadasTemporarias];
    saveToStorage();
    renderFoodList();
    foodSelectionModal.style.display = 'none';
});

// --- RENDERIZADORES DE LAYOUT ORIGINAIS ---
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
}

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

        card.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : 'Desbloqueável'}</p></div>${btnHTML}`;
        grid.appendChild(card);
    });
}

window.buyTheme = function(id, price) {
    if(state.coins >= price) {
        state.coins -= price;
        state.unlockedThemes.push(id);
        state.currentTheme = id;
        saveToStorage();
        renderThemes();
        drawRoulette();
    } else { alert("Moedas insuficientes! Assista a anúncios para ganhar mais."); }
}

window.useTheme = function(id) {
    state.currentTheme = id;
    saveToStorage();
    renderThemes();
    drawRoulette();
}

function renderSounds() {
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
        card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:#7b9e5a;" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Giro</p></div>${btnHTML}`;
        spinGrid.appendChild(card);
    });

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
        card.innerHTML = `<div class="item-info"><h4>${sound.name} <i class="fas fa-play-circle" style="cursor:pointer;color:#7b9e5a;" onclick="playSynthesizedSound('${sound.type}')"></i></h4><p>Vitória</p></div>${btnHTML}`;
        winGrid.appendChild(card);
    });
}

window.buySpinSound = function(id, price) {
    if(state.coins >= price) {
        state.coins -= price;
        state.unlockedSpinSounds.push(id);
        state.currentSpinSound = id;
        saveToStorage();
        renderSounds();
    } else { alert("Moedas insuficientes!"); }
}
window.useSpinSound = function(id) { state.currentSpinSound = id; saveToStorage(); renderSounds(); }

window.buyWinSound = function(id, price) {
    if(state.coins >= price) {
        state.coins -= price;
        state.unlockedWinSounds.push(id);
        state.currentWinSound = id;
        saveToStorage();
        renderSounds();
    } else { alert("Moedas insuficientes!"); }
}
window.useWinSound = function(id) { state.currentWinSound = id; saveToStorage(); renderSounds(); }

const modeBtn = document.getElementById('btnModeToggle');
function applyMode() {
    document.documentElement.setAttribute('data-dark-mode', state.darkMode);
    modeBtn.innerHTML = state.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}
modeBtn.addEventListener('click', () => { state.darkMode = !state.darkMode; applyMode(); saveToStorage(); });

document.getElementById('btnSpin').addEventListener('click', spin);
document.getElementById('btnCloseModal').addEventListener('click', () => { document.getElementById('resultOverlay').style.display = 'none'; });

// INICIALIZAÇÃO COMPLETA
document.getElementById('coin-balance').textContent = state.coins;
applyMode();
renderFoodList();
renderThemes();
renderSounds();
