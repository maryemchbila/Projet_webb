// client/src/components/Opportunities/Opportunities.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Opportunities.css';
import apiService from '../../services/api';

const Opportunities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    types: [],
    countries: []
  });
  
  const itemsPerPage = 4;

  useEffect(() => {
    fetchOpportunities();
    fetchFilters();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      
      // ✅ CORRECTION : Appel direct à l'API pour voir le format exact
      const response = await fetch('http://localhost:5000/api/opportunities');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('=== DEBUG API RESPONSE ===');
      console.log('Response:', data);
      console.log('Is array?', Array.isArray(data));
      console.log('Type:', typeof data);
      
      let opportunitiesData = [];
      
      // ✅ GESTION DES DIFFÉRENTS FORMATS D'API
      if (Array.isArray(data)) {
        // Format 1: Tableau direct [...]
        opportunitiesData = data;
        console.log('Format: Array direct');
      } 
      else if (data && typeof data === 'object') {
        // Format 2: { data: [...] }
        if (Array.isArray(data.data)) {
          opportunitiesData = data.data;
          console.log('Format: { data: [...] }');
        }
        // Format 3: { results: [...] }
        else if (Array.isArray(data.results)) {
          opportunitiesData = data.results;
          console.log('Format: { results: [...] }');
        }
        // Format 4: { success: true, data: [...] }
        else if (data.success && Array.isArray(data.data)) {
          opportunitiesData = data.data;
          console.log('Format: { success: true, data: [...] }');
        }
        // Format 5: { opportunities: [...] }
        else if (Array.isArray(data.opportunities)) {
          opportunitiesData = data.opportunities;
          console.log('Format: { opportunities: [...] }');
        }
        // Format 6: Autre objet avec tableau
        else {
          // Chercher la première propriété qui est un tableau
          for (const key in data) {
            if (Array.isArray(data[key])) {
              opportunitiesData = data[key];
              console.log(`Format: Objet avec tableau dans ${key}`);
              break;
            }
          }
        }
      }
      
      if (opportunitiesData.length === 0) {
        console.warn('Aucun tableau trouvé dans la réponse, utilisation des données mockées');
        opportunitiesData = getMockOpportunities();
      }
      
      console.log(`Chargement réussi: ${opportunitiesData.length} opportunités`);
      setOpportunities(opportunitiesData);
      setError('');
      
    } catch (error) {
      console.error('Erreur lors du chargement des opportunités:', error);
      setError('Erreur lors du chargement des opportunités');
      setOpportunities(getMockOpportunities());
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      // ✅ CORRECTION : Utiliser fetch directement pour voir le format
      const response = await fetch('http://localhost:5000/api/opportunities/filters');
      const data = await response.json();
      
      console.log('Filters response:', data);
      
      if (data && (Array.isArray(data.types) || Array.isArray(data.countries))) {
        setFilters(data);
      } else if (Array.isArray(data)) {
        // Si l'API retourne directement un tableau pour les types
        setFilters({
          types: data,
          countries: [
            { id: '', label: 'Tous les pays' },
            { id: 'France', label: 'France' },
            { id: 'Allemagne', label: 'Allemagne' },
            { id: 'Canada', label: 'Canada' },
            { id: 'Espagne', label: 'Espagne' },
            { id: 'Suisse', label: 'Suisse' },
            { id: 'Autre', label: 'Autre' }
          ]
        });
      } else {
        // Filtres par défaut
        setFilters({
          types: [
            { id: '', label: 'Tous les types' },
            { id: 'STAGE', label: 'STAGE (Stage d\'été / Stage technique)' },
            { id: 'STAGE PFE', label: 'STAGE PFE (Projet de Fin d\'Études)' },
            { id: 'EMPLOI', label: 'EMPLOI (CDI / CDD / Junior)' },
            { id: 'ÉTUDES', label: 'ÉTUDES À L\'ÉTRANGER' }
          ],
          countries: [
            { id: '', label: 'Tous les pays' },
            { id: 'France', label: 'France' },
            { id: 'Allemagne', label: 'Allemagne' },
            { id: 'Canada', label: 'Canada' },
            { id: 'Espagne', label: 'Espagne' },
            { id: 'Suisse', label: 'Suisse' },
            { id: 'Autre', label: 'Autre' }
          ]
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des filtres:', error);
      // Filtres par défaut
      setFilters({
        types: [
          { id: '', label: 'Tous les types' },
          { id: 'STAGE', label: 'STAGE (Stage d\'été / Stage technique)' },
          { id: 'STAGE PFE', label: 'STAGE PFE (Projet de Fin d\'Études)' },
          { id: 'EMPLOI', label: 'EMPLOI (CDI / CDD / Junior)' },
          { id: 'ÉTUDES', label: 'ÉTUDES À L\'ÉTRANGER' }
        ],
        countries: [
          { id: '', label: 'Tous les pays' },
          { id: 'France', label: 'France' },
          { id: 'Allemagne', label: 'Allemagne' },
          { id: 'Canada', label: 'Canada' },
          { id: 'Espagne', label: 'Espagne' },
          { id: 'Suisse', label: 'Suisse' },
          { id: 'Autre', label: 'Autre' }
        ]
      });
    }
  };

  // Fonction helper pour les données mockées
  const getMockOpportunities = () => {
    return [
      {
        _id: '1',
        type: 'STAGE',
        title: 'Stage - Réseaux à l\'événementiel',
        subtitle: 'Découvrir des infrastructures réseau en milieu professionnel',
        description: 'Ce stage se déroule au sein d\'une entreprise technologique à l\'étranger et vise à initier l\'étudiant aux bases de la configuration et de la supervision des réseaux. Le stagiaire participera à l\'installation d\'équipements réseaux, à la surveillance des performances et à l\'assistance technique.',
        country: 'France',
        duration: '2 mois',
        detailsType: 'Durée',
        isNew: true,
        date: '2024-04-15'
      },
      {
        _id: '2',
        type: 'EMPLOI',
        title: 'Développeur Full Stack - Canada',
        subtitle: 'CDI dans une startup innovante',
        description: 'Nous recherchons un développeur full stack passionné pour rejoindre notre équipe à Montréal. Vous travaillerez sur des projets variés utilisant React, Node.js et MongoDB.',
        country: 'Canada',
        contract: 'CDI',
        detailsType: 'Type',
        isNew: false,
        date: '2024-03-31'
      },
      {
        _id: '3',
        type: 'ÉTUDES',
        title: 'Master en Intelligence Artificielle - Allemagne',
        subtitle: 'Programme d\'études à Munich',
        description: 'Programme de master en IA à l\'Université Technique de Munich. Cours en anglais, possibilité de stage en entreprise.',
        country: 'Allemagne',
        diploma: 'Master',
        duration: '2 ans',
        detailsType: 'Diplôme',
        isNew: true,
        date: '2024-05-15'
      },
      {
        _id: '4',
        type: 'STAGE PFE',
        title: 'Stage PFE - Data Science',
        subtitle: 'Projet de fin d\'études en Suisse',
        description: 'Stage de 6 mois dans un laboratoire de recherche en data science. Travail sur l\'analyse de données médicales.',
        country: 'Suisse',
        duration: '6 mois',
        detailsType: 'Durée',
        isNew: false,
        date: '2024-03-15'
      },
      {
        _id: '5',
        type: 'STAGE',
        title: 'Stage Marketing Digital - Espagne',
        subtitle: 'Stage dans une agence de communication',
        description: 'Stage en marketing digital avec focus sur les réseaux sociaux et le SEO. Environnement international.',
        country: 'Espagne',
        duration: '3 mois',
        detailsType: 'Durée',
        isNew: true,
        date: '2024-04-30'
      }
    ];
  };

  // ✅ CORRECTION : Utiliser opportunities (minuscule) - variable d'état
  // Filtrer les opportunités
  const filteredOpportunities = opportunities.filter(opp => {
    // Vérifier que opp existe
    if (!opp) return false;
    
    const matchesSearch = searchTerm === '' || 
      (opp.title && opp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (opp.description && opp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (opp.subtitle && opp.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === '' || opp.type === selectedType;
    const matchesCountry = selectedCountry === '' || opp.country === selectedCountry;
    
    return matchesSearch && matchesType && matchesCountry;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleTypeFilter = (typeId) => {
    setSelectedType(typeId);
    setCurrentPage(1);
  };

  const handleCountryFilter = (countryId) => {
    setSelectedCountry(countryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (opportunityId) => {
    navigate(`/opportunities/${opportunityId}`);
  };

  const getTypeBadgeClass = (type) => {
    switch(type) {
      case 'STAGE':
      case 'STAGE PFE':
        return 'badge-stage';
      case 'EMPLOI':
        return 'badge-emploi';
      case 'ÉTUDES':
        return 'badge-etudes';
      default:
        return '';
    }
  };

  return (
    <div className="opportunities-page">
      <div className="opportunities-content">
        
        {/* Header */}
        <div className="page-header">
          <h1>Opportunités Internationales</h1>
          <p>Découvrez les stages, emplois et programmes d'études à l'étranger</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Recherche et filtres */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher une opportunité, un métier, une compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Rechercher
            </button>
          </form>

          {!loading && (
            <div className="filters-container">
              <div className="filter-group">
                <h3>Filtre par type</h3>
                <div className="filter-options">
                  {Array.isArray(filters.types) && filters.types.map(type => (
                    <button
                      key={type.id || type._id}
                      type="button"
                      className={`filter-btn ${selectedType === (type.id || type.value) ? 'active' : ''}`}
                      onClick={() => handleTypeFilter(type.id || type.value)}
                    >
                      {type.label || type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Filtre par pays</h3>
                <div className="filter-options">
                  {Array.isArray(filters.countries) && filters.countries.map(country => (
                    <button
                      key={country.id || country._id}
                      type="button"
                      className={`filter-btn ${selectedCountry === (country.id || country.value) ? 'active' : ''}`}
                      onClick={() => handleCountryFilter(country.id || country.value)}
                    >
                      {country.label || country.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="opportunities-list">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Chargement des opportunités...</p>
            </div>
          ) : currentOpportunities.length > 0 ? (
            currentOpportunities.map(opportunity => {
              // Normaliser les données
              const oppId = opportunity._id || opportunity.id;
              const oppType = opportunity.type || opportunity.category;
              const oppTitle = opportunity.title || opportunity.name || 'Sans titre';
              const oppSubtitle = opportunity.subtitle || opportunity.shortDescription || '';
              const oppDescription = opportunity.description || opportunity.details || 'Aucune description disponible';
              const oppCountry = opportunity.country || opportunity.location || 'Non spécifié';
              const oppDuration = opportunity.duration;
              const oppContract = opportunity.contract;
              const oppDiploma = opportunity.diploma;
              const oppDetailsType = opportunity.detailsType;
              const isNew = opportunity.isNew || opportunity.new || false;

              return (
                <div key={oppId} className="opportunity-item">
                  {isNew && (
                    <div className="new-badge">Nouveau</div>
                  )}

                  <div className="opportunity-header">
                    <span className={`opportunity-type ${getTypeBadgeClass(oppType)}`}>
                      <span className="type-badge">
                        {oppType === 'STAGE' ? 'Stage' : 
                         oppType === 'STAGE PFE' ? 'PFE' : 
                         oppType === 'EMPLOI' ? 'Emploi' : 
                         oppType === 'ÉTUDES' ? 'Études' : oppType}
                      </span>
                    </span>
                    <h2 className="opportunity-title">{oppTitle}</h2>
                    <p className="opportunity-subtitle">{oppSubtitle}</p>
                  </div>

                  <div className="opportunity-body">
                    <p className="opportunity-description">{oppDescription}</p>
                    
                    <div className="opportunity-meta">
                      <div className="meta-item">
                        <span className="meta-label">Pays :</span>
                        <span className="meta-value country">{oppCountry}</span>
                      </div>

                      {oppDuration && (oppDetailsType === 'Durée' || !oppDetailsType) && (
                        <div className="meta-item">
                          <span className="meta-icon">⏱️</span>
                          <span className="meta-label">Durée :</span>
                          <span className="meta-value">{oppDuration}</span>
                        </div>
                      )}

                      {oppContract && oppDetailsType === 'Type' && (
                        <div className="meta-item">
                          <span className="meta-icon">📄</span>
                          <span className="meta-label">Type :</span>
                          <span className="meta-value">{oppContract}</span>
                        </div>
                      )}

                      {oppDiploma && oppDetailsType === 'Diplôme' && (
                        <>
                          <div className="meta-item">
                            <span className="meta-icon">🎓</span>
                            <span className="meta-label">Diplôme :</span>
                            <span className="meta-value">{oppDiploma}</span>
                          </div>
                          {oppDuration && (
                            <div className="meta-item">
                              <span className="meta-icon">⏱️</span>
                              <span className="meta-label">Durée :</span>
                              <span className="meta-value">{oppDuration}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="opportunity-footer">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleViewDetails(oppId)}
                    >
                      Voir Détails
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Aucune opportunité trouvée</h3>
              <p>Aucune opportunité ne correspond à vos critères de recherche.</p>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('');
                  setSelectedCountry('');
                  setCurrentPage(1);
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredOpportunities.length > itemsPerPage && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Précédent
            </button>
            
            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant →
            </button>
          </div>
        )}

        {/* Résultats trouvés */}
        {!loading && (
          <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
            {filteredOpportunities.length} opportunité{filteredOpportunities.length > 1 ? 's' : ''} trouvée{filteredOpportunities.length > 1 ? 's' : ''}
            {selectedType && ` • Type: ${selectedType}`}
            {selectedCountry && ` • Pays: ${selectedCountry}`}
          </div>
        )}

      </div>
    </div>
  );
};

export default Opportunities;