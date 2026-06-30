'use strict';
console.log('roleta.js carregado');

// Variáveis de estado da roleta
let startAngle = 0;
let isSpinning = false;
let spinSpeed = 0;
let spinTimeTotal = 0;
let spinTimeCount = 0;
let lastSoundAngle = 0;

// ========================== DESENHO DA ROLETA ==========================
window.drawRoulette = function() {
    const canvas = document.getElementById('rouletteCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.46; 

    ctx.clearRect(0, 0, width, height);

    const theme = window.listTemas.find(t => t.id === window.appState.currentRouletteTheme) || window.listTemas[0];
    const mode = window.appState.darkMode ? 'dark' : 'light';
    const themeData = theme[mode];
    const items = window.appState.foods;
    const numSegments = items.length;

    if (numSegments === 0) {
        ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc'; ctx.fill();
        ctx.fillStyle = '#333';
        ctx.font = `bold ${radius * 0.12}px Inter`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('Adicione comidas!', centerX, centerY);
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;
    const borderWidth = radius * 0.045;

    ctx.beginPath(); ctx.arc(centerX, centerY, radius + borderWidth, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-border)'; ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;

    for (let b = 0; b < 20; b++) {
        const bAngle = (b * 2 * Math.PI) / 20;
        const bx = centerX + (radius + borderWidth * 0.6) * Math.cos(bAngle);
        const by = centerY + (radius + borderWidth * 0.6) * Math.sin(bAngle);
        ctx.beginPath(); ctx.arc(bx, by, radius * 0.02, 0, 2 * Math.PI); ctx.fillStyle = '#ffffff'; ctx.fill();
    }

    for (let i = 0; i < numSegments; i++) {
        const currentArc = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = themeData.colors[i % themeData.colors.length];
        ctx.moveTo(centerX, centerY); ctx.arc(centerX, centerY, radius, currentArc, currentArc + arcSize); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentArc + arcSize / 2);
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        
        // Auto-ajuste da fonte e distância do centro
        const textRadius = radius * 0.78; 
        let fontSize = Math.min(radius * 0.13, 28); 
        
        ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        
        const textWidth = ctx.measureText(items[i]).width;
        const maxWidth = (2 * Math.PI * textRadius) / numSegments * 0.85;
        if (textWidth > maxWidth) {
            fontSize = fontSize * (maxWidth / textWidth);
            ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        }

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 8;
        ctx.fillText(items[i], textRadius, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    const centerRadius = radius * 0.16;
    ctx.beginPath(); ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-center)'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = centerRadius * 0.15; ctx.fill(); ctx.stroke();
};

// ========================== LÓGICA DE GIRO ==========================
window.spinRoulette = function() {
    if (isSpinning || window.appState.foods.length === 0) return;
    
    if (window.appState.coins < 1) {
        alert("Você precisa de 1 moeda para girar! Assista a um anúncio para ganhar moedas.");
        return;
    }
    window.appState.coins -= 1;
    window.saveData();
    if (typeof window.updateCoinsDisplay === 'function') window.updateCoinsDisplay();

    const btn = document.getElementById('btnSpin');
    if (btn) btn.disabled = true;

    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    isSpinning = true;
    spinTimeCount = 0;
    spinTimeTotal = Math.random() * 1000 + 4000;
    spinSpeed = Math.random() * 0.3 + 0.4;
    lastSoundAngle = startAngle;
    animateSpin();
};

function animateSpin() {
    spinTimeCount += 20;
    if (spinTimeCount >= spinTimeTotal) {
        isSpinning = false;
        finalizeSpin();
        return;
    }
    const progress = spinTimeCount / spinTimeTotal;
    const currentVelocity = spinSpeed * Math.pow(1 - progress, 2);
    startAngle += currentVelocity;
    window.drawRoulette();

    const arcSize = (2 * Math.PI) / window.appState.foods.length;
    if (Math.abs(startAngle - lastSoundAngle) >= arcSize) {
        const activeSpinSound = (window.SONS_GIRO && window.SONS_GIRO.find(s => s.id === window.appState.currentSpinSound)) || { type: 'click' };
        window.playSynthesizedSound(activeSpinSound.type);
        lastSoundAngle = startAngle;
    }
    requestAnimationFrame(animateSpin);
}

function finalizeSpin() {
    const numSegments = window.appState.foods.length;
    if (numSegments === 0) return;

    // 🔥 CORREÇÃO MATEMÁTICA DO ÍNDICE (100% precisa)
    const arcSize = (2 * Math.PI) / numSegments;
    // Calcula o ângulo normalizado do marcador (topo = -PI/2) em relação ao startAngle
    let normalizedAngle = ((-startAngle + Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    let index = Math.floor(normalizedAngle / arcSize);
    if (index >= numSegments) index = numSegments - 1;

    const winningFood = window.appState.foods[index];

    // Som de fim (parada)
    const activeEndSound = (window.SONS_FIM && window.SONS_FIM.find(s => s.id === window.appState.currentEndSound)) || { type: 'end-chord' };
    window.playSynthesizedSound(activeEndSound.type);

    // Espera 1,5 segundos para o suspense
    setTimeout(() => {
        // Som de vitória + confetes
        const activeWinSound = (window.SONS_VITORIA && window.SONS_VITORIA.find(s => s.id === window.appState.currentWinSound)) || { type: 'win-tada' };
        window.playSynthesizedSound(activeWinSound.type);
        window.launchConfetti();

        const nameEl = document.getElementById('modalFoodName');
        const emojiEl = document.getElementById('modalEmoji');
        const overlay = document.getElementById('resultOverlay');
        if (nameEl && emojiEl && overlay) {
            nameEl.textContent = winningFood;
            const emojiMatch = winningFood.match(/[\p{Emoji_Presentation}\p{Emoji}☀-➿]/u);
            emojiEl.textContent = emojiMatch ? emojiMatch[0] : '🍽️';
            overlay.style.display = 'flex';
        }

        // Libera o botão
        const btn = document.getElementById('btnSpin');
        if (btn) btn.disabled = false;
    }, 1500);
}
