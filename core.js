// CONFIGURAÇÕES INICIAIS / BANCO DE DADOS LOCAL
let state = {
    coins: 0, // Começa obrigatoriamente com zero
    darkMode: false,
    foods: [
        "Lasanha 🍝", "Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", 
        "Taco 🌮", "Salada 🥗", "Bolo 🍰", "Lámen 🍜"
    ],
    unlockedThemes: ["theme-1", "theme-2", "theme-3"],
    currentTheme: "theme-1",
    unlockedSpinSounds: ["spin-1"],
    currentSpinSound: "spin-1",
    unlockedWinSounds: ["win-1"],
    currentWinSound: "win-1"
};

if(localStorage.getItem('rodaDoSaborState')) {
    try {
        state = { ...state, ...JSON.parse(localStorage.getItem('rodaDoSaborState')) };
    } catch(e) { console.error(e); }
}

const listTemas = [
    { id: "theme-1", name: "Amarelo + Verde (Padrão)", price: 0, colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'] },
    { id: "theme-2", name: "Roxo + Azul (Clássico)", price: 0, colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'] },
    { id: "theme-3", name: "Neon Vibrante", price: 0, colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'] },
    { id: "theme-4", name: "Pôr do Sol quentinho", price: 20, colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'] },
    { id: "theme-5", name: "Floresta Tropical", price: 20, colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'] },
    { id: "theme-6", name: "Oceano Profundo", price: 30, colors: ['#005C53', '#9FC131', '#DBF227', '#D6D58E', '#042940', '#005C53', '#042940', '#9FC131'] },
    { id: "theme-7", name: "Chocolate com Ouro", price: 30, colors: ['#4A2E2B', '#7B3F00', '#A0522D', '#D2691E', '#CD853F', '#F5B342', '#E5A93C', '#3D2314'] },
    { id: "theme-8", name: "Morango com Creme", price: 40, colors: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FFCCD5', '#FFF0F3', '#C9184A', '#A11D33'] },
    { id: "theme-9", name: "Galáxia Retro", price: 40, colors: ['#140152', '#22007C', '#0D00A3', '#03001E', '#730071', '#41006F', '#AA0078', '#FF00AA'] },
    { id: "theme-10", name: "Ouro Premium Black", price: 50, colors: ['#1A1A1A', '#D4AC0D', '#2B2B2B', '#F5B342', '#111111', '#E5A93C', '#333333', '#9A7D0A'] },
];

const listSpinSounds = [
    { id: "spin-1", name: "Estalo Clássico", price: 0, type: "click" },
    { id: "spin-2", name: "Swoosh Rápido", price: 15, type: "swoosh" },
    { id: "spin-3", name: "Efeito Arcade", price: 25, type: "arcade" }
];

const listWinSounds = [
    { id: "win-1", name: "Tadaa! Inicial", price: 0, type: "tada" },
    { id: "win-2", name: "Sino Festivo", price: 15, type: "bell" },
    { id: "win-3", name: "Level Up Épico", price: 25, type: "levelup" }
];

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSynthesizedSound(soundType) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    switch(soundType) {
        case 'click':
            let osc1 = audioCtx.createOscillator();
            let gain1 = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(400, now);
            osc1.frequency.exponentialRampToValueAtTime(80, now + 0.04);
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
            osc1.connect(gain1); gain1.connect(audioCtx.destination);
            osc1.start(now); osc1.stop(now + 0.04);
            break;
        case 'swoosh':
            let osc2 = audioCtx.createOscillator();
            let gain2 = audioCtx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(80, now);
            osc2.frequency.exponentialRampToValueAtTime(250, now + 0.08);
            gain2.gain.setValueAtTime(0.2, now);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc2.connect(gain2); gain2.connect(audioCtx.destination);
            osc2.start(now); osc2.stop(now + 0.08);
            break;
        case 'arcade':
            let osc3 = audioCtx.createOscillator();
            let gain3 = audioCtx.createGain();
            osc3.type = 'square';
            osc3.frequency.setValueAtTime(600, now);
            osc3.frequency.setValueAtTime(900, now + 0.03);
            gain3.gain.setValueAtTime(0.15, now);
            gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
            osc3.connect(gain3); gain3.connect(audioCtx.destination);
            osc3.start(now); osc3.stop(now + 0.06);
            break;
        case 'tada':
            [523.25, 659.25, 783.99].forEach((freq, idx) => {
                let o = audioCtx.createOscillator();
                let g = audioCtx.createGain();
                o.type = 'sine';
                o.frequency.setValueAtTime(freq, now + idx*0.05);
                g.gain.setValueAtTime(0.2, now + idx*0.05);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                o.connect(g); g.connect(audioCtx.destination);
                o.start(now + idx*0.05); o.stop(now + 0.4);
            });
            break;
        case 'bell':
            let oBell = audioCtx.createOscillator();
            let gBell = audioCtx.createGain();
            oBell.type = 'triangle';
            oBell.frequency.setValueAtTime(987.77, now);
            gBell.gain.setValueAtTime(0.4, now);
            gBell.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            oBell.connect(gBell); gBell.connect(audioCtx.destination);
            oBell.start(now); oBell.stop(now + 0.6);
            break;
        case 'levelup':
            let notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, idx) => {
                let o = audioCtx.createOscillator();
                let g = audioCtx.createGain();
                o.type = 'square';
                o.frequency.setValueAtTime(freq, now + idx * 0.08);
                g.gain.setValueAtTime(0.15, now + idx * 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
                o.connect(g); g.connect(audioCtx.destination);
                o.start(now + idx * 0.08); o.stop(now + idx * 0.08 + 0.15);
            });
            break;
    }
}

function saveToStorage() {
    localStorage.setItem('rodaDoSaborState', JSON.stringify(state));
    document.getElementById('coin-balance').textContent = state.coins;
}

const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const center = canvas.width / 2;
let startAngle = 0;
let isSpinning = false;

function drawRoulette() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const activeTheme = listTemas.find(t => t.id === state.currentTheme) || listTemas[0];
    const items = state.foods;
    const numSegments = items.length;
    
    if(numSegments === 0) {
        ctx.beginPath();
        ctx.arc(center, center, 230, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc';
        ctx.fill();
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;

    ctx.beginPath();
    ctx.arc(center, center, 236, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-border)';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    for (let b = 0; b < 16; b++) {
        const bAngle = (b * (2 * Math.PI) / 16);
        const bx = center + 224 * Math.cos(bAngle);
        const by = center + 224 * Math.sin(bAngle);
        ctx.beginPath();
        ctx.arc(bx, by, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    for (let i = 0; i < numSegments; i++) {
        const currentArc = startAngle + (i * arcSize);
        ctx.beginPath();
        ctx.fillStyle = activeTheme.colors[i % activeTheme.colors.length];
        ctx.moveTo(center, center);
        ctx.arc(center, center, 212, currentArc, currentArc + arcSize);
        ctx.lineTo(center, center);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(currentArc + arcSize / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 34px 'Inter', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(items[i], 175, 0);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(center, center, 55, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-center)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
}
