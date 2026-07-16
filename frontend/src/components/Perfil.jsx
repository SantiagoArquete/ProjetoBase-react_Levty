import { useState, useEffect } from 'react';
import './Perfil.css';

function Perfil({ usuarioId, onLogout }) {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {

    const buscarPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/perfil/${usuarioId}`);
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do perfil.');
        }
        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarPerfil();
    
  }, []);

  if (loading) {
    return <div className="glass-panel profile-container"><div className="loader"></div>Carregando perfil...</div>;
  }

  if (erro) {
    return (
      <div className="glass-panel profile-container erro">
        <p>Erro: {erro}</p>
        <button className="btn-primary" onClick={onLogout}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="glass-panel profile-container">
      <div className="profile-header">
        <div className="avatar">
          {perfil.nome.charAt(0)}
        </div>
        <h2>{perfil.nome}</h2>
        <span className="badge">{perfil.curso}</span>
      </div>
      
      <div className="profile-details">
        <div className="detail-item">
          <strong>Matrícula:</strong> {perfil.matricula}
        </div>
        <div className="detail-item">
          <strong>Bio:</strong> {perfil.bio}
        </div>
      </div>

      <button className="btn-primary logout-btn" onClick={onLogout}>
        Sair
      </button>
    </div>
  );
}

export default Perfil;
