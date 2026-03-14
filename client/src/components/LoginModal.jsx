import { useState } from 'react';
import authService from "../services/authService";

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentative de connexion:', formData);

      // Appel à l'API backend - authService gère déjà le token
      const response = await authService.login({
        email: formData.email.toLowerCase(),
        password: formData.password
      });
      
      console.log('Connexion réussie:', response);
      
      // Appeler le callback de succès
      onLoginSuccess(response.user || response);
      
      // Fermer la modal
      onClose();
      
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
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

        {/* Affichage des erreurs */}
        {error && (
          <div className="error-message" style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" disabled={loading} />
              Se souvenir de moi
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Pas encore de compte ?{' '}
            <button 
              className="switch-auth" 
              onClick={onSwitchToRegister}
              disabled={loading}
            >
              S'inscrire
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>Ou continuer avec</span>
        </div>

        <div className="social-auth">
          <button 
            className="social-button google"
            type="button"
            disabled={loading}
          >
            <span>Google</span>
          </button>
          <button 
            className="social-button facebook"
            type="button"
            disabled={loading}
          >
            <span>Facebook</span>
          </button>
          <button 
            className="social-button linkedin"
            type="button"
            disabled={loading}
          >
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;