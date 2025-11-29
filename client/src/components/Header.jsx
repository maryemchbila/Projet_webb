function Header({ onLoginClick, onRegisterClick, onAboutClick, onHomeClick }) {
  return (
    <header>
      <img 
        src="src\assets\images\Capture d'écran 2025-11-06 112246.png" 
        alt="GlobalPath" 
        width="90" 
        onClick={onHomeClick}
        style={{ cursor: 'pointer' }}
      />
      <nav>
        <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Accueil</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>S'inscrire</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Se connecter</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }}>À propos</a>
      </nav>
    </header>
  );
}

export default Header;