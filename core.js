// ============================================================
// CONFIGURAÇÕES INICIAIS / BANCO DE DADOS LOCAL
// ============================================================
let state = {
    coins: 20, // começa com 20 moedas para o usuário experimentar
    darkMode: false,
    foods: [
        "Lasanha 🍝", "Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣",
        "Taco 🌮", "Salada 🥗", "Bolo 🍰", "Lámen 🍜",
        "Frango Assado 🍗", "Espaguete 🍝", "Sorvete 🍦", "Burrito 🌯"
    ],
    unlockedThemes: ["theme-1", "theme-2", "theme-3"],
    currentTheme: "theme-1",
    unlockedSpinSounds: ["spin-1"],
    currentSpinSound: "spin-1",
    unlockedWinSounds: ["win-1"],
    currentWinSound: "win-1",
    unlockedRecipes: [], // receitas desbloqueadas (por enquanto todas livres)
};

if (localStorage.getItem('rodaDoSaborState')) {
    try {
        state = { ...state, ...JSON.parse(localStorage.getItem('rodaDoSaborState')) };
    } catch (e) { console.error(e); }
}

// ============================================================
// TEMAS (10 temas com cores da roleta + estilo do site)
// ============================================================
const listTemas = [
    {
        id: "theme-1", name: "Amarelo + Verde", price: 0,
        colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'],
        style: { bg: '#f3e7da', card: 'rgba(255,255,255,0.88)', text: '#1e2a3a', accent: '#7b9e5a' }
    },
    {
        id: "theme-2", name: "Roxo + Azul", price: 0,
        colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'],
        style: { bg: '#11111d', card: 'rgba(26,26,43,0.88)', text: '#f1f5f9', accent: '#a78bfa' }
    },
    {
        id: "theme-3", name: "Neon Vibrante", price: 0,
        colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'],
        style: { bg: '#1a0a1a', card: 'rgba(40,20,40,0.9)', text: '#f0e6f0', accent: '#ff00aa' }
    },
    {
        id: "theme-4", name: "Pôr do Sol", price: 20,
        colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'],
        style: { bg: '#2d1b0e', card: 'rgba(60,40,25,0.9)', text: '#f5e6d3', accent: '#ff5e36' }
    },
    {
        id: "theme-5", name: "Floresta", price: 20,
        colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'],
        style: { bg: '#0f2a1a', card: 'rgba(20,50,30,0.9)', text: '#d4edda', accent: '#3cb371' }
    },
    {
        id: "theme-6", name: "Oceano", price: 30,
        colors: ['#005C53', '#9FC131', '#DBF227', '#D6D58E', '#042940', '#005C53', '#042940', '#9FC131'],
        style: { bg: '#0a1f2e', card: 'rgba(15,40,60,0.9)', text: '#cce5ff', accent: '#9fc131' }
    },
    {
        id: "theme-7", name: "Chocolate Ouro", price: 30,
        colors: ['#4A2E2B', '#7B3F00', '#A0522D', '#D2691E', '#CD853F', '#F5B342', '#E5A93C', '#3D2314'],
        style: { bg: '#1c110c', card: 'rgba(40,25,18,0.9)', text: '#f0dcc0', accent: '#d4ac0d' }
    },
    {
        id: "theme-8", name: "Morango Creme", price: 40,
        colors: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FFCCD5', '#FFF0F3', '#C9184A', '#A11D33'],
        style: { bg: '#1c0e12', card: 'rgba(50,20,30,0.9)', text: '#fce4ec', accent: '#ff4d6d' }
    },
    {
        id: "theme-9", name: "Galáxia Retro", price: 40,
        colors: ['#140152', '#22007C', '#0D00A3', '#03001E', '#730071', '#41006F', '#AA0078', '#FF00AA'],
        style: { bg: '#0a0014', card: 'rgba(20,0,40,0.9)', text: '#e0d0f0', accent: '#aa0078' }
    },
    {
        id: "theme-10", name: "Ouro Premium", price: 50,
        colors: ['#1A1A1A', '#D4AC0D', '#2B2B2B', '#F5B342', '#111111', '#E5A93C', '#333333', '#9A7D0A'],
        style: { bg: '#0d0d0d', card: 'rgba(30,30,30,0.95)', text: '#f5e6c8', accent: '#d4ac0d' }
    }
];

// ============================================================
// SONS (5 de giro + 5 de vitória)
// ============================================================
const listSpinSounds = [
    { id: "spin-1", name: "Clássico", price: 0, type: "click" },
    { id: "spin-2", name: "Swoosh", price: 15, type: "swoosh" },
    { id: "spin-3", name: "Arcade", price: 25, type: "arcade" },
    { id: "spin-4", name: "Whoosh", price: 20, type: "whoosh" },
    { id: "spin-5", name: "Digital", price: 30, type: "digital" }
];

