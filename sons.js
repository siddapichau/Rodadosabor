'use strict';
console.log('sons.js carregado');

// 1. SONS DE GIRO (Enquanto a roleta gira)
window.SONS_GIRO = [
    { id: "spin-1", name: "Clássico", price: 0, type: "click" },
    { id: "spin-2", name: "Swoosh", price: 15, type: "swoosh" },
    { id: "spin-3", name: "Arcade Tick", price: 25, type: "arcade" },
    { id: "spin-4", name: "Motor", price: 20, type: "motor" },
    { id: "spin-5", name: "Digital", price: 30, type: "digital" }
];

// 2. SONS DE FIM DA ROLETA (Quando a roleta acabou de parar)
window.SONS_FIM = [
    { id: "end-1", name: "Acorde Simples", price: 0, type: "end-chord" },
    { id: "end-2", name: "Plim Sino", price: 15, type: "end-bell" },
    { id: "end-3", name: "Moeda Arcade", price: 25, type: "end-coin" },
    { id: "end-4", name: "Impacto", price: 10, type: "end-thud" },
    { id: "end-5", name: "Zapp Digital", price: 20, type: "end-zap" }
];

// 3. SONS DE VITÓRIA REAIS (Tocam com os confetes, 2 segundos depois)
window.SONS_VITORIA = [
    { id: "win-1", name: "Grande Tada!", price: 0, type: "win-tada" },
    { id: "win-2", name: "Aplausos", price: 25, type: "win-applause" },
    { id: "win-3", name: "Vitória Arcade", price: 30, type: "win-arcade" },
    { id: "win-4", name: "Épico", price: 35, type: "win-epic" },
    { id: "win-5", name: "Festa Chiptune", price: 40, type: "win-party" }
];