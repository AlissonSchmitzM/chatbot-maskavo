const fraseMenuPrincipal = 'Digite *MASKAVO* a qualquer momento para voltar ao menu principal.';

const menuTree = {
    main: {
        message: `Digite o número da opção desejada:
1. Peças Exclusivas
2. Uniformes
3. Site
4. Outros`,
        options: {
            '1': 'exclusivePiecesStep1',
            '2': 'uniformsStep1',
            '3': 'website',
            '4': 'other'
        }
    },
    /* 1. Peças Exclusivas */
    exclusivePiecesStep1: {
        message: `Ótimo, antes de continuar, precisamos de algumas informações importantes para que tudo seja perfeito 😉. Qual cidade e estado você está falando?`,
        nextStep: 'exclusivePiecesStep2'
    },
    exclusivePiecesStep2: {
        message: `Seu figurino é artístico? Me conte um pouco da sua ideia. ${fraseMenuPrincipal}`,
        nextStep: 'exclusivePiecesStep3'
    },
    exclusivePiecesStep3: {
        message: `Aguarde um momento enquanto te transfiro para nosso estilista 🪡✂️`,
        nextStep: null
    },
    /* 2. Uniformes */
    uniformsStep1: {
        message: `Qual o tipo de empresa? 🏬:
1. Física
2. Jurídica`,
        options: {
            '1': 'uniformsStep2',
            '2': 'uniformsStep2'
        }
    },
    uniformsStep2: {
        message: `Qual o segmento? ${fraseMenuPrincipal}`,
        nextStep: 'uniformsStep3'
    },
    uniformsStep3: {
        message: `Aguarde um momento que vamos analisar a melhor oportunidade para o seu seguimento! 🤔`,
        nextStep: null
    },
    /* 3. Site */
    website: {
        message: `Nosso estoque é atualizado semanalmente, incrível, não é? Aproveite o cupom de desconto *PRIMEIRA10* na sua primeira compra! Visite nosso site: 
http://modamaskavo.com.br
Lembre-se de aplicar o cupom antes de finalizar a compra. Boas compras! 😍`,
        nextStep: 'main'
    },
    /* 4. Site */
    other: {
        message: `*Automatize seu Atendimento*
Melhore a eficiência do seu atendimento ao cliente com um chatbot automatizado com respostas rápidas🙌🏽! Para mais informações, entre em contato pelo número: (Alisson) 47 99906-4883`,
        nextStep: 'main'
    }
};

module.exports = menuTree;