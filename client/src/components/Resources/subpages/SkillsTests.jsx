import React from 'react';
import '../resources.css';

const SkillsTests = () => {
  const skillsTests = [
    {
      id: 1,
      title: 'Test de Logique',
      description: 'Évaluez votre capacité à résoudre des problèmes logiques et à penser de manière critique.',
      category: 'Raisonnement',
      duration: '45 min',
      questions: 30,
      price: 'Gratuit',
      icon: '🧩',
      color: 'blue',
      exampleFile: 'exemple-test-logique.pdf',
      exampleUrl: '/downloads/exemples/exemple-test-logique.pdf',
      testFile: 'test-logique-complet.pdf',
      testUrl: '/downloads/tests/test-logique-complet.pdf'
    },
    {
      id: 2,
      title: 'Raisonnement Numérique',
      description: 'Testez vos compétences en mathématiques et analyse quantitative pour rôles techniques.',
      category: 'Quantitatif',
      duration: '60 min',
      questions: 40,
      price: 'Gratuit',
      icon: '🔢',
      color: 'purple',
      exampleFile: 'exemple-raisonnement-numerique.pdf',
      exampleUrl: '/downloads/exemples/exemple-raisonnement-numerique.pdf',
      testFile: 'test-raisonnement-numerique-complet.pdf',
      testUrl: '/downloads/tests/test-raisonnement-numerique-complet.pdf'
    },
    {
      id: 3,
      title: 'Test d\'Orientation',
      description: 'Découvrez vos centres d\'intérêt et les métiers qui correspondent à votre personnalité.',
      category: 'Orientation',
      duration: '30 min',
      questions: 50,
      price: 'Gratuit',
      icon: '🧭',
      color: 'orange',
      exampleFile: 'exemple-test-orientation.pdf',
      exampleUrl: '/downloads/exemples/exemple-test-orientation.pdf',
      testFile: 'test-orientation-complet.pdf',
      testUrl: '/downloads/tests/test-orientation-complet.pdf'
    },
    {
      id: 4,
      title: 'Test de Mémoire',
      description: 'Évaluez votre capacité de mémorisation à court et long terme avec différents types de stimuli.',
      category: 'Cognitive',
      duration: '25 min',
      questions: 'Interactive',
      price: 'Gratuit',
      icon: '🧠',
      color: 'green',
      exampleFile: 'exemple-test-memoire.pdf',
      exampleUrl: '/downloads/exemples/exemple-test-memoire.pdf',
      testFile: 'test-memoire-interactif.pdf',
      testUrl: '/downloads/tests/test-memoire-interactif.pdf'
    },
    {
      id: 5,
      title: 'Test de Créativité',
      description: 'Mesurez votre pensée divergente et votre capacité à générer des idées innovantes.',
      category: 'Innovation',
      duration: '40 min',
      questions: 15,
      price: 'Gratuit',
      icon: '💡',
      color: 'yellow',
      exampleFile: 'exemple-test-creativite.pdf',
      exampleUrl: '/downloads/exemples/exemple-test-creativite.pdf',
      testFile: 'test-creativite-complet.pdf',
      testUrl: '/downloads/tests/test-creativite-complet.pdf'
    },
    {
      id: 6,
      title: 'Test de Résolution de Problèmes',
      description: 'Analysez des scénarios complexes et proposez des solutions efficaces.',
      category: 'Analytique',
      duration: '50 min',
      questions: 8,
      price: 'Gratuit',
      icon: '⚙️',
      color: 'red',
      exampleFile: 'exemple-test-resolution-problemes.pdf',
      exampleUrl: '/downloads/exemples/exemple-test-resolution-problemes.pdf',
      testFile: 'test-resolution-problemes-complet.pdf',
      testUrl: '/downloads/tests/test-resolution-problemes-complet.pdf'
    }
  ];

  // Fonction pour télécharger un fichier
  const handleDownload = (fileName, fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Téléchargement : ${fileName}`);
  };

  // Fonction pour voir un exemple
  const handleViewExample = (testId, testTitle, fileUrl) => {
    // Option 1 : Télécharger l'exemple
    handleDownload(`exemple-${testTitle.toLowerCase()}.pdf`, fileUrl);
    
    // Option 2 : Ouvrir dans un nouvel onglet
    // window.open(fileUrl, '_blank');
    
    // Option 3 : Afficher une prévisualisation (si vous avez une page dédiée)
    // navigate(`/preview/test/${testId}`);
  };

  // Fonction pour commencer le test
  const handleStartTest = (testId, testTitle, testUrl) => {
    // Option 1 : Télécharger le test complet
    handleDownload(`test-${testTitle.toLowerCase()}.pdf`, testUrl);
    
    // Option 2 : Rediriger vers une page interactive
    // navigate(`/test/interactive/${testId}`);
    
    // Option 3 : Afficher un modal de confirmation
    const confirmStart = window.confirm(`Voulez-vous commencer le "${testTitle}" ?\nDurée : ${skillsTests.find(t => t.id === testId)?.duration}`);
    
    if (confirmStart) {
      // Télécharger le test
      handleDownload(`test-${testTitle.toLowerCase()}-complet.pdf`, testUrl);
      
      // Simuler un timer (optionnel)
      // startTestTimer(testId);
    }
  };

  // Fonction pour gérer les commentaires (si besoin)
  const handleViewComments = (testId) => {
    alert(`Fonctionnalité "Commentaires" pour le test ${testId} - Bientôt disponible!`);
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>Tests de Compétences</h1>
          <p className="subtitle">
            Évaluez vos capacités cognitives et découvrez vos forces pour mieux orienter votre parcours.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span>Tests & Auto-évaluation</span>
            <span className="separator">›</span>
            <span className="active">Tests de Compétences</span>
          </div>
        </header>

        <div className="section-intro">
          <p>
            Ces tests vous aident à identifier vos points forts et axes d'amélioration. 
            Ils sont utilisés par les recruteurs et universités pour évaluer le potentiel des candidats.
          </p>
        </div>

        <div className="skills-grid">
          {skillsTests.map((test) => (
            <div key={test.id} className="skill-test-card">
              <div className="skill-test-header">
                <div className="skill-test-icon">{test.icon}</div>
                <div className="skill-test-info">
                  <div className="skill-test-category">{test.category}</div>
                  <h3>{test.title}</h3>
                </div>
              </div>
              
              <p className="skill-test-description">{test.description}</p>
              
              <div className="skill-test-details">
                <div className="detail-item">
                  <span className="detail-label">Durée :</span>
                  <span className="detail-value">{test.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Questions :</span>
                  <span className="detail-value">{test.questions}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type :</span>
                  <span className="detail-value">{test.price}</span>
                </div>
              </div>
              
              <div className="skill-test-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStartTest(test.id, test.title, test.testUrl)}
                >
                  Commencer le test
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleViewExample(test.id, test.title, test.exampleUrl)}
                >
                  Voir un exemple
                </button>
              </div>
              
              {/* Section commentaires optionnelle - visible selon votre capture */}
              <div className="skill-test-extra">
                <button 
                  className="btn-link"
                  onClick={() => handleViewComments(test.id)}
                >
                  Commentaires
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="interpretation-guide">
          <h3>Comment interpréter vos résultats ?</h3>
          <div className="interpretation-grid">
            <div className="interpretation-card">
              <h4>Score élevé en logique</h4>
              <p>Idéal pour les métiers d'analyse, ingénierie, finance et recherche scientifique.</p>
            </div>
            <div className="interpretation-card">
              <h4>Fort raisonnement numérique</h4>
              <p>Indique des aptitudes pour les carrières en data science, économie et statistiques.</p>
            </div>
            <div className="interpretation-card">
              <h4>Bonne orientation</h4>
              <p>Signe d'une bonne connaissance de soi et capacité à faire des choix alignés.</p>
            </div>
          </div>
        </div>

        <div className="pro-tips">
          <h3>Conseils pour maximiser votre score</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-number">1</div>
              <p>Dormez bien la veille pour une concentration optimale</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">2</div>
              <p>Lisez attentivement les consignes avant de commencer</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">3</div>
              <p>Gérez votre temps et ne passez pas trop de temps sur une question</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">4</div>
              <p>Pratiquez régulièrement pour améliorer vos compétences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTests;