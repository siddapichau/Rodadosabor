/* =========================================================
   🔥 BANCO UNIFICADO — HOJE = localStorage
   ☁️ BASTA COLOCAR CREDENCIAIS ABAIXO PARA USAR FIREBASE OU REALM
   NÃO PRECISA ALTERAR NENHUM OUTRO ARQUIVO DO PROJETO
   ========================================================= */
const Banco = {
    _modo:"local", // "local" | "firebase" | "realm"

    // 👇 COLE AQUI SUAS CONFIGURAÇÕES QUANDO QUISER ATIVAR
    _firebaseCfg:{
        apiKey:"",authDomain:"",projectId:"",storageBucket:"",
        messagingSenderId:"",appId:""
    },
    _realmCfg:{appId:""},

    async _iniciar(){
        // if(this._modo==="firebase"){ /* inicializa app/firestore */ }
        // if(this._modo==="realm"){ /* inicializa Realm.App */ }
    },
    async salvar(chave,valor){
        if(this._modo==="local") localStorage.setItem("rds_"+chave,JSON.stringify(valor));
        // else firestore/Realm aqui
    },
    async pegar(chave,padrao=null){
        if(this._modo==="local"){
            const v = localStorage.getItem("rds_"+chave);
            return v ? JSON.parse(v) : padrao;
        }
        return padrao;
    },
    async remover(chave){ localStorage.removeItem("rds_"+chave) }
};
Banco._iniciar();
              
