const roleta=document.getElementById("roleta");
const btnGirar=document.getElementById("btn-girar");
const elRes=document.getElementById("resultado");
let girando=false, rotacao=0, saldo=20;

function carregarSaldo(){saldo=Banco.pegar("moedas",20);document.getElementById("saldo-moedas").textContent=saldo}
function alterarSaldo(v){saldo=Math.max(0,saldo+v);Banco.salvar("moedas",saldo);document.getElementById("saldo-moedas").textContent=saldo}

function desenharRoleta(){
    try{
        const itens=itensAtivos.map(id=>COMIDAS.find(c=>c.id===id)).filter(Boolean);
        const n=itens.length;
        if(n<2){roleta.innerHTML="<center style='padding-top:40%'>Escolha pelo menos 2 comidas</center>";return}
        const fatia=360/n;
        const cores=["#ffb703","#fb8500","#ef476f","#06d6a0","#118ab2","#8338ec","#ff006e","#3a86ff"];
        let svg=`<svg viewBox="0 0 100 100" width="100%" height="100%">`;
        itens.forEach((it,i)=>{
            const a1=(i*fatia-90)*Math.PI/180,a2=((i+1)*fatia-90)*Math.PI/180;
            const x1=50+50*Math.cos(a1),y1=50+50*Math.sin(a1),x2=50+50*Math.cos(a2),y2=50+50*Math.sin(a2);
            const m=((i*fatia)+fatia/2-90)*Math.PI/180,tx=50+32*Math.cos(m),ty=50+32*Math.sin(m);
            svg+=`<path d="M50,50 L${x1},${y1} A50,50 0 ${fatia>180?1:0},1 ${x2},${y2} Z" fill="${cores[i%cores.length]}" stroke="#fff" stroke-width=".3"/>`;
            svg+=`<text x="${tx}" y="${ty}" font-size="6" text-anchor="middle" dominant-baseline="middle" transform="rotate(${i*fatia+fatia/2},${tx},${ty})">${it.emoji}</text>`;
        });
        svg+=`<circle cx="50" cy="50" r="7" fill="#fff" stroke="#333" stroke-width="1.2"/></svg>`;
        roleta.innerHTML=svg;
    }catch(e){roleta.innerHTML="erro"}
}

function girar(){
    const itens=itensAtivos.map(id=>COMIDAS.find(c=>c.id===id)).filter(Boolean);
    if(itens.length<2||girando)return;
    girando=true;btnGirar.disabled=true;elRes.textContent="";
    const idx=Math.floor(Math.random()*itens.length);
    const g=360/itens.length;
    const centro=idx*g+g/2;
    const voltas=5+Math.floor(Math.random()*3);
    rotacao += voltas*360 + (360-centro) - (rotacao%360);
    iniciarSomGiro();
    roleta.style.transform=`rotate(${rotacao}deg)`;
    setTimeout(tocarSomParada,3600);
    setTimeout(()=>{
        girando=false;btnGirar.disabled=false;
        pararSomGiro();
        elRes.textContent=`🎯 ${itens[idx].emoji} ${itens[idx].nome}!`;
        tocarSomVitoria();lancarEfeito();
    },4600);
}

btnGirar.addEventListener("click",girar);
carregarSaldo();desenharRoleta();
