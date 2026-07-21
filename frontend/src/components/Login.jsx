import { useState } from 'react';
import './Login.css';
import api from '../services/api';

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
      const { data } = await api.post('api/login', { matricula, senha });
      onLogin(data.usuario);
    } catch (error) {
      if (error.response) {
        // Erro retornado pelo servidor (4xx, 5xx)
        setErro(error.response.data?.erro || 'Falha no login');
      } else {
        // Erro de rede / sem conexão
        setErro('Erro de conexão. Tente novamente.');
      }
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
