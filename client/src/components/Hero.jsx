// src/components/Hero/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = ({ 
  title = "TON AVENIR INTERNATIONAL COMMENCE ICI",
  subtitle = "Études, stages et emplois à l'étranger",
  highlight = "Études complètes + Communauté d'entraide",
  stats = [
    { number: "1897", label: "étudiants" },
    { number: "28+", label: "pays" },
    { number: "99%", label: "satisfaction" }
  ],
  primaryButton = { text: "Commencer l'aventure", onClick: () => {} },
  secondaryButton = { text: "Se connecter", onClick: () => {} },
  background = "gradient", // 'gradient' ou 'solid'
  size = "large" // 'large' ou 'compact'
}) => {
  return (
    <section className={`hero ${background} ${size}`}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          
          <div className="hero-subtitle">
            <p>{subtitle}</p>
            {highlight && <span className="hero-highlight">{highlight}</span>}
          </div>
          
          {stats && stats.length > 0 && (
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="hero-actions">
            {primaryButton && (
              <button 
                className="btn btn-primary btn-large" 
                onClick={primaryButton.onClick}
              >
                {primaryButton.text}
              </button>
            )}
            
            {secondaryButton && (
              <button 
                className="btn btn-secondary btn-large" 
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;