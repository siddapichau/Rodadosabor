var roleta=document.getElementById("roleta");
var btnG=document.getElementById("btn-girar");
var res=document.getElementById("resultado");
var girando=false,rot=0,saldo=Banco.pegar("moedas",20);
document.getElementById("saldo-moedas").textContent=saldo;
function mudaSaldo(v){saldo=Math.max(0,saldo+v);Banco.salvar("moedas",saldo);document.getElementById("saldo-moedas").textContent=saldo}
function desenhar(){
 var its=itensAtivos.map(function(i){return COMIDAS.find(function(c){return c.id===i})}).filter(Boolean);
 var n=its.length;
 if(n<2){roleta.innerHTML="<div style='padding-top:40%;text-align:center'>Minimo 2</div>";return}
 var f=360/n,cores=["#ffb703","#fb8500","#ef476f","#06d6a0","#118ab2","#8338ec","#ff006e","#3a86ff"];
 var h='<svg viewBox="0 0 100 100" width="100%" height="100%">';
 for(var i=0;i<n;i++){
  var a1=(i*f-90)*Math.PI/180,a2=((i+1)*f-90)*Math.PI/180;
  var x1=50+50*Math.cos(a1),y1=50+50*Math.sin(a1),x2=50+50*Math.cos(a2),y2=50+50*Math.sin(a2);
  var mm=((i*f)+f/2-90)*Math.PI/180,tx=50+32*Math.cos(mm),ty=50+32*Math.sin(mm);
  h+='<path d="M50,50 L'+x1+','+y1+' A50,50 0 '+(f>180?1:0)+',1 '+x2+','+y2+' Z" fill="'+cores[i%cores.length]+'" stroke="#fff" stroke-width=".3"/>';
  h+='<text x="'+tx+'" y="'+ty+'" font-size="6" text-anchor="middle" dominant-baseline="middle" transform="rotate('+(i*f+f/2)+','+tx+','+ty+')">'+its[i].emoji+'</text>';
 }
 h+='<circle cx="50" cy="50" r="7" fill="#fff" stroke="#222" stroke-width="1.2"/></svg>';
 roleta.innerHTML=h;
}
function girar(){
 var its=itensAtivos.map(function(i){return COMIDAS.find(function(c){return c.id===i})}).filter(Boolean);
 if(its.length<2||girando)return;
 girando=true;btnG.disabled=true;res.textContent="";
 var idx=(Math.random()*its.length)|0;
 var g=360/its.length,centro=idx*g+g/2;
 var voltas=5+((Math.random()*3)|0);
 rot += voltas*360 + (360-centro) - (rot%360);
 somGiroLiga();
 roleta.style.transform="rotate("+rot+"deg)";
 setTimeout(function(){tocar(somAtivo("parada").url)},3600);
 setTimeout(function(){
  girando=false;btnG.disabled=false;somGiroPara();
  res.textContent="🎯 "+its[idx].emoji+" "+its[idx].nome;
  tocar(somAtivo("vitoria").url);lancarEfeito();
 },4600);
}
btnG.addEventListener("click",girar);
desenhar();
