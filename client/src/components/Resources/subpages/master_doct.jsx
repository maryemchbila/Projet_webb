import React from 'react';
import '../resources.css';

const MastersDoctorat = () => {
  const programs = [
    {
      id: 1,
      title: 'Masters Académiques',
      type: 'Master',
      description: 'Explorer les masters de recherche et leurs débouchés académiques dans les universités internationales.',
      duration: '2 ans',
      level: 'Bac+3',
      price: 'Gratuit',
      features: ['Préparation recherche', 'Mémoire de fin d\'études', 'Préparation doctorat', 'Bourses disponibles'],
      icon: '🎓',
      audience: 'Étudiants recherche'
    },
    {
      id: 2,
      title: 'MBA International',
      type: 'MBA',
      description: 'Guide des meilleurs MBA et processus de candidature pour une carrière en management international.',
      duration: '1-2 ans',
      level: 'Bac+3 + Expérience',
      price: 'Payant',
      features: ['Rankings mondiaux inclus', 'Préparation GMAT/GRE', 'Conseils admission', 'Financement MBA'],
      icon: '📈',
      audience: 'Professionnels'
    },
    {
      id: 3,
      title: 'Candidature Doctorat',
      type: 'Doctorat',
      description: 'Processus complet pour postuler à un PhD : dossier, projet de recherche et recherche de financement.',
      duration: '3-5 ans',
      level: 'Bac+5',
      price: 'Gratuit',
      features: ['Rédaction projet recherche', 'Contact superviseurs', 'Financement thèse', 'Bourses doctorales'],
      icon: '🔬',
      audience: 'Master 2'
    },
    {
      id: 4,
      title: 'Masters Professionnels',
      type: 'Master',
      description: 'Masters orientés marché du travail avec stages longs et projets en entreprise.',
      duration: '1-2 ans',
      level: 'Bac+3',
      price: 'Gratuit',
      features: ['Stages obligatoires', 'Projets en entreprise', 'Insertion professionnelle', 'Réseau alumni'],
      icon: '💼',
      audience: 'Étudiants pro'
    },
    {
      id: 5,
      title: 'Double Diplômes',
      type: 'Programme',
      description: 'Programmes bi-nationaux et partenariats universitaires pour une expérience internationale complète.',
      duration: '2 ans',
      level: 'Bac+3',
      price: 'Gratuit',
      features: ['2 diplômes reconnus', 'Expérience internationale', 'Réseau binational', 'Langues étrangères'],
      icon: '🌐',
      audience: 'Étudiants internationaux'
    },
    {
      id: 6,
      title: 'Trouver un Directeur de Thèse',
      type: 'Doctorat',
      description: 'Stratégies pour identifier et contacter des superviseurs potentiels pour votre projet doctoral.',
      duration: 'Variable',
      level: 'Bac+5',
      price: 'Gratuit',
      features: ['Recherche chercheurs', 'Email de contact', 'Entretien préparation', 'Alignement recherche'],
      icon: '👨‍🏫',
      audience: 'Futurs doctorants'
    }
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>Masters & Doctorat</h1>
          <p className="subtitle">
            Tout savoir sur les programmes de master et doctorat internationaux pour poursuivre vos études supérieures.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span>Insertion Professionnelle</span>
            <span className="separator">›</span>
            <span className="active">Masters & Doctorat</span>
          </div>
        </header>

        <div className="masters-stats">
          <div className="masters-stat">
            <span className="masters-stat-number">30%</span>
            <span className="masters-stat-label">Augmentation salaire avec un Master</span>
          </div>
          <div className="masters-stat">
            <span className="masters-stat-number">85%</span>
            <span className="masters-stat-label">Doctorants en emploi stable après thèse</span>
          </div>
          <div className="masters-stat">
            <span className="masters-stat-number">50%</span>
            <span className="masters-stat-label">Étudiants internationaux en Master</span>
          </div>
        </div>

        <div className="program-types">
          <h2>Types de programmes disponibles</h2>
          <div className="type-tags">
            <span className="type-tag active">Tous</span>
            <span className="type-tag">Masters Académiques</span>
            <span className="type-tag">Masters Professionnels</span>
            <span className="type-tag">MBA</span>
            <span className="type-tag">Doctorats</span>
            <span className="type-tag">Double Diplômes</span>
          </div>
        </div>

        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-header">
                <div className="program-icon">{program.icon}</div>
                <div className="program-title-section">
                  <div className="program-type-badge">{program.type}</div>
                  <h3>{program.title}</h3>
                </div>
              </div>
              
              <p className="program-description">{program.description}</p>
              
              <div className="program-details">
                <div className="program-detail">
                  <span className="detail-label">Durée :</span>
                  <span className="detail-value">{program.duration}</span>
                </div>
                <div className="program-detail">
                  <span className="detail-label">Niveau requis :</span>
                  <span className="detail-value">{program.level}</span>
                </div>
                <div className="program-detail">
                  <span className="detail-label">Public :</span>
                  <span className="detail-value">{program.audience}</span>
                </div>
                <div className="program-detail">
                  <span className="detail-label">Coût guide :</span>
                  <span className={`detail-value ${program.price === 'Gratuit' ? 'free' : 'paid'}`}>
                    {program.price}
                  </span>
                </div>
              </div>
              
              <div className="program-features">
                <h4>Ce guide vous aide à :</h4>
                <ul>
                  {program.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="program-actions">
                <button className="btn btn-primary">
                  Voir le guide complet
                </button>
                <button className="btn btn-secondary">
                  Télécharger résumé
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admission-process">
          <h3>Processus d'admission typique</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Recherche & Sélection</h4>
              <p>3-6 mois avant deadline</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Préparation dossier</h4>
              <p>CV, lettres, recommandations</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Soumission</h4>
              <p>Respecter les deadlines</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Entretiens</h4>
              <p>Préparation spécifique</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h4>Décision & Inscription</h4>
              <p>Visas, logement, financement</p>
            </div>
          </div>
        </div>

        <div className="funding-section">
          <h3>Options de financement</h3>
          <div className="funding-options">
            <div className="funding-option">
              <h4>Bourses d'excellence</h4>
              <p>Sur critères académiques, compétition internationale</p>
            </div>
            <div className="funding-option">
              <h4>Contrats doctoraux</h4>
              <p>Rémunération pendant la thèse, souvent avec enseignement</p>
            </div>
            <div className="funding-option">
              <h4>Prêts étudiants</h4>
              <p>Taux préférentiels, remboursement différé</p>
            </div>
            <div className="funding-option">
              <h4>Bourses entreprise</h4>
              <p>En échange d'un engagement professionnel post-diplôme</p>
            </div>
          </div>
        </div>

        <div className="ranking-section">
          <h3>Classements universitaires 2024</h3>
          <div className="ranking-table">
            <div className="ranking-row header">
              <div className="rank">Rank</div>
              <div className="university">Université</div>
              <div className="country">Pays</div>
              <div className="specialty">Spécialité</div>
            </div>
            <div className="ranking-row">
              <div className="rank">#1</div>
              <div className="university">Massachusetts Institute of Technology</div>
              <div className="country">USA</div>
              <div className="specialty">Ingénierie & Tech</div>
            </div>
            <div className="ranking-row">
              <div className="rank">#2</div>
              <div className="university">University of Cambridge</div>
              <div className="country">UK</div>
              <div className="specialty">Sciences & Recherche</div>
            </div>
            <div className="ranking-row">
              <div className="rank">#3</div>
              <div className="university">ETH Zurich</div>
              <div className="country">Suisse</div>
              <div className="specialty">Sciences & Ingénierie</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastersDoctorat;