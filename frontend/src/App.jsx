import { useState } from 'react';
import Login from './components/Login';
import Perfil from './components/Perfil';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
    setCurrentView('perfil');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setCurrentView('login');
  };

  return (
    <div className="app-container">
      {currentView === 'login' && <Login onLogin={handleLogin} />}
      {currentView === 'perfil' && <Perfil usuarioId={usuarioLogado?.id} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
