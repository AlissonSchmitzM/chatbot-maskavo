const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const auth = () => {
    const client1 = new Client({});

    client1.on('qr', qr => {
        qrcode.generate(qr, { small: true });
        console.log('QR code gerado. Escaneie usando o WhatsApp.');
    });

    client1.on('ready', () => {
        console.log('Tudo certo! WhatsApp cliente 1 conectado.');
    });

    client1.initialize();

    return client1;
};

module.exports = { auth };