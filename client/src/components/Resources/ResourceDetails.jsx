// client/src/components/resources/ResourceDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="resource-details-page">
      <button onClick={() => navigate('/resources')}>← Retour aux ressources</button>
      <h1>Détails de la ressource #{id}</h1>
      {/* Contenu à développer */}
    </div>
  );
};

export default ResourceDetails;