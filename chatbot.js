const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
 
const client1 = new Client({ });

client1.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client1.on('ready', () => {
    console.log('Tudo certo! WhatsApp cliente 1 conectado.');
});

const delay = ms => new Promise(res => setTimeout(res, ms));
 
let userState = {};

const DEBUG = true;
const specificContact1 = '554797048391';  //Enviar somente para esse contato

const menuTree = require('./menuTree')

const lastGreetingDate = {}; // Objeto para armazenar a última data de saudação por usuário
let finishBot = false;
let startBot = false;

const handlerMensage = cli => async msg => {
    const chatId = msg.from;

    if (chatId !== `${specificContact1}@c.us` && DEBUG) { 
        return;
    }
    
    if (!userState[chatId]) {
        userState[chatId] = 'main';
    }

    const currentMenu = menuTree[userState[chatId]];
    console.log('finishBot', finishBot)

    /*if(finishBot) {
        await cli.sendMessage(chatId, 'Assistente virtual da Maskavo finalizado 🙋🏽‍♂️. Obrigado, indo para o intervalo descansar um pouquinho 🏝️.');
    }*/

    // Se o próximo passo for null, finalize a interação
    if (currentMenu.nextStep === null || finishBot) {
        return;
    }

    if(startBot) {
        //await cli.sendMessage(chatId, 'Assistente virtual da Maskavo iniciado 🙋🏽‍♂️. Vamos lá Maskavo, iniciando novamente a automação para seus clientes 👨🏽‍💻');
        userState[chatId] = 'main';
        startBot = false;
    }

    const contact = await msg.getContact();
    const name = contact.pushname || 'usuário';

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|Jean|MASKAVO)/i)) {
        const today = new Date().toLocaleDateString();

        if (!lastGreetingDate[chatId] || lastGreetingDate[chatId] !== today) {
            await cli.sendMessage(chatId, `Olá ${name.split(" ")[0]} seja bem vindo! Sou o assistente virtual da Maskavo 👨🏽‍💻, Como posso ajudá-lo hoje? Digite *MASKAVO* a qualquer momento para voltar ao menu principal.`);
            
            // Atualiza a data da última saudação 
            lastGreetingDate[chatId] = today;
        } else {
            await cli.sendMessage(chatId, `Certo ${name.split(" ")[0]}👨🏽‍💻, vamos de novo. Digite *MASKAVO* a qualquer momento para voltar ao menu principal.`);
        }
    
        userState[chatId] = 'main';
    } else if (currentMenu.nextStep) {
        userState[chatId] = currentMenu.nextStep;
    } else if (currentMenu.options[msg.body]) {
        const next = currentMenu.options[msg.body];
        if (menuTree[next]) {
            userState[chatId] = next; 
        } else {
            await cli.sendMessage(chatId, next);
            userState[chatId] = 'main';
            return;
        }
    } else {
        await cli.sendMessage(chatId, 'Opção inválida. Por favor, tente novamente.');
        return;
    }

    const chat = await msg.getChat();

    await chat.sendStateTyping();
    await delay(2000);
    await cli.sendMessage(chatId, menuTree[userState[chatId]].message);
};

client1.on('message_create', async message => {
    const chatId = message.from;
    if (message.id.fromMe) {
        console.log('message.body.toLowerCase()', message.body.toLowerCase())
        if(message.body.toLowerCase() === 'maskavito, encerrar chatbot pois estou com cliente.') {
            //await client1.sendMessage(chatId, 'Assistente virtual da Maskavo finalizado 🙋🏽‍♂️. Obrigado, indo para o intervalo descansar um pouquinho 🏝️.');
            finishBot = true;
        } else if(message.body.toLowerCase() === 'maskavito, retornar chatbot.') {
            //await client1.sendMessage(chatId, 'Assistente virtual da Maskavo iniciado 🙋🏽‍♂️. Vamos lá Maskavo, iniciando novamente a automação para seus clientes 👨🏽‍💻');
            startBot = true;
            finishBot = false;
        }
    }
});

client1.on('message', handlerMensage(client1));
client1.initialize();