import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const DashboardHeader = ({ 
  studentName = "[Nom de l'étudiant]",
  isLoggedIn = false,
  user = null,
  onLogout = () => {},
  currentPage = '/dashboard',
  onboardingCompleted = false,
  onOpenOnboarding = () => {}
}) => {
  const navigate = useNavigate();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Simuler ou récupérer le pourcentage de complétion du profil
    if (user?.profile?.profileCompletion) {
      setProfileCompletion(user.profile.profileCompletion);
    } else if (onboardingCompleted) {
      setProfileCompletion(100);
    } else {
      setProfileCompletion(0);
    }
  }, [user, onboardingCompleted]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false); // Fermer le menu lors de la navigation
  };

  const isActive = (path) => {
    return currentPage === path;
  };

  const handleLogout = () => {
    onLogout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Fonction pour obtenir le nom d'affichage
  const getDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    if (studentName !== "[Nom de l'étudiant]") {
      return studentName;
    }
    return "Étudiant";
  };

  // Fonction pour obtenir l'initiale du nom
  const getInitial = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-container">
        <div className="nav-left">
          {/* Logo + Texte GlobalPath */}
          <div 
            className="logo-container"
            onClick={() => handleNavigation('/dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src="src/assets/images/Logo.png" 
              alt="GlobalPath Logo" 
              width="45"
              height="45"
              className="logo-image"
            />
            <div className="logo-text">
              <h1 className="site-name">GlobalPath</h1>
              <span className="dashboard-subtitle">Tableau de bord</span>
            </div>
          </div>
          
          <div className="search-bar">
            <input type="text" placeholder="Rechercher..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        
        <div className="nav-right">
          <ul className="nav-menu">
            <li 
              className={isActive('/dashboard') ? 'active' : ''}
              onClick={() => handleNavigation('/dashboard')}
              style={{ cursor: 'pointer' }}
            >
              Tableau de bord
            </li>
            <li 
              className={isActive('/opportunities') ? 'active' : ''}
              onClick={() => handleNavigation('/opportunities')}
              style={{ cursor: 'pointer' }}
            >
              Opportunités
            </li>
            <li 
              className={isActive('/fiche-pays') ? 'active' : ''}  // NOUVEAU: Fiche Pays
              onClick={() => handleNavigation('/fiche-pays')}
              style={{ cursor: 'pointer' }}
            >
              📄 Fiche Pays
            </li>
            <li 
              className={isActive('/resources') ? 'active' : ''}
              onClick={() => handleNavigation('/resources')}
              style={{ cursor: 'pointer' }}
            >
              Resources
            </li>
            <li 
              className={isActive('/community') ? 'active' : ''}
              onClick={() => handleNavigation('/community')}
              style={{ cursor: 'pointer' }}
            >
              Community
            </li>
            
            {/* Menu utilisateur avec onboarding */}
            <li className="user-menu-item">
              <div className="user-profile-container" onClick={handleProfileClick}>
                <div className="user-avatar">
                  <span className="user-initial">{getInitial()}</span>
                  {!onboardingCompleted && profileCompletion < 100 && (
                    <div className="profile-incomplete-badge">
                      ⚠️
                    </div>
                  )}
                </div>
                
                <div className="user-info">
                  <span className="user-name">{getDisplayName()}</span>
                  {!onboardingCompleted && profileCompletion < 100 ? (
                    <div 
                      className="profile-completion-indicator"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOnboarding();
                      }}
                    >
                      <div className="completion-text">
                        <span className="completion-warning">⚠️ Profil incomplet</span>
                        <span className="completion-action">Compléter →</span>
                      </div>
                      <div className="completion-bar">
                        <div 
                          className="completion-fill" 
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <span className="user-status">
                      {onboardingCompleted ? 'Profil complet ✓' : 'Connecté'}
                    </span>
                  )}
                </div>
                
                <span className="dropdown-arrow">▼</span>
              </div>
              
              {/* Menu déroulant */}
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      <span className="dropdown-initial">{getInitial()}</span>
                    </div>
                    <div className="dropdown-user-info">
                      <strong>{getDisplayName()}</strong>
                      <span className="dropdown-email">{user?.email || 'email@exemple.com'}</span>
                      {profileCompletion < 100 && (
                        <div className="dropdown-progress">
                          <span>Profil: {profileCompletion}% complété</span>
                          <button 
                            className="complete-profile-btn"
                            onClick={() => {
                              onOpenOnboarding();
                              setShowProfileMenu(false);
                            }}
                          >
                            Compléter
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-items">
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/profil')}
                    >
                      <span className="dropdown-icon">👤</span>
                      Mon Profil
                    </div>
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/dashboard')}
                    >
                      <span className="dropdown-icon">📊</span>
                      Tableau de bord
                    </div>
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/fiche-pays')}  // NOUVEAU
                    >
                      <span className="dropdown-icon">🌍</span>
                      Fiche Pays
                    </div>
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/opportunities')}
                    >
                      <span className="dropdown-icon">💼</span>
                      Mes Candidatures
                    </div>
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/resources')}
                    >
                      <span className="dropdown-icon">📚</span>
                      Mes Cours
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    {!onboardingCompleted && (
                      <div 
                        className="dropdown-item highlight"
                        onClick={() => {
                          onOpenOnboarding();
                          setShowProfileMenu(false);
                        }}
                      >
                        <span className="dropdown-icon">✨</span>
                        Personnaliser mon expérience
                      </div>
                    )}
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/profil?tab=settings')}
                    >
                      <span className="dropdown-icon">⚙️</span>
                      Paramètres
                    </div>
                    
                    <div 
                      className="dropdown-item"
                      onClick={() => handleNavigation('/help')}
                    >
                      <span className="dropdown-icon">❓</span>
                      Aide & Support
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <div 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <span className="dropdown-icon">🚪</span>
                      Déconnexion
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;