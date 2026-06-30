var Banco = {
  salvar:function(c,v){try{localStorage.setItem("rds_"+c,JSON.stringify(v))}catch(e){}},
  pegar:function(c,d){try{var x=localStorage.getItem("rds_"+c);return x?JSON.parse(x):d}catch(e){return d}},
  remover:function(c){localStorage.removeItem("rds_"+c)}
};
