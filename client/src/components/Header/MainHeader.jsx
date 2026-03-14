function Header({ onLoginClick, onRegisterClick, onAboutClick, onHomeClick }) {
  return (
    <header className="fixed w-full z-50 bg-gradient-to-b from-black/50 to-transparent transition-all duration-300 py-4 px-8 flex justify-between items-center">
      
      {/* Logo avec image + texte */}
      <div 
        className="flex items-center gap-4 cursor-pointer"
        onClick={onHomeClick}
      >
        <img 
          src="src/assets/images/Logo.png" 
          alt="GlobalPath Logo" 
          width="60" 
          height="60"
          className="hover:scale-105 transition-transform duration-200"
        />
        <div className="flex flex-col">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            GlobalPath
          </h1>
          <p className="text-gray-300 text-sm mt-1">Votre chemin vers l'international</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex gap-8">
        <a 
          href="#" 
          className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
          onClick={(e) => { e.preventDefault(); onHomeClick(); }}
        >
          Accueil
        </a>
        <a 
          href="#" 
          className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
          onClick={(e) => { e.preventDefault(); onAboutClick(); }}
        >
          À propos
        </a>
        <a 
          href="#" 
          className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
          onClick={(e) => { e.preventDefault(); onRegisterClick(); }}
        >
          S'inscrire
        </a>
        <a 
          href="#" 
          className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
          onClick={(e) => { e.preventDefault(); onLoginClick(); }}
        >
          Se connecter
        </a>
      </nav>
    </header>
  );
}

export default Header;