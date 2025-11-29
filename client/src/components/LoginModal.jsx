import { useState } from 'react';

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess  }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion attempt:', formData);
    // Ici vous ajouterez la logique de connexion
    onLoginSuccess(); 
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
          <h2>Connexion</h2>
          <p>Content de vous revoir !</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              Se souvenir de moi
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="auth-button primary">
            Se connecter
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Pas encore de compte ?{' '}
            <button className="switch-auth" onClick={onSwitchToRegister}>
              S'inscrire
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>Ou continuer avec</span>
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

export default LoginModal;