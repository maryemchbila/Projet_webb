import React from 'react';
import './OpportunityCard.css';

const OpportunityCard = ({ opportunity, onViewDetails, onApply, showMatchScore = true }) => {
  const getTypeIcon = (type) => {
    const icons = {
      internship: '🎓',
      full_time: '💼',
      part_time: '⏱️',
      freelance: '✨',
      volunteer: '❤️',
      scholarship: '🏆'
    };
    return icons[type] || '📌';
  };

  const getTypeLabel = (type) => {
    const labels = {
      internship: 'Stage',
      full_time: 'Emploi temps plein',
      part_time: 'Emploi temps partiel',
      freelance: 'Freelance',
      volunteer: 'Bénévolat',
      scholarship: 'Bourse'
    };
    return labels[type] || type;
  };

  const getMatchColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const formatDeadline = (dateString) => {
    if (!dateString) return 'Date non spécifiée';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expiré';
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Demain';
    if (diffDays < 7) return `Dans ${diffDays} jours`;
    if (diffDays < 30) return `Dans ${Math.floor(diffDays/7)} semaines`;
    return `Le ${date.toLocaleDateString('fr-FR')}`;
  };

  return (
    <div className="opportunity-card">
      {opportunity.isNew && (
        <div className="new-badge">Nouveau</div>
      )}
      
      {showMatchScore && opportunity.matchScore && (
        <div 
          className="match-score" 
          style={{ backgroundColor: getMatchColor(opportunity.matchScore) }}
        >
          {opportunity.matchScore}% match
        </div>
      )}
      
      <div className="opportunity-header">
        <div className="opportunity-type">
          <span className="type-icon">{getTypeIcon(opportunity.type)}</span>
          <span className="type-label">{getTypeLabel(opportunity.type)}</span>
        </div>
        
        <h3>{opportunity.title}</h3>
        <p className="company">{opportunity.company}</p>
      </div>
      
      <div className="opportunity-details">
        <div className="detail-row">
          <span className="detail-label">📍 Lieu:</span>
          <span className="detail-value">{opportunity.location}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">⏱️ Durée:</span>
          <span className="detail-value">{opportunity.duration}</span>
        </div>
        
        {opportunity.salary && (
          <div className="detail-row">
            <span className="detail-label">💰 Salaire:</span>
            <span className="detail-value">{opportunity.salary}</span>
          </div>
        )}
        
        {opportunity.deadline && (
          <div className="detail-row">
            <span className="detail-label">⏰ Délai:</span>
            <span className="detail-value deadline">
              {formatDeadline(opportunity.deadline)}
            </span>
          </div>
        )}
      </div>
      
      <p className="opportunity-description">{opportunity.description}</p>
      
      {opportunity.matchReasons && opportunity.matchReasons.length > 0 && (
        <div className="match-reasons">
          <strong>Pourquoi c'est pour vous:</strong>
          <ul>
            {opportunity.matchReasons.map((reason, index) => (
              <li key={index}>✓ {reason}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="opportunity-actions">
        <button 
          className="btn btn-outline"
          onClick={() => onViewDetails(opportunity._id)}
        >
          Voir détails
        </button>
        
        {onApply && (
          <button 
            className="btn btn-primary"
            onClick={() => onApply(opportunity._id)}
          >
            Postuler
          </button>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;