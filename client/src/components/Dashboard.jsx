import { useState } from 'react';

function Dashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('tableau-de-bord');

  // Données simulées de l'utilisateur
  const userData = {
    name: "Jean Dupont",
    level: "Étudiant",
    progress: 65,
    notifications: 3,
    avatar: "/avatar.jpg"
  };

  // Données simulées pour les charts
  const statsData = {
    progression: 75,
    paysVisites: 3,
    servicesUtilises: 8,
    connexions: 24
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'tableau-de-bord':
        return <DashboardHome userData={userData} statsData={statsData} />;
      case 'passeports':
        return <PassportsSection />;
      case 'pays':
        return <CountriesSection />;
      case 'services':
        return <ServicesSection />;
      case 'profil':
        return <ProfileSection userData={userData} />;
      default:
        return <DashboardHome userData={userData} statsData={statsData} />;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="GlobalPath" width="60" />
          <h3>GlobalPath</h3>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4>NAVIGATION PRINCIPALE</h4>
            <ul>
              <li>
                <button 
                  className={activeSection === 'tableau-de-bord' ? 'active' : ''}
                  onClick={() => setActiveSection('tableau-de-bord')}
                >
                  📊 Tableau de bord
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'passeports' ? 'active' : ''}
                  onClick={() => setActiveSection('passeports')}
                >
                  🛂 Passeports & Visas
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'pays' ? 'active' : ''}
                  onClick={() => setActiveSection('pays')}
                >
                  🌍 Pays & Destinations
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'services' ? 'active' : ''}
                  onClick={() => setActiveSection('services')}
                >
                  🛎️ Services
                </button>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <h4>MON COMPTE</h4>
            <ul>
              <li>
                <button 
                  className={activeSection === 'profil' ? 'active' : ''}
                  onClick={() => setActiveSection('profil')}
                >
                  👤 Mon Profil
                </button>
              </li>
              <li>
                <button>
                  ⚙️ Paramètres
                </button>
              </li>
              <li>
                <button className="logout-btn" onClick={onLogout}>
                  🚪 Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Bonjour, {userData.name} 👋</h1>
            <p>Bienvenue dans votre espace personnel GlobalPath</p>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              🔔 <span className="notification-count">{userData.notifications}</span>
            </button>
            <div className="user-avatar">
              <img src={userData.avatar} alt="Avatar" />
              <span className="user-level">{userData.level}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Composant Tableau de Bord Principal
function DashboardHome({ userData, statsData }) {
  return (
    <div className="dashboard-home">
      {/* Statistiques Rapides */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Progression</h3>
            <span className="stat-value">{statsData.progression}%</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${statsData.progression}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-info">
            <h3>Pays visités</h3>
            <span className="stat-value">{statsData.paysVisites}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛎️</div>
          <div className="stat-info">
            <h3>Services utilisés</h3>
            <span className="stat-value">{statsData.servicesUtilises}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-info">
            <h3>Connexions</h3>
            <span className="stat-value">{statsData.connexions}</span>
          </div>
        </div>
      </div>

      {/* Graphiques et Tableaux */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>📊 Progression Mensuelle</h3>
          <div className="chart-placeholder">
            <p>Graphique de progression</p>
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '75%' }}></div>
              <div className="chart-bar" style={{ height: '90%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="chart-card">
          <h3>🌍 Répartition par Pays</h3>
          <div className="chart-placeholder">
            <p>Carte des destinations</p>
            <div className="countries-list">
              <div className="country-item">
                <span>🇫🇷 France</span>
                <span className="country-stats">45%</span>
              </div>
              <div className="country-item">
                <span>🇨🇦 Canada</span>
                <span className="country-stats">30%</span>
              </div>
              <div className="country-item">
                <span>🇩🇪 Allemagne</span>
                <span className="country-stats">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activité Récente */}
      <div className="recent-activity">
        <h3>🕒 Activité Récente</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📝</span>
            <div className="activity-content">
              <p>Vous avez complété votre profil à 85%</p>
              <span className="activity-time">Il y a 2 heures</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🌍</span>
            <div className="activity-content">
              <p>Nouvelle destination ajoutée : Canada</p>
              <span className="activity-time">Il y a 1 jour</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🛂</span>
            <div className="activity-content">
              <p>Visa pour la France approuvé</p>
              <span className="activity-time">Il y a 3 jours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Autres sections du dashboard
function PassportsSection() {
  return (
    <div className="section-content">
      <h2>🛂 Passeports & Visas</h2>
      <p>Gérez vos documents de voyage...</p>
    </div>
  );
}

function CountriesSection() {
  return (
    <div className="section-content">
      <h2>🌍 Pays & Destinations</h2>
      <p>Explorez vos destinations...</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="section-content">
      <h2>🛎️ Services</h2>
      <p>Accédez à nos services...</p>
    </div>
  );
}

function ProfileSection({ userData }) {
  return (
    <div className="section-content">
      <h2>👤 Mon Profil</h2>
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={userData.avatar} alt="Avatar" />
        </div>
        <div className="profile-details">
          <h3>{userData.name}</h3>
          <p>{userData.level}</p>
          <p>Progression: {userData.progress}%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;