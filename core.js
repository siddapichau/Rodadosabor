// ============================================================
// ESTADO INICIAL (salvo no localStorage)
// ============================================================
let state = {
    coins: 20,
    darkMode: false,         // true = modo escuro ativo
    foods: [
        "Lasanha 🍝", "Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣",
        "Taco 🌮", "Salada 🥗", "Bolo 🍰", "Lámen 🍜",
        "Frango Assado 🍗", "Espaguete 🍝", "Sorvete 🍦", "Burrito 🌯"
    ],
    unlockedThemes: ["theme-1", "theme-2", "theme-3"], // IDs dos temas desbloqueados
    currentTheme: "theme-1",
    unlockedSpinSounds: ["spin-1"],
    currentSpinSound: "spin-1",
    unlockedWinSounds: ["win-1"],
    currentWinSound: "win-1"
};

if (localStorage.getItem('rodaDoSaborState')) {
    try {
        state = { ...state, ...JSON.parse(localStorage.getItem('rodaDoSaborState')) };
    } catch (e) { console.error(e); }
}

// ============================================================
// 10 TEMAS (cada um com versões LIGHT e DARK)
// ============================================================
const listTemas = [
    {
        id: "theme-1", name: "Amarelo + Verde", price: 0,
        light: {
            colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'],
            style: { bg: '#f3e7da', card: 'rgba(255,255,255,0.88)', text: '#1e2a3a', accent: '#7b9e5a' }
        },
        dark: {
            colors: ['#F5B342', '#7B9E5A', '#E94B3C', '#2A75D3', '#8E44AD', '#2ECC71', '#1A5276', '#E91E63'],
            style: { bg: '#1a1a1a', card: 'rgba(40,40,40,0.9)', text: '#f1f5f9', accent: '#7b9e5a' }
        }
    },
    {
        id: "theme-2", name: "Roxo + Azul", price: 0,
        light: {
            colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'],
            style: { bg: '#eef2ff', card: 'rgba(255,255,255,0.9)', text: '#1e1b4b', accent: '#6366f1' }
        },
        dark: {
            colors: ['#6366F1', '#4F46E5', '#A78BFA', '#7C6AD4', '#3B82F6', '#1D4ED8', '#818CF8', '#4338CA'],
            style: { bg: '#0f0f23', card: 'rgba(30,30,60,0.9)', text: '#e0e7ff', accent: '#818cf8' }
        }
    },
    {
        id: "theme-3", name: "Neon Vibrante", price: 0,
        light: {
            colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'],
            style: { bg: '#f0e6f0', card: 'rgba(255,240,255,0.9)', text: '#1a0a1a', accent: '#7000ff' }
        },
        dark: {
            colors: ['#FF007F', '#00F0FF', '#7000FF', '#FF00F0', '#00FF66', '#9900FF', '#0033FF', '#FFFF00'],
            style: { bg: '#0a0010', card: 'rgba(30,10,40,0.9)', text: '#f0e6f0', accent: '#ff00aa' }
        }
    },
    {
        id: "theme-4", name: "Pôr do Sol", price: 20,
        light: {
            colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'],
            style: { bg: '#fde9e0', card: 'rgba(255,245,235,0.9)', text: '#3d1a0e', accent: '#e64a19' }
        },
        dark: {
            colors: ['#FF5E36', '#FFAE34', '#FF2C7D', '#E0115F', '#FF7F50', '#DE3163', '#D2143A', '#FF4500'],
            style: { bg: '#1a0e0a', card: 'rgba(50,25,15,0.9)', text: '#f5e0d0', accent: '#ff6e40' }
        }
    },
    {
        id: "theme-5", name: "Floresta", price: 20,
        light: {
            colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'],
            style: { bg: '#e8f5e9', card: 'rgba(240,255,240,0.9)', text: '#1b3a1b', accent: '#2e7d32' }
        },
        dark: {
            colors: ['#2E8B57', '#3CB371', '#228B22', '#006400', '#8FBC8F', '#ADFF2F', '#556B2F', '#6B8E23'],
            style: { bg: '#0f1a0f', card: 'rgba(20,40,20,0.9)', text: '#d0e8d0', accent: '#66bb6a' }
        }
    },
    {
        id: "theme-6", name: "Oceano", price: 30,
        light: {
            colors: ['#005C53', '#9FC131', '#DBF227', '#D6D58E', '#042940', '#005C53', '#042940', '#9FC131'],
            style: { bg: '#e0f2f1', card: 'rgba(225,245,245,0.9)', text: '#004d40', accent: '#00695c' }
        },
        dark: {
            colors: ['#005C53', '#9FC131', '#DBF227', '#D6D58E', '#042940', '#005C53', '#042940', '#9FC131'],
            style: { bg: '#0a1a1a', card: 'rgba(10,40,40,0.9)', text: '#b2dfdb', accent: '#26a69a' }
        }
    },
    {
        id: "theme-7", name: "Chocolate Ouro", price: 30,
        light: {
            colors: ['#4A2E2B', '#7B3F00', '#A0522D', '#D2691E', '#CD853F', '#F5B342', '#E5A93C', '#3D2314'],
            style: { bg: '#f5ede3', card: 'rgba(255,250,240,0.9)', text: '#3e2723', accent: '#8d6e63' }
        },
        dark: {
            colors: ['#4A2E2B', '#7B3F00', '#A0522D', '#D2691E', '#CD853F', '#F5B342', '#E5A93C', '#3D2314'],
            style: { bg: '#1a100c', card: 'rgba(40,25,18,0.9)', text: '#f0dcc0', accent: '#d4ac0d' }
        }
    },
    {
        id: "theme-8", name: "Morango Creme", price: 40,
        light: {
            colors: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FFCCD5', '#FFF0F3', '#C9184A', '#A11D33'],
            style: { bg: '#fce4ec', card: 'rgba(255,240,245,0.9)', text: '#4a1a2a', accent: '#e91e63' }
        },
        dark: {
            colors: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FFCCD5', '#FFF0F3', '#C9184A', '#A11D33'],
            style: { bg: '#1a0a0e', card: 'rgba(50,20,30,0.9)', text: '#fce4ec', accent: '#ff4d6d' }
        }
    },
    {
        id: "theme-9", name: "Galáxia Retro", price: 40,
        light: {
            colors: ['#140152', '#22007C', '#0D00A3', '#03001E', '#730071', '#41006F', '#AA0078', '#FF00AA'],
            style: { bg: '#ede7f6', card: 'rgba(240,230,255,0.9)', text: '#1a0033', accent: '#7c4dff' }
        },
        dark: {
            colors: ['#140152', '#22007C', '#0D00A3', '#03001E', '#730071', '#41006F', '#AA0078', '#FF00AA'],
            style: { bg: '#0a0014', card: 'rgba(20,0,40,0.9)', text: '#e0d0f0', accent: '#aa0078' }
        }
    },
    {
        id: "theme-10", name: "Ouro Premium", price: 50,
        light: {
            colors: ['#1A1A1A', '#D4AC0D', '#2B2B2B', '#F5B342', '#111111', '#E5A93C', '#333333', '#9A7D0A'],
            style: { bg: '#faf5eb', card: 'rgba(255,250,240,0.9)', text: '#1a1a1a', accent: '#b8860b' }
        },
        dark: {
            colors: ['#1A1A1A', '#D4AC0D', '#2B2B2B', '#F5B342', '#111111', '#E5A93C', '#333333', '#9A7D0A'],
            style: { bg: '#0d0d0d', card: 'rgba(30,30,30,0.95)', text: '#f5e6c8', accent: '#d4ac0d' }
        }
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
// APLICAÇÃO DO TEMA (roleta + estilo do site)
// ============================================================
function applyTheme(themeId, darkMode) {
    const theme = listTemas.find(t => t.id === themeId) || listTemas[0];
    const mode = darkMode ? 'dark' : 'light';
    const themeData = theme[mode];
    if (!themeData) return;

    // Atualiza variáveis CSS do site
    const root = document.documentElement;
    root.style.setProperty('--bg-body', themeData.style.bg);
    root.style.setProperty('--bg-card', themeData.style.card);
    root.style.setProperty('--text-primary', themeData.style.text);
    root.style.setProperty('--accent', themeData.style.accent);
    // Gradiente do título
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${themeData.colors[0]}, ${themeData.colors[1]})`);
    // Borda e centro da roleta
    root.style.setProperty('--wheel-border', themeData.colors[0]);
    root.style.setProperty('--wheel-center', themeData.colors[2] || '#f5d742');

    // Salva no estado
    state.currentTheme = themeId;
    state.darkMode = darkMode;
    saveToStorage();
    drawRoulette();
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
    const theme = listTemas.find(t => t.id === state.currentTheme) || listTemas[0];
    const mode = state.darkMode ? 'dark' : 'light';
    const themeData = theme[mode];
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
        ctx.fillStyle = themeData.colors[i % themeData.colors.length];
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
        ctx.font = "bold 40px 'Inter', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        ctx.fillText(items[i], 235, 0);
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

    // Dispara confetes com mais formas e cores
    launchConfetti();

    setTimeout(() => {
        document.getElementById('modalFoodName').textContent = winningFood;
        const emojiMatch = winningFood.match(/[\p{Emoji_Presentation}\p{Emoji}☀-➿]/u);
        document.getElementById('modalEmoji').textContent = emojiMatch ? emojiMatch[0] : "🍽️";
        document.getElementById('resultOverlay').style.display = 'flex';
    }, 300);
}

// ============================================================
// CONFETES (7 formas diferentes)
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
    const colors = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#44f', '#ffa500', '#ff69b4', '#adff2f', '#ff4500', '#9400d3', '#00ffff'];
    const shapes = ['circle', 'square', 'star', 'heart', 'diamond', 'triangle', 'star6'];

    for (let i = 0; i < 180; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            w: Math.random() * 14 + 6,
            h: Math.random() * 14 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            vx: (Math.random() - 0.5) * 7,
            vy: Math.random() * 5 + 3,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
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
            case 'triangle':
                confCtx.beginPath();
                confCtx.moveTo(0, -p.h / 2);
                confCtx.lineTo(p.w / 2, p.h / 2);
                confCtx.lineTo(-p.w / 2, p.h / 2);
                confCtx.closePath();
                          