const listWinSounds = [
    { id: "win-1", name: "Tadaa!", price: 0, type: "tada" },
    { id: "win-2", name: "Sino", price: 15, type: "bell" },
    { id: "win-3", name: "Level Up", price: 25, type: "levelup" },
    { id: "win-4", name: "Fanfarra", price: 30, type: "fanfare" },
    { id: "win-5", name: "Glória", price: 35, type: "glory" }
];

// ============================================================
// ÁUDIO (Web Audio API)
// ============================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSynthesizedSound(soundType) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    switch (soundType) {
        case 'click':
            osc(now, 400, 80, 0.04, 'sine', 0.3);
            break;
        case 'swoosh':
            osc(now, 80, 250, 0.08, 'triangle', 0.2);
            break;
        case 'arcade':
            oscSquare(now, 600, 900, 0.06, 0.15);
            break;
        case 'whoosh':
            osc(now, 60, 350, 0.15, 'sawtooth', 0.15);
            break;
        case 'digital':
            oscSquare(now, 500, 1200, 0.05, 0.1);
            break;
        case 'tada':
            [523.25, 659.25, 783.99].forEach((f, i) => {
                osc(now + i * 0.05, f, f, 0.4, 'sine', 0.2);
            });
            break;
        case 'bell':
            osc(now, 987.77, 987.77, 0.6, 'triangle', 0.4);
            break;
        case 'levelup':
            [261.63, 329.63, 392.00, 523.25].forEach((f, i) => {
                oscSquare(now + i * 0.08, f, f, 0.15, 0.15);
            });
            break;
        case 'fanfare':
            [392, 523, 659, 784, 880].forEach((f, i) => {
                osc(now + i * 0.1, f, f, 0.2, 'sine', 0.15);
            });
            break;
        case 'glory':
            [440, 554, 659, 880, 1108].forEach((f, i) => {
                osc(now + i * 0.06, f, f * 1.2, 0.3, 'sine', 0.12);
            });
            break;
        default:
            break;
    }
}

function osc(start, freqStart, freqEnd, duration, type, gain) {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freqStart, start);
    o.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start(start);
    o.stop(start + duration);
}

function oscSquare(start, freqStart, freqEnd, duration, gain) {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(freqStart, start);
    o.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start(start);
    o.stop(start + duration);
}

// ============================================================
// PERSISTÊNCIA
// ============================================================
function saveToStorage() {
    localStorage.setItem('rodaDoSaborState', JSON.stringify(state));
    document.getElementById('coin-balance').textContent = state.coins;
}

