import React from 'react';
import '../resources.css';

const LanguageTests = () => {
  const languageTests = [
    {
      id: 1,
      title: 'TOEFL',
      description: 'Test d’anglais pour études universitaires aux USA et Canada. Évalue compréhension, expression écrite et orale.',
      level: 'Tous niveaux',
      duration: '3-4 heures',
      price: 'Payant',
      features: ['Reconnu par 10000+ universités dans 150+ pays'],
      icon: '🇺🇸',
      downloadFile: 'guide-toefl-2024.pdf',
      downloadUrl: '/downloads/guides/guide-toefl-2024.pdf'
    },
    {
      id: 2,
      title: 'IELTS',
      description: 'Test d’anglais britannique pour études au Royaume-Uni, Australie, et immigration. Format académique et général.',
      level: 'Tous niveaux',
      duration: '2h45',
      price: 'Payant',
      features: ['Accepté par 10000+ organisations mondiales'],
      icon: '🇬🇧',
      downloadFile: 'guide-ielts-2024.pdf',
      downloadUrl: '/downloads/guides/guide-ielts-2024.pdf'
    },
    {
      id: 3,
      title: 'DELF / DALF',
      description: 'Diplômes officiels de français langue étrangère délivrés par le ministère français de l’Éducation.',
      level: 'A1 à C2',
      duration: '1h30-3h30',
      price: 'Payant',
      features: ['Valable à vie, reconnu internationalement'],
      icon: '🇫🇷',
      downloadFile: 'guide-delf-dalf-2024.pdf',
      downloadUrl: '/downloads/guides/guide-delf-dalf-2024.pdf'
    },
    {
      id: 4,
      title: 'TCF',
      description: 'Test de Connaissance du Français pour évaluer le niveau en français rapidement.',
      level: 'A1 à C2',
      duration: '1h30',
      price: 'Payant',
      features: ['Reconnu pour immigration Canada et études en France'],
      icon: '🇫🇷',
      downloadFile: 'guide-tcf-2024.pdf',
      downloadUrl: '/downloads/guides/guide-tcf-2024.pdf'
    },
    {
      id: 5,
      title: 'Cambridge English',
      description: 'Suite de tests d anglais (KET, PET, FCE, CAE, CPE) pour tous les niveaux.',
      level: 'A2 à C2',
      duration: '2-4 heures',
      price: 'Payant',
      features: ['Reconnu par 25000+ universités et employeurs'],
      icon: '🇬🇧',
      downloadFile: 'guide-cambridge-2024.pdf',
      downloadUrl: '/downloads/guides/guide-cambridge-2024.pdf'
    },
    {
      id: 6,
      title: 'EF SET',
      description: 'Test d anglais gratuit et standardisé, reconnu, avec certificat de niveau.',
      level: 'Tous niveaux',
      duration: '50 min',
      price: 'Gratuit',
      features: ['Certificat gratuit aligné CEFR'],
      icon: '🌍',
      downloadFile: 'guide-efset-2024.pdf',
      downloadUrl: '/downloads/guides/guide-efset-2024.pdf'
    }
  ];

  // Fonction pour gérer le téléchargement
  const handleDownload = (testId, fileName, downloadUrl) => {
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    
    // Déclencher le téléchargement
    link.click();
    
    // Nettoyer
    document.body.removeChild(link);
    
    // Log pour le suivi (optionnel)
    console.log(`Téléchargement déclenché : ${fileName}`);
    
    // Vous pouvez aussi ajouter ici :
    // 1. Une notification à l'utilisateur
    // 2. Un tracker d'analytics
    // 3. Une vérification de connexion
  };

  // Fonction pour voir les détails (à personnaliser selon vos besoins)
  const handleViewDetails = (testId, testTitle) => {
    // Redirection vers une page de détails
    // Par exemple: navigate(`/resources/language-tests/${testId}`);
    console.log(`Voir les détails pour : ${testTitle}`);
    
    // Pour l'instant, afficher une alerte
    alert(`Détails du test ${testTitle} - Cette fonctionnalité sera bientôt disponible!`);
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>Tests de Langue</h1>
          <p className="subtitle">
            Certifiez votre niveau dans les langues les plus demandées pour études et immigration.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span className="active">Tests de Langue</span>
          </div>
        </header>

        <div className="tests-grid">
          {languageTests.map((test) => (
            <div key={test.id} className="test-card">
              <div className="test-header">
                <div className="test-icon">{test.icon}</div>
                <div className="test-title-section">
                  <h3>{test.title}</h3>
                  <div className="test-meta">
                    <span className="test-level">
                      <strong>Niveau :</strong> {test.level}
                    </span>
                    <span className="test-duration">
                      <strong>Durée :</strong> {test.duration}
                    </span>
                  </div>
                </div>
                <div className={`test-price ${test.price === 'Gratuit' ? 'free' : 'paid'}`}>
                  {test.price}
                </div>
              </div>
              
              <p className="test-description">{test.description}</p>
              
              <div className="test-features">
                {test.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-bullet">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="test-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(test.id, test.title)}
                >
                  Voir les détails
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleDownload(test.id, test.downloadFile, test.downloadUrl)}
                >
                  Télécharger le guide
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="additional-info">
          <h3>Conseils pour réussir vos tests de langue</h3>
          <ul className="tips-list">
            <li>Commencez votre préparation au moins 3 mois à l'avance</li>
            <li>Pratiquez régulièrement avec des tests blancs</li>
            <li>Améliorez votre vocabulaire technique selon votre domaine d'études</li>
            <li>Entraînez-vous à parler avec des locuteurs natifs</li>
            <li>Gérez votre temps efficacement pendant l'examen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageTests;