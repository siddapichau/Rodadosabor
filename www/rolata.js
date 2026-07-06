'use strict';
console.log('roleta.js carregado (v7 - definitiva)');

let startAngle = 0;
let isSpinning = false;
let spinSpeed = 0;
let spinTimeTotal = 0;
let spinTimeCount = 0;
let lastSoundAngle = 0;
let drawAttempts = 0;

// ========================== GARANTIR TAMANHO DO CANVAS ==========================
function forceCanvasSize() {
    const canvas = document.getElementById('rouletteCanvas');
    if (!canvas) return false;
    
    // Tenta obter o tamanho do pai
    const parent = canvas.parentElement;
    let width = parent ? parent.clientWidth : 0;
    let height = parent ? parent.clientHeight : 0;
    
    // Se não tiver tamanho, usa valores padrão
    if (width < 10) width = Math.min(window.innerWidth * 0.8, 400);
    if (height < 10) height = width; // mantém quadrado
    
    // Aplica ao canvas
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
    
    return true;
}

// ========================== DESENHO ==========================
window.drawRoulette = function() {
    const canvas = document.getElementById('rouletteCanvas');
    if (!canvas) {
        console.warn('Canvas não encontrado');
        return false;
    }
    
    // Força o tamanho se estiver zero
    if (canvas.width < 10 || canvas.height < 10) {
        forceCanvasSize();
        if (canvas.width < 10 || canvas.height < 10) {
            console.warn('Canvas ainda sem tamanho, aguardando...');
            return false;
        }
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.46;

    ctx.clearRect(0, 0, width, height);

    // Obtém as comidas (com fallback)
    let items = window.appState?.foods || [];
    if (!items || items.length === 0) {
        items = ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Salada 🥗"];
    }
    const numSegments = items.length;

    // Cores
    const fallbackColors = ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'];
    let colors = fallbackColors;
    let wheelBorder = '#f5b342';
    let wheelCenter = '#f5d742';

    try {
        if (window.listTemas && window.listTemas.length > 0) {
            const theme = window.listTemas.find(t => t.id === window.appState?.currentRouletteTheme) || window.listTemas[0];
            const mode = window.appState?.darkMode ? 'dark' : 'light';
            const themeData = theme[mode];
            if (themeData && themeData.colors) {
                colors = themeData.colors;
                wheelBorder = themeData.colors[0] || '#f5b342';
                wheelCenter = themeData.colors[2] || '#f5d742';
            }
        }
    } catch (e) { /* fallback */ }

    if (numSegments === 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc';
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.font = `bold ${radius * 0.12}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Adicione comidas!', centerX, centerY);
        return true;
    }

    const arcSize = (2 * Math.PI) / numSegments;
    const borderWidth = radius * 0.045;

    // Borda
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + borderWidth, 0, 2 * Math.PI);
    ctx.fillStyle = wheelBorder;
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bolinhas
    for (let b = 0; b < 20; b++) {
        const bAngle = (b * 2 * Math.PI) / 20;
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
        const color = colors[i % colors.length];

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentArc, currentArc + arcSize);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentArc + arcSize / 2);

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const textRadius = radius * 0.82;
        const maxTextWidth = (2 * Math.PI * textRadius) / numSegments * 0.75;
        let fontSize = Math.min(radius * 0.13, 26);
        ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;

        let textWidth = ctx.measureText(items[i]).width;
        if (textWidth > maxTextWidth && fontSize > 6) {
            fontSize = Math.max(6, fontSize * (maxTextWidth / textWidth));
            ctx.font = `bold ${fontSize}px 'Inter', sans-serif';
        }

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        ctx.fillText(items[i], textRadius, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Centro
    const centerRadius = radius * 0.16;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = wheelCenter;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = centerRadius * 0.15;
    ctx.fill();
    ctx.stroke();

    return true;
};

// ========================== INICIALIZAÇÃO REPETIDA ==========================
let initInterval = null;

function tryInitRoulette() {
    drawAttempts++;
    const success = window.drawRoulette();
    if (success) {
        console.log('✅ Roleta desenhada com sucesso na tentativa ' + drawAttempts);
        if (initInterval) {
            clearInterval(initInterval);
            initInterval = null;
        }
    } else {
        console.warn('⚠️ Tentativa ' + drawAttempts + ' falhou, aguardando...');
        if (drawAttempts > 15) {
            // Se não conseguir em 15 tentativas, força um tamanho manual
            const canvas = document.getElementById('rouletteCanvas');
            if (canvas) {
                canvas.width = 300;
                canvas.height = 300;
                canvas.style.width = '300px';
                canvas.style.height = '300px';
                window.drawRoulette();
                if (initInterval) {
                    clearInterval(initInterval);
                    initInterval = null;
                }
            }
        }
    }
}

// ========================== GIRO ==========================
window.spinRoulette = function() {
    if (isSpinning || window.appState?.foods?.length === 0) return;

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

    const arcSize = (2 * Math.PI) / (window.appState?.foods?.length || 4);
    if (Math.abs(startAngle - lastSoundAngle) >= arcSize) {
        const activeSpinSound = (window.SONS_GIRO && window.SONS_GIRO.find(s => s.id === window.appState?.currentSpinSound)) || { type: 'click' };
        window.playSynthesizedSound(activeSpinSound.type);
        lastSoundAngle = startAngle;
    }
    requestAnimationFrame(animateSpin);
}

function finalizeSpin() {
    const numSegments = window.appState?.foods?.length || 0;
    if (numSegments === 0) {
        const btn = document.getElementById('btnSpin');
        if (btn) btn.disabled = false;
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;
    let angleFromStart = (-Math.PI / 2 - startAngle) % (2 * Math.PI);
    if (angleFromStart < 0) angleFromStart += 2 * Math.PI;
    let index = Math.floor(angleFromStart / arcSize);
    if (index >= numSegments) index = 0;
    if (index < 0) index = numSegments - 1;

    const winningFood = window.appState.foods[index];

    const activeEndSound = (window.SONS_FIM && window.SONS_FIM.find(s => s.id === window.appState.currentEndSound)) || { type: 'end-chord' };
    window.playSynthesizedSound(activeEndSound.type);

    setTimeout(() => {
        const activeWinSound = (window.SONS_VITORIA && window.SONS_VITORIA.find(s => s.id === window.appState.currentWinSound)) || { type: 'win-tada' };
        window.playSynthesizedSound(activeWinSound.type);

        if (typeof window.launchCurrentEffect === 'function') {
            window.launchCurrentEffect();
        } else {
            window.launchConfetti();
        }

        const nameEl = document.getElementById('modalFoodName');
        const emojiEl = document.getElementById('modalEmoji');
        const overlay = document.getElementById('resultOverlay');
        if (nameEl && emojiEl && overlay) {
            nameEl.textContent = winningFood;
            const emojiMatch = winningFood.match(/\p{Emoji}/u);
            emojiEl.textContent = emojiMatch ? emojiMatch[0] : '🍽️';
            overlay.style.display = 'flex';
        }

        const btn = document.getElementById('btnSpin');
        if (btn) btn.disabled = false;
    }, 1000);
}

// ========================== INICIAR ==========================
function startRoulette() {
    // Força o tamanho do canvas assim que possível
    forceCanvasSize();
    
    // Tenta desenhar imediatamente
    setTimeout(tryInitRoulette, 100);
    
    // E repete a cada 500ms até conseguir
    initInterval = setInterval(tryInitRoulette, 500);
    
    // Também redesenha ao redimensionar
    window.addEventListener('resize', function() {
        forceCanvasSize();
        window.drawRoulette();
    });
}

// Inicia quando a página carregar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startRoulette();
} else {
    document.addEventListener('DOMContentLoaded', startRoulette);
}