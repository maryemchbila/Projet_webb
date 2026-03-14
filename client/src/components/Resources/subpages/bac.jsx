import React from 'react';
import '../resources.css';

const PostBac = () => {
  const postBacResources = [
    {
      id: 1,
      title: 'Choisir sa Filière',
      description: 'Guide complet pour identifier la filière universitaire adaptée à vos intérêts, compétences et objectifs de carrière.',
      audience: 'Lycéens',
      duration: '2 heures',
      price: 'Gratuit',
      features: ['Test d\'orientation personnalisé', 'Fiches métiers détaillées', 'Témoignages d\'étudiants', 'Perspectives d\'emploi'],
      icon: '🎯',
      format: 'Guide interactif'
    },
    {
      id: 2,
      title: 'Études à l\'Étranger',
      description: 'Tout savoir sur les licences internationales : processus d\'admission, coûts, bourses et préparation.',
      audience: 'Bacheliers',
      duration: '3 heures',
      price: 'Gratuit',
      features: ['Comparatif pays par pays', 'Guide des visas étudiants', 'Coût de la vie détaillé', 'Liste des universités partenaires'],
      icon: '🌍',
      format: 'Guide complet'
    },
    {
      id: 3,
      title: 'Université vs École',
      description: 'Comprendre les différences fondamentales entre formations universitaires et grandes écoles.',
      audience: 'Lycéens',
      duration: '1h30',
      price: 'Gratuit',
      features: ['Tableau comparatif détaillé', 'Témoignages diplômés', 'Débouchés professionnels', 'Coûts de formation'],
      icon: '🏫',
      format: 'Comparatif'
    },
    {
      id: 4,
      title: 'Bourses Post-Bac',
      description: 'Liste exhaustive des bourses gouvernementales et internationales disponibles pour les nouveaux étudiants.',
      audience: 'Bacheliers',
      duration: 'Mise à jour continue',
      price: 'Gratuit',
      features: ['Bourses selon critères', 'Calendrier des demandes', 'Conseils pour dossier', 'Bourses mérite & besoin'],
      icon: '💰',
      format: 'Base de données'
    },
    {
      id: 5,
      title: 'Préparation aux Concours',
      description: 'Ressources et stratégies pour réussir les concours d\'entrée aux grandes écoles et formations sélectives.',
      audience: 'Lycéens',
      duration: 'Auto-rythmé',
      price: 'Gratuit',
      features: ['Annales corrigées', 'Méthodes de travail', 'Planning de révision', 'Simulations d\'entretien'],
      icon: '📝',
      format: 'Plateforme d\'entraînement'
    },
    {
      id: 6,
      title: 'Alternance & Stages',
      description: 'Guide pour trouver et réussir son alternance ou stage dès la première année d\'études supérieures.',
      audience: 'Bacheliers',
      duration: '2 heures',
      price: 'Gratuit',
      features: ['Recherche d\'entreprise', 'Rédaction convention', 'Droits et obligations', 'Valorisation sur CV'],
      icon: '👔',
      format: 'Guide pratique'
    }
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>Orientation Post-Bac</h1>
          <p className="subtitle">
            Guides complets pour réussir votre orientation après le baccalauréat et faire les bons choix pour votre avenir.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span>Insertion Professionnelle</span>
            <span className="separator">›</span>
            <span className="active">Après le Bac</span>
          </div>
        </header>

        <div className="postbac-stats">
          <div className="postbac-stat">
            <span className="postbac-stat-number">85%</span>
            <span className="postbac-stat-label">Étudiants satisfaits de leur orientation</span>
          </div>
          <div className="postbac-stat">
            <span className="postbac-stat-number">40%</span>
            <span className="postbac-stat-label">Changement de filière en première année</span>
          </div>
          <div className="postbac-stat">
            <span className="postbac-stat-number">2x</span>
            <span className="postbac-stat-label">Plus de chances de réussite avec une bonne orientation</span>
          </div>
        </div>

        <div className="postbac-intro">
          <h2>Bien choisir son orientation</h2>
          <p>
            L'orientation post-bac est une étape cruciale qui influence toute votre carrière. 
            Utilisez ces ressources pour faire un choix éclairé basé sur vos intérêts, compétences et le marché du travail.
          </p>
        </div>

        <div className="postbac-grid">
          {postBacResources.map((resource) => (
            <div key={resource.id} className="postbac-card">
              <div className="postbac-card-header">
                <div className="postbac-icon">{resource.icon}</div>
                <div className="postbac-card-info">
                  <h3>{resource.title}</h3>
                  <div className="postbac-audience">
                    <span className="audience-label">Public :</span>
                    <span className="audience-value">{resource.audience}</span>
                  </div>
                </div>
              </div>
              
              <p className="postbac-description">{resource.description}</p>
              
              <div className="postbac-details">
                <div className="postbac-detail">
                  <span className="detail-label">Format :</span>
                  <span className="detail-value">{resource.format}</span>
                </div>
                <div className="postbac-detail">
                  <span className="detail-label">Durée :</span>
                  <span className="detail-value">{resource.duration}</span>
                </div>
                <div className="postbac-detail">
                  <span className="detail-label">Accès :</span>
                  <span className="detail-value free">{resource.price}</span>
                </div>
              </div>
              
              <div className="postbac-features">
                <h4>Contenu inclus :</h4>
                <ul>
                  {resource.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="postbac-actions">
                <button className="btn btn-primary">
                  Accéder au guide
                </button>
                <button className="btn btn-secondary">
                  Télécharger PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="orientation-timeline">
          <h3>Calendrier d'orientation post-bac</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Sept - Nov</div>
              <div className="timeline-content">
                <h4>Exploration des métiers</h4>
                <p>Découvrez les différents secteurs et métiers</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Déc - Jan</div>
              <div className="timeline-content">
                <h4>Recherche des formations</h4>
                <p>Identifiez les formations correspondant à vos intérêts</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Fév - Mars</div>
              <div className="timeline-content">
                <h4>Préparation des dossiers</h4>
                <p>Rédigez lettres de motivation et préparez entretiens</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Avr - Mai</div>
              <div className="timeline-content">
                <h4>Décision finale</h4>
                <p>Faites vos choix sur Parcoursup et autres plateformes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h3>Questions fréquentes</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Quelle est la différence entre licence et BUT ?</h4>
              <p>La licence est théorique (3 ans), le BUT est professionnalisant (3 ans avec stages).</p>
            </div>
            <div className="faq-item">
              <h4>Comment financer mes études à l'étranger ?</h4>
              <p>Bourses gouvernementales, bourses d'excellence, prêts étudiants et jobs sur place.</p>
            </div>
            <div className="faq-item">
              <h4>Faut-il faire une prépa avant une école ?</h4>
              <p>Non, beaucoup d'écoles recrutent aussi après le bac (concours post-bac).</p>
            </div>
            <div className="faq-item">
              <h4>Quand commencer à postuler ?</h4>
              <p>Dès janvier pour la plupart des formations, attention aux deadlines !</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBac;