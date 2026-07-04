// ========================== APLICAÇÃO DE TEMAS ==========================
window.applyThemes = function() {
    const themes = window.listTemas || [];
    if (themes.length === 0) {
        console.warn('Nenhum tema definido. Usando valores padrão.');
        const root = document.documentElement;
        root.style.setProperty('--bg-body', 'linear-gradient(145deg, #fdf6f0 0%, #f3e7da 100%)');
        root.style.setProperty('--bg-card', 'rgba(255,255,255,0.92)');
        root.style.setProperty('--text-primary', '#1e2a3a');
        root.style.setProperty('--accent', '#7b9e5a');
        root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #f5d742, #7b9e5a)');
        root.style.setProperty('--wheel-border', '#f5b342');
        root.style.setProperty('--wheel-center', '#f5d742');
        return;
    }

    const pageTheme = themes.find(t => t.id === window.appState.currentPageTheme) || themes[0];
    const rouletteTheme = themes.find(t => t.id === window.appState.currentRouletteTheme) || themes[0];
    const mode = window.appState.darkMode ? 'dark' : 'light';
    
    // Aplica tema da página
    const pageData = pageTheme[mode];
    if (pageData && pageData.style) {
        const root = document.documentElement;
        root.style.setProperty('--bg-body', pageData.style.bg);
        root.style.setProperty('--bg-card', pageData.style.card);
        root.style.setProperty('--text-primary', pageData.style.text);
        root.style.setProperty('--accent', pageData.style.accent);
        // Gradiente do título usando as duas primeiras cores do tema
        const color1 = pageData.colors[0] || '#f5d742';
        const color2 = pageData.colors[1] || '#7b9e5a';
        root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${color1}, ${color2})`);
    }

    // Aplica tema da roleta
    const rouletteData = rouletteTheme[mode];
    if (rouletteData && rouletteData.colors) {
        const root = document.documentElement;
        root.style.setProperty('--wheel-border', rouletteData.colors[0]);
        // Usa a terceira cor (ou a segunda) para o centro
        root.style.setProperty('--wheel-center', rouletteData.colors[2] || rouletteData.colors[1] || '#f5d742');
    }

    window.saveData();
    if (typeof window.drawRoulette === 'function') {
        window.drawRoulette();
    }
};