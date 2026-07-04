window.drawRoulette = function() {
    console.log('🎯 drawRoulette iniciada');
    const canvas = document.getElementById('rouletteCanvas');
    if (!canvas) {
        console.error('❌ Canvas não encontrado!');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('❌ Contexto 2D não suportado');
        return;
    }

    // Ajusta o tamanho do canvas para corresponder ao CSS
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width || 600;
        canvas.height = rect.height || 600;
        console.log('Canvas redimensionado para:', canvas.width, canvas.height);
    }

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.46;

    ctx.clearRect(0, 0, width, height);

    // Cores (fallback)
    const fallbackColors = ['#f5b342', '#7b9e5a', '#e94b3c', '#4a90d9', '#9b59b6', '#f39c12'];
    let colors = fallbackColors;
    let wheelBorder = '#f5b342';
    let wheelCenter = '#f5d742';

    try {
        if (window.listTemas && window.listTemas.length > 0) {
            const theme = window.listTemas.find(t => t.id === window.appState.currentRouletteTheme) || window.listTemas[0];
            const mode = window.appState.darkMode ? 'dark' : 'light';
            const themeData = theme[mode];
            if (themeData && themeData.colors) {
                colors = themeData.colors;
                wheelBorder = themeData.colors[0] || '#f5b342';
                wheelCenter = themeData.colors[2] || '#f5d742';
            }
        }
    } catch (e) {
        console.warn('Erro ao carregar tema, usando fallback:', e);
    }

    const items = window.appState?.foods || [];
    const numSegments = items.length;

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
        console.log('Nenhuma comida para desenhar.');
        return;
    }

    const arcSize = (2 * Math.PI) / numSegments;
    const borderWidth = radius * 0.045;

    // Borda externa
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + borderWidth, 0, 2 * Math.PI);
    ctx.fillStyle = wheelBorder;
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bolinhas decorativas
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
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentArc, currentArc + arcSize);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // ---- TEXTO AJUSTADO ----
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentArc + arcSize / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Distância do centro: 85% do raio (mais próximo da borda)
        const textRadius = radius * 0.85;
        // Calcula o tamanho máximo da fonte baseado no espaço disponível no arco
        const maxTextWidth = (2 * Math.PI * textRadius) / numSegments * 0.85;
        let fontSize = Math.min(radius * 0.14, 28);
        ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        let textWidth = ctx.measureText(items[i]).width;
        if (textWidth > maxTextWidth && fontSize > 10) {
            fontSize = Math.max(10, fontSize * (maxTextWidth / textWidth));
            ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
        }
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        // Posiciona o texto no raio calculado, centralizado no segmento
        ctx.fillText(items[i], textRadius, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Centro da roleta (por baixo do botão)
    const centerRadius = radius * 0.16;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = wheelCenter;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = centerRadius * 0.15;
    ctx.fill();
    ctx.stroke();

    console.log('✅ Roleta desenhada com', numSegments, 'segmentos');
};