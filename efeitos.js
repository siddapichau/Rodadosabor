var EFEITOS={confete:["🎉","🎊","✨"],fogos:["🎆","🎇","💥"],estrelas:["⭐","🌟","✨"],coracoes:["💖","❤️","💕"],raios:["⚡","💥"],espiral:["🌀","💫"]};
var efeitoAtual=Banco.pegar("efeito","confete");
document.getElementById("seletor-efeito").value=efeitoAtual;
document.getElementById("seletor-efeito").onchange=function(e){efeitoAtual=e.target.value;Banco.salvar("efeito",efeitoAtual)};
var cam=document.getElementById("camada-efeitos");
function lancarEfeito(){
 var sim=EFEITOS[efeitoAtual];
 for(var i=0;i<50;i++){
  var p=document.createElement("div");
  p.className="pt";p.textContent=sim[(Math.random()*sim.length)|0];
  p.style.left=Math.random()*100+"vw";p.style.top=Math.random()*100+"vh";
  p.style.setProperty("--mx",(Math.random()*400-200)+"px");
  p.style.setProperty("--my",(Math.random()*400-200)+"px");
  cam.appendChild(p);
  setTimeout(function(x){cam.removeChild(x)},2500,p);
 }
}
