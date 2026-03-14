// client/src/components/Opportunities/OpportunityDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOpportunityDetails();
  }, [id]);

  const fetchOpportunityDetails = async () => {
    try {
      setLoading(true);
      const data = await apiService.getOpportunityById(id);
      setOpportunity(data);
    } catch (error) {
      console.error('Error fetching opportunity details:', error);
      setError('Erreur lors du chargement des détails');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!opportunity) return <div>Opportunité non trouvée</div>;

  return (
    <div className="opportunity-details-page">
      <button onClick={() => navigate('/opportunities')}>← Retour</button>
      <h1>{opportunity.title}</h1>
      {/* Détails complets */}
    </div>
  );
};

export default OpportunityDetails;