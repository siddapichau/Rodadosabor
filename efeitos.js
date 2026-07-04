'use strict';
console.log('efeitos.js carregado');

// ========================== CONFETES ==========================
let confettiPieces = [];
let confettiRunning = false;

window.launchConfetti = function() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Se outro efeito estiver rodando, paramos e limpamos
    if (confettiRunning) return;
    // Se fireworkRunning ou starRunning, podemos parar também? Para simplicidade, vamos apenas permitir.
    // Mas como usam o mesmo canvas, melhor parar os outros.
    if (window.fireworkRunning) { window.fireworkRunning = false; fireworkPieces = []; }
    if (window.starRunning) { window.starRunning = false; starPieces = []; }
    
    confettiRunning = true;
    confettiPieces = [];
    const colors = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#44f', '#ffa500', '#ff69b4', '#adff2f', '#ff4500', '#9400d3', '#00ffff'];
    const shapes = ['circle', 'square', 'diamond', 'triangle'];
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
            rotSpeed: (Math.random() - 0.5) * 12
        });
    }
    animateConfetti(confettiCanvas, confettiCanvas.getContext('2d'));
};

function animateConfetti(canvas, ctx) {
    if (confettiPieces.length === 0 || !confettiRunning) {
        confettiRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
        const p = confettiPieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height + 50) {
            confettiPieces.splice(i, 1);
            continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, 1 - (p.y / canvas.height) * 0.8);
        ctx.fillStyle = p.color;
        switch (p.shape) {
            case 'circle': ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 2 * Math.PI); ctx.fill(); break;
            case 'square': ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); break;
            case 'diamond': ctx.beginPath(); ctx.moveTo(0, -p.h / 2); ctx.lineTo(p.w / 2, 0); ctx.lineTo(0, p.h / 2); ctx.lineTo(-p.w / 2, 0); ctx.closePath(); ctx.fill(); break;
            case 'triangle': ctx.beginPath(); ctx.moveTo(0, -p.h / 2); ctx.lineTo(p.w / 2, p.h / 2); ctx.lineTo(-p.w / 2, p.h / 2); ctx.closePath(); ctx.fill(); break;
        }
        ctx.restore();
    }
    requestAnimationFrame(() => animateConfetti(canvas, ctx));
}

// ========================== NOVO EFEITO 1: FOGOS DE ARTIFÍCIO ==========================
let fireworkParticles = [];
let fireworkRunning = false;

window.launchFireworks = function() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (fireworkRunning) return;
    // Parar outros efeitos
    if (confettiRunning) { confettiRunning = false; confettiPieces = []; }
    if (window.starRunning) { window.starRunning = false; starPieces = []; }
    
    fireworkRunning = true;
    fireworkParticles = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088'];
    for (let f = 0; f < 3; f++) {
        const cx = Math.random() * canvas.width;
        const cy = Math.random() * canvas.height * 0.6 + 50;
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 5 + 2;
            fireworkParticles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02,
                size: Math.random() * 4 + 2
            });
        }
    }
    animateFireworks(canvas, canvas.getContext('2d'));
};

function animateFireworks(canvas, ctx) {
    if (fireworkParticles.length === 0 || !fireworkRunning) {
        fireworkRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = fireworkParticles.length - 1; i >= 0; i--) {
        const p = fireworkParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= p.decay;
        if (p.life <= 0) {
            fireworkParticles.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, 2 * Math.PI);
        ctx.fill();
    }
    requestAnimationFrame(() => animateFireworks(canvas, ctx));
}

// ========================== NOVO EFEITO 2: ESTRELAS CADENTES ==========================
let starPieces = [];
let starRunning = false;

window.launchStars = function() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (starRunning) return;
    if (confettiRunning) { confettiRunning = false; confettiPieces = []; }
    if (fireworkRunning) { fireworkRunning = false; fireworkParticles = []; }
    
    starRunning = true;
    starPieces = [];
    for (let i = 0; i < 20; i++) {
        starPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 60 + 40}, 100%, 80%)`,
            life: 1.0,
            decay: 0.005 + Math.random() * 0.01
        });
    }
    animateStars(canvas, canvas.getContext('2d'));
};

function animateStars(canvas, ctx) {
    if (starPieces.length === 0 || !starRunning) {
        starRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = starPieces.length - 1; i >= 0; i--) {
        const p = starPieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > canvas.height) {
            starPieces.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let j = 0; j < 8; j++) {
            const angle = (j * Math.PI) / 4 - Math.PI / 2;
            const radius = j % 2 === 0 ? p.size : p.size * 0.4;
            const x = p.x + radius * Math.cos(angle);
            const y = p.y + radius * Math.sin(angle);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
    requestAnimationFrame(() => animateStars(canvas, ctx));
}