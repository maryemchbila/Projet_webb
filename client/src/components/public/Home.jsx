// src/components/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Hero';
import './Home.css';

const Home = ({ onLoginClick, onRegisterClick }) => {
  // Données pour le Hero
  const heroProps = {
    title: "TON AVENIR INTERNATIONAL COMMENCE ICI",
    subtitle: "Études, stages et emplois à l'étranger",
    highlight: "Études complètes + Communauté d'entraide",
    stats: [
      { number: "1897", label: "étudiants" },
      { number: "28+", label: "pays" },
      { number: "99%", label: "satisfaction" }
    ],
    primaryButton: {
      text: "Commencer l'aventure",
      onClick: onRegisterClick
    },
    secondaryButton: {
      text: "Se connecter",
      onClick: onLoginClick
    },
    background: "gradient",
    size: "large"
  };

  // Données des services
  const services = [
    { 
      id: 1, 
      icon: "🌍", 
      title: "Recherche de Programmes", 
      description: "Trouve les meilleures formations adaptées à ton profil" 
    },
    { 
      id: 2, 
      icon: "📝", 
      title: "Accompagnement", 
      description: "Aide aux démarches administratives et préparations" 
    },
    { 
      id: 3, 
      icon: "🤝", 
      title: "Communauté", 
      description: "Échange avec des étudiants et anciens internationaux" 
    },
    { 
      id: 4, 
      icon: "🏆", 
      title: "Classement", 
      description: "Accède aux meilleures opportunités selon ton profil" 
    },
  ];

  // Destinations populaires
  const popularDestinations = [
    { id: 1, name: "France", students: 1897, universities: 28 },
    { id: 2, name: "Canada", students: 180, universities: 40 },
    { id: 3, name: "Allemagne", students: 180, universities: 40 },
  ];

  // Témoignages
  const testimonials = [
    { 
      id: 1, 
      name: "Sarah L.", 
      location: "Paris", 
      text: "Grâce à Global Path, j'ai décroché mon stage à Berlin en seulement 2 mois !" 
    },
    { 
      id: 2, 
      name: "Mohamed K.", 
      location: "Montréal", 
      text: "Le meilleur soutien pour les études à l'étranger. Je recommande à 100% !" 
    },
    { 
      id: 3, 
      name: "Anna N.", 
      location: "Berlin", 
      text: "Le processus était fluide et l'accompagnement personnalisé. Merci !" 
    },
  ];

  return (
    <div className="home">
      {/* Section Hero */}
      <Hero {...heroProps} />

      {/* Section Services */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">TOUT CE DONT TU AS BESOIN</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Destinations */}
      <section className="destinations-section">
        <div className="container">
          <h2 className="section-title">DESTINATIONS POPULAIRES</h2>
          <div className="destinations-grid">
            {popularDestinations.map((dest) => (
              <div key={dest.id} className="destination-card">
                <div className="destination-header">
                  <h3 className="destination-name">{dest.name}</h3>
                  <span className="destination-students">{dest.students} étudiants</span>
                </div>
                <div className="destination-details">
                  <p className="destination-universities">{dest.universities}+ universités partenaires</p>
                </div>
                <button className="btn btn-outline">Voir les opportunités</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">ILS ONT RÉUSSI AVEC GLOBAL PATH</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <strong>{testimonial.name}</strong>
                    <span className="author-location">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">PRÊT À DÉMARRER TON AVENTURE ?</h2>
            <p className="cta-subtitle">
              Rejoins notre communauté et accède à des opportunités exclusives à l'international.
            </p>
            <div className="cta-actions">
              <button 
                className="btn btn-primary btn-large" 
                onClick={onRegisterClick}
              >
                S'inscrire gratuitement
              </button>
              <Link to="/about" className="btn btn-secondary btn-large">
                Découvrir notre mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;