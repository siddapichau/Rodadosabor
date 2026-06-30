const COMIDAS = [
    {id:1,nome:"Pizza",emoji:"🍕",preco:0,bloqueado:false,receita:"Massa, molho de tomate, queijo, assar em forno alto."},
    {id:2,nome:"Hambúrguer",emoji:"🍔",preco:0,bloqueado:false,receita:"Pão, carne, queijo, alface, tomate e molho."},
    {id:3,nome:"Sushi",emoji:"🍣",preco:5,bloqueado:true,receita:"Arroz temperado, peixe cru, alga nori."},
    {id:4,nome:"Salada",emoji:"🥗",preco:0,bloqueado:false,receita:"Folhas, legumes, azeite e limão."},
    {id:5,nome:"Churrasco",emoji:"🥩",preco:10,bloqueado:true,receita:"Cortes nobres, sal grosso, brasa lenta."},
    {id:6,nome:"Feijoada",emoji:"🍲",preco:8,bloqueado:true,receita:"Feijão preto, carnes secas, acompanhamentos."},
    {id:7,nome:"Ramen",emoji:"🍜",preco:6,bloqueado:true,receita:"Caldo grosso, macarrão, ovo, carne."},
    {id:8,nome:"Tacos",emoji:"🌮",preco:4,bloqueado:true,receita:"Tortilha, carne, queijo, guacamole."},
    {id:9,nome:"Lasanha",emoji:"🍛",preco:7,bloqueado:true,receita:"Massa, molho bolonhesa, queijo em camadas."},
    {id:10,nome:"Ceviche",emoji:"🐟",preco:5,bloqueado:true,receita:"Peixe cru cozido no limão, cebola, pimenta."},
    {id:11,nome:"Pão de Queijo",emoji:"🧀",preco:2,bloqueado:false,receita:"Polvilho, queijo, leite, ovo, assar."},
    {id:12,nome:"Sorvete Chocolate",emoji:"🍦",preco:3,bloqueado:false,receita:"Creme, leite, chocolate, açúcar."},
    {id:13,nome:"Brigadeiro",emoji:"🍫",preco:1,bloqueado:false,receita:"Leite condensado, chocolate, manteiga."},
    {id:14,nome:"Strogonoff",emoji:"🍛",preco:3,bloqueado:false,receita:"Frango, creme de leite, molho de tomate, champignon."},
    {id:15,nome:"Pastel",emoji:"🥟",preco:2,bloqueado:false,receita:"Massa fina, recheio variado, fritura."},
    {id:16,nome:"Coxinha",emoji:"🍗",preco:4,bloqueado:false,receita:"Massa de batata, frango desfiado, empanar e fritar."},
    {id:17,nome:"Pão de Alho",emoji:"🧄",preco:2,bloqueado:false,receita:"Pão, manteiga, alho, queijo, assar."},
    {id:18,nome:"Pudim",emoji:"🍮",preco:5,bloqueado:true,receita:"Leite condensado, ovos, calda de caramelo."},
    {id:19,nome:"Moqueca",emoji:"🥘",preco:6,bloqueado:true,receita:"Peixe, leite de coco, dendê, pimentões."},
    {id:20,nome:"Omelete",emoji:"🍳",preco:0,bloqueado:false,receita:"Ovos batidos, sal, recheio a gosto."}
];

let itensAtivos = COMIDAS.filter(c => c.preco === 0).slice(0,4).map(c=>c.id);
