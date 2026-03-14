// src/components/About/About.jsx
import React from 'react';
import Hero from '../Hero';
import './About.css';

const About = () => {
  // Données pour le Hero de la page About
  const heroProps = {
    title: "NOTRE MISSION",
    subtitle: "Rendre l'éducation internationale accessible à tous les étudiants",
    highlight: "",
    stats: [
      { number: "1800+", label: "étudiants accompagnés" },
      { number: "28+", label: "pays partenaires" },
      { number: "99%", label: "taux de satisfaction" }
    ],
    primaryButton: {
      text: "Rejoindre la communauté",
      onClick: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    },
    secondaryButton: {
      text: "Nos services",
      onClick: () => window.scrollTo({ top: 800, behavior: 'smooth' })
    },
    background: "solid",
    size: "large"
  };

  // Équipe
  const teamMembers = [
    { 
      id: 1, 
      name: "Alex Martin", 
      role: "Fondateur & CEO", 
      description: "Ancien étudiant international, passionné par l'éducation",
      initials: "AM"
    },
    { 
      id: 2, 
      name: "Sophie Chen", 
      role: "Directrice des Partenariats", 
      description: "15 ans d'expérience dans l'éducation internationale",
      initials: "SC"
    },
    { 
      id: 3, 
      name: "Thomas Weber", 
      role: "Responsable Pédagogique", 
      description: "Expert en orientation académique",
      initials: "TW"
    },
    { 
      id: 4, 
      name: "Léa Dubois", 
      role: "Chef de Projet Communauté", 
      description: "Ancienne étudiante Erasmus",
      initials: "LD"
    },
  ];

  // Jalons historiques
  const milestones = [
    { year: "2020", title: "Création", description: "Lancement de Global Path avec une première équipe de 4 personnes" },
    { year: "2021", title: "Expansion", description: "Premiers 500 étudiants accompagnés et ouverture à 5 nouveaux pays" },
    { year: "2022", title: "Innovation", description: "Lancement de la plateforme communautaire en ligne" },
    { year: "2023", title: "Reconnaissance", description: "Prix de l'innovation éducative et partenariat avec 50 universités" },
    { year: "2024", title: "Croissance", description: "Plus de 1800 étudiants accompagnés et présence dans 28 pays" },
  ];

  // Valeurs
  const values = [
    { 
      icon: "🎯", 
      title: "Accessibilité", 
      description: "Nous croyons que chaque étudiant, quels que soient ses moyens ou son parcours, devrait pouvoir accéder à l'éducation internationale." 
    },
    { 
      icon: "🤝", 
      title: "Accompagnement", 
      description: "Un suivi personnalisé à chaque étape du parcours, de la recherche à l'intégration dans le pays d'accueil." 
    },
    { 
      icon: "🔍", 
      title: "Transparence", 
      description: "Des informations claires, des coûts détaillés et un processus sans surprise pour nos étudiants." 
    },
    { 
      icon: "🌍", 
      title: "Communauté", 
      description: "Une plateforme d'entraide où les étudiants partagent expériences et conseils précieux." 
    },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <Hero {...heroProps} />

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Notre Histoire</h2>
            <div className="mission-text">
              <p>
                Fondée en 2020 par d'anciens étudiants internationaux, <strong>Global Path</strong> est née d'un constat simple : 
                l'accès aux études à l'étranger est souvent complexe, coûteux et source d'incertitude pour de nombreux étudiants.
              </p>
              <p>
                Notre équipe, composée d'anciens étudiants Erasmus, de spécialistes de l'éducation internationale et de conseillers pédagogiques, 
                s'est donné pour mission de démocratiser l'accès aux opportunités internationales.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'accompagner des milliers d'étudiants dans leur projet d'études, 
                de stage ou d'emploi à l'étranger, en leur offrant un accompagnement complet et personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Notre Parcours</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{milestone.title}</h4>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Notre Équipe</h2>
          <p className="section-subtitle">
            Des passionnés de l'éducation internationale, réunis pour vous accompagner vers la réussite
          </p>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">
                  <span className="avatar-initials">{member.initials}</span>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <h2 className="contact-title">Une question sur votre projet international ?</h2>
            <p className="contact-subtitle">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>contact@globalpath.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h4>Téléphone</h4>
                  <p>+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🏢</div>
                <div className="contact-details">
                  <h4>Bureau</h4>
                  <p>123 Avenue des Champs-Élysées</p>
                  <p>75008 Paris, France</p>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <a href="mailto:contact@globalpath.com" className="btn btn-primary">
                Nous écrire
              </a>
              <a href="tel:+33123456789" className="btn btn-secondary">
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;