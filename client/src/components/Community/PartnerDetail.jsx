// src/components/Community/PartnerDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Community.css';

const PartnerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Données des partenaires (mêmes que dans Community.jsx)
  const allPartners = [
    {
      id: 1,
      type: 'university',
      name: 'Université Paris-Sorbonne',
      location: 'Paris, France',
      description: 'L\'une des universités les plus prestigieuses de France, reconnue mondialement pour ses programmes en sciences humaines, lettres et arts.',
      longDescription: 'Fondée en 1257, l\'Université Paris-Sorbonne est l\'une des plus anciennes et prestigieuses universités au monde. Elle est renommée pour son excellence en sciences humaines, lettres, arts et sciences sociales. L\'université attire des étudiants et chercheurs du monde entier et maintient des partenariats avec les plus grandes institutions académiques internationales.',
      members: 1250,
      rating: 4.8,
      specialties: ['Lettres', 'Histoire', 'Philosophie', 'Sciences Sociales', 'Arts'],
      founded: 1257,
      website: 'https://www.sorbonne.fr',
      email: 'contact@sorbonne.fr',
      phone: '+33 1 40 46 22 11',
      programs: ['Licence Lettres', 'Master Histoire', 'Doctorat Philosophie', 'Échange International'],
      benefits: ['Programmes académiques de renommée mondiale', 'Réseau international d\'anciens élèves', 'Bibliothèque historique', 'Bourses d\'excellence']
    },
    {
      id: 2,
      type: 'university',
      name: 'Technical University Munich',
      location: 'Munich, Allemagne',
      description: 'Leader européen en ingénierie et technologie, reconnue pour son excellence en recherche et innovation.',
      longDescription: 'La Technical University Munich (TUM), fondée en 1868, est une université technique de renommée mondiale. Elle est classée parmi les meilleures universités techniques d\'Europe et excelle dans les domaines de l\'ingénierie, de la technologie, des sciences naturelles et de la médecine. La TUM est reconnue pour son fort engagement envers l\'innovation et la recherche appliquée.',
      members: 1850,
      rating: 4.7,
      specialties: ['Ingénierie', 'Informatique', 'Physique', 'Chimie', 'Mathématiques'],
      founded: 1868,
      website: 'https://www.tum.de',
      email: 'info@tum.de',
      phone: '+49 89 289 01',
      programs: ['Bachelor Ingénierie', 'Master Informatique', 'PhD Physique', 'Programme d\'échange ERASMUS+'],
      benefits: ['Programmes académiques de renommée mondiale', 'Réseau international de professionnels', 'Laboratoires de recherche de pointe', 'Partnerships avec l\'industrie']
    },
    {
      id: 3,
      type: 'university',
      name: 'McGill University',
      location: 'Montréal, Canada',
      description: 'Institution canadienne de renommée internationale, offrant des programmes d\'excellence en médecine, ingénierie et sciences.',
      longDescription: 'Fondée en 1821, l\'Université McGill est l\'une des institutions d\'enseignement supérieur les plus prestigieuses du Canada. Classée régulièrement parmi les meilleures universités mondiales, elle excelle en médecine, ingénierie, sciences et arts. L\'université compte de nombreux lauréats de prix Nobel parmi ses anciens élèves et professeurs.',
      members: 2100,
      rating: 4.9,
      specialties: ['Médecine', 'Ingénierie', 'Sciences', 'Droit', 'Commerce'],
      founded: 1821,
      website: 'https://www.mcgill.ca',
      email: 'admissions@mcgill.ca',
      phone: '+1 514-398-4455',
      programs: ['MD Program', 'Engineering Co-op', 'Science Research', 'International Exchange'],
      benefits: ['Programmes de classe mondiale', 'Réseau d\'anciens influents', 'Installations de recherche modernes', 'Bourses généreuses']
    },
    {
      id: 4,
      type: 'company',
      name: 'Google International',
      location: 'Mountain View, États-Unis',
      description: 'Géant technologique mondial offrant des opportunités de stage et d\'emploi dans l\'innovation et le développement.',
      longDescription: 'Google, fondé en 1998, est l\'une des entreprises technologiques les plus innovantes au monde. L\'entreprise propose des programmes de stages, de mentorat et de formation continue pour les étudiants et jeunes professionnels. Les partenariats avec Google offrent un accès à des technologies de pointe et à des opportunités de carrière internationales.',
      members: 890,
      rating: 4.6,
      specialties: ['Stages Tech', 'Mentorat', 'Formation Continue', 'Recherche IA', 'Développement Logiciel'],
      founded: 1998,
      website: 'https://careers.google.com',
      email: 'university@google.com',
      phone: '+1 650-253-0000',
      programs: ['Google Summer of Code', 'Engineering Practicum', 'MBA Internships', 'PhD Fellowships'],
      benefits: ['Accès aux technologies de pointe', 'Mentorat par des experts', 'Opportunités de carrière mondiales', 'Formation continue']
    },
    {
      id: 5,
      type: 'company',
      name: 'Airbus Group',
      location: 'Toulouse, France',
      description: 'Leader mondial de l\'aéronautique et de l\'espace, offrant des programmes de formation et des opportunités de carrière internationale.',
      longDescription: 'Airbus, fondé en 1970, est un leader mondial dans les secteurs de l\'aéronautique, de la défense et de l\'espace. Le groupe propose des programmes de formation, des stages et des opportunités de carrière pour les ingénieurs et techniciens. Les partenariats avec Airbus offrent une expérience pratique dans des projets d\'envergure internationale.',
      members: 650,
      rating: 4.5,
      specialties: ['Ingénierie Aérospatiale', 'Stages', 'Graduate Program', 'Recherche & Développement'],
      founded: 1970,
      website: 'https://www.airbus.com/careers',
      email: 'university.relations@airbus.com',
      phone: '+33 5 34 39 33 00',
      programs: ['Airbus Graduate Programme', 'Engineering Internships', 'PhD Research Projects', 'Apprenticeship Programs'],
      benefits: ['Travail sur des projets internationaux', 'Formation spécialisée', 'Opportunités de mobilité', 'Innovation technologique']
    },
    {
      id: 6,
      type: 'company',
      name: 'Siemens AG',
      location: 'Berlin, Allemagne',
      description: 'Conglomérat industriel mondial spécialisé dans l\'automatisation, l\'électrification et la digitalisation.',
      longDescription: 'Siemens, fondé en 1847, est un leader mondial dans les domaines de l\'automatisation industrielle, de l\'électrification et de la digitalisation. Le groupe offre des programmes de formation, des stages et des opportunités de recherche pour les étudiants en ingénierie et technologie.',
      members: 720,
      rating: 4.4,
      specialties: ['Ingénierie Industrielle', 'Programme Résidentiel', 'Opportunités Internationales', 'Digitalisation'],
      founded: 1847,
      website: 'https://new.siemens.com/global/en/company/jobs.html',
      email: 'university@siemens.com',
      phone: '+49 89 636 00',
      programs: ['Siemens Graduate Program', 'Technical Internships', 'Research Partnerships', 'Global Exchange'],
      benefits: ['Expérience dans l\'industrie 4.0', 'Formation technique avancée', 'Réseau international', 'Innovation continue']
    },
    {
      id: 7,
      type: 'university',
      name: 'University of Oxford',
      location: 'Oxford, Royaume-Uni',
      description: 'L\'une des plus anciennes et prestigieuses universités du monde, excellence académique dans tous les domaines.',
      longDescription: 'Fondée en 1096, l\'Université d\'Oxford est la plus ancienne université du monde anglophone. Elle est renommée pour son excellence académique dans tous les domaines et son système de tutorat unique. Oxford compte parmi ses anciens élèves 28 premiers ministres britanniques et de nombreux lauréats de prix Nobel.',
      members: 3200,
      rating: 4.9,
      specialties: ['Tous domaines', 'Rhodes Scholarship', 'Recherche', 'Humanités', 'Sciences'],
      founded: 1096,
      website: 'https://www.ox.ac.uk',
      email: 'admissions@ox.ac.uk',
      phone: '+44 1865 270000',
      programs: ['Undergraduate Degrees', 'Postgraduate Studies', 'Research Degrees', 'Visiting Students'],
      benefits: ['Tutorat personnalisé', 'Bibliothèques historiques', 'Bourses prestigieuses', 'Réseau mondial']
    },
    {
      id: 8,
      type: 'university',
      name: 'University of Toronto',
      location: 'Toronto, Canada',
      description: 'Plus grande université canadienne, reconnue pour sa recherche de pointe et sa diversité académique.',
      longDescription: 'Fondée en 1827, l\'Université de Toronto est la plus grande université du Canada et l\'une des plus prestigieuses. Elle est reconnue pour l\'excellence de sa recherche, la diversité de ses programmes et son engagement envers l\'innovation. L\'université accueille des étudiants de plus de 160 pays.',
      members: 2800,
      rating: 4.7,
      specialties: ['Sciences', 'Commerce', 'Médecine', 'Ingénierie', 'Arts'],
      founded: 1827,
      website: 'https://www.utoronto.ca',
      email: 'admissions.help@utoronto.ca',
      phone: '+1 416-978-2011',
      programs: ['Bachelor Programs', 'Master Degrees', 'PhD Research', 'International Exchange'],
      benefits: ['Recherche de pointe', 'Diversité culturelle', 'Partenariats industriels', 'Installations modernes']
    }
  ];

  useEffect(() => {
    const foundPartner = allPartners.find(p => p.id === parseInt(id));
    setPartner(foundPartner);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (!partner) {
    return (
      <div className="not-found">
        <h2>Partenaire non trouvé</h2>
        <Link to="/community" className="btn btn-primary">
          Retour à la communauté
        </Link>
      </div>
    );
  }

  return (
    <div className="partner-detail-page">
      <div className="partner-detail-content">
        {/* Header avec bouton retour */}
        <header className="partner-header">
          <button onClick={() => navigate('/community')} className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Retour à la communauté
          </button>
          
          <div className="partner-main-info">
            <div className="partner-title-section">
              <h1>{partner.name}</h1>
              <div className="partner-meta">
                <span className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  {partner.location}
                </span>
                <span className="members">
                  <i className="fas fa-users"></i>
                  {partner.members.toLocaleString()} membres
                </span>
                {partner.founded && (
                  <span className="founded">
                    <i className="fas fa-calendar-alt"></i>
                    Fondé en {partner.founded}
                  </span>
                )}
              </div>
            </div>
            
            <div className="partner-rating">
              <div className="rating-stars">
                {'★'.repeat(Math.floor(partner.rating))}
                {'☆'.repeat(5 - Math.floor(partner.rating))}
              </div>
              <span className="rating-value">{partner.rating}</span>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <div className="partner-content">
          <div className="partner-left-column">
            {/* Section À propos */}
            <section className="about-section">
              <h2>
                <i className="fas fa-info-circle"></i>
                À propos
              </h2>
              <p className="about-description">{partner.longDescription}</p>
            </section>

            {/* Section Programmes */}
            <section className="programs-section">
              <h2>
                <i className="fas fa-graduation-cap"></i>
                Programmes offerts
              </h2>
              <div className="programs-grid">
                {partner.programs?.map((program, index) => (
                  <div key={index} className="program-card">
                    <i className="fas fa-book"></i>
                    <h4>{program}</h4>
                    <button className="btn-outline small">
                      En savoir plus
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Section Contact */}
            <section className="contact-section">
              <h2>
                <i className="fas fa-address-card"></i>
                Informations de contact
              </h2>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-globe"></i>
                  <div>
                    <h4>Site Web</h4>
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      {partner.website?.replace('https://', '')}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${partner.email}`}>{partner.email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Téléphone</h4>
                    <a href={`tel:${partner.phone}`}>{partner.phone}</a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="partner-right-column">
            {/* Section Type */}
            <div className="type-badge">
              <i className={`fas ${partner.type === 'university' ? 'fa-university' : 'fa-building'}`}></i>
              <span>{partner.type === 'university' ? 'Université' : 'Entreprise'}</span>
            </div>

            {/* Section Spécialités */}
            <section className="specialties-section">
              <h3>Spécialités</h3>
              <div className="specialties-tags">
                {partner.specialties?.map((specialty, index) => (
                  <span key={index} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            </section>

            {/* Section Avantages */}
            <section className="benefits-section">
              <h3>Avantages</h3>
              <ul className="benefits-list">
                {partner.benefits?.map((benefit, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <button className="btn btn-primary large">
                <i className="fas fa-user-plus"></i>
                Rejoindre la communauté
              </button>
              <button className="btn btn-outline large">
                <i className="fas fa-question-circle"></i>
                Demander plus d'infos
              </button>
            </div>

            {/* Stats Card */}
            <div className="stats-card">
              <h3>Statistiques</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{partner.members.toLocaleString()}</div>
                  <div className="stat-label">Membres actifs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{partner.rating}</div>
                  <div className="stat-label">Note moyenne</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{partner.programs?.length || 0}</div>
                  <div className="stat-label">Programmes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation vers d'autres partenaires */}
        <section className="similar-partners">
          <h2>Autres partenaires</h2>
          <div className="similar-grid">
            {allPartners
              .filter(p => p.id !== partner.id && p.type === partner.type)
              .slice(0, 3)
              .map(similar => (
                <Link 
                  key={similar.id} 
                  to={`/community/${similar.id}`}
                  className="similar-card"
                >
                  <div className="similar-header">
                    <h4>{similar.name}</h4>
                    <span className="similar-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {similar.location}
                    </span>
                  </div>
                  <p className="similar-description">{similar.description}</p>
                  <div className="similar-meta">
                    <span>
                      <i className="fas fa-users"></i>
                      {similar.members} membres
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                      {similar.rating}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnerDetail;