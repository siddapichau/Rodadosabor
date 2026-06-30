const TEMAS=[
    {id:"amarelo",nome:"Amarelo+Verde",preco:0,cor1:"#ffcc00",cor2:"#22c55e",ativo:true},
    {id:"roxo",nome:"Roxo+Azul",preco:0,cor1:"#8b5cf6",cor2:"#3b82f6"},
    {id:"neon",nome:"Neon",preco:0,cor1:"#06ffa5",cor2:"#ff2bd6"},
    {id:"sol",nome:"Pôr do Sol",preco:20,cor1:"#ff7a00",cor2:"#d62828"},
    {id:"floresta",nome:"Floresta",preco:20,cor1:"#14532d",cor2:"#84cc16"}
];
function carregarTemas(){
    ["temas-pagina","temas-roleta"].forEach(id=>{
        const el=document.getElementById(id);el.innerHTML="";
        TEMAS.forEach(t=>{
            const d=document.createElement("div");
            d.className="item-opcao"+(t.ativo?" ativo":"");
            d.style.background=`linear-gradient(135deg,${t.cor1},${t.cor2})`;
            d.style.color="#fff";
            d.textContent=t.nome+(t.preco>0?" - "+t.preco+"💰":"");
            el.appendChild(d);
        });
    });
}
carregarTemas();
