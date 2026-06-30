const btnAnuncio=document.getElementById("btn-anuncio");
btnAnuncio.onclick=function(){
    if(btnAnuncio.disabled)return;
    btnAnuncio.disabled=true;btnAnuncio.textContent="⏳ Carregando...";
    setTimeout(()=>{alterarSaldo(3);btnAnuncio.textContent="✅ +3!";setTimeout(()=>{btnAnuncio.textContent="📺 Ver Anúncio (+3)";btnAnuncio.disabled=false},1500)},1200);
};
function montar(){
    const lista=document.getElementById("lista-itens");lista.innerHTML="";
    COMIDAS.forEach(c=>{
        const d=document.createElement("div");
        d.className="item-opcao"+(itensAtivos.includes(c.id)?" ativo":"");
        d.textContent=c.emoji+" "+c.nome;
        d.onclick=()=>{
            if(itensAtivos.includes(c.id)){if(itensAtivos.length>2)itensAtivos=itensAtivos.filter(i=>i!==c.id)}
            else if(itensAtivos.length<12)itensAtivos.push(c.id);
            desenharRoleta();montar();
        };
        lista.appendChild(d);
    });
}
montar();
