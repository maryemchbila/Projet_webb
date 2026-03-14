// client/src/components/Community/Community.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Community.css';
import apiService from '../../services/api';

const Community = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPartners();
      setPartners(data || []);
      setError('');
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError('Erreur lors du chargement des partenaires');
      
      // Données de secours
      setPartners([
        {
          _id: '1',
          type: 'university',
          name: 'Université Paris-Sorbonne',
          location: 'Paris, France',
          description: 'L\'une des universités les plus prestigieuses de France, reconnue mondialement pour ses programmes en sciences humaines, lettres et arts.',
          members: 1250,
          rating: 4.8,
          specialties: ['Lettres', 'Histoire', 'Philosophie', '+2']
        }
        // ... autres données
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les partenaires
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.specialties?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || partner.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewPartner = (partnerId) => {
    navigate(`/community/${partnerId}`);
  };

  return (
    <div className="community-page">
      <div className="community-content">
        {/* Header */}
        <header className="community-header">
          <h1>Communautés et Partenaires</h1>
          <p className="subtitle">
            Découvrez nos {partners.length} partenaires universitaires et entreprises à travers le monde
          </p>
        </header>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Navigation */}
        <nav className="community-nav">
          <div className="nav-filters">
            <button 
              className={`nav-label ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tous
            </button>
            <span className="nav-separator">|</span>
            <button 
              className={`nav-label ${activeFilter === 'university' ? 'active' : ''}`}
              onClick={() => setActiveFilter('university')}
            >
              Universités
            </button>
            <span className="nav-separator">|</span>
            <button 
              className={`nav-label ${activeFilter === 'company' ? 'active' : ''}`}
              onClick={() => setActiveFilter('company')}
            >
              Entreprises
            </button>
          </div>
        </nav>

        {/* Barre de recherche */}
        <div className="search-section">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Rechercher un partenaire, une ville, un programme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-tags">
            <span className="filter-tag">Tous pays</span>
            <span className="filter-tag">Tous filtres</span>
          </div>
        </div>

        {/* Grille des partenaires */}
        <div className="partners-grid">
          {loading ? (
            <div className="loading">Chargement des partenaires...</div>
          ) : filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div key={partner._id} className={`partner-card ${partner.type}`}>
                <div className="partner-header">
                  <div className="partner-icon">
                    <i className={`fas ${partner.type === 'university' ? 'fa-university' : 'fa-building'}`}></i>
                  </div>
                  <div className="partner-info">
                    <h3>{partner.name}</h3>
                    <div className="partner-location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{partner.location}</span>
                    </div>
                  </div>
                </div>

                <p className="partner-description">{partner.description}</p>

                {partner.specialties && partner.specialties.length > 0 && (
                  <div className="partner-specialties">
                    {partner.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                    {partner.specialties.length > 3 && (
                      <span className="specialty-tag">+{partner.specialties.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="partner-stats">
                  <div className="stat">
                    <i className="fas fa-users"></i>
                    <span>{partner.members?.toLocaleString() || 0} membres</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-star"></i>
                    <span>{partner.rating || 0}</span>
                  </div>
                </div>

                <div className="partner-actions">
                  <button 
                    onClick={() => handleViewPartner(partner._id)}
                    className="btn btn-primary explore-btn"
                  >
                    <i className="fas fa-eye"></i>
                    Voir détails
                  </button>
                  <button className="btn btn-outline">
                    <i className="fas fa-user-plus"></i>
                    Rejoindre
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Aucun partenaire trouvé</h3>
              <p>Aucun partenaire ne correspond à vos critères de recherche.</p>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {!loading && (
          <div className="community-stats">
            <div className="stat-card">
              <div className="stat-number">{partners.length}</div>
              <div className="stat-label">Partenaires actifs</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {partners.reduce((sum, p) => sum + (p.members || 0), 0).toLocaleString()}
              </div>
              <div className="stat-label">Membres totaux</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Pays représentés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {partners.length > 0 
                  ? (partners.reduce((sum, p) => sum + (p.rating || 0), 0) / partners.length).toFixed(1)
                  : '0.0'
                }
              </div>
              <div className="stat-label">Note moyenne</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;