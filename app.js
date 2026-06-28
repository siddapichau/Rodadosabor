// Lista com opções de comidas pré-definidas (Simulando milhares)
const BANCO_DE_COMIDAS = [
    { nome: 'Pizza', icone: '🍕' }, { nome: 'Hambúrguer', icone: '🍔' },
    { nome: 'Sushi', icone: '🍣' }, { nome: 'Sorvete', icone: '🍦' },
    { nome: 'Taco', icone: '🌮' }, { nome: 'Burrito', icone: '🌯' },
    { nome: 'Salada', icone: '🥗' }, { nome: 'Frango', icone: '🍗' },
    { nome: 'Espaguete', icone: '🍝' }, { nome: 'Bolo', icone: '🍰' },
    { nome: 'Rosquinha', icone: '🍩' }, { nome: 'Pipoca', icone: '🍿' },
    { nome: 'Bata Frita', icone: '🍟' }, { nome: 'Cachorro Quente', icone: '🌭' }
];

let itensSelecionadosTemporarios = [...EstadoApp.itensRoleta];

// Elementos da Interface
const saldoMoedasEl = document.getElementById('saldo-moedas');
const btnGirar = document.getElementById('btn-girar');
const btnAnuncio = document.getElementById('btn-anuncio');
const modalComidas = document.getElementById('modal-comidas');
const btnAbrirComidas = document.getElementById('btn-abrir-comidas');
const btnFecharModal = document.querySelector('.fechar-modal');
const listaComidasOpcoes = document.getElementById('lista-comidas-opcoes');
const buscaComidaInput = document.getElementById('busca-comida');
const btnSalvarRoleta = document.getElementById('btn-salvar-roleta');
const overlayAnuncio = document.getElementById('container-anuncio-iframe');
const cronometroAnuncioEl = document.getElementById('cronometro-anuncio');
const anuncioFrame = document.getElementById('anuncio-frame');

// --- SISTEMA DE ANÚNCIO (20 segundos em Iframe) ---
btnAnuncio.addEventListener('click', () => {
    let tempoRestante = 20;
    cronometroAnuncioEl.textContent = tempoRestante;
    
    // Insira aqui o link de destino do anúncio/página
    anuncioFrame.src = "https://example.com"; 
    overlayAnuncio.style.display = 'flex';
    
    const contador = setInterval(() => {
        tempoRestante--;
        cronometroAnuncioEl.textContent = tempoRestante;
        
        if (tempoRestante <= 0) {
            clearInterval(contador);
            // Fecha o frame automaticamente
            overlayAnuncio.style.display = 'none';
            anuncioFrame.src = 'about:blank';
            
            // Adiciona exatamente 3 moedas
            EstadoApp.moedas += 3;
            saldoMoedasEl.textContent = EstadoApp.moedas;
            alert("Parabéns! Você assistiu o anúncio e ganhou 3 moedas!");
        }
    }, 1000);
});

// --- SISTEMA DA ROLETA (Sem ganho de moedas) ---
btnGirar.addEventListener('click', () => {
    if (EstadoApp.estaGirando) return;
    
    EstadoApp.estaGirando = true;
    let anguloAtual = 0;
    let velocidade = Math.random() * 0.4 + 0.3; // Velocidade inicial aleatória
    
    const animacao = setInterval(() => {
        anguloAtual += velocidade;
        velocidade *= 0.98; // Vai desacelerando
        
        desenharRoleta(anguloAtual);
        
        if (velocidade < 0.002) {
            clearInterval(animacao);
            EstadoApp.estaGirando = false;
            // Alerta simples indicando o término (sem pagar moedas)
            alert("A roleta parou!");
        }
    }, 16);
});

// --- SISTEMA DO POP-UP DE SELEÇÃO (Comidas) ---
btnAbrirComidas.addEventListener('click', () => {
    modalComidas.style.display = 'flex';
    renderizarOpcoesComida();
});

btnFecharModal.addEventListener('click', () => modalComidas.style.display = 'none');

function renderizarOpcoesComida(filtro = '') {
    listaComidasOpcoes.innerHTML = '';
    
    const filtradas = BANCO_DE_COMIDAS.filter(c => 
        c.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    
    filtradas.forEach(comida => {
        const div = document.createElement('div');
        div.className = 'item-comida-opcao';
        
        // Verifica se já está na lista para marcar como selecionado
        const jaSelecionado = itensSelecionadosTemporarios.some(i => i.nome === comida.nome);
        if (jaSelecionado) div.classList.add('selecionado');
        
        div.innerHTML = `<span>${comida.icone}</span>${comida.nome}`;
        
        div.addEventListener('click', () => {
            const index = itensSelecionadosTemporarios.findIndex(i => i.nome === comida.nome);
            if (index > -1) {
                itensSelecionadosTemporarios.splice(index, 1);
                div.classList.remove('selecionado');
            } else {
                itensSelecionadosTemporarios.push(comida);
                div.classList.add('selecionado');
            }
        });
        
        listaComidasOpcoes.appendChild(div);
    });
}

buscaComidaInput.addEventListener('input', (e) => {
    renderizarOpcoesComida(e.target.value);
});

btnSalvarRoleta.addEventListener('click', () => {
    if(itensSelecionadosTemporarios.length < 2) {
        alert("Selecione pelo menos 2 comidas para a roleta!");
        return;
    }
    EstadoApp.itensRoleta = [...itensSelecionadosTemporarios];
    desenharRoleta();
    modalComidas.style.display = 'none';
});
