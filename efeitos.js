const EFEITOS={confete:["🎉","🎊","✨"],fogos:["🎆","🎇","💥"],estrelas:["⭐","🌟","✨"],coracoes:["💖","❤️","💕"],raios:["⚡","💥","🔆"],espiral:["🌀","💫","🔮"]};
let efeitoAtivo="confete";
const camada=document.getElementById("camada-efeitos");
document.getElementById("seletor-efeito").addEventListener("change",e=>{efeitoAtivo=e.target.value;Banco.salvar("efeito",efeitoAtivo)});
function lancarEfeito(){
    const simb=EFEITOS[efeitoAtivo];
    for(let i=0;i<60;i++){
        const p=document.createElement("div");
        p.className="particula";
        p.textContent=simb[Math.floor(Math.random()*simb.length)];
        p.style.left=Math.random()*100+"vw";p.style.top=Math.random()*100+"vh";
        p.style.setProperty("--mx",(Math.random()*400-200)+"px");
        p.style.setProperty("--my",(Math.random()*400-200)+"px");
        camada.appendChild(p);
        setTimeout(()=>p.remove(),2600);
    }
}
// ✅ CARREGA SALVO SEM TRAVAR
setTimeout(()=>{
    const s=Banco.pegar("efeito");
    if(s){efeitoAtivo=s;document.getElementById("seletor-efeito").value=s}
},100);
