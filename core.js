const roleta = document.getElementById("roleta");
const btnGirar = document.getElementById("btn-girar");
const elResultado = document.getElementById("resultado");
let girando = false;
let rotacaoAtual = 0;
let saldo = 20;

async function carregarSaldo(){
    saldo = await Banco.pegar("moedas",20);
    document.getElementById("saldo-moedas").textContent = saldo;
}
async function alterarSaldo(valor){
    saldo += valor;
    if(saldo<0) saldo=0;
    await Banco.salvar("moedas",saldo);
    document.getElementById("saldo-moedas").textContent = saldo;
}

function desenharRoleta(){
    const itens = itensAtivos.map(id=>COMIDAS.find(c=>c.id===id)).filter(Boolean);
    const total = itens.length;
    if(total<2){ roleta.innerHTML=""; return }
    const fatia = 360/total;
    const cores = ["#ffb703","#fb8500","#ef476f","#06d6a0","#118ab2","#8338ec","#ff006e","#3a86ff"];
    let svg = `<svg viewBox="0 0 100 100" width="100%" height="100%">`;
    itens.forEach((item,i)=>{
        const a1 = (i*fatia -90) * Math.PI/180;
        const a2 = ((i+1)*fatia -90) * Math.PI/180;
        const x1=50+50*Math.cos(a1), y1=50+50*Math.sin(a1);
        const x2=50+50*Math.cos(a2), y2=50+50*Math.sin(a2);
        const meio = ((i*fatia)+(fatia/2)-90) * Math.PI/180;
        const tx=50+32*Math.cos(meio), ty=50+32*Math.sin(meio);
        const grande = fatia>180?1:0;
        svg += `<path d="M50,50 L${x1},${y1} A50,50 0 ${grande},1 ${x2},${y2} Z" fill="${cores[i%cores.length]}" stroke="#fff" stroke-width="0.3"/>`;
        svg += `<text x="${tx}" y="${ty}" font-size="6" text-anchor="middle" dominant-baseline="middle" transform="rotate(${(i*fatia+fatia/2)},${tx},${ty})">${item.emoji}</text>`;
    });
    svg += `<circle cx="50" cy="50" r="7" fill="#fff" stroke="#333" stroke-width="1.2"/></svg>`;
    roleta.innerHTML = svg;
}

// ✅ AQUI ACABA O ERRO DO PRÊMIO DIFERENTE: CÁLCULO EXATO
function girarRoleta(){
    const itens = itensAtivos.map(id=>COMIDAS.find(c=>c.id===id)).filter(Boolean);
    const total = itens.length;
    if(total<2 || girando) return;
    girando = true; btnGirar.disabled = true;
    elResultado.textContent = "";

    const indiceSorteado = Math.floor(Math.random()*total);
    const grausPorItem = 360/total;
    const centroItem = indiceSorteado * grausPorItem + (grausPorItem/2);
    const voltas = 5 + Math.floor(Math.random()*3);
    const novaRot = rotacaoAtual + (voltas*360) + (360 - centroItem) - (rotacaoAtual%360);
    rotacaoAtual = novaRot;

    iniciarSomGiro();
    roleta.style.transform = `rotate(${novaRot}deg)`;

    // som de parada um pouco antes de terminar
    setTimeout(tocarSomParada, 3600);

    setTimeout(()=>{
        girando = false; btnGirar.disabled = false;
        pararSomGiro();
        const ganhador = itens[indiceSorteado];
        elResultado.textContent = `🎯 ${ganhador.emoji} ${ganhador.nome}!`;
        tocarSomVitoria();
        lancarEfeito();
    },4600);
}

btnGirar.addEventListener("click",girarRoleta);
carregarSaldo();
desenharRoleta();
