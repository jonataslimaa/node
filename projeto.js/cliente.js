const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "jonatas"
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

app.post('/clientes', (req, res) => {
    const { nome, cpf, email, idade } = req.body;
  
    const sql = 'insert into cliente (nome, cpf, email, idade) values (?, ?, ?, ?)';
    const values = [nome, cpf, email, idade];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir cliente: ' + err.message);
        res.status(500).json({ error: 'Erro ao inserir cliente' });
      } else {
        console.log('Cliente inserido com sucesso!');
        res.status(201).json({ message: 'Cliente inserido com sucesso!' });
      }
    });
  });
  
  // Rota para listar todos os clientes
  
  app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM cliente';
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao buscar clientes: ' + err.message);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
      } else {
        res.json({ clientes: results });
      }
    });
  });
  
  // ...

// Rota para atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const { nome, cpf, email, idade } = req.body;

  const sql = 'UPDATE cliente SET nome = ?, cpf = ?, email = ?, idade = ? WHERE id = ?';
  const values = [nome, cpf, email, idade, clienteId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente: ' + err.message);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    } else {
      console.log('Cliente atualizado com sucesso!');
      res.json({ message: 'Cliente atualizado com sucesso!' });
    }
  });
});




// Rota para excluir um cliente
app.delete('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const sql = 'DELETE FROM cliente WHERE id = ?';

  connection.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir cliente: ' + err.message);
      res.status(500).json({ error: 'Erro ao excluir cliente' });
    } else {
      console.log('Cliente excluído com sucesso!');
      res.json({ message: 'Cliente excluído com sucesso!' });
    }
  });
});



