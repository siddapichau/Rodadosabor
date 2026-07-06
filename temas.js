'use strict';
console.log('temas.js carregado (v2 - Gradientes Modernos)');

window.listTemas = [
    {
        id: "theme-1", nome: "Clássico", price: 0,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fdf6f0 0%, #f3e7da 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#1e2a3a', accent: '#7b9e5a',
                accentGradient: 'linear-gradient(135deg, #f5b342, #e94b3c)'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'],
            wheelBorder: '#e94b3c', wheelCenter: '#f5d742'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                card: 'rgba(30,30,60,0.85)',
                text: '#e8e8e8', accent: '#f5b342',
                accentGradient: 'linear-gradient(135deg, #f5d742, #e94b3c)'
            },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'],
            wheelBorder: '#9b59b6', wheelCenter: '#f5d742'
        }
    },
    {
        id: "theme-2", nome: "Natureza", price: 10,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #f0f7ee 0%, #d5e8d5 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#1e3a2a', accent: '#2e7d32',
                accentGradient: 'linear-gradient(135deg, #4caf50, #2e7d32)'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50'],
            wheelBorder: '#1b5e20', wheelCenter: '#81c784'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #0d1f0d 0%, #1a331a 100%)',
                card: 'rgba(20,40,20,0.85)',
                text: '#c8e6c9', accent: '#66bb6a',
                accentGradient: 'linear-gradient(135deg, #81c784, #4caf50)'
            },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50'],
            wheelBorder: '#a5d6a7', wheelCenter: '#2e7d32'
        }
    },
    {
        id: "theme-3", nome: "Oceano Profundo", price: 15,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #eaf4fc 0%, #c4e0f5 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#0d2b4a', accent: '#1565c0',
                accentGradient: 'linear-gradient(135deg, #42a5f5, #0d47a1)'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1'],
            wheelBorder: '#0d47a1', wheelCenter: '#64b5f6'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #06131f 0%, #0a2036 100%)',
                card: 'rgba(10,30,50,0.85)',
                text: '#bbdefb', accent: '#42a5f5',
                accentGradient: 'linear-gradient(135deg, #64b5f6, #1e88e5)'
            },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1'],
            wheelBorder: '#90caf9', wheelCenter: '#1565c0'
        }
    },
    {
        id: "theme-4", nome: "Fogo & Sangue", price: 15,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #fff3e0 0%, #ffcc80 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#4a1a0a', accent: '#d84315',
                accentGradient: 'linear-gradient(135deg, #ff9800, #bf360c)'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ff5722', '#ffb300', '#f57c00'],
            wheelBorder: '#bf360c', wheelCenter: '#ffcc80'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #2a0f05 0%, #4a1a0a 100%)',
                card: 'rgba(40,15,5,0.85)',
                text: '#ffe0b2', accent: '#ff9800',
                accentGradient: 'linear-gradient(135deg, #ffcc80, #e65100)'
            },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ff5722', '#ffb300', '#f57c00'],
            wheelBorder: '#ffcc80', wheelCenter: '#d84315'
        }
    },
    {
        id: "theme-5", nome: "Galáxia Neon", price: 25,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #f3e8ff 0%, #d8b4fe 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#2d1b3d', accent: '#9333ea',
                accentGradient: 'linear-gradient(135deg, #c084fc, #7e22ce)'
            },
            colors: ['#9333ea', '#a855f7', '#c084fc', '#d8b4fe', '#7e22ce', '#6b21a8'],
            wheelBorder: '#581c87', wheelCenter: '#d8b4fe'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #11051f 0%, #2a0a4a 100%)',
                card: 'rgba(30,10,50,0.85)',
                text: '#e9d5ff', accent: '#c084fc',
                accentGradient: 'linear-gradient(135deg, #d8b4fe, #9333ea)'
            },
            colors: ['#c084fc', '#a855f7', '#9333ea', '#d8b4fe', '#7e22ce', '#6b21a8'],
            wheelBorder: '#e9d5ff', wheelCenter: '#7e22ce'
        }
    },
    {
        id: "theme-6", nome: "Cyberpunk", price: 30,
        light: {
            style: {
                bg: 'linear-gradient(145deg, #e0f2fe 0%, #fce4ec 100%)',
                card: 'rgba(255,255,255,0.85)',
                text: '#111827', accent: '#e11d48',
                accentGradient: 'linear-gradient(135deg, #06b6d4, #e11d48)'
            },
            colors: ['#06b6d4', '#e11d48', '#0ea5e9', '#f43f5e', '#0284c7', '#be123c'],
            wheelBorder: '#be123c', wheelCenter: '#22d3ee'
        },
        dark: {
            style: {
                bg: 'linear-gradient(145deg, #081121 0%, #210510 100%)',
                card: 'rgba(15,10,25,0.85)',
                text: '#f3f4f6', accent: '#06b6d4',
                accentGradient: 'linear-gradient(135deg, #22d3ee, #fb7185)'
            },
            colors: ['#06b6d4', '#e11d48', '#0ea5e9', '#f43f5e', '#0284c7', '#be123c'],
            wheelBorder: '#22d3ee', wheelCenter: '#e11d48'
        }
    }
];

window.getThemeColors = function(themeId, mode) {
    const theme = window.listTemas.find(t => t.id === themeId) || window.listTemas[0];
    return theme[mode].colors;
};
