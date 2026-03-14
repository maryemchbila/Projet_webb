// src/components/Profile/ProfileCompletion.jsx
import React from 'react';
import './ProfileCompletion.css';

const ProfileCompletion = ({ percentage, onComplete }) => {
  return (
    <div className="profile-completion-widget">
      <div className="completion-header">
        <h4>✨ Personnalisez votre expérience</h4>
        <p>Complétez votre profil pour recevoir des recommandations adaptées</p>
      </div>
      
      <div className="completion-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>{percentage}% complété</span>
        </div>
      </div>
      
      <button 
        className="complete-profile-btn"
        onClick={onComplete}
      >
        {percentage === 0 ? 'Commencer' : 'Continuer'} l'onboarding
      </button>
    </div>
  );
};

export default ProfileCompletion;