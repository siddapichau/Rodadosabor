// 🔊 TODOS SONS SÃO URLs PÚBLICAS — NADA DENTRO DO PROJETO
const SONS = {
    giro:[
        {id:"classico",nome:"Clássico",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-casino-wheel-tick-2016.mp3",ativo:true},
        {id:"swoosh",nome:"Swoosh",preco:15,url:"https://assets.mixkit.co/sfx/preview/mixkit-fast-swoosh-1114.mp3"},
        {id:"arcade",nome:"Arcade Tick",preco:25,url:"https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3"},
        {id:"motor",nome:"Motor",preco:20,url:"https://assets.mixkit.co/sfx/preview/mixkit-racing-car-engine-idle-2-1405.mp3"},
        {id:"digital",nome:"Digital",preco:30,url:"https://assets.mixkit.co/sfx/preview/mixkit-digital-countdown-tick-1074.mp3"}
    ],
    parada:[
        {id:"acorde",nome:"Acorde Simples",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3",ativo:true},
        {id:"sino",nome:"Plim Sino",preco:15,url:"https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-213.mp3"},
        {id:"moeda",nome:"Moeda Arcade",preco:25,url:"https://assets.mixkit.co/sfx/preview/mixkit-coin-win-2018.mp3"},
        {id:"impacto",nome:"Impacto",preco:10,url:"https://assets.mixkit.co/sfx/preview/mixkit-heavy-impact-hit-2012.mp3"},
        {id:"zapp",nome:"Zapp Digital",preco:20,url:"https://assets.mixkit.co/sfx/preview/mixkit-interface-positive-click-2570.mp3"}
    ],
    vitoria:[
        {id:"tada",nome:"Grande Tada!",preco:0,url:"https://assets.mixkit.co/sfx/preview/mixkit-winning-challenge-achievement-2017.mp3",ativo:true},
        {id:"aplausos",nome:"Aplausos",preco:25,url:"https://assets.mixkit.co/sfx/preview/mixkit-audience-applause-509.mp3"},
        {id:"arcadewin",nome:"Vitória Arcade",preco:30,url:"https://assets.mixkit.co/sfx/preview/mixkit-winning-the-level-2019.mp3"},
        {id:"epico",nome:"Épico",preco:35,url:"https://assets.mixkit.co/sfx/preview/mixkit-epic-orchestra-trailer-1142.mp3"},
        {id:"festa",nome:"Festa Chiptune",preco:40,url:"https://assets.mixkit.co/sfx/preview/mixkit-video-game-win-2016.mp3"}
    ]
};

let mudo = false;
let audioGiro = null;
let tickInterval = null;

function pegarSomAtivo(tipo){ return SONS[tipo].find(s=>s.ativo) || SONS[tipo][0] }

function tocarSom(url,loop=false){
    if(mudo || !url) return null;
    const a = new Audio(url);
    a.loop = loop;
    a.volume = 0.7;
    a.play().catch(()=>{});
    return a;
}

function iniciarSomGiro(){
    pararSomGiro();
    const s = pegarSomAtivo("giro");
    // tick contínuo simulado
    tickInterval = setInterval(()=>{
        if(!mudo) new Audio(s.url).play().catch(()=>{});
    },180);
}
function pararSomGiro(){
    if(tickInterval){ clearInterval(tickInterval); tickInterval=null }
    if(audioGiro){ try{audioGiro.pause()}catch(e){} audioGiro=null }
}
function tocarSomParada(){ tocarSom(pegarSomAtivo("parada").url) }
function tocarSomVitoria(){ tocarSom(pegarSomAtivo("vitoria").url) }

document.getElementById("btn-mudo").onclick = function(){
    mudo = !mudo;
    this.textContent = mudo ? "🔇 Som desligado" : "🔊 Som ligado";
    if(mudo) pararSomGiro();
};
        
