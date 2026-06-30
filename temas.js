var TEMAS=[
{id:"am",nome:"Amarelo+Verde",c1:"#ffcc00",c2:"#22c55e",ativo:true},
{id:"rz",nome:"Roxo+Azul",c1:"#8b5cf6",c2:"#3b82f6"},
{id:"ne",nome:"Neon",c1:"#06ffa5",c2:"#ff2bd6"},
{id:"ps",nome:"Por do Sol",c1:"#ff7a00",c2:"#d62828",preco:20},
{id:"fl",nome:"Floresta",c1:"#14532d",c2:"#84cc16",preco:20}
];
var box=document.getElementById("temas");
TEMAS.forEach(function(t){
 var d=document.createElement("div");
 d.className="op"+(t.ativo?" ativo":"");
 d.style.background="linear-gradient(135deg,"+t.c1+","+t.c2+")";
 d.style.color="#fff";
 d.textContent=t.nome+(t.preco?" 💰"+t.preco:"");
 box.appendChild(d);
});
