// client/src/components/Profil/profil.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import apiService from '../../services/api';
import './profil.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('informations-personnelles');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Données du profil
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    degree: '',
    country: '',
    city: '',
    educationLevel: '',
    fieldOfInterest: '',
    languages: [],
    currentInstitution: '',
    gpa: '',
    projects: '',
    interests: {
      studyAbroad: false,
      technicalCertifications: false,
      internshipsJobs: false,
      researchPhd: false,
      scholarships: false
    },
    goals: {
      shortTerm: '',
      longTerm: ''
    },
    timeline: {
      currentYear: new Date().getFullYear().toString(),
      targetYear: (new Date().getFullYear() + 1).toString()
    },
    resourcesProgress: [],
    aiConversations: [],
    settings: {
      language: 'Français',
      emailNotifications: 'Toutes'
    }
  });

  // ✅ AJOUTER CETTE FONCTION getInitials
  const getInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Charger les données utilisateur depuis l'API
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Récupérer l'utilisateur connecté depuis authService
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        navigate('/');
        return;
      }

      // 2. Récupérer le profil depuis l'API
      let apiProfile = null;
      try {
        apiProfile = await apiService.getProfile();
      } catch (apiError) {
        console.log('Using local profile data');
      }

      // 3. Récupérer les données locales
      const userId = currentUser._id || currentUser.id;
      const savedProfile = localStorage.getItem(`userProfile_${userId}`);
      const savedResources = localStorage.getItem(`userResources_${userId}`);
      const savedAIHistory = localStorage.getItem(`aiHistory_${userId}`);
      
      // 4. Fusionner les données
      const baseData = {
        name: currentUser.name || currentUser.username || 'Utilisateur',
        email: currentUser.email || 'non-defini@email.com',
        degree: 'Étudiant',
        country: '',
        city: '',
        educationLevel: 'Licence',
        fieldOfInterest: '',
        languages: ['Français'],
        currentInstitution: '',
        gpa: '',
        projects: '',
        interests: {
          studyAbroad: false,
          technicalCertifications: false,
          internshipsJobs: false,
          researchPhd: false,
          scholarships: false
        },
        goals: {
          shortTerm: '',
          longTerm: ''
        },
        timeline: {
          currentYear: new Date().getFullYear().toString(),
          targetYear: (new Date().getFullYear() + 1).toString()
        },
        settings: {
          language: 'Français',
          emailNotifications: 'Toutes'
        }
      };

      // Fusionner dans l'ordre de priorité : API > localStorage > base
      let mergedData = { ...baseData };
      
      if (savedProfile) {
        mergedData = { ...mergedData, ...JSON.parse(savedProfile) };
      }
      
      if (apiProfile) {
        mergedData = { ...mergedData, ...apiProfile };
      }

      // Données de progression
      const resourcesData = savedResources ? JSON.parse(savedResources) : [];
      const aiData = savedAIHistory ? JSON.parse(savedAIHistory) : [];

      setUserData({
        ...mergedData,
        resourcesProgress: resourcesData,
        aiConversations: aiData
      });

    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const saveProfileToAPI = async (profileData) => {
    try {
      setProfileLoading(true);
      const updatedProfile = await apiService.updateProfile(profileData);
      
      // Mettre à jour le localStorage
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const userId = currentUser._id || currentUser.id;
        
        // Extraire les données de profil (exclure resourcesProgress et aiConversations)
        const { resourcesProgress, aiConversations, ...profileToSave } = profileData;
        
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileToSave));
        
        // Mettre à jour l'utilisateur dans authService
        authService.saveCurrentUser({
          ...currentUser,
          name: profileData.name,
          email: profileData.email
        });
      }
      
      setSuccessMessage('Profil mis à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      return updatedProfile;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      
      // Préparer les données pour l'API
      const profileToSave = {
        name: userData.name,
        email: userData.email,
        degree: userData.degree,
        country: userData.country,
        city: userData.city,
        educationLevel: userData.educationLevel,
        fieldOfInterest: userData.fieldOfInterest,
        languages: userData.languages,
        currentInstitution: userData.currentInstitution,
        gpa: userData.gpa,
        projects: userData.projects,
        interests: userData.interests,
        goals: userData.goals,
        timeline: userData.timeline,
        settings: userData.settings
      };

      await saveProfileToAPI(profileToSave);
      setIsEditing(false);
    } catch (error) {
      setError(error.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleAddAIConversation = (question) => {
    const newConversation = {
      id: userData.aiConversations.length + 1,
      question: question,
      date: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    };
    
    const updatedConversations = [newConversation, ...userData.aiConversations];
    setUserData({ ...userData, aiConversations: updatedConversations });
    
    // Sauvegarder localement
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser._id || currentUser.id;
      localStorage.setItem(`aiHistory_${userId}`, JSON.stringify(updatedConversations));
    }
  };

  const handleAddResource = (resource) => {
    const updatedResources = [...userData.resourcesProgress, resource];
    setUserData({ ...userData, resourcesProgress: updatedResources });
    
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser._id || currentUser.id;
      localStorage.setItem(`userResources_${userId}`, JSON.stringify(updatedResources));
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'informations-personnelles', label: 'Informations personnelles', icon: 'fas fa-user' },
    { id: 'parcours-academique', label: 'Parcours académique', icon: 'fas fa-graduation-cap' },
    { id: 'centres-interet', label: 'Centres d\'intérêt', icon: 'fas fa-heart' },
    { id: 'mes-opportunites', label: 'Mes opportunités', icon: 'fas fa-briefcase' },
    { id: 'ressources-progression', label: 'Ressources & Progression', icon: 'fas fa-chart-line' },
    { id: 'ia-globalpath', label: 'IA GlobalPath', icon: 'fas fa-robot' },
    { id: 'parametres', label: 'Paramètres', icon: 'fas fa-cog' }
  ];

  // ✅ AJOUTER LA FONCTION renderContent
  const renderContent = () => {
    switch (activeSection) {
      case 'informations-personnelles':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Informations personnelles</h2>
              {!isEditing && (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i> Modifier
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Nom complet</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Pays</label>
                  <input
                    type="text"
                    value={userData.country}
                    onChange={(e) => setUserData({...userData, country: e.target.value})}
                    placeholder="Votre pays"
                  />
                </div>
                
                <div className="form-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                    placeholder="Votre ville"
                  />
                </div>
                
                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                    Annuler
                  </button>
                  <button className="btn-save" onClick={handleSave}>
                    {profileLoading ? 'Sauvegarde...' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Nom complet</span>
                  <span className="info-value">{userData.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pays</span>
                  <span className="info-value">{userData.country || 'Non spécifié'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ville</span>
                  <span className="info-value">{userData.city || 'Non spécifié'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Statut</span>
                  <span className="info-value">{userData.degree}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'parcours-academique':
        return (
          <div className="section-content">
            <h2>Parcours académique</h2>
            <p>Section en développement...</p>
          </div>
        );

      case 'centres-interet':
        return (
          <div className="section-content">
            <h2>Centres d'intérêt</h2>
            <p>Section en développement...</p>
          </div>
        );

      case 'mes-opportunites':
        return (
          <div className="section-content">
            <h2>Mes opportunités</h2>
            <p>Section en développement...</p>
          </div>
        );

      case 'ressources-progression':
        return (
          <div className="section-content">
            <h2>Ressources & Progression</h2>
            <p>Section en développement...</p>
          </div>
        );

      case 'ia-globalpath':
        return (
          <div className="section-content">
            <h2>IA GlobalPath</h2>
            <p>Section en développement...</p>
          </div>
        );

      case 'parametres':
        return (
          <div className="section-content">
            <h2>Paramètres</h2>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Langue de l'interface</label>
                <select 
                  value={userData.settings.language}
                  onChange={(e) => setUserData({
                    ...userData, 
                    settings: {...userData.settings, language: e.target.value}
                  })}
                >
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Espagnol">Espagnol</option>
                </select>
              </div>
              
              <div className="setting-item">
                <label>Notifications par email</label>
                <select 
                  value={userData.settings.emailNotifications}
                  onChange={(e) => setUserData({
                    ...userData, 
                    settings: {...userData.settings, emailNotifications: e.target.value}
                  })}
                >
                  <option value="Toutes">Toutes les notifications</option>
                  <option value="Importantes">Seulement importantes</option>
                  <option value="Aucune">Aucune</option>
                </select>
              </div>
            </div>
            
            <div className="danger-zone">
              <h3>Zone de danger</h3>
              <button className="btn-logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Se déconnecter
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="section-content">
            <h2>Informations personnelles</h2>
            <p>Sélectionnez une section dans le menu de gauche.</p>
          </div>
        );
    }
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        
        {successMessage && (
          <div className="success-message">
            ✅ {successMessage}
          </div>
        )}

        {/* Header du profil */}
        <header className="profile-header">
          <div className="user-avatar-large">
            <span>{getInitials(userData.name)}</span>
          </div>
          <div className="user-info">
            <h1>{userData.name}</h1>
            <p className="user-degree">{userData.degree}</p>
          </div>
        </header>

        {/* Contenu principal */}
        <div className="profile-content">
          {/* Sidebar de navigation */}
          <nav className="profile-sidebar">
            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contenu principal */}
          <main className="profile-main">
            {loading ? (
              <div className="loading">Chargement du profil...</div>
            ) : (
              <>
                {profileLoading && (
                  <div className="loading-overlay">
                    Sauvegarde en cours...
                  </div>
                )}
                {renderContent()}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;