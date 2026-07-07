'use strict';
console.log('temas.js carregado (Fundos Gradientes Sem Ovais)');

window.listTemas = [
    // ==================== TEMA 1: Clássico ====================
    {
        id: "theme-1",
        nome: "Clássico",
        price: 0,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fdf6f0 0%, #e6d8cb 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#1e2a3a',
                accent: '#7b9e5a',
                accentGradient: 'linear-gradient(135deg, #f5b342, #e94b3c)'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'],
            wheelBorder: '#e94b3c', wheelCenter: '#f5d742'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)',
                card: 'rgba(30,30,60,0.85)',
                text: '#e8e8e8',
                accent: '#f5b342',
                accentGradient: 'linear-gradient(135deg, #f5d742, #e94b3c)'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'],
            wheelBorder: '#9b59b6', wheelCenter: '#f5d742'
        }
    },
    // ==================== TEMA 2: Natureza ====================
    {
        id: "theme-2",
        nome: "Natureza",
        price: 10,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #f0f7ee 0%, #c1d6c1 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#1e3a2a',
                accent: '#2e7d32',
                accentGradient: 'linear-gradient(135deg, #4caf50, #1b5e20)'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50'],
            wheelBorder: '#1b5e20', wheelCenter: '#81c784'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a2e1a 0%, #061106 100%)',
                card: 'rgba(30,50,30,0.85)',
                text: '#c8e6c9',
                accent: '#66bb6a',
                accentGradient: 'linear-gradient(135deg, #81c784, #2e7d32)'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50'],
            wheelBorder: '#a5d6a7', wheelCenter: '#2e7d32'
        }
    },
    // ==================== TEMA 3: Oceano ====================
    {
        id: "theme-3",
        nome: "Oceano",
        price: 10,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #eaf4fc 0%, #aecce6 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#0d2b4a',
                accent: '#1565c0',
                accentGradient: 'linear-gradient(135deg, #42a5f5, #0d47a1)'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1'],
            wheelBorder: '#0d47a1', wheelCenter: '#64b5f6'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0a1e2e 0%, #030a11 100%)',
                card: 'rgba(10,30,50,0.85)',
                text: '#bbdefb',
                accent: '#42a5f5',
                accentGradient: 'linear-gradient(135deg, #64b5f6, #1565c0)'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1'],
            wheelBorder: '#90caf9', wheelCenter: '#1565c0'
        }
    },
    // ==================== TEMA 4: Solar ====================
    {
        id: "theme-4",
        nome: "Solar",
        price: 15,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fff7ed 0%, #f4cca1 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#4a2a0a',
                accent: '#e65100',
                accentGradient: 'linear-gradient(135deg, #ffb300, #e65100)'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00'],
            wheelBorder: '#e65100', wheelCenter: '#ffd54f'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #2a1a0a 0%, #0d0702 100%)',
                card: 'rgba(50,30,10,0.85)',
                text: '#ffcc80',
                accent: '#ff9800',
                accentGradient: 'linear-gradient(135deg, #ffcc80, #f57c00)'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00'],
            wheelBorder: '#ffd54f', wheelCenter: '#e65100'
        }
    },
    // ==================== TEMA 5: Neon Roxo ====================
    {
        id: "theme-5",
        nome: "Neon Roxo",
        price: 20,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #f3e8ff 0%, #d1a5f5 100%)',
                card: 'rgba(255,248,255,0.85)',
                text: '#2d1b3d',
                accent: '#9b59b6',
                accentGradient: 'linear-gradient(135deg, #c39bd3, #7d3c98)'
            },
            colors: ['#9b59b6', '#c39bd3', '#d7bde2', '#e8daef', '#af7ac5', '#7d3c98'],
            wheelBorder: '#7d3c98', wheelCenter: '#e8daef'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0a0510 0%, #030105 100%)',
                card: 'rgba(20,10,30,0.85)',
                text: '#e8d5f5',
                accent: '#bb8fce',
                accentGradient: 'linear-gradient(135deg, #d7bde2, #9b59b6)'
            },
            colors: ['#bb8fce', '#c39bd3', '#d7bde2', '#e8daef', '#af7ac5', '#7d3c98'],
            wheelBorder: '#d7bde2', wheelCenter: '#7d3c98'
        }
    },
    // ==================== TEMA 6: Neon Rosa ====================
    {
        id: "theme-6",
        nome: "Neon Rosa",
        price: 22,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fce4ec 0%, #f09cb8 100%)',
                card: 'rgba(255,245,248,0.85)',
                text: '#4a1a2a',
                accent: '#d81b60',
                accentGradient: 'linear-gradient(135deg, #f48fb1, #c2185b)'
            },
            colors: ['#d81b60', '#f06292', '#f48fb1', '#f8bbd0', '#ec407a', '#c2185b'],
            wheelBorder: '#c2185b', wheelCenter: '#f8bbd0'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a0a0e 0%, #0a0305 100%)',
                card: 'rgba(30,10,18,0.85)',
                text: '#f8bbd0',
                accent: '#f06292',
                accentGradient: 'linear-gradient(135deg, #f8bbd0, #ec407a)'
            },
            colors: ['#f06292', '#f48fb1', '#f8bbd0', '#ec407a', '#d81b60', '#c2185b'],
            wheelBorder: '#f8bbd0', wheelCenter: '#d81b60'
        }
    },
    // ==================== TEMA 7: Neon Verde ====================
    {
        id: "theme-7",
        nome: "Neon Verde",
        price: 22,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #e8f5e9 0%, #a2d6a5 100%)',
                card: 'rgba(245,255,245,0.85)',
                text: '#1a3a1a',
                accent: '#2e7d32',
                accentGradient: 'linear-gradient(135deg, #66bb6a, #1b5e20)'
            },
            colors: ['#2e7d32', '#66bb6a', '#81c784', '#a5d6a7', '#4caf50', '#1b5e20'],
            wheelBorder: '#1b5e20', wheelCenter: '#a5d6a7'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0a1a0a 0%, #030803 100%)',
                card: 'rgba(10,30,10,0.85)',
                text: '#c8e6c9',
                accent: '#66bb6a',
                accentGradient: 'linear-gradient(135deg, #a5d6a7, #4caf50)'
            },
            colors: ['#66bb6a', '#81c784', '#a5d6a7', '#4caf50', '#2e7d32', '#1b5e20'],
            wheelBorder: '#a5d6a7', wheelCenter: '#1b5e20'
        }
    },
    // ==================== TEMA 8: Neon Azul ====================
    {
        id: "theme-8",
        nome: "Neon Azul",
        price: 22,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #e3f2fd 0%, #9bcbf4 100%)',
                card: 'rgba(245,250,255,0.85)',
                text: '#0a1a3a',
                accent: '#1565c0',
                accentGradient: 'linear-gradient(135deg, #64b5f6, #0d47a1)'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1'],
            wheelBorder: '#0d47a1', wheelCenter: '#90caf9'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0a0a1a 0%, #03030a 100%)',
                card: 'rgba(10,10,40,0.85)',
                text: '#bbdefb',
                accent: '#42a5f5',
                accentGradient: 'linear-gradient(135deg, #90caf9, #1e88e5)'
            },
            colors: ['#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#1565c0', '#0d47a1'],
            wheelBorder: '#90caf9', wheelCenter: '#0d47a1'
        }
    },
    // ==================== TEMA 9: Neon Laranja ====================
    {
        id: "theme-9",
        nome: "Neon Laranja",
        price: 24,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fff3e0 0%, #f6c888 100%)',
                card: 'rgba(255,250,245,0.85)',
                text: '#3a1a0a',
                accent: '#e65100',
                accentGradient: 'linear-gradient(135deg, #ffb300, #bf360c)'
            },
            colors: ['#e65100', '#ff9800', '#ffb300', '#ffcc80', '#f57c00', '#bf360c'],
            wheelBorder: '#bf360c', wheelCenter: '#ffcc80'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a0a05 0%, #0a0301 100%)',
                card: 'rgba(30,15,5,0.85)',
                text: '#ffcc80',
                accent: '#ff9800',
                accentGradient: 'linear-gradient(135deg, #ffcc80, #f57c00)'
            },
            colors: ['#ff9800', '#ffb300', '#ffcc80', '#f57c00', '#e65100', '#bf360c'],
            wheelBorder: '#ffcc80', wheelCenter: '#bf360c'
        }
    },
    // ==================== TEMA 10: Neon Amarelo ====================
    {
        id: "theme-10",
        nome: "Neon Amarelo",
        price: 20,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fffde7 0%, #faefa2 100%)',
                card: 'rgba(255,255,245,0.85)',
                text: '#3a3a0a',
                accent: '#f9a825',
                accentGradient: 'linear-gradient(135deg, #ffeb3b, #f57f17)'
            },
            colors: ['#f9a825', '#fdd835', '#ffeb3b', '#fff176', '#fbc02d', '#f57f17'],
            wheelBorder: '#f57f17', wheelCenter: '#fff176'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a1a05 0%, #080801 100%)',
                card: 'rgba(30,30,5,0.85)',
                text: '#fff9c4',
                accent: '#fdd835',
                accentGradient: 'linear-gradient(135deg, #fff176, #f9a825)'
            },
            colors: ['#fdd835', '#ffeb3b', '#fff176', '#f9a825', '#fbc02d', '#f57f17'],
            wheelBorder: '#fff176', wheelCenter: '#f57f17'
        }
    },
    // ==================== TEMA 11: Neon Ciano ====================
    {
        id: "theme-11",
        nome: "Neon Ciano",
        price: 25,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #e0f7fa 0%, #9ddfe6 100%)',
                card: 'rgba(240,255,255,0.85)',
                text: '#00363a',
                accent: '#00838f',
                accentGradient: 'linear-gradient(135deg, #4dd0e1, #006064)'
            },
            colors: ['#00838f', '#26c6da', '#4dd0e1', '#80deea', '#00acc1', '#006064'],
            wheelBorder: '#006064', wheelCenter: '#80deea'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #051a1a 0%, #010808 100%)',
                card: 'rgba(5,30,30,0.85)',
                text: '#b2ebf2',
                accent: '#26c6da',
                accentGradient: 'linear-gradient(135deg, #80deea, #00acc1)'
            },
            colors: ['#26c6da', '#4dd0e1', '#80deea', '#00acc1', '#00838f', '#006064'],
            wheelBorder: '#80deea', wheelCenter: '#006064'
        }
    }
];

window.getThemeColors = function(themeId, mode) {
    const theme = window.listTemas.find(t => t.id === themeId) || window.listTemas[0];
    return theme[mode].colors;
};
