const express = require('express');
const { exec } = require('child_process');
const { chatbot } = require('./chatbot');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/chatbot', (req, res) => {
  chatbot(
    (qrCodeUrl) => {
      // Envia a página inicial com a imagem do QR code
      res.send(`
        <html>
          <body>
            <div id="content">
              <img src="${qrCodeUrl}" alt="QR Code para WhatsApp" />
            </div>
            <script>
              // Função para verificar o estado de readyMessage
              function checkReady() {
                fetch('/check-ready')
                  .then(response => response.json())
                  .then(data => {
                    if (data.ready) {
                      document.getElementById('content').innerHTML = '<p>' + data.readyMessage + '</p>';
                    } else {
                      setTimeout(checkReady, 1000); // Tenta novamente após 1 segundo
                    }
                  });
              }

              // Inicia a verificação
              checkReady();
            </script>
          </body>
        </html>
      `);
    },
    (readyMessage) => {
      // Armazena o readyMessage em algum lugar acessível, por exemplo, em uma variável global ou um banco de dados
      global.readyMessage = readyMessage;
    }
  );
});

app.get('/check-ready', (req, res) => {
  if (global.readyMessage) {
    res.json({ ready: true, readyMessage: global.readyMessage });
  } else {
    res.json({ ready: false });
  }
});

