'use strict';
console.log('comidas.js carregado');

window.BANCO_DE_COMIDAS = [
    // === PIZZAS E MASSAS ===
    { nome: 'Pizza', icone: '🍕' },
    { nome: 'Espaguete', icone: '🍝' },
    { nome: 'Lasanha', icone: '🍛' },
    { nome: 'Macarrão', icone: '🍝' },
    { nome: 'Ramen', icone: '🍜' },
    { nome: 'Udon', icone: '🍜' },
    { nome: 'Yakisoba', icone: '🍜' },

    // === CARNES E CHURRASCO ===
    { nome: 'Hambúrguer', icone: '🍔' },
    { nome: 'Churrasco', icone: '🥩' },
    { nome: 'Frango Assado', icone: '🍗' },
    { nome: 'Coxinha', icone: '🍗' },
    { nome: 'Kebab', icone: '🥙' },
    { nome: 'Bife Acebolado', icone: '🥩' },

    // === PEIXES E FRUTOS DO MAR ===
    { nome: 'Sushi', icone: '🍣' },
    { nome: 'Camarão', icone: '🍤' },
    { nome: 'Moqueca', icone: '🥘' },
    { nome: 'Ceviche', icone: '🐟' },
    { nome: 'Salmão Grelhado', icone: '🐟' },

    // === SALADAS E ACOMPANHAMENTOS ===
    { nome: 'Salada', icone: '🥗' },
    { nome: 'Batata Frita', icone: '🍟' },
    { nome: 'Arroz e Feijão', icone: '🍲' },
    { nome: 'Feijoada', icone: '🍲' },
    { nome: 'Purê de Batata', icone: '🥔' },

    // === LANCHES E FAST FOOD ===
    { nome: 'Cachorro Quente', icone: '🌭' },
    { nome: 'Taco', icone: '🌮' },
    { nome: 'Burrito', icone: '🌯' },
    { nome: 'Sanduíche', icone: '🥪' },
    { nome: 'Pastel', icone: '🥟' },
    { nome: 'Pão de Queijo', icone: '🧀' },

    // === SOPAS E CALDOS ===
    { nome: 'Sopa de Legumes', icone: '🍜' },
    { nome: 'Caldo Verde', icone: '🥣' },
    { nome: 'Canja de Galinha', icone: '🍲' },

    // === PRATOS TÍPICOS BRASILEIROS ===
    { nome: 'Virado à Paulista', icone: '🍛' },
    { nome: 'Bobó de Camarão', icone: '🍤' },
    { nome: 'Strogonoff de Frango', icone: '🍛' },
    { nome: 'Escondidinho', icone: '🥧' },
    { nome: 'Omelete Recheado', icone: '🍳' },

    // === ORIENTAIS ===
    { nome: 'Gyoza', icone: '🥟' },
    { nome: 'Onigiri', icone: '🍙' },
    { nome: 'Bibimbap', icone: '🍚' },
    { nome: 'Pad Thai', icone: '🍜' },

    // === SOBREMESAS ===
    { nome: 'Sorvete', icone: '🍦' },
    { nome: 'Bolo', icone: '🍰' },
    { nome: 'Pudim', icone: '🍮' },
    { nome: 'Brigadeiro', icone: '🍫' },
    { nome: 'Rosquinha', icone: '🍩' },
    { nome: 'Panqueca', icone: '🥞' },
    { nome: 'Torta de Limão', icone: '🥧' },
    { nome: 'Mousse de Chocolate', icone: '🍫' },

    // === BEBIDAS (opcional) ===
    { nome: 'Suco Natural', icone: '🧃' },
    { nome: 'Refrigerante', icone: '🥤' },
    { nome: 'Café', icone: '☕' },
    { nome: 'Chá Gelado', icone: '🍵' }
];

window.RECEITAS = [
    // === GRÁTIS ===
    { id: 'rec-1', nome: 'Pizza Caseira', icone: '🍕', preco: 0, link: 'pizza.html' },
    { id: 'rec-2', nome: 'Hambúrguer Artesanal', icone: '🍔', preco: 0, link: 'hamburguer.html' },
    { id: 'rec-3', nome: 'Salada Caesar', icone: '🥗', preco: 0, link: 'salada-caesar.html' },
    { id: 'rec-4', nome: 'Omelete Recheado', icone: '🍳', preco: 0, link: 'omelete-recheado.html' },

    // === COM PREÇO ===
    { id: 'rec-5', nome: 'Sushi Maki', icone: '🍣', preco: 5, link: 'sushi.html' },
    { id: 'rec-6', nome: 'Churrasco na Brasa', icone: '🥩', preco: 10, link: 'churrasco.html' },
    { id: 'rec-7', nome: 'Feijoada Completa', icone: '🍲', preco: 8, link: 'feijoada.html' },
    { id: 'rec-8', nome: 'Ramen Tonkotsu', icone: '🍜', preco: 6, link: 'ramen.html' },
    { id: 'rec-9', nome: 'Tacos Mexicanos', icone: '🌮', preco: 4, link: 'tacos.html' },
    { id: 'rec-10', nome: 'Lasanha à Bolonhesa', icone: '🍛', preco: 7, link: 'lasanha.html' },
    { id: 'rec-11', nome: 'Ceviche Peruano', icone: '🐟', preco: 5, link: 'ceviche.html' },
    { id: 'rec-12', nome: 'Pão de Queijo Mineiro', icone: '🧀', preco: 2, link: 'pao-de-queijo.html' },
    { id: 'rec-13', nome: 'Sorvete de Chocolate', icone: '🍦', preco: 3, link: 'sorvete.html' },
    { id: 'rec-14', nome: 'Brigadeiro Gourmet', icone: '🍫', preco: 1, link: 'brigadeiro.html' },
    { id: 'rec-15', nome: 'Strogonoff de Frango', icone: '🍛', preco: 3, link: 'strogonoff.html' },
    { id: 'rec-16', nome: 'Pastel de Feira', icone: '🥟', preco: 2, link: 'pastel.html' },
    { id: 'rec-17', nome: 'Coxinha de Frango', icone: '🍗', preco: 4, link: 'coxinha.html' },
    { id: 'rec-18', nome: 'Pudim de Leite', icone: '🍮', preco: 5, link: 'pudim.html' },
    { id: 'rec-19', nome: 'Moqueca de Peixe', icone: '🥘', preco: 6, link: 'moqueca.html' },
    { id: 'rec-20', nome: 'Bobó de Camarão', icone: '🍤', preco: 7, link: 'bobo-camarao.html' }
];