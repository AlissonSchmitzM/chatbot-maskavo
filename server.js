const express = require('express');
const { chatbot } = require('./chatbot');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let readyMessage = null;

app.get('/chatbot', (req, res) => {
  chatbot(
    (qrCodeUrl) => {
      res.send(`
        <html>
          <body>
            <div id="content">
              <img src="${qrCodeUrl}" alt="QR Code para WhatsApp" />
            </div>
            <script>
              function checkReady() {
                fetch('/check-ready')
                  .then(response => response.json())
                  .then(data => {
                    if (data.ready) {
                      document.getElementById('content').innerHTML = '<p>' + data.readyMessage + '</p>';
                      // Script executado uma vez e não mais chamado
                    } else {
                      setTimeout(checkReady, 1000); // Continua verificando
                      console.log('readyMessage ainda não está pronto');
                    }
                  })
                  .catch(error => console.error('Erro ao verificar o estado:', error));
              }

              checkReady();
            </script>
          </body>
        </html>
      `);
    },
    (message) => {
      readyMessage = message;
    }
  );
});

app.get('/check-ready', (req, res) => {
  if (readyMessage) {
    res.json({ ready: true, readyMessage: readyMessage });
    readyMessage = null; // Limpa o readyMessage após envio
  } else {
    res.json({ ready: false });
  }
});