// ============================================================
// ROLETA (CANVAS)
// ============================================================
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

    if (numSegments === 0) {
        ctx.beginPath();
        ctx.arc(center, center, 280, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc';
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Adicione comidas!', center, center + 8);
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;

    // Borda externa
    ctx.beginPath();
    ctx.arc(center, center, 286, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-border)';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bolinhas decorativas
    for (let b = 0; b < 20; b++) {
        const bAngle = (b * (2 * Math.PI) / 20);
        const bx = center + 274 * Math.cos(bAngle);
        const by = center + 274 * Math.sin(bAngle);
        ctx.beginPath();
        ctx.arc(bx, by, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    // Segmentos
    for (let i = 0; i < numSegments; i++) {
        const currentArc = startAngle + (i * arcSize);
        ctx.beginPath();
        ctx.fillStyle = activeTheme.colors[i % activeTheme.colors.length];
        ctx.moveTo(center, center);
        ctx.arc(center, center, 260, currentArc, currentArc + arcSize);
        ctx.lineTo(center, center);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Texto do alimento
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(currentArc + arcSize / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 36px 'Inter', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        ctx.fillText(items[i], 225, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Círculo central
    ctx.beginPath();
    ctx.arc(center, center, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-center)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.fill();
    ctx.stroke();
}

// ============================================================
// GIRO E CONFETES
// ============================================================
let spinSpeed = 0;
let spinTimeTotal = 0;
let spinTimeCount = 0;
let lastSoundAngle = 0;

function spin() {
    if (isSpinning || state.foods.length === 0) return;
    isSpinning = true;

    spinTimeCount = 0;
    spinTimeTotal = Math.random() * 1000 + 4000;
    spinSpeed = Math.random() * 0.3 + 0.4;

    lastSoundAngle = startAngle;
    animateSpin();
}

function animateSpin() {
    spinTimeCount += 20;
    if (spinTimeCount >= spinTimeTotal) {
        isSpinning = false;
        finalizeSpin();
        return;
    }

    let progress = spinTimeCount / spinTimeTotal;
    let currentVelocity = spinSpeed * Math.pow(1 - progress, 2);

    startAngle += currentVelocity;
    drawRoulette();

    const arcSize = (2 * Math.PI) / state.foods.length;
    if (Math.abs(startAngle - lastSoundAngle) >= arcSize) {
        const activeSpinSound = listSpinSounds.find(s => s.id === state.currentSpinSound) || listSpinSounds[0];
        playSynthesizedSound(activeSpinSound.type);
        lastSoundAngle = startAngle;
    }

    requestAnimationFrame(animateSpin);
}

function finalizeSpin() {
    const numSegments = state.foods.length;
    let degrees = (startAngle * 180 / Math.PI) % 360;
    let index = Math.floor((360 - (degrees - 90)) % 360 / (360 / numSegments));
    if (index < 0) index = numSegments + index;
    const winningFood = state.foods[index];

    const activeWinSound = listWinSounds.find(s => s.id === state.currentWinSound) || listWinSounds[0];
    playSynthesizedSound(activeWinSound.type);

    // Dispara confetes
    launchConfetti();

    setTimeout(() => {
        document.getElementById('modalFoodName').textContent = winningFood;
        const emojiMatch = winningFood.match(/[\p{Emoji_Presentation}\p{Emoji}☀-➿]/u);
        document.getElementById('modalEmoji').textContent = emojiMatch ? emojiMatch[0] : "🍽️";
        document.getElementById('resultOverlay').style.display = 'flex';
    }, 300);
}

// ============================================================
// CONFETES (5 estilos diferentes)
// ============================================================
const confettiCanvas = document.getElementById('confettiCanvas');
const confCtx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiRunning = false;

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function launchConfetti() {
    if (confettiRunning) return;
    confettiRunning = true;
    confettiPieces = [];
    const colors = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#44f', '#ffa500', '#ff69b4'];
    const shapes = ['circle', 'square', 'star', 'heart', 'diamond']; // 5 estilos

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            w: Math.random() * 12 + 6,
            h: Math.random() * 12 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 4 + 3,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            life: 1
        });
    }
    animateConfetti();
}

function animateConfetti() {
    if (confettiPieces.length === 0) {
        confettiRunning = false;
        confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        return;
    }

    confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
        const p = confettiPieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rot += p.rotSpeed;

        if (p.y > confettiCanvas.height + 50) {
            confettiPieces.splice(i, 1);
            continue;
        }

        confCtx.save();
        confCtx.translate(p.x, p.y);
        confCtx.rotate((p.rot * Math.PI) / 180);
        confCtx.globalAlpha = Math.max(0, 1 - (p.y / confettiCanvas.height) * 0.8);
        confCtx.fillStyle = p.color;

        switch (p.shape) {
            case 'circle':
                confCtx.beginPath();
                confCtx.arc(0, 0, p.w / 2, 0, 2 * Math.PI);
                confCtx.fill();
                break;
            case 'square':
                confCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                break;
            case 'star':
                drawStar(confCtx, 0, 0, 5, p.w / 2, p.w / 4);
                break;
            case 'heart':
                drawHeart(confCtx, 0, 0, p.w);
                break;
            case 'diamond':
                confCtx.beginPath();
                confCtx.moveTo(0, -p.h / 2);
                confCtx.lineTo(p.w / 2, 0);
                confCtx.lineTo(0, p.h / 2);
                confCtx.lineTo(-p.w / 2, 0);
                confCtx.closePath();
                confCtx.fill();
                break;
        }
        confCtx.restore();
    }

    requestAnimationFrame(animateConfetti);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = -Math.PI / 2;
    const step = Math.PI / spikes;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const x = cx + r * Math.cos(rot);
        const y = cy + r * Math.sin(rot);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        rot += step;
    }
    ctx.closePath();
    ctx.fill();
}

function drawHeart(ctx, cx, cy, size) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.3);
    ctx.bezierCurveTo(cx - size * 0.5, cy - size * 0.3, cx - size * 0.7, cy + size * 0.2, cx, cy + size * 0.7);
    ctx.bezierCurveTo(cx + size * 0.7, cy + size * 0.2, cx + size * 0.5, cy - size * 0.3, cx, cy + size * 0.3);
    ctx.closePath();
    ctx.fill();
}

// ============================================================
// APLICAR TEMA VISUAL (além das cores da roleta)
// ============================================================
function applyThemeStyle(themeId) {
    const theme = listTemas.find(t => t.id === themeId) || listTemas[0];
    const root = document.documentElement;
    root.style.setProperty('--bg-body', theme.style.bg);
    root.style.setProperty('--bg-card', theme.style.card);
    root.style.setProperty('--text-primary', theme.style.text);
    root.style.setProperty('--accent', theme.style.accent);
    // também ajusta o gradiente do título
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`);
    // ajusta a borda da roleta
    root.style.setProperty('--wheel-border', theme.colors[0]);
    root.style.setProperty('--wheel-center', theme.colors[2] || '#f5d742');
    // salva
    state.currentTheme = themeId;
    saveToStorage();
}

// ============================================================
// EXPORTA FUNÇÕES GLOBAIS (usadas no app.js e HTML)
// ============================================================
window.state = state;
window.listTemas = listTemas;
window.listSpinSounds = listSpinSounds;
window.listWinSounds = listWinSounds;
window.saveToStorage = saveToStorage;
window.drawRoulette = drawRoulette;
window.spin = spin;
window.applyThemeStyle = applyThemeStyle;
window.playSynthesizedSound = playSynthesizedSound;
window.launchConfetti = launchConfetti;
