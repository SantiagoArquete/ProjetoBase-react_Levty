-- Criar a tabela de perfil
CREATE TABLE IF NOT EXISTS perfil (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  curso VARCHAR(100),
  matricula VARCHAR(50) UNIQUE NOT NULL,
  bio TEXT,
  cpf VARCHAR(11) NOT NULL
);

-- Inserir um usuário padrão para testes (se não existir)
INSERT INTO perfil (nome, curso, matricula, bio, cpf)
VALUES (
  'Aluno Exemplo', 
  'Engenharia de Software', 
  '20260001', 
  'Estudante de desenvolvimento de software apaixonado por tecnologia.', 
  '12345678901'
)
ON CONFLICT (matricula) DO NOTHING;
