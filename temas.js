'use strict';
console.log('temas.js carregado');

// ========================== DADOS DOS TEMAS ==========================
window.listTemas = [
    { id: "theme-1", name: "Amarelo + Verde", price: 0, light: { colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'], style: { bg: '#f3e7da', card: 'rgba(255,255,255,0.88)', text: '#1e2a3a', accent: '#7b9e5a' } }, dark: { colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'], style: { bg: '#1a1a1a', card: 'rgba(40,40,40,0.9)', text: '#f1f5f9', accent: '#7b9e5a' } } },
    { id: "theme-2", name: "Roxo + Azul", price: 0, light: { colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'], style: { bg: '#eef2ff', card: 'rgba(255,255,255,0.9)', text: '#1e1b4b', accent: '#6366f1' } }, dark: { colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'], style: { bg: '#0f0f23', card: 'rgba(30,30,60,0.9)', text: '#e0e7ff', accent: '#818cf8' } } },
    { id: "theme-3", name: "Neon Vibrante", price: 0, light: { colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'], style: { bg: '#f0e6f0', card: 'rgba(255,240,255,0.9)', text: '#1a0a1a', accent: '#7000ff' } }, dark: { colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'], style: { bg: '#0a0010', card: 'rgba(30,10,40,0.9)', text: '#f0e6f0', accent: '#ff00aa' } } },
    { id: "theme-4", name: "Pôr do Sol", price: 20, light: { colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'], style: { bg: '#fde9e0', card: 'rgba(255,245,235,0.9)', text: '#3d1a0e', accent: '#e64a19' } }, dark: { colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'], style: { bg: '#1a0e0a', card: 'rgba(50,25,15,0.9)', text: '#f5e0d0', accent: '#ff6e40' } } },
    { id: "theme-5", name: "Floresta", price: 20, light: { colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'], style: { bg: '#e8f5e9', card: 'rgba(240,255,240,0.9)', text: '#1b3a1b', accent: '#2e7d32' } }, dark: { colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'], style: { bg: '#0f1a0f', card: 'rgba(20,40,20,0.9)', text: '#d0e8d0', accent: '#66bb6a' } } }
];

// ========================== FUNÇÕES DE COMPRA E USO ==========================
window.buyPageTheme = (id, price) => {
    if (window.appState.coins >= price) {
        window.appState.coins -= price;
        window.appState.unlockedPageThemes.push(id);
        window.usePageTheme(id);
        updateCoinsDisplay();
    } else alert("Moedas insuficientes!");
};

window.usePageTheme = (id) => {
    window.appState.currentPageTheme = id;
    window.applyThemes();
    renderThemes(); // Atualiza a loja visualmente
};

window.buyRouletteTheme = (id, price) => {
    if (window.appState.coins >= price) {
        window.appState.coins -= price;
        window.appState.unlockedRouletteThemes.push(id);
        window.useRouletteTheme(id);
        updateCoinsDisplay();
    } else alert("Moedas insuficientes!");
};

window.useRouletteTheme = (id) => {
    window.appState.currentRouletteTheme = id;
    window.applyThemes();
    renderThemes(); // Atualiza a loja visualmente
};

// ========================== RENDERIZAÇÃO DA LOJA DE TEMAS ==========================
window.renderThemes = function() {
    const pageGrid = document.getElementById('pageThemesGrid');
    const rouletteGrid = document.getElementById('rouletteThemesGrid');
    if (!pageGrid || !rouletteGrid) return;
    pageGrid.innerHTML = ''; 
    rouletteGrid.innerHTML = '';
    
    (window.listTemas || []).forEach(tema => {
        const coresPreview = tema.light.colors.slice(0, 4).map(c => 
            `<span style="display:inline-block; width:16px; height:16px; border-radius:4px; background:${c};"></span>`
        ).join('');
        
        // ----- Card de Tema da Página -----
        const isPageUnlocked = window.appState.unlockedPageThemes.includes(tema.id);
        const isPageActive = window.appState.currentPageTheme === tema.id;
        const pageCard = document.createElement('div');
        pageCard.className = `item-card ${isPageActive ? 'active' : ''}`;
        let btnPage = isPageActive 
            ? `<button class="btn-action btn-active">Ativo</button>` 
            : isPageUnlocked 
                ? `<button class="btn-action btn-use" onclick="usePageTheme('${tema.id}')">Usar</button>` 
                : `<button class="btn-action btn-buy" onclick="buyPageTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
        pageCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnPage}`;
        pageGrid.appendChild(pageCard);

        // ----- Card de Tema da Roleta -----
        const isRouletteUnlocked = window.appState.unlockedRouletteThemes.includes(tema.id);
        const isRouletteActive = window.appState.currentRouletteTheme === tema.id;
        const rouletteCard = document.createElement('div');
        rouletteCard.className = `item-card ${isRouletteActive ? 'active' : ''}`;
        let btnRoulette = isRouletteActive 
            ? `<button class="btn-action btn-active">Ativo</button>` 
            : isRouletteUnlocked 
                ? `<button class="btn-action btn-use" onclick="useRouletteTheme('${tema.id}')">Usar</button>` 
                : `<button class="btn-action btn-buy" onclick="buyRouletteTheme('${tema.id}', ${tema.price})"><i class="fas fa-coins"></i> ${tema.price}</button>`;
        rouletteCard.innerHTML = `<div class="item-info"><h4>${tema.name}</h4><p>${tema.price === 0 ? 'Grátis' : `${tema.price} moedas`}</p><div style="display:flex; gap:3px; margin-top:4px;">${coresPreview}</div></div>${btnRoulette}`;
        rouletteGrid.appendChild(rouletteCard);
    });
};
