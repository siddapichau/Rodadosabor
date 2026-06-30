/* 🔥 BANCO: HOJE = localStorage | DEPOIS cole credenciais para FIREBASE / REALM DB */
const Banco={
    _modo:"local",
    _firebase:{apiKey:"",authDomain:"",projectId:""},
    _realm:{appId:""},
    salvar(c,v){try{localStorage.setItem("rds_"+c,JSON.stringify(v))}catch(e){}},
    pegar(c,d=null){try{const x=localStorage.getItem("rds_"+c);return x?JSON.parse(x):d}catch(e){return d}},
    remover(c){localStorage.removeItem("rds_"+c)}
};
