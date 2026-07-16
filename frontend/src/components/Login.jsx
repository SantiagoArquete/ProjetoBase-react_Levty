import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula, senha })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.usuario);
      } else {
        setErro(data.erro || 'Falha no login');
      }
    } catch (error) {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel login-container">
      <h1>Bem-vindo</h1>
      {erro && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Matrícula</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Código de 10 caracteres" 
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            maxLength={10}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Senha (CPF)</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Digite seu CPF" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;
