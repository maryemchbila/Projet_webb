import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Import des deux types de headers
import { MainHeader, DashboardHeader } from './components/Header';
import Footer from './components/Footer';
import Home from './components/public/Home';
import About from './components/public/About';
import UserProfile from './components/Profil/profil';
import Dashboard from './components/Dashboard/Dashboard';
import Opportunities from './components/Opportunities/Opportunities';
import OpportunityDetails from './components/Opportunities/OpportunityDetails';
import Destinations from './components/destinations';
import Resources from './components/Resources/resources';
import ResourceSubpage from './components/Resources/ResourceSubpage';
import ResourceDetails from './components/Resources/ResourceDetails';
import Community from './components/Community/Community';
import PartnerDetail from './components/Community/PartnerDetail';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';
import apiService from './services/api';

// Import du composant d'onboarding
import OnboardingWizard from './components/Dashboard/OnboardingWizard';

// Import du nouveau composant Fiche Pays
import FichePays from './components/FichePays/FichePays';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Vérifier si l'utilisateur a besoin d'onboarding après chaque login
  useEffect(() => {
    if (isLoggedIn && user) {
      checkOnboardingStatus();
    }
  }, [isLoggedIn, user]);

  const checkAuth = async () => {
    setLoading(true);
    
    const token = authService.getToken();
    const currentUser = authService.getCurrentUser();
    
    if (token && currentUser) {
      setIsLoggedIn(true);
      setUser(currentUser);
      
      try {
        // Vérification simple du token
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          console.log('✅ Serveur backend disponible');
        }
      } catch (error) {
        console.warn('⚠️ Serveur backend non disponible:', error.message);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    
    setLoading(false);
  };

  // Vérifier si l'utilisateur a besoin d'onboarding
  const checkOnboardingStatus = async () => {
    try {
      const userId = user?._id || user?.id;
      if (!userId) {
        console.warn('Aucun ID utilisateur disponible');
        return;
      }

      console.log('Vérification onboarding pour utilisateur:', userId);
      
      // SIMULATION POUR LES TESTS - À ENLEVER PLUS TARD
      // Pour les tests, on suppose que l'onboarding n'est pas complété
      const profile = {
        onboardingCompleted: false,
        profileCompletion: 0
      };
      
      // OU décommenter cette ligne pour utiliser l'API réelle :
      // const response = await apiService.getUserProfile(userId);
      // const profile = response.profile;
      
      if (profile && !profile.onboardingCompleted) {
        console.log('Onboarding non complété, affichage dans 1 seconde');
        setTimeout(() => {
          setShowOnboarding(true);
        }, 1000);
      } else if (profile?.onboardingCompleted) {
        console.log('Onboarding déjà complété');
        setOnboardingCompleted(true);
      } else {
        console.log('Profil non trouvé, affichage onboarding');
        setShowOnboarding(true);
      }
      
    } catch (error) {
      console.error('Erreur lors de la vérification onboarding:', error);
      // En cas d'erreur, on affiche l'onboarding pour ne pas bloquer l'utilisateur
      setShowOnboarding(true);
    }
  };

  const handleLoginClick = () => setShowLogin(true);
  const handleRegisterClick = () => setShowRegister(true);

  const handleLoginSuccess = async (userData) => {
    console.log('Login successful, user:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
    
    // Vérifier l'onboarding après le login
    await checkOnboardingStatus();
    
    // Naviguer vers le dashboard
    navigate('/dashboard');
  };

  const handleRegisterSuccess = async (userData) => {
    console.log('Register successful, user:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    setShowRegister(false);
    
    // Pour les nouveaux utilisateurs, afficher l'onboarding immédiatement
    setTimeout(() => {
      setShowOnboarding(true);
    }, 500);
    
    navigate('/dashboard');
  };

  const handleLogout = () => {
    console.log('Logging out');
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setShowOnboarding(false);
    setOnboardingCompleted(false);
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  // Gestion de l'onboarding
  const handleOnboardingComplete = async (profileData) => {
    console.log('handleOnboardingComplete called with:', profileData);
    
    try {
      const userId = user?._id || user?.id;
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        alert('Utilisateur non identifié. Veuillez vous reconnecter.');
        return;
      }

      // Validation des données minimales
      if (!profileData.educationLevel || !profileData.fieldOfStudy || !profileData.primaryGoal) {
        alert('Veuillez remplir au moins le niveau d\'études, domaine et objectif principal');
        return;
      }

      // Préparer les données pour l'API
      const completeProfileData = {
        ...profileData,
        // Assurer que les tableaux existent
        targetCountries: profileData.targetCountries || [],
        skills: profileData.skills || [],
        languages: profileData.languages || ['fr'],
        opportunityTypes: profileData.opportunityTypes || [],
        preferredIndustries: profileData.preferredIndustries || [],
        // Valeurs par défaut pour les champs optionnels
        remoteWork: profileData.remoteWork || false,
        salaryExpectation: profileData.salaryExpectation || 'medium',
        currentStatus: profileData.currentStatus || 'student',
        timeframe: profileData.timeframe || 'flexible',
        certifications: profileData.certifications || [],
        interests: profileData.interests || []
      };

      console.log('Envoi des données au serveur:', completeProfileData);

      // Appeler l'API
      const result = await apiService.completeOnboarding(userId, completeProfileData);
      
      console.log('Réponse du serveur:', result);
      
      if (result.success) {
        // Mettre à jour l'état local
        setShowOnboarding(false);
        setOnboardingCompleted(true);
        
        // Mettre à jour l'utilisateur dans localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.profile = result.profile;
        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
        
        // Afficher un message de succès
        alert('✅ Profil complété avec succès !\nVotre tableau de bord est maintenant personnalisé selon vos préférences.');
        
        // Recharger la page pour mettre à jour le dashboard
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
      } else {
        alert(`Erreur: ${result.error || 'Impossible de sauvegarder le profil'}`);
      }
      
    } catch (error) {
      console.error('Erreur détaillée dans handleOnboardingComplete:', error);
      
      let errorMessage = 'Erreur lors de l\'enregistrement du profil. ';
      
      if (error.message.includes('400')) {
        errorMessage += 'Données invalides. Vérifiez les champs requis.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage += 'Le serveur semble hors ligne. ';
        errorMessage += 'Vos données ont été sauvegardées localement.';
        
        // Sauvegarder localement
        const offlineProfile = {
          ...profileData,
          savedOffline: true,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('pendingProfile', JSON.stringify(offlineProfile));
        
        // Mettre à jour l'état local quand même
        setShowOnboarding(false);
        setOnboardingCompleted(true);
        
        // Mettre à jour l'utilisateur dans localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.profile = { ...profileData, onboardingCompleted: true };
        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
        
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleSkipOnboarding = () => {
    console.log('Onboarding skipped');
    setShowOnboarding(false);
    alert('Vous pouvez compléter votre profil plus tard depuis votre tableau de bord.');
  };

  // Fonction pour déterminer quel header afficher
  const getCurrentHeader = (pathname) => {
    // Routes publiques avec MainHeader
    if (pathname === '/' || pathname === '/about') {
      return 'main';
    }
    // Toutes les autres routes utilisent DashboardHeader
    return 'dashboard';
  };

  // Composant Layout qui détermine le header en fonction de la route
  const Layout = ({ children }) => {
    const headerType = getCurrentHeader(location.pathname);
    
    return (
      <>
        {headerType === 'main' ? (
          <MainHeader 
            isLoggedIn={isLoggedIn}
            user={user}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            onLogout={handleLogout}
            onAboutClick={handleAboutClick}
          />
        ) : (
          <DashboardHeader 
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
            currentPage={location.pathname}
            onboardingCompleted={onboardingCompleted}
            onOpenOnboarding={() => setShowOnboarding(true)}
          />
        )}
        {children}
      </>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de l'application...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Wizard d'onboarding (s'affiche par-dessus tout) */}
      {showOnboarding && (
        <OnboardingWizard 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      )}

      <Routes>
        {/* Route Accueil avec MainHeader */}
        <Route path="/" element={
          <>
            <Layout />
            <Home 
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
            />
          </>
        } />
        
        {/* Route About avec MainHeader */}
        <Route path="/about" element={
          <>
            <Layout />
            <About />
          </>
        } />
        
        {/* Routes protégées avec DashboardHeader */}
        
        {/* Dashboard - Personnalisé avec onboarding */}
        <Route path="/dashboard" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <Dashboard 
                user={user} 
                onLogout={handleLogout}
                onboardingCompleted={onboardingCompleted}
                onOpenOnboarding={() => setShowOnboarding(true)}
              />
            </>
          </ProtectedRoute>
        } />
        
        {/* Route Profil */}
        <Route path="/profil" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <UserProfile 
                user={user} 
                onLogout={handleLogout}
                onProfileUpdate={(updatedUser) => {
                  setUser(updatedUser);
                  checkOnboardingStatus();
                }}
              />
            </>
          </ProtectedRoute>
        } />
        
        {/* Routes Opportunités */}
        <Route path="/opportunities" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <Opportunities user={user} />
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/opportunities/:id" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <OpportunityDetails user={user} />
            </>
          </ProtectedRoute>
        } />
        
        {/* NOUVELLE ROUTE: Fiche Pays */}
        <Route path="/fiche-pays" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <FichePays user={user} />
            </>
          </ProtectedRoute>
        } />
        
        {/* Routes Destinations */}
        <Route path="/destinations" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <Destinations user={user} />
            </>
          </ProtectedRoute>
        } />
        
        {/* Routes Resources */}
        <Route path="/resources" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <Resources user={user} />
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/resources/:category" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <ResourceSubpage user={user} />
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/resources/view/:id" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <ResourceDetails user={user} />
            </>
          </ProtectedRoute>
        } />
        
        {/* Routes Community */}
        <Route path="/community" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <Community user={user} />
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/community/:id" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <Layout />
              <PartnerDetail user={user} />
            </>
          </ProtectedRoute>
        } />

        {/* Route Onboarding (optionnelle) */}
        <Route path="/onboarding" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <DashboardHeader 
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
                currentPage="/onboarding"
                onboardingCompleted={onboardingCompleted}
                onOpenOnboarding={() => setShowOnboarding(true)}
              />
              <div className="onboarding-page">
                <OnboardingWizard 
                  onComplete={handleOnboardingComplete}
                  onSkip={handleSkipOnboarding}
                />
              </div>
            </>
          </ProtectedRoute>
        } />
        
        {/* Route 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Footer présent sur toutes les pages */}
      <Footer />
      
      {/* Modals */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <RegisterModal 
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}

export default App;