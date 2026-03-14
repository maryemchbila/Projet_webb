import React, { useState } from 'react';
import '../resources.css';

const CVApplications = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const cvResources = [
    {
      id: 1,
      title: 'Canva CV Builder',
      description: 'Créez des CV visuellement attractifs avec des templates modernes et personnalisables.',
      type: 'Template',
      category: 'Design',
      price: 'Freemium',
      features: ['100+ templates gratuits', 'Éditeur drag-and-drop', 'Export PDF/Word', 'Design responsive'],
      rating: 4.8,
      icon: '🎨'
    },
    {
      id: 2,
      title: 'Optimiser son Profil LinkedIn',
      description: 'Guide complet pour créer un profil LinkedIn qui attire les recruteurs et génère des opportunités.',
      type: 'Guide',
      category: 'Réseautage',
      price: 'Gratuit',
      features: ['Structure optimale', 'Mots-clés stratégiques', 'Recommandations efficaces', 'Network building'],
      duration: '1 heure',
      icon: '💼'
    },
    {
      id: 3,
      title: 'CV Académique vs Professionnel',
      description: 'Comprendre les différences et adapter son CV selon le contexte universitaire ou professionnel.',
      type: 'Guide',
      category: 'Stratégie',
      price: 'Gratuit',
      features: ['Structure adaptée', 'Contenu ciblé', 'Mise en page optimale', 'Exemples concrets'],
      icon: '📋'
    },
    {
      id: 4,
      title: 'Europass CV',
      description: 'Format européen standardisé reconnu dans tous les pays de l\'Union Européenne.',
      type: 'Template',
      category: 'Standard',
      price: 'Gratuit',
      features: ['Format standard UE', 'Reconnaissance internationale', 'Multilingue', 'Facile à remplir'],
      rating: 4.2,
      icon: '🇪🇺'
    },
    {
      id: 5,
      title: 'Réseautage Professionnel',
      description: 'Stratégies pour développer son réseau professionnel et créer des opportunités de carrière.',
      type: 'Cours',
      category: 'Soft Skills',
      price: 'Gratuit',
      features: ['Techniques d\'approche', 'Suivi efficace', 'Événements networking', 'Relations durables'],
      duration: '45 min',
      icon: '🤝'
    },
    {
      id: 6,
      title: 'Personal Branding',
      description: 'Construire et promouvoir votre marque personnelle en ligne pour attirer les bonnes opportunités.',
      type: 'Cours',
      category: 'Marketing',
      price: 'Gratuit',
      features: ['Identité numérique', 'Contenu stratégique', 'Visibilité en ligne', 'Crédibilité professionnelle'],
      duration: '2 heures',
      icon: '🌟'
    }
  ];

  const cvTemplates = [
    { id: 1, name: 'Moderne Minimaliste', style: 'Moderne', color: 'blue', ats: true },
    { id: 2, name: 'Classique Professionnel', style: 'Classique', color: 'gray', ats: true },
    { id: 3, name: 'Créatif Design', style: 'Créatif', color: 'orange', ats: false },
    { id: 4, name: 'Académique Recherche', style: 'Académique', color: 'purple', ats: true },
    { id: 5, name: 'Tech Start-up', style: 'Moderne', color: 'green', ats: true },
    { id: 6, name: 'International Business', style: 'Professionnel', color: 'navy', ats: true },
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>CV & Candidatures</h1>
          <p className="subtitle">
            Créez un CV professionnel qui se démarque et maximisez vos chances de décrocher l'entretien.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span>Insertion Professionnelle</span>
            <span className="separator">›</span>
            <span className="active">CV & Candidatures</span>
          </div>
        </header>

        <div className="cv-stats">
          <div className="cv-stat">
            <span className="cv-stat-number">6s</span>
            <span className="cv-stat-label">Temps moyen de lecture d'un CV</span>
          </div>
          <div className="cv-stat">
            <span className="cv-stat-number">75%</span>
            <span className="cv-stat-label">CV rejetés par l'ATS</span>
          </div>
          <div className="cv-stat">
            <span className="cv-stat-number">3x</span>
            <span className="cv-stat-label">Plus d'entretiens avec un CV optimisé</span>
          </div>
        </div>

        <div className="section-title">
          <h2>Ressources pour votre CV</h2>
          <p>Sélectionnez les outils adaptés à votre profil et objectifs professionnels</p>
        </div>

        <div className="cv-resources-grid">
          {cvResources.map((resource) => (
            <div key={resource.id} className="cv-resource-card">
              <div className="cv-resource-header">
                <div className="cv-resource-icon">{resource.icon}</div>
                <div className="cv-resource-title-section">
                  <h3>{resource.title}</h3>
                  <div className="cv-resource-meta">
                    <span className="resource-type">{resource.type}</span>
                    <span className="resource-category">{resource.category}</span>
                    <span className={`resource-price ${resource.price.toLowerCase()}`}>
                      {resource.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="cv-resource-description">{resource.description}</p>
              
              <div className="cv-resource-features">
                {resource.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
              
              {resource.rating && (
                <div className="cv-resource-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">{resource.rating}/5</span>
                </div>
              )}
              
              {resource.duration && (
                <div className="cv-resource-duration">
                  <span className="duration-label">Durée :</span>
                  <span className="duration-value">{resource.duration}</span>
                </div>
              )}
              
              <div className="cv-resource-actions">
                <button className="btn btn-primary">
                  Accéder
                </button>
                <button className="btn btn-secondary">
                  Prévisualiser
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="templates-section">
          <h3>Modèles CV Étudiant</h3>
          <p className="section-subtitle">Templates modernes et ATS-friendly pour étudiants et jeunes diplômés</p>
          
          <div className="templates-grid">
            {cvTemplates.map((template) => (
              <div 
                key={template.id} 
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="template-preview">
                  <div className={`template-color ${template.color}`}></div>
                  <div className="template-lines">
                    <div className="line short"></div>
                    <div className="line medium"></div>
                    <div className="line long"></div>
                    <div className="line short"></div>
                  </div>
                </div>
                
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <div className="template-details">
                    <span className="template-style">{template.style}</span>
                    {template.ats && <span className="template-ats">ATS Friendly</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="template-actions">
            <button className="btn btn-primary">
              {selectedTemplate ? 'Utiliser ce modèle' : 'Choisir un modèle'}
            </button>
            <button className="btn btn-secondary">
              Voir tous les modèles
            </button>
          </div>
        </div>

        <div className="ats-tips">
          <h3>Conseils pour les systèmes ATS</h3>
          <div className="tips-container">
            <div className="tip">
              <div className="tip-icon">✅</div>
              <p>Utilisez des mots-clés spécifiques à l'offre d'emploi</p>
            </div>
            <div className="tip">
              <div className="tip-icon">✅</div>
              <p>Évitez les images, graphiques et colonnes multiples</p>
            </div>
            <div className="tip">
              <div className="tip-icon">✅</div>
              <p>Utilisez des titres de section standard (Expérience, Formation)</p>
            </div>
            <div className="tip">
              <div className="tip-icon">✅</div>
              <p>Enregistrez votre CV en format .docx ou .pdf textuel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVApplications;