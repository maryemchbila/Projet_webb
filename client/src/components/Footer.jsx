// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "Accueil", path: "/" },
      { name: "Opportunités", path: "/opportunities" },
      { name: "Destinations", path: "/destinations" },
      { name: "Ressources", path: "/resources" },
      { name: "Communauté", path: "/community" },
      { name: "À propos", path: "/about" },
    ],
    legal: [
      { name: "Mentions légales", path: "/legal" },
      { name: "Politique de confidentialité", path: "/privacy" },
      { name: "CGU", path: "/terms" },
      { name: "Cookies", path: "/cookies" },
    ],
    support: [
      { name: "FAQ", path: "/faq" },
      { name: "Contact", path: "/contact" },
      { name: "Support", path: "/support" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">Global Path</h3>
            <p className="footer-tagline">
              Votre passerelle vers l'éducation internationale
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-group-title">Navigation</h4>
              <ul className="link-list">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Support</h4>
              <ul className="link-list">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Légal</h4>
              <ul className="link-list">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4 className="newsletter-title">
            Restez informé des nouvelles opportunités
          </h4>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Votre email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="btn btn-primary">
              S'abonner
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} Global Path. Tous droits réservés.
              <span className="separator">|</span>
              Développé avec ❤️ pour les étudiants internationaux
            </p>
          </div>

          <div className="footer-contact">
            <p>
              <strong>Contact:</strong> contact@globalpath.com
              <span className="separator">|</span>
              <strong>Téléphone:</strong> +33 1 23 45 67 89
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;