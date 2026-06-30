const EFEITOS = {
    confete:["🎉","🎊","✨","💫","⭐","🌟"],
    fogos:["🎆","🎇","💥","✨","🔥"],
    estrelas:["⭐","🌟","✨","💫","✦","✧"],
    coracoes:["💖","❤️","💕","💘","💗","💓"],
    raios:["⚡","💥","✨","🔆","⚡"],
    espiral:["🌀","💫","✨","🔮","🪄"]
};
let efeitoAtual = "confete";
const camada = document.getElementById("camada-efeitos");

document.getElementById("seletor-efeito").addEventListener("change",e=>{
    efeitoAtual = e.target.value;
    Banco.salvar("efeito",efeitoAtual);
});

function lancarEfeito(){
    const simbolos = EFEITOS[efeitoAtual] || EFEITOS.confete;
    const qtd = 60;
    for(let i=0;i<qtd;i++){
        const p = document.createElement("div");
        p.className = "particula";
        p.textContent = simbolos[Math.floor(Math.random()*simbolos.length)];
        p.style.left = Math.random()*100 + "vw";
        p.style.top = Math.random()*100 + "vh";
        p.style.setProperty("--mx",(Math.random()*400-200)+"px");
        p.style.setProperty("--my",(Math.random()*400-200)+"px");
        p.style.fontSize = (14 + Math.random()*26)+"px";
        camada.appendChild(p);
        setTimeout(()=>p.remove(),2600);
    }
}

// carrega salvo
(async ()=>{
    const salvo = await Banco.pegar("efeito");
    if(salvo){
        efeitoAtual = salvo;
        document.getElementById("seletor-efeito").value = salvo;
    }
})();
  
