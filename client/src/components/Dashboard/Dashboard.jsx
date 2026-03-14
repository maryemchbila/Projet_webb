import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import apiService from '../../services/api';
import authService from '../../services/authService';
import OnboardingWizard from './OnboardingWizard';
import OpportunityCard from '../Opportunities/OpportunityCard';
import ProfileCompletion from '../Profil/ProfileCompletion';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    opportunities: [],
    courses: [],
    stats: {},
    recommendations: []
  });
  
  const [loading, setLoading] = useState({
    main: true,
    opportunities: true,
    courses: true
  });
  
  const [error, setError] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  
  const currentUser = user || authService.getCurrentUser();

  useEffect(() => {
    checkOnboardingStatus();
    fetchDashboardData();
  }, []);

  // Vérifier si l'utilisateur a complété l'onboarding
  const checkOnboardingStatus = async () => {
    try {
      const userId = currentUser?._id || currentUser?.id;
      if (!userId) {
        console.log('No user ID found, showing onboarding');
        setTimeout(() => {
          setShowOnboarding(true);
        }, 2000);
        return;
      }
      
      console.log('Checking onboarding status for user:', userId);
      const profile = await apiService.getUserProfile(userId);
      
      console.log('Profile data received:', profile);
      
      if (!profile || !profile.onboardingCompleted) {
        // Afficher l'onboarding après 2 secondes
        setTimeout(() => {
          setShowOnboarding(true);
        }, 2000);
      } else {
        // Calculer le pourcentage de complétion du profil
        calculateProfileCompletion(profile);
      }
    } catch (error) {
      console.error('Error checking onboarding:', error);
      // En cas d'erreur, montrer l'onboarding
      setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);
    }
  };

  // Calculer le pourcentage de complétion du profil
  const calculateProfileCompletion = (profile) => {
    if (!profile) {
      setProfileCompletion(0);
      return;
    }
    
    let score = 0;
    const totalFields = 8;
    
    if (profile.educationLevel) score++;
    if (profile.fieldOfStudy) score++;
    if (profile.primaryGoal) score++;
    if (profile.targetCountries?.length > 0) score++;
    if (profile.skills?.length > 0) score++;
    if (profile.languages?.length > 0) score++;
    if (profile.opportunityTypes?.length > 0) score++;
    if (profile.preferredIndustries?.length > 0) score++;
    
    const percentage = Math.round((score / totalFields) * 100);
    console.log('Profile completion calculated:', percentage, '%');
    setProfileCompletion(percentage);
  };

  // Fonction pour charger les données du dashboard
  const fetchDashboardData = async () => {
    try {
      setError('');
      setLoading({ main: true, opportunities: true, courses: true });
      
      const userId = currentUser?._id || currentUser?.id;
      console.log('Fetching dashboard data for user:', userId);
      
      // Charger les données personnalisées si l'utilisateur est connecté
      if (userId) {
        try {
          const dashboardResponse = await apiService.getDashboardData(userId);
          console.log('Dashboard data received:', dashboardResponse);
          
          if (dashboardResponse) {
            setDashboardData({
              opportunities: dashboardResponse.opportunities || [],
              courses: dashboardResponse.courses || [],
              stats: dashboardResponse.stats || {},
              recommendations: dashboardResponse.recommendations || []
            });
          }
        } catch (apiError) {
          console.warn('API error, using default data:', apiError.message);
          // Si l'API échoue, utiliser les données par défaut
          setDashboardData({
            opportunities: getDefaultOpportunities(),
            courses: getDefaultCourses(),
            stats: {
              matchScore: 75,
              totalOpportunities: 12,
              applications: 3
            },
            recommendations: getDefaultRecommendations()
          });
        }
      } else {
        // Données par défaut pour les visiteurs
        console.log('No user ID, using default data');
        setDashboardData({
          opportunities: getDefaultOpportunities(),
          courses: getDefaultCourses(),
          stats: {
            matchScore: 0,
            totalOpportunities: 0,
            applications: 0
          },
          recommendations: []
        });
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Erreur lors du chargement des données');
      
      // Données par défaut en cas d'erreur
      setDashboardData({
        opportunities: getDefaultOpportunities(),
        courses: getDefaultCourses(),
        stats: {
          matchScore: 0,
          totalOpportunities: 5,
          applications: 0
        },
        recommendations: getDefaultRecommendations()
      });
      
    } finally {
      setLoading({ main: false, opportunities: false, courses: false });
    }
  };

  // Opportunités par défaut
  const getDefaultOpportunities = () => {
    return [
      {
        _id: '1',
        title: 'Stage - Développeur Full Stack',
        company: 'TechStart',
        location: 'Paris, France',
        type: 'internship',
        duration: '6 mois',
        salary: '1200€/mois',
        matchScore: 85,
        matchReasons: ['Correspond à votre domaine d\'études', 'Compétences requises alignées'],
        description: 'Stage en développement web avec React et Node.js',
        requirements: {
          skills: ['programming', 'javascript', 'react'],
          educationLevel: ['licence', 'master'],
          languages: ['fr', 'en']
        },
        isNew: true,
        deadline: '2024-03-15',
        status: 'active'
      },
      {
        _id: '2',
        title: 'Assistant Marketing Digital',
        company: 'MarketingPro',
        location: 'Lyon, France',
        type: 'full_time',
        duration: 'CDI',
        salary: '35k€/an',
        matchScore: 72,
        matchReasons: ['Dans votre pays cible', 'Secteur correspondant à vos intérêts'],
        description: 'Poste en marketing digital avec gestion des réseaux sociaux',
        requirements: {
          skills: ['marketing', 'communication'],
          educationLevel: ['licence', 'master'],
          languages: ['fr']
        },
        isNew: false,
        deadline: '2024-03-30',
        status: 'active'
      },
      {
        _id: '3',
        title: 'Ingénieur DevOps',
        company: 'CloudCorp',
        location: 'Remote',
        type: 'full_time',
        duration: 'CDI',
        salary: '45k€/an',
        matchScore: 68,
        matchReasons: ['Télétravail possible', 'Technologies modernes'],
        description: 'Gestion infrastructure cloud et automatisation CI/CD',
        requirements: {
          skills: ['docker', 'kubernetes', 'aws'],
          educationLevel: ['master'],
          languages: ['en']
        },
        isNew: true,
        deadline: '2024-04-15',
        status: 'active'
      }
    ];
  };

  // Cours par défaut
  const getDefaultCourses = () => {
    return [
      {
        _id: '1',
        title: 'Introduction à la Programmation',
        subtitle: 'Apprendre les bases de la programmation avec Python',
        progress: 65,
        completedModules: 4,
        totalModules: 6,
        lastActivity: 'Hier',
        status: 'En cours',
        estimatedTime: '15h',
        category: 'informatique',
        matchScore: 90
      },
      {
        _id: '2',
        title: 'Préparation au TOEFL',
        subtitle: 'Améliorez votre score au test d\'anglais',
        progress: 30,
        completedModules: 2,
        totalModules: 8,
        lastActivity: 'Il y a 3 jours',
        status: 'En cours',
        estimatedTime: '25h',
        category: 'langues',
        matchScore: 88
      },
      {
        _id: '3',
        title: 'Marketing Digital Avancé',
        subtitle: 'Stratégies digitales pour les entreprises',
        progress: 10,
        completedModules: 1,
        totalModules: 10,
        lastActivity: 'Il y a 1 semaine',
        status: 'En cours',
        estimatedTime: '20h',
        category: 'marketing',
        matchScore: 75
      }
    ];
  };

  // Recommandations par défaut
  const getDefaultRecommendations = () => {
    return [
      {
        icon: '📝',
        title: 'Complétez votre CV',
        description: 'Ajoutez vos dernières expériences pour améliorer votre profil',
        link: '/profile/edit',
        actionText: 'Mettre à jour'
      },
      {
        icon: '🎯',
        title: 'Testez vos compétences',
        description: 'Découvrez vos points forts avec notre évaluation',
        link: '/tests/skills',
        actionText: 'Commencer'
      },
      {
        icon: '🌍',
        title: 'Explorez les opportunités internationales',
        description: 'Découvrez nos programmes à l\'étranger',
        link: '/opportunities?type=international',
        actionText: 'Explorer'
      }
    ];
  };

  // Gestion de l'onboarding - CORRIGÉ
  const handleOnboardingComplete = async (profileData) => {
    try {
      const userId = currentUser?._id || currentUser?.id;
      if (!userId) {
        console.error('No user ID found');
        alert('Utilisateur non identifié. Veuillez vous reconnecter.');
        return;
      }
      
      console.log('Saving profile data for user:', userId);
      console.log('Profile data:', profileData);
      
      // Préparer les données pour l'API
      const dataToSave = {
        ...profileData,
        onboardingCompleted: true,
        onboardingDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      // Utiliser la méthode intelligente qui gère les erreurs d'API
      const result = await apiService.updateUserProfileSmart(userId, dataToSave);
      
      console.log('Profile saved successfully:', result);
      
      // Mettre à jour l'interface
      setShowOnboarding(false);
      calculateProfileCompletion(dataToSave);
      
      // Recharger les données du dashboard
      await fetchDashboardData();
      
      // Afficher un message de succès
      alert('✅ Profil enregistré avec succès ! Vos recommandations ont été mises à jour.');
      
    } catch (error) {
      console.error('Error saving profile:', error);
      
      // Fallback ultime : sauvegarde locale
      try {
        const userId = currentUser?._id || currentUser?.id;
        if (userId) {
          const fallbackData = {
            ...profileData,
            onboardingCompleted: true,
            onboardingDate: new Date().toISOString()
          };
          
          // Sauvegarder dans localStorage
          localStorage.setItem(`user_profile_${userId}`, JSON.stringify(fallbackData));
          
          // Mettre à jour l'interface
          setShowOnboarding(false);
          calculateProfileCompletion(fallbackData);
          
          console.log('Profile saved to localStorage as fallback');
          alert('✅ Profil enregistré localement. Vos données seront synchronisées plus tard.');
        }
      } catch (fallbackError) {
        console.error('Even fallback failed:', fallbackError);
        alert('⚠️ Erreur lors de l\'enregistrement. Veuillez réessayer ou contacter le support.');
      }
    }
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    alert('Vous pouvez compléter votre profil plus tard depuis la page "Mon profil".');
  };

  // Navigation
  const handleContinueCourse = (courseId) => {
    console.log('Continuing course:', courseId);
    navigate(`/courses/${courseId}`);
  };

  const handleViewOpportunityDetails = (opportunityId) => {
    console.log('Viewing opportunity details:', opportunityId);
    navigate(`/opportunities/${opportunityId}`);
  };

  const handleApplyOpportunity = async (opportunityId) => {
    try {
      const userId = currentUser?._id || currentUser?.id;
      if (!userId) {
        alert('Veuillez vous connecter pour postuler');
        navigate('/login');
        return;
      }
      
      console.log('Applying to opportunity:', opportunityId, 'for user:', userId);
      
      await apiService.applyToOpportunity(userId, opportunityId);
      alert('✅ Candidature envoyée avec succès!');
      
      // Recharger pour mettre à jour les stats
      fetchDashboardData();
      
    } catch (error) {
      console.error('Error applying:', error);
      
      // Simuler une candidature en mode développement
      if (error.message.includes('serveur') || error.message.includes('fetch')) {
        console.log('Backend unavailable, simulating application');
        
        // Mettre à jour localement
        const appliedKey = `applied_opportunities_${currentUser?._id || currentUser?.id}`;
        const applied = JSON.parse(localStorage.getItem(appliedKey) || '[]');
        applied.push({
          opportunityId,
          date: new Date().toISOString(),
          status: 'pending'
        });
        localStorage.setItem(appliedKey, JSON.stringify(applied));
        
        // Mettre à jour les stats localement
        setDashboardData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            applications: (prev.stats.applications || 0) + 1
          }
        }));
        
        alert('✅ Candidature simulée (mode développement)');
      } else {
        alert('❌ Erreur lors de l\'envoi de la candidature: ' + error.message);
      }
    }
  };

  const handleImproveProfile = () => {
    navigate('/profile/edit');
  };

  const handleExploreAllOpportunities = () => {
    navigate('/opportunities');
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  const handleViewCountrySheets = () => {
    navigate('/fiche-pays');
  };

  // Afficher les statistiques
  const renderStats = () => {
    const { stats } = dashboardData;
    
    return (
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalOpportunities || 0}</div>
          <div className="stat-label">Opportunités</div>
          <div className="stat-subtitle">Correspondant à votre profil</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.applications || 0}</div>
          <div className="stat-label">Candidatures</div>
          <div className="stat-subtitle">Envoyées</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{profileCompletion}%</div>
          <div className="stat-label">Profil complet</div>
          <div className="stat-subtitle">
            <button 
              className="improve-link"
              onClick={handleImproveProfile}
            >
              Améliorer →
            </button>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {stats.matchScore ? `${stats.matchScore}%` : '--'}
          </div>
          <div className="stat-label">Match score</div>
          <div className="stat-subtitle">Moyenne des recommandations</div>
        </div>
      </div>
    );
  };

  // Afficher un indicateur de chargement
  if (loading.main) {
    return (
      <div className="dashboard loading-screen">
        <div className="loading-spinner"></div>
        <p>Chargement de votre tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {showOnboarding && (
        <OnboardingWizard 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      )}
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h2>Bienvenue, <span className="student-name">{currentUser?.name || 'Étudiant'}</span></h2>
            <p className="welcome-subtitle">
              Votre tableau de bord personnalisé basé sur vos intérêts et objectifs
            </p>
          </div>
          
          {profileCompletion < 100 && !showOnboarding && (
            <ProfileCompletion 
              percentage={profileCompletion}
              onComplete={() => setShowOnboarding(true)}
            />
          )}
        </header>

        {error && (
          <div className="error-message">
            ⚠️ {error}
            <button 
              className="retry-btn"
              onClick={fetchDashboardData}
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Statistiques */}
        {renderStats()}

        <div className="dashboard-grid">
          {/* Colonne principale - Opportunités recommandées */}
          <div className="main-column">
            <div className="section-header">
              <div className="section-title">
                <h3>🎯 Opportunités pour vous</h3>
                <button 
                  className="view-all-btn"
                  onClick={handleExploreAllOpportunities}
                >
                  Voir tout →
                </button>
              </div>
              <p className="section-subtitle">
                Basé sur votre profil et vos objectifs
              </p>
            </div>

            {loading.opportunities ? (
              <div className="loading">Chargement des opportunités...</div>
            ) : dashboardData.opportunities.length > 0 ? (
              <div className="opportunities-grid">
                {dashboardData.opportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity._id}
                    opportunity={opportunity}
                    onViewDetails={handleViewOpportunityDetails}
                    onApply={handleApplyOpportunity}
                    showMatchScore={true}
                    user={currentUser}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">😕</div>
                <p>Aucune opportunité correspondant à votre profil</p>
                <div className="empty-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleExploreAllOpportunities}
                  >
                    Explorer toutes les opportunités
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowOnboarding(true)}
                  >
                    Mettre à jour mon profil
                  </button>
                </div>
              </div>
            )}

            {/* Recommandations supplémentaires */}
            {dashboardData.recommendations?.length > 0 && (
              <div className="recommendations-section">
                <h4>💡 Recommandé pour vous</h4>
                <div className="recommendations-grid">
                  {dashboardData.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-card">
                      <div className="recommendation-icon">{rec.icon}</div>
                      <div className="recommendation-content">
                        <h5>{rec.title}</h5>
                        <p>{rec.description}</p>
                        <button 
                          className="btn btn-outline"
                          onClick={() => navigate(rec.link)}
                        >
                          {rec.actionText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne latérale - Cours et actions */}
          <div className="sidebar-column">
            {/* Cours en cours */}
            <div className="courses-section">
              <div className="section-header">
                <div className="section-title">
                  <h3>📚 Cours à compléter</h3>
                  <button 
                    className="view-all-btn"
                    onClick={handleViewAllCourses}
                  >
                    Voir tout →
                  </button>
                </div>
              </div>

              {loading.courses ? (
                <div className="loading">Chargement des cours...</div>
              ) : dashboardData.courses.length > 0 ? (
                <div className="courses-list">
                  {dashboardData.courses.map((course) => (
                    <div key={course._id} className="course-card">
                      <div className="course-header">
                        <h4>{course.title}</h4>
                        {course.matchScore && (
                          <span className="match-badge">
                            {course.matchScore}% de pertinence
                          </span>
                        )}
                      </div>
                      
                      <p className="course-subtitle">{course.subtitle}</p>
                      
                      <div className="course-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                        <div className="progress-info">
                          <span>{course.progress || 0}% complété</span>
                          <span>{course.completedModules || 0}/{course.totalModules || 0} modules</span>
                        </div>
                      </div>
                      
                      <div className="course-details">
                        {course.lastActivity && (
                          <p>Dernière activité: {course.lastActivity}</p>
                        )}
                        {course.estimatedTime && (
                          <p>Temps estimé: {course.estimatedTime}</p>
                        )}
                      </div>
                      
                      <div className="course-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleContinueCourse(course._id)}
                        >
                          {course.progress > 0 ? 'Continuer' : 'Commencer'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <p>Aucun cours disponible</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={handleViewAllCourses}
                  >
                    Explorer les cours
                  </button>
                </div>
              )}
            </div>

            {/* Actions rapides */}
            <div className="quick-actions">
              <h4>⚡ Actions rapides</h4>
              <div className="actions-list">
                <button 
                  className="action-btn"
                  onClick={() => navigate('/profile/edit')}
                >
                  <span className="action-icon">👤</span>
                  Compléter mon profil
                </button>
                <button 
                  className="action-btn"
                  onClick={() => navigate('/tests/skills')}
                >
                  <span className="action-icon">🧪</span>
                  Passer un test de compétences
                </button>
                <button 
                  className="action-btn"
                  onClick={handleExploreAllOpportunities}
                >
                  <span className="action-icon">🔍</span>
                  Rechercher des opportunités
                </button>
                <button 
                  className="action-btn"
                  onClick={handleViewCountrySheets}  
                >
                  <span className="action-icon">🌍</span>
                  Consulter les fiches pays
                </button>
                <button 
                  className="action-btn"
                  onClick={() => navigate('/calendar')}
                >
                  <span className="action-icon">📅</span>
                  Voir mon calendrier
                </button>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="next-steps">
              <h4>🚀 Prochaines étapes recommandées</h4>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Consultez les fiches pays</strong>
                    <p>Vérifiez les documents nécessaires pour votre destination</p>
                    <button 
                      className="step-action-btn"
                      onClick={handleViewCountrySheets}
                    >
                      Voir les fiches →
                    </button>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Améliorez votre CV</strong>
                    <p>Ajoutez vos nouvelles compétences</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Passez le test TOEFL</strong>
                    <p>Requis pour 80% des universités américaines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;