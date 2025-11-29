import { useState } from 'react';

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess  }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription attempt:', formData);
    // Ici vous ajouterez la logique d'inscription
    onRegisterSuccess(); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Inscription</h2>
          <p>Rejoignez notre communauté internationale</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">Je suis</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="student">🎓 Étudiant</option>
              <option value="professional">💼 Professionnel</option>
              <option value="recruiter">🔍 Recruteur</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Créez un mot de passe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmation</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez le mot de passe"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>
            </label>
          </div>

          <button type="submit" className="auth-button primary">
            Créer mon compte
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Déjà un compte ?{' '}
            <button className="switch-auth" onClick={onSwitchToLogin}>
              Se connecter
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>Ou s'inscrire avec</span>
        </div>

        <div className="social-auth">
          <button className="social-button google">
            <span>Google</span>
          </button>
          <button className="social-button facebook">
            <span>Facebook</span>
          </button>
          <button className="social-button linkedin">
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;