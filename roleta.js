'use strict';
console.log('roleta.js carregado');

let startAngle = 0;
let isSpinning = false;
let spinSpeed = 0;
let spinTimeTotal = 0;
let spinTimeCount = 0;
let lastSoundAngle = 0;

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
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc';
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.font = `bold ${radius * 0.12}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Adicione comidas!', centerX, centerY);
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;
    const borderWidth = radius * 0.045;

    // Borda externa
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + borderWidth, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-border)';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pontinhos
    const numDots = 20;
    for (let b = 0; b < numDots; b++) {
        const bAngle = (b * 2 * Math.PI) / numDots;
        const bx = centerX + (radius + borderWidth * 0.6) * Math.cos(bAngle);
        const by = centerY + (radius + borderWidth * 0.6) * Math.sin(bAngle);
        ctx.beginPath();
        ctx.arc(bx, by, radius * 0.02, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    // Segmentos
    for (let i = 0; i < numSegments; i++) {
        const currentArc = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = themeData.colors[i % themeData.colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentArc, currentArc + arcSize);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Texto - agora mais afastado do centro para não ficar sob o botão
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentArc + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const fontSize = Math.min(radius * 0.14, 40);
        ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        // Novo: posição do texto a 70% do raio para deixar espaço central
        ctx.fillText(items[i], radius * 0.70, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Centro da roleta (menor, para não cobrir o texto)
    const centerRadius = radius * 0.13;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--wheel-center)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = centerRadius * 0.15;
    ctx.fill();
    ctx.stroke();
};

window.spinRoulette = function() {
    // Verifica se já está girando ou se há comidas
    if (isSpinning || window.appState.foods.length === 0) return;

    // Verifica moedas
    if (window.appState.coins < 1) {
        alert("Você precisa de pelo menos 1 moeda para girar! Assista a um anúncio para ganhar moedas.");
        return;
    }

    // Desabilita o botão e subtrai moeda
    const btnSpin = document.getElementById('btnSpin');
    if (btnSpin) btnSpin.disabled = true;
    
    window.appState.coins -= 1;
    window.saveData();
    updateCoinsDisplay(); // precisa ser global ou chamar a função do app.js

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
        // Reabilita o botão
        const btnSpin = document.getElementById('btnSpin');
        if (btnSpin) btnSpin.disabled = false;
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

    const pointerAngle = -Math.PI / 2;
    let angle = startAngle % (2 * Math.PI);
    if (angle < 0) angle += 2 * Math.PI;
    let relativeAngle = (pointerAngle - angle + 2 * Math.PI) % (2 * Math.PI);
    let index = Math.floor(relativeAngle / (2 * Math.PI / numSegments));
    if (index < 0) index = 0;
    if (index >= numSegments) index = numSegments - 1;

    const winningFood = window.appState.foods[index];

    const activeEndSound = (window.SONS_FIM && window.SONS_FIM.find(s => s.id === window.appState.currentEndSound)) || { type: 'end-chord' };
    window.playSynthesizedSound(activeEndSound.type);

    setTimeout(() => {
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
    }, 1500);
}
