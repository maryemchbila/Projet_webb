import React from 'react';
import '../resources.css';

const AICertifications = () => {
  const aiCertifications = [
    {
      id: 1,
      title: 'Google AI Certificate',
      provider: 'Google',
      description: 'Programme complet d\'apprentissage automatique et IA par Google. Projets pratiques inclus.',
      level: 'Débutant à Intermédiaire',
      duration: '6 mois',
      price: 'Payant',
      features: ['Certificat Google reconnu mondialement', 'Projets pratiques avec TensorFlow', 'Accès à la communauté Google'],
      icon: '🤖',
      badge: 'Popular'
    },
    {
      id: 2,
      title: 'Microsoft Azure AI',
      provider: 'Microsoft',
      description: 'Maîtrisez les services IA d\'Azure : vision, langage, décision et agents conversationnels.',
      level: 'Intermédiaire',
      duration: '3 mois',
      price: 'Payant',
      features: ['Certification Microsoft officielle', 'Accès aux outils Azure AI', 'Valable 2 ans'],
      icon: '☁️',
      badge: 'Hot'
    },
    {
      id: 3,
      title: 'IBM AI Engineering',
      provider: 'IBM',
      description: 'Formation en Deep Learning, Machine Learning et réseaux de neurones avec IBM Watson.',
      level: 'Intermédiaire',
      duration: '3-4 mois',
      price: 'Payant',
      features: ['Certificat professionnel IBM', 'Projets avec Watson Studio', 'Focus sur l\'IA d\'entreprise'],
      icon: '🔬',
      badge: null
    },
    {
      id: 4,
      title: 'DeepLearning.AI',
      provider: 'Coursera',
      description: 'Cours de Andrew Ng sur le Deep Learning et réseaux de neurones. Spécialisation complète.',
      level: 'Intermédiaire à Avancé',
      duration: '4-5 mois',
      price: 'Freemium',
      features: ['Spécialisation Coursera très respectée', 'Enseignement par Andrew Ng', 'Certificat partageable'],
      icon: '🎓',
      badge: 'Premium'
    },
    {
      id: 5,
      title: 'AWS Machine Learning',
      provider: 'Amazon',
      description: 'Certification AWS spécialisée en Machine Learning sur la plateforme cloud d\'Amazon.',
      level: 'Intermédiaire',
      duration: '3 mois',
      price: 'Payant',
      features: ['Certification AWS reconnue', 'Focus sur SageMaker', 'Pour rôles cloud/ML'],
      icon: '📊',
      badge: null
    },
    {
      id: 6,
      title: 'Internet des Objets (IoT)',
      provider: 'Cisco',
      description: 'Formation sur l\'Internet des Objets, réseaux et sécurité IoT. Inclut Arduino/Raspberry Pi.',
      level: 'Débutant à Intermédiaire',
      duration: '30 heures',
      price: 'Gratuit',
      features: ['Certificat Cisco Networking Academy', 'Projets pratiques IoT', 'Préparation à la certification'],
      icon: '📡',
      badge: 'New'
    }
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <header className="subpage-header">
          <h1>Intelligence Artificielle</h1>
          <p className="subtitle">
            Formations et certifications IA reconnues par les plus grandes entreprises tech.
          </p>
          
          <div className="breadcrumb">
            <span>Ressources</span>
            <span className="separator">›</span>
            <span>Ressources Techniques</span>
            <span className="separator">›</span>
            <span className="active">Intelligence Artificielle</span>
          </div>
        </header>

        <div className="ai-stats">
          <div className="ai-stat">
            <span className="ai-stat-number">$500K</span>
            <span className="ai-stat-label">Salaire moyen IA Senior</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-number">40%</span>
            <span className="ai-stat-label">Croissance du marché IA</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-number">2M+</span>
            <span className="ai-stat-label">Postes à pourvoir d'ici 2025</span>
          </div>
        </div>

        <div className="certifications-grid">
          {aiCertifications.map((cert) => (
            <div key={cert.id} className="certification-card">
              {cert.badge && <div className="cert-badge">{cert.badge}</div>}
              
              <div className="cert-header">
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-title-section">
                  <h3>{cert.title}</h3>
                  <div className="cert-provider">
                    <span className="provider-label">Fournisseur :</span>
                    <span className="provider-name">{cert.provider}</span>
                  </div>
                </div>
              </div>
              
              <p className="cert-description">{cert.description}</p>
              
              <div className="cert-details">
                <div className="detail-row">
                  <span className="detail-label">Niveau :</span>
                  <span className="detail-value">{cert.level}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Durée :</span>
                  <span className="detail-value">{cert.duration}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Coût :</span>
                  <span className={`detail-value price-${cert.price.toLowerCase()}`}>
                    {cert.price}
                  </span>
                </div>
              </div>
              
              <div className="cert-features">
                <h4>Avantages :</h4>
                <ul>
                  {cert.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="cert-actions">
                <button className="btn btn-primary">
                  En savoir plus
                </button>
                <button className="btn btn-secondary">
                  Voir le programme
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="career-path">
          <h3>Parcours de carrière en IA</h3>
          <div className="path-steps">
            <div className="path-step">
              <div className="step-number">1</div>
              <h4>Fondamentaux (3-6 mois)</h4>
              <p>Python, Mathématiques, Bases du Machine Learning</p>
            </div>
            <div className="path-step">
              <div className="step-number">2</div>
              <h4>Spécialisation (6-12 mois)</h4>
              <p>Deep Learning, NLP, Computer Vision, ou Data Science</p>
            </div>
            <div className="path-step">
              <div className="step-number">3</div>
              <h4>Certification (3-6 mois)</h4>
              <p>Google, Microsoft, IBM ou AWS Certification</p>
            </div>
            <div className="path-step">
              <div className="step-number">4</div>
              <h4>Projets avancés (6+ mois)</h4>
              <p>Portfolio de projets réels, stage, premier emploi</p>
            </div>
          </div>
        </div>

        <div className="tools-section">
          <h3>Outils recommandés</h3>
          <div className="tools-list">
            <span className="tool-tag">TensorFlow</span>
            <span className="tool-tag">PyTorch</span>
            <span className="tool-tag">Scikit-learn</span>
            <span className="tool-tag">Keras</span>
            <span className="tool-tag">OpenCV</span>
            <span className="tool-tag">NLTK</span>
            <span className="tool-tag">Hugging Face</span>
            <span className="tool-tag">Jupyter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICertifications;