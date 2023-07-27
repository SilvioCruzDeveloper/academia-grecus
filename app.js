// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json'); // Arquivo com as credenciais do Google Sheets

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar os dados do corpo das requisições
app.use(bodyParser.json());

// Rota para receber os dados do formulário e enviar para o Google Sheets
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, telefone, pagamento } = req.body;

    // ID da sua planilha do Google Sheets
    const doc = new GoogleSpreadsheet('ID_DA_SUA_PLANILHA');

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // Carregar informações da planilha

    const sheet = doc.sheetsByIndex[0]; // Usaremos a primeira planilha

    // Adicionar uma nova linha com os dados do cliente
    await sheet.addRow({ Nome: nome, Email: email, Telefone: telefone, Pagamento: pagamento });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
