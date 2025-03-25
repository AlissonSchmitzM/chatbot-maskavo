const express = require('express');
const { exec } = require('child_process');
const { auth } = require('./auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Rota para iniciar o chatbot
app.get('/start-chatbot', (req, res) => {
  exec('node chatbot.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).send('Erro ao iniciar o chatbot.');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Erro ao iniciar o chatbot.');
    }
    console.log(`stdout: ${stdout}`);
    res.send('Chatbot iniciado com sucesso.');
  });
});

app.get('/start-whatsapp', (req, res) => {
  try {
      const client = auth(); // Chama o método auth para inicializar o cliente do WhatsApp
      res.send('WhatsApp client iniciado com sucesso.');
  } catch (error) {
      console.error('Erro ao iniciar o cliente do WhatsApp:', error);
      res.status(500).send('Erro ao iniciar o cliente do WhatsApp.');
  }
});

