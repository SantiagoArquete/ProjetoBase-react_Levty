// Permite comandos (GET, POST, PUT, DELETE)
require("dotenv").config({ path: require('path').resolve(__dirname, "../.env") });
const express = require("express");

// Permite requisições entre diferentes origens
const cors = require("cors");

// Permite conexão com o postgres
const { Pool } = require("pg");
''
const path = require('path');

const urlApi = process.env.API_URL_BACK;

const app = express();
const PORT = 3001;

// Configuração PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log("pool", pool)

app.use(cors());
app.use(express.json());

// GET perfil com ID
app.get("/api/perfil/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT nome, curso, matricula, bio FROM perfil WHERE id = $1",
      [id],
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json({
        nome: "Aluno sem cadastro",
        curso: "-",
        matricula: "-",
        bio: "Nenhum dado encontrado no banco de dados.",
      });
    }
  } catch (error) {
    console.error("Erro ao buscar no banco:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// POST login
app.post("/api/login", async (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórios" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM perfil WHERE matricula = $1 AND cpf = $2",
      [matricula, senha],
    );

    if (result.rows.length > 0) {
      res.json({
        sucesso: true,
        mensagem: "Login realizado com sucesso",
        usuario: result.rows[0],
      });
    } else {
      res.status(401).json({ erro: "Matrícula ou senha (CPF) incorretos" });
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// Configuração para usar junto com o React

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend rodando em ${urlApi}:${PORT}`);
});
