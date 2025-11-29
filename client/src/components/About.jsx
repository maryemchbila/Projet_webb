'use client'
import React from "react";

function About({onRegisterClick} ) {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>À Propos de GlobalPath</h1>
          <p className="hero-subtitle">
            Votre partenaire de confiance pour réussir votre projet d'études à l'international
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Étudiants accompagnés</span>
            </div>
            <div className="stat">
              <span className="stat-number">45+</span>
              <span className="stat-label">Pays partenaires</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Taux de satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="about-section">
        <div className="container">
          <h2>Notre Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p>
                Chez <strong>GlobalPath</strong>, nous croyons que chaque étudiant mérite sa chance 
                de vivre une expérience internationale transformatrice. Notre mission est de 
                démocratiser l'accès aux études à l'étranger en brisant les barrières 
                administratives, linguistiques et culturelles.
              </p>
              <p>
                Nous accompagnons les étudiants à chaque étape de leur parcours : de la recherche 
                de destination à l'intégration dans leur nouveau pays d'accueil.
              </p>
            </div>
            <div className="mission-image">
              <img src="src\assets\images\Capture d'écran 2025-11-27 094014.png" alt="Notre mission" />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="about-section values-section">
        <div className="container">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Accessibilité</h3>
              <p>Rendre l'éducation internationale accessible à tous, sans barrières géographiques ou financières.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Communauté</h3>
              <p>Construire un réseau solidaire où chaque membre s'entraide et partage son expérience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Utiliser la technologie pour simplifier les processus complexes et créer des solutions innovantes.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💫</div>
              <h3>Transformation</h3>
              <p>Accompagner chaque étudiant dans sa transformation personnelle et professionnelle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="about-section story-section">
        <div className="container">
          <h2>Notre Histoire</h2>
          <div className="story-content">
            <div className="story-image">
              <img src="src\assets\images\Capture d'écran 2025-11-27 094042.png" alt="Notre histoire" />
            </div>
            <div className="story-text">
              <p>
                Fondée en <strong>2020</strong> par Sarah Chen, ancienne étudiante internationale, 
                GlobalPath est née d'un constat simple : les démarches pour étudier à l'étranger 
                sont souvent complexes, coûteuses et décourageantes.
              </p>
              <p>
                Après avoir surmonté elle-même les obstacles administratifs pour étudier en France, 
                Sarah a décidé de créer une plateforme qui simplifierait ce processus pour les 
                générations futures.
              </p>
              <p>
                Aujourd'hui, GlobalPath est bien plus qu'une plateforme : c'est une communauté 
                internationale d'entraide, un réseau de mentors passionnés et une famille 
                dédiée à votre réussite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="about-cta">
        <div className="container">
          <h2>Prêt à Commencer Votre Aventure ?</h2>
          <p>Rejoignez des milliers d'étudiants qui ont transformé leur rêve en réalité</p>
          <div className="cta-buttons">
            <button 
            className="btn-primary" 
            onClick={onRegisterClick} >Découvrir nos programmes</button>
            <button className="btn-secondary">Nous contacter</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;