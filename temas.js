'use strict';
console.log('temas.js carregado');

window.listTemas = [
    // ==================== TEMA 1: Padrão (Claro/escuro) ====================
    {
        id: "theme-1",
        nome: "Clássico",
        price: 0,
        light: {
            style: { bg: '#f3e7da', card: 'rgba(255,255,255,0.88)', text: '#1e2a3a', accent: '#7b9e5a' },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        },
        dark: {
            style: { bg: '#1a1a2e', card: 'rgba(30,30,60,0.9)', text: '#e8e8e8', accent: '#f5b342' },
            colors: ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12']
        }
    },
    // ==================== TEMA 2: Natureza ====================
    {
        id: "theme-2",
        nome: "Natureza",
        price: 10,
        light: {
            style: { bg: '#e8f5e9', card: 'rgba(255,255,255,0.85)', text: '#1e3a2a', accent: '#2e7d32' },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        },
        dark: {
            style: { bg: '#1a2e1a', card: 'rgba(30,50,30,0.9)', text: '#c8e6c9', accent: '#66bb6a' },
            colors: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784', '#4caf50']
        }
    },
    // ==================== TEMA 3: Oceano ====================
    {
        id: "theme-3",
        nome: "Oceano",
        price: 10,
        light: {
            style: { bg: '#e3f2fd', card: 'rgba(255,255,255,0.85)', text: '#0d2b4a', accent: '#1565c0' },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        },
        dark: {
            style: { bg: '#0a1e2e', card: 'rgba(10,30,50,0.9)', text: '#bbdefb', accent: '#42a5f5' },
            colors: ['#1565c0', '#42a5f5', '#64b5f6', '#90caf9', '#1e88e5', '#0d47a1']
        }
    },
    // ==================== TEMA 4: Solar ====================
    {
        id: "theme-4",
        nome: "Solar",
        price: 15,
        light: {
            style: { bg: '#fff3e0', card: 'rgba(255,255,255,0.88)', text: '#4a2a0a', accent: '#e65100' },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        },
        dark: {
            style: { bg: '#2a1a0a', card: 'rgba(50,30,10,0.9)', text: '#ffcc80', accent: '#ff9800' },
            colors: ['#e65100', '#ff9800', '#ffc107', '#ffd54f', '#ffb300', '#f57c00']
        }
    }
];

// Função auxiliar para acessar as cores (já usada em roleta.js)
window.getThemeColors = function(themeId, mode) {
    const theme = window.listTemas.find(t => t.id === themeId) || window.listTemas[0];
    return theme[mode].colors;
};