'use strict';
console.log('temas.js carregado');

window.listTemas = [
    // ==================== TEMA 1: Clássico ====================
    {
        id: "theme-1",
        nome: "Clássico",
        price: 0,
        light: {
            style: { bg: '#f3e7da', card: 'rgba(255,255,255,0.92)', text: '#1e2a3a', accent: '#7b9e5a' },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        },
        dark: {
            style: { bg: '#1a1a2e', card: 'rgba(30,30,60,0.92)', text: '#e8e8e8', accent: '#f5b342' },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        }
    },
    // ==================== TEMA 2: Natureza ====================
    {
        id: "theme-2",
        nome: "Natureza",
        price: 10,
        light: {
            style: { bg: '#e8f5e9', card: 'rgba(255,255,255,0.92)', text: '#1e3a2a', accent: '#2e7d32' },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        },
        dark: {
            style: { bg: '#1a2e1a', card: 'rgba(30,50,30,0.92)', text: '#c8e6c9', accent: '#66bb6a' },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        }
    },
    // ==================== TEMA 3: Oceano ====================
    {
        id: "theme-3",
        nome: "Oceano",
        price: 10,
        light: {
            style: { bg: '#e3f2fd', card: 'rgba(255,255,255,0.92)', text: '#0d2b4a', accent: '#1565c0' },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        },
        dark: {
            style: { bg: '#0a1e2e', card: 'rgba(10,30,50,0.92)', text: '#bbdefb', accent: '#42a5f5' },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        }
    },
    // ==================== TEMA 4: Solar ====================
    {
        id: "theme-4",
        nome: "Solar",
        price: 15,
        light: {
            style: { bg: '#fff3e0', card: 'rgba(255,255,255,0.92)', text: '#4a2a0a', accent: '#e65100' },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        },
        dark: {
            style: { bg: '#2a1a0a', card: 'rgba(50,30,10,0.92)', text: '#ffcc80', accent: '#ff9800' },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        }
    },
    // ==================== TEMA 5: Neon (Roxo/Magenta) ====================
    {
        id: "theme-5",
        nome: "Neon Roxo",
        price: 20,
        light: {
            style: { bg: '#f3e8ff', card: 'rgba(255,248,255,0.92)', text: '#2d1b3d', accent: '#9b59b6' },
            colors: ['#9b59b6', '#c39bd3', '#d7bde2', '#e8daef', '#af7ac5', '#7d3c98']
        },
        dark: {
            style: { bg: '#0a0510', card: 'rgba(20,10,30,0.92)', text: '#e8d5f5', accent: '#bb8fce' },
            colors: ['#bb8fce', '#c39bd3', '#d7bde2', '#e8daef', '#af7ac5', '#7d3c98']
        }
    },
    // ==================== TEMA 6: Neon Rosa ====================
    {
        id: "theme-6",
        nome: "Neon Rosa",
        price: 22,
        light: {
            style: { bg: '#fce4ec', card: 'rgba(255,245,248,0.92)', text: '#4a1a2a', accent: '#d81b60' },
            colors: ['#d81b60', '#f06292', '#f48fb1', '#f8bbd0', '#ec407a', '#c2185b']
        },
        dark: {
            style: { bg: '#1a0a0e', card: 'rgba(30,10,18,0.92)', text: '#f8bbd0', accent: '#f06292' },
            colors: ['#f06292', '#f48fb1', '#f8bbd0', '#ec407a', '#d81b60', '#c2185b']
        }
    },
    // ==================== TEMA 7: Neon Verde (NOVO) ====================
    {
        id: "theme-7",
        nome: "Neon Verde",
        price: 22,
        light: {
            style: { bg: '#e8f5e9', card: 'rgba(245,255,245,0.92)', text: '#1a3a1a', accent: '#2e7d32' },
            colors: ['#2e7d32', '#66bb6a', '#81c784', '#a5d6a7', '#4caf50', '#1b5e20']
        },
        dark: {
            style: { bg: '#0a1a0a', card: 'rgba(10,30,10,0.92)', text: '#c8e6c9', accent: '#66bb6a' },
            colors: ['#66bb6a', '#81c784', '#a5d6a7', '#4caf50', '#2e7d32', '#1b5e20']
        }
    },
    // ==================== TEMA 8: Neon Azul (NOVO) ====================
    {
        id: "theme-8",
        nome: "Neon Azul",
        price: 22,
        light: {
            style: { bg: '#e3f2fd', card: 'rgba(245,250,255,0.92)', text: '#0a1a3a', accent: '#1565c0' },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        },
        dark: {
            style: { bg: '#0a0a1a', card: 'rgba(10,10,40,0.92)', text: '#bbdefb', accent: '#42a5f5' },
            colors: ['#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#1565c0', '#0d47a1']
        }
    },
    // ==================== TEMA 9: Neon Laranja (NOVO) ====================
    {
        id: "theme-9",
        nome: "Neon Laranja",
        price: 24,
        light: {
            style: { bg: '#fff3e0', card: 'rgba(255,250,245,0.92)', text: '#3a1a0a', accent: '#e65100' },
            colors: ['#e65100', '#ff9800', '#ffb300', '#ffcc80', '#f57c00', '#e65100']
        },
        dark: {
            style: { bg: '#1a0a05', card: 'rgba(30,15,5,0.92)', text: '#ffcc80', accent: '#ff9800' },
            colors: ['#ff9800', '#ffb300', '#ffcc80', '#f57c00', '#e65100', '#bf360c']
        }
    },
    // ==================== TEMA 10: Neon Amarelo (NOVO) ====================
    {
        id: "theme-10",
        nome: "Neon Amarelo",
        price: 20,
        light: {
            style: { bg: '#fffde7', card: 'rgba(255,255,245,0.92)', text: '#3a3a0a', accent: '#f9a825' },
            colors: ['#f9a825', '#fdd835', '#ffeb3b', '#fff176', '#fbc02d', '#f57f17']
        },
        dark: {
            style: { bg: '#1a1a05', card: 'rgba(30,30,5,0.92)', text: '#fff9c4', accent: '#fdd835' },
            colors: ['#fdd835', '#ffeb3b', '#fff176', '#f9a825', '#fbc02d', '#f57f17']
        }
    },
    // ==================== TEMA 11: Neon Ciano (NOVO) ====================
    {
        id: "theme-11",
        nome: "Neon Ciano",
        price: 25,
        light: {
            style: { bg: '#e0f7fa', card: 'rgba(240,255,255,0.92)', text: '#00363a', accent: '#00838f' },
            colors: ['#00838f', '#26c6da', '#4dd0e1', '#80deea', '#00acc1', '#006064']
        },
        dark: {
            style: { bg: '#051a1a', card: 'rgba(5,30,30,0.92)', text: '#b2ebf2', accent: '#26c6da' },
            colors: ['#26c6da', '#4dd0e1', '#80deea', '#00acc1', '#00838f', '#006064']
        }
    }
];

// Função auxiliar para acessar as cores
window.getThemeColors = function(themeId, mode) {
    const theme = window.listTemas.find(t => t.id === themeId) || window.listTemas[0];
    return theme[mode].colors;
};