'use strict';
console.log('sons.js carregado');

// ==================== 1. SONS DE GIRO (enquanto a roleta gira) ====================
window.SONS_GIRO = [
    { id: "spin-1", name: "Clássico", price: 0, type: "click" },
    { id: "spin-2", name: "Swoosh", price: 15, type: "swoosh" },
    { id: "spin-3", name: "Arcade Tick", price: 25, type: "arcade" },
    { id: "spin-4", name: "Motor", price: 20, type: "motor" },
    { id: "spin-5", name: "Digital", price: 30, type: "digital" },
    // NOVOS
    { id: "spin-6", name: "Pop", price: 10, type: "click" },
    { id: "spin-7", name: "Bass Drop", price: 35, type: "motor" },
    { id: "spin-8", name: "Synth Wave", price: 40, type: "arcade" },
    { id: "spin-9", name: "Ping Pong", price: 12, type: "click" },
    { id: "spin-10", name: "Turbo", price: 28, type: "digital" }
];

// ==================== 2. SONS DE FIM (quando a roleta para) ====================
window.SONS_FIM = [
    { id: "end-1", name: "Acorde Simples", price: 0, type: "end-chord" },
    { id: "end-2", name: "Plim Sino", price: 15, type: "end-bell" },
    { id: "end-3", name: "Moeda Arcade", price: 25, type: "end-coin" },
    { id: "end-4", name: "Impacto", price: 10, type: "end-thud" },
    { id: "end-5", name: "Zapp Digital", price: 20, type: "end-zap" },
    // NOVOS
    { id: "end-6", name: "Gong", price: 30, type: "end-bell" },
    { id: "end-7", name: "Cymbal Crash", price: 22, type: "end-thud" },
    { id: "end-8", name: "Eco", price: 18, type: "end-chord" },
    { id: "end-9", name: "Sparkle", price: 26, type: "end-coin" },
    { id: "end-10", name: "Pulse", price: 14, type: "end-zap" }
];

// ==================== 3. SONS DE VITÓRIA (comemoração real) ====================
window.SONS_VITORIA = [
    { id: "win-1", name: "Grande Tada!", price: 0, type: "win-tada" },
    { id: "win-2", name: "Aplausos", price: 25, type: "win-applause" },
    { id: "win-3", name: "Vitória Arcade", price: 30, type: "win-arcade" },
    { id: "win-4", name: "Épico", price: 35, type: "win-epic" },
    { id: "win-5", name: "Festa Chiptune", price: 40, type: "win-party" },
    // NOVOS
    { id: "win-6", name: "Fanfarra", price: 45, type: "win-tada" },
    { id: "win-7", name: "Fogos", price: 50, type: "win-applause" },
    { id: "win-8", name: "Metal", price: 38, type: "win-arcade" },
    { id: "win-9", name: "Orquestra", price: 55, type: "win-epic" },
    { id: "win-10", name: "Funk", price: 42, type: "win-party" }
];