var SONS={
 giro:[{id:"c",nome:"Classico",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-casino-wheel-tick-2016.mp3",ativo:true},{id:"s",nome:"Swoosh",preco:15,url:"https://assets.mixkit.co/sfx/preview/mixkit-fast-swoosh-1114.mp3"}],
 parada:[{id:"a",nome:"Acorde",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3",ativo:true}],
 vitoria:[{id:"t",nome:"Tada",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-winning-challenge-achievement-2017.mp3",ativo:true}]
};
var mudo=false,tick=null;
function somAtivo(t){return SONS[t].find(function(x){return x.ativo})||SONS[t][0]}
function tocar(u){if(mudo||!u)return;var a=new Audio(u);a.volume=.6;a.play().catch(function(){})}
function somGiroLiga(){somGiroPara();var s=somAtivo("giro");tick=setInterval(function(){tocar(s.url)},180)}
function somGiroPara(){if(tick){clearInterval(tick);tick=null}}
document.getElementById("btn-mudo").onclick=function(){mudo=!mudo;this.textContent=mudo?"🔇":"🔊";if(mudo)somGiroPara()}
