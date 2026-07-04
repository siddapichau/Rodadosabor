'use strict';
console.log('temas.js carregado');

window.listTemas = [
    // ==================== TEMA 1: Clássico (gradiente suave) ====================
    {
        id: "theme-1",
        nome: "Clássico",
        price: 0,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fdf6f0 0%, #f3e7da 100%)',
                card: 'rgba(255,255,255,0.88)',
                text: '#1e2a3a',
                accent: '#7b9e5a'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                card: 'rgba(30,30,60,0.9)',
                text: '#e8e8e8',
                accent: '#f5b342'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        }
    },
    // ==================== TEMA 2: Natureza ====================
    {
        id: "theme-2",
        nome: "Natureza",
        price: 10,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #f0f7ee 0%, #e0ebe0 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#1e3a2a',
                accent: '#2e7d32'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a2e1a 0%, #0d1f0d 100%)',
                card: 'rgba(30,50,30,0.9)',
                text: '#c8e6c9',
                accent: '#66bb6a'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        }
    },
    // ==================== TEMA 3: Oceano ====================
    {
        id: "theme-3",
        nome: "Oceano",
        price: 10,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #eaf4fc 0%, #d4e8f5 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#0d2b4a',
                accent: '#1565c0'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0a1e2e 0%, #06131f 100%)',
                card: 'rgba(10,30,50,0.9)',
                text: '#bbdefb',
                accent: '#42a5f5'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        }
    },
    // ==================== TEMA 4: Solar ====================
    {
        id: "theme-4",
        nome: "Solar",
        price: 15,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fff7ed 0%, #fde8d0 100%)',
                card: 'rgba(255,255,255,0.88)',
                text: '#4a2a0a',
                accent: '#e65100'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #2a1a0a 0%, #1a0f05 100%)',
                card: 'rgba(50,30,10,0.9)',
                text: '#ffcc80',
                accent: '#ff9800'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        }
    },
    // ==================== TEMA 5: Neon (gradiente escuro com detalhes neon) ====================
    {
        id: "theme-5",
        nome: "Neon",
        price: 20,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #0a0a12 0%, #1a1a2e 100%)',
                card: 'rgba(20,20,40,0.92)',
                text: '#e0e0ff',
                accent: '#ff00ff'
            },
            colors: ['#ff00ff', '#00ffff', '#ff0040', '#40ff00', '#ffaa00', '#aa00ff']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #050508 0%, #0a0a1a 100%)',
                card: 'rgba(10,10,25,0.95)',
                text: '#d0d0ff',
                accent: '#ff00ff'
            },
            colors: ['#ff00ff', '#00ffff', '#ff0040', '#40ff00', '#ffaa00', '#aa00ff']
        }
    },
    // ==================== TEMA 6: Rosa Neon ====================
    {
        id: "theme-6",
        nome: "Rosa Neon",
        price: 22,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #1a0a14 0%, #2d1428 100%)',
                card: 'rgba(30,15,28,0.9)',
                text: '#ffe0f0',
                accent: '#ff1493'
            },
            colors: ['#ff1493', '#ff6b9d', '#ffb6c1', '#ff69b4', '#db7093', '#c71585']
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0d050a 0%, #1a0a12 100%)',
                card: 'rgba(20,10,18,0.95)',
                text: '#ffd0e0',
                accent: '#ff1493'
            },
            colors: ['#ff1493', '#ff6b9d', '#ffb6c1', '#ff69b4', '#db7093', '#c71585']
        }
    }
];

// Função auxiliar
window.getThemeColors = function(themeId, mode) {
    const theme = window.listTemas.find(t => t.id === themeId) || window.listTemas[0];
    return theme[mode].colors;
};