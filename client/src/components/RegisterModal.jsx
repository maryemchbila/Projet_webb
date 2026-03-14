import { useState } from 'react';
import authService from "../services/authService";

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }

    try {
      // Préparer les données pour l'API
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password
      };

      console.log('Tentative d\'inscription:', userData);

      // Appel à l'API backend - authService gère déjà le token
      const response = await authService.register(userData);
      
      console.log('Inscription réussie:', response);
      
      // Appeler le callback de succès
      onRegisterSuccess(response.user || response);
      
      // Fermer la modal
      onClose();
      
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
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
          <h2>Inscription</h2>
          <p>Rejoignez notre communauté internationale</p>
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">Je suis</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              disabled={loading}
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
                disabled={loading}
                minLength="6"
              />
              <small style={{fontSize: '12px', color: '#666'}}>Minimum 6 caractères</small>
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
                disabled={loading}
                minLength="6"
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" required disabled={loading} />
              J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>
            </label>
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
            {loading ? 'Inscription en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Déjà un compte ?{' '}
            <button 
              className="switch-auth" 
              onClick={onSwitchToLogin}
              disabled={loading}
            >
              Se connecter
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>Ou s'inscrire avec</span>
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

export default RegisterModal;