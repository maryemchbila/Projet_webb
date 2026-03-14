import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FichePays.css';

const FichePays = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');
  const [expandedCountryId, setExpandedCountryId] = useState(null);

  // Données des pays
  const countryData = [
    {
      id: 1,
      name: 'France',
      continent: 'Europe',
      flag: '🇫🇷',
      capital: 'Paris',
      currency: 'Euro (€)',
      language: 'Français',
      visaRequirements: [
        { type: 'Visa étudiant', duration: 'Durée des études', validity: 'Renouvelable annuellement', documents: ['Passeport valide', "Lettre d'acceptation", 'Justificatifs financiers', 'Assurance maladie'] },
        { type: 'Visa travail', duration: '1 an', validity: 'Renouvelable', documents: ['Contrat de travail', 'Diplômes', 'Extrait de casier judiciaire'] }
      ],
      costOfLiving: {
        student: '800-1200€/mois',
        professional: '1500-2500€/mois'
      },
      usefulContacts: [
        { name: 'Ambassade/Consulat', contact: '+33 1 XX XX XX XX' },
        { name: 'Urgences', contact: '112' }
      ],
      tips: 'Le système de santé est excellent mais nécessite une assurance. Les transports en commun sont très développés.'
    },
    {
      id: 2,
      name: 'Canada',
      continent: 'Amérique du Nord',
      flag: '🇨🇦',
      capital: 'Ottawa',
      currency: 'Dollar canadien ($)',
      language: 'Anglais, Français',
      visaRequirements: [
        { type: "Permis d'études", duration: 'Durée du programme', validity: "Post-diplôme disponible", documents: ['Preuve d\'acceptation', 'Preuves financières', 'Certificat médical'] },
        { type: 'Visa travail temporaire', duration: '1-2 ans', validity: 'Renouvelable', documents: ['Offre d\'emploi validée', 'Qualifications professionnelles'] }
      ],
      costOfLiving: {
        student: '1000-1500 CAD/mois',
        professional: '2000-3500 CAD/mois'
      },
      usefulContacts: [
        { name: 'Immigration Canada', contact: '1-888-242-2100' },
        { name: 'Urgences', contact: '911' }
      ],
      tips: 'Prévoir un budget conséquent pour le logement dans les grandes villes. Le climat peut être très froid en hiver.'
    },
    {
      id: 3,
      name: 'Allemagne',
      continent: 'Europe',
      flag: '🇩🇪',
      capital: 'Berlin',
      currency: 'Euro (€)',
      language: 'Allemand',
      visaRequirements: [
        { type: 'Visa étudiant', duration: '2 ans maximum', validity: 'Pour durée des études', documents: ['Preuve d\'inscription', 'Assurance santé', 'Justificatifs financiers'] },
        { type: 'Carte bleue UE', duration: '4 ans', validity: 'Renouvelable', documents: ['Diplôme reconnu', 'Contrat de travail', 'Salaire minimum requis'] }
      ],
      costOfLiving: {
        student: '850-1200€/mois',
        professional: '1800-3000€/mois'
      },
      usefulContacts: [
        { name: 'Auswärtiges Amt', contact: '+49 30 5000 0' },
        { name: 'Urgences', contact: '112' }
      ],
      tips: "L'allemand est souvent requis pour l'emploi. Les universités publiques ont des frais de scolarité très bas."
    },
    {
      id: 4,
      name: 'États-Unis',
      continent: 'Amérique du Nord',
      flag: '🇺🇸',
      capital: 'Washington D.C.',
      currency: 'Dollar US ($)',
      language: 'Anglais',
      visaRequirements: [
        { type: 'Visa F-1 (étudiant)', duration: 'Durée du programme', validity: 'OPT disponible après', documents: ['Formulaire I-20', 'Preuves financières', 'Test de langue'] },
        { type: 'Visa H-1B (travail)', duration: '3 ans', validity: 'Extensible à 6 ans', documents: ['Sponsor employeur', 'Diplômes', 'Offre d\'emploi'] }
      ],
      costOfLiving: {
        student: '1200-2000$/mois',
        professional: '2500-5000$/mois'
      },
      usefulContacts: [
        { name: 'USCIS', contact: '1-800-375-5283' },
        { name: 'Urgences', contact: '911' }
      ],
      tips: 'Le système de santé est privé et coûteux. Assurez-vous d\'avoir une bonne assurance.'
    },
    {
      id: 5,
      name: 'Japon',
      continent: 'Asie',
      flag: '🇯🇵',
      capital: 'Tokyo',
      currency: 'Yen (¥)',
      language: 'Japonais',
      visaRequirements: [
        { type: 'Visa étudiant', duration: '1-2 ans', validity: 'Renouvelable', documents: ['Certificat d\'éligibilité', 'Preuves financières', 'Plan d\'études'] },
        { type: 'Visa travail ingénieur', duration: '1-5 ans', validity: 'Renouvelable', documents: ['Offre d\'emploi', 'Diplômes techniques', 'Expérience professionnelle'] }
      ],
      costOfLiving: {
        student: '900-1500¥/mois',
        professional: '2000-4000¥/mois'
      },
      usefulContacts: [
        { name: 'Ambassade du Japon', contact: '+81 3 3580 3311' },
        { name: 'Urgences', contact: '119' }
      ],
      tips: 'La barrière linguistique est importante. La maîtrise du japonais est souvent nécessaire pour le travail.'
    },
    {
      id: 6,
      name: 'Australie',
      continent: 'Océanie',
      flag: '🇦🇺',
      capital: 'Canberra',
      currency: 'Dollar australien ($)',
      language: 'Anglais',
      visaRequirements: [
        { type: 'Visa étudiant (subclass 500)', duration: 'Jusqu\'à 5 ans', validity: 'Travail limité autorisé', documents: ['Confirmation d\'inscription', 'Assurance OSHC', 'Test de langue'] },
        { type: 'Visa travail qualifié (subclass 189)', duration: 'Permanent', validity: 'Résidence permanente', documents: ['Test de compétences', 'Évaluation des qualifications', 'Score points test'] }
      ],
      costOfLiving: {
        student: '1200-1800 AUD/mois',
        professional: '2500-4000 AUD/mois'
      },
      usefulContacts: [
        { name: 'Department of Home Affairs', contact: '131 881' },
        { name: 'Urgences', contact: '000' }
      ],
      tips: 'Les villes côtières sont chères mais offrent une excellente qualité de vie. Attention aux saisons inversées.'
    }
  ];

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setCountries(countryData);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewDetails = (countryId) => {
    if (expandedCountryId === countryId) {
      // Si on clique sur le même pays, on réduit les détails
      setExpandedCountryId(null);
    } else {
      // Sinon, on affiche les détails du pays cliqué
      setExpandedCountryId(countryId);
      const country = countries.find(c => c.id === countryId);
      setSelectedCountry(country);
    }
  };

  const handleCloseDetails = () => {
    setExpandedCountryId(null);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  });

  const continents = ['all', ...new Set(countries.map(c => c.continent))];

  if (loading) {
    return (
      <div className="fiche-pays loading">
        <div className="loading-spinner"></div>
        <p>Chargement des fiches pays...</p>
      </div>
    );
  }

  return (
    <div className="fiche-pays">
      <div className="fiche-pays-container">
        {/* En-tête */}
        <div className="fiche-pays-header">
          <h1>🌍 Fiche Pays</h1>
          <p className="subtitle">
            Consultez les informations détaillées sur les pays : documents nécessaires, 
            durées de validité, coût de la vie et contacts utiles.
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher un pays ou une capitale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          
          <div className="filters">
            <select 
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="continent-filter"
            >
              {continents.map(continent => (
                <option key={continent} value={continent}>
                  {continent === 'all' ? 'Tous les continents' : continent}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grille des pays */}
        <div className="countries-grid">
          {filteredCountries.map(country => (
            <div 
              key={country.id}
              className={`country-card ${expandedCountryId === country.id ? 'expanded' : ''}`}
            >
              <div className="country-card-header">
                <div className="country-flag">{country.flag}</div>
                <div className="country-info">
                  <h3>{country.name}</h3>
                  <div className="country-tags">
                    <span className="continent-badge">{country.continent}</span>
                    <span className="capital-tag">🏛️ {country.capital}</span>
                    <span className="currency-tag">💱 {country.currency}</span>
                    <span className="language-tag">🗣️ {country.language}</span>
                  </div>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewDetails(country.id)}
                >
                  {expandedCountryId === country.id ? '▼ Masquer détails' : '► Voir détails'}
                </button>
              </div>

              {/* Section détails (apparaît quand on clique) */}
              {expandedCountryId === country.id && (
                <div className="country-details-section">
                  <div className="details-content">
                    {/* Section Documents et Visas */}
                    <div className="details-subsection">
                      <h4>📋 Documents et Visas</h4>
                      <div className="visas-list">
                        {country.visaRequirements.map((visa, index) => (
                          <div key={index} className="visa-item">
                            <h5>{visa.type}</h5>
                            <div className="visa-info">
                              <div className="info-row">
                                <span className="info-label">Durée:</span>
                                <span className="info-value">{visa.duration}</span>
                              </div>
                              <div className="info-row">
                                <span className="info-label">Validité:</span>
                                <span className="info-value">{visa.validity}</span>
                              </div>
                              <div className="info-row">
                                <span className="info-label">Documents requis:</span>
                                <div className="documents">
                                  {visa.documents.map((doc, docIndex) => (
                                    <span key={docIndex} className="document-tag">📄 {doc}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coût de la vie */}
                    <div className="details-subsection">
                      <h4>💰 Coût de la vie (approximatif)</h4>
                      <div className="cost-living-grid">
                        <div className="cost-item">
                          <div className="cost-type">Étudiant</div>
                          <div className="cost-amount">{country.costOfLiving.student}</div>
                          <div className="cost-description">par mois (logement, nourriture, transports)</div>
                        </div>
                        <div className="cost-item">
                          <div className="cost-type">Professionnel</div>
                          <div className="cost-amount">{country.costOfLiving.professional}</div>
                          <div className="cost-description">par mois (style de vie confortable)</div>
                        </div>
                      </div>
                    </div>

                    {/* Contacts utiles */}
                    <div className="details-subsection">
                      <h4>📞 Contacts utiles</h4>
                      <div className="contacts-list">
                        {country.usefulContacts.map((contact, index) => (
                          <div key={index} className="contact-item">
                            <div className="contact-name">{contact.name}</div>
                            <div className="contact-number">{contact.contact}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Conseils pratiques */}
                    <div className="details-subsection">
                      <h4>💡 Conseils pratiques</h4>
                      <div className="tips-content">
                        <p>{country.tips}</p>
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="action-buttons">
                      <button className="btn btn-primary" onClick={() => alert(`Planification pour ${country.name} en cours de développement`)}>
                        📝 Planifier mon séjour
                      </button>
                      <button className="btn btn-secondary" onClick={() => alert(`Liste de contrôle pour ${country.name} générée`)}>
                        📋 Liste de contrôle des documents
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section d'information */}
        <div className="info-section">
          <h3>📝 Comment utiliser cette fiche pays</h3>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">1</div>
              <h4>Sélectionnez un pays</h4>
              <p>Choisissez le pays qui vous intéresse dans la liste</p>
            </div>
            <div className="info-card">
              <div className="info-icon">2</div>
              <h4>Cliquez sur "Voir détails"</h4>
              <p>Les informations s'affichent directement sur la carte</p>
            </div>
            <div className="info-card">
              <div className="info-icon">3</div>
              <h4>Consultez les documents</h4>
              <p>Vérifiez les visas nécessaires et les documents requis</p>
            </div>
            <div className="info-card">
              <div className="info-icon">4</div>
              <h4>Préparez votre budget</h4>
              <p>Estimez vos dépenses avec nos indicateurs de coût de vie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichePays;