document.getElementById("btn-anuncio").onclick=function(){
 var b=this;if(b.disabled)return;
 b.disabled=true;b.textContent="⏳...";
 setTimeout(function(){mudaSaldo(3);b.textContent="✅+3";setTimeout(function(){b.textContent="📺+3";b.disabled=false},1400)},1100);
};
function montar(){
 var box=document.getElementById("lista-itens");box.innerHTML="";
 COMIDAS.forEach(function(c){
  var d=document.createElement("div");
  d.className="op"+(itensAtivos.includes(c.id)?" ativo":"");
  d.textContent=c.emoji+" "+c.nome;
  d.onclick=function(){
   if(itensAtivos.includes(c.id)){if(itensAtivos.length>2)itensAtivos=itensAtivos.filter(function(x){return x!==c.id})}
   else if(itensAtivos.length<12)itensAtivos.push(c.id);
   Banco.salvar("itens",itensAtivos);desenhar();montar();
  };
  box.appendChild(d);
 });
 ["giro","parada","vitoria"].forEach(function(t){
  var bx=document.getElementById("sons-"+t);bx.innerHTML="";
  SONS[t].forEach(function(s){
   var d=document.createElement("div");
   d.className="op"+(s.ativo?" ativo":"");
   d.textContent=s.nome;bx.appendChild(d);
  });
 });
}
montar();
