import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion

  // Fonctions de navigation
  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  const handleAboutClick = () => {
    setCurrentPage('about');
  };

  // Fonction pour ouvrir l'inscription
  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  // Fonction de connexion réussie
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setCurrentPage('dashboard');
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  // Afficher la page actuelle
  const renderCurrentPage = () => {
    if (isLoggedIn) {
      return <Dashboard onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'about':
        return <About onRegisterClick={handleRegisterClick} />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <Header 
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={handleRegisterClick}
          onAboutClick={handleAboutClick}
          onHomeClick={handleHomeClick}
        />
      )}
      
      {renderCurrentPage()}
      
      {!isLoggedIn && <Footer />}
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={handleLoginSuccess} // ← Ajoutez cette prop
      />
      
      <RegisterModal 
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onRegisterSuccess={handleLoginSuccess} // ← Ajoutez cette prop
      />
    </div>
  );
}

export default App;