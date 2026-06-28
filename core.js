// Estado Global do App
const EstadoApp = {
    moedas: 0,
    itensRoleta: [
        { nome: 'Pizza', icone: '🍕' },
        { nome: 'Hambúrguer', icone: '🍔' },
        { nome: 'Sushi', icone: '🍣' },
        { nome: 'Sorvete', icone: '🍦' }
    ],
    estaGirando: false
};

// Configuração básica do Canvas da Roleta
const canvas = document.getElementById('canvas-roleta');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;

function desenharRoleta(anguloAtual = 0) {
    const qtdItens = EstadoApp.itensRoleta.length;
    if (qtdItens === 0) return;
    
    const sliceAngle = (2 * Math.PI) / qtdItens;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    EstadoApp.itensRoleta.forEach((item, i) => {
        const startAngle = anguloAtual + (i * sliceAngle);
        const endAngle = startAngle + sliceAngle;
        
        // Cores alternadas em gradiente/estilo vibrante
        ctx.fillStyle = i % 2 === 0 ? '#4338ca' : '#6d28d9';
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Desenhar Texto/Ícone
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px sans-serif";
        // Mostra o ícone e o nome
        ctx.fillText(`${item.icone} ${item.nome}`, radius - 20, 10);
        ctx.restore();
    });
}

// Inicializa a roleta limpa no começo
desenharRoleta();
