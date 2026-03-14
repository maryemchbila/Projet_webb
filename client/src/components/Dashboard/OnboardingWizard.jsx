import React, { useState } from 'react';
import './OnboardingWizard.css';

const OnboardingWizard = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    // Étape 1: Informations académiques
    educationLevel: '',
    fieldOfStudy: '',
    currentYear: '',
    university: '',
    
    // Étape 2: Objectifs
    primaryGoal: '',
    targetCountries: [],
    timeframe: '',
    
    // Étape 3: Compétences
    skills: [],
    languages: [],
    certifications: [],
    
    // Étape 4: Préférences
    opportunityTypes: [],
    preferredIndustries: [],
    remoteWork: false,
    salaryExpectation: ''
  });
  
  const educationLevels = [
    { value: 'bac', label: 'Baccalauréat' },
    { value: 'licence', label: 'Licence/Bachelor' },
    { value: 'master', label: 'Master' },
    { value: 'doctorat', label: 'Doctorat' },
    { value: 'other', label: 'Autre' }
  ];
  
  const fieldsOfStudy = [
    { value: 'informatique', label: 'Informatique/Tech' },
    { value: 'commerce', label: 'Commerce/Gestion' },
    { value: 'ingénierie', label: 'Ingénierie' },
    { value: 'sciences', label: 'Sciences' },
    { value: 'arts', label: 'Arts/Lettres' },
    { value: 'sante', label: 'Santé/Médecine' },
    { value: 'droit', label: 'Droit' },
    { value: 'education', label: 'Éducation' }
  ];
  
  const goals = [
    { value: 'study_abroad', label: 'Étudier à l\'étranger' },
    { value: 'job_abroad', label: 'Travailler à l\'étranger' },
    { value: 'local_job', label: 'Trouver un emploi local' },
    { value: 'internship', label: 'Faire un stage' },
    { value: 'language', label: 'Apprendre une langue' },
    { value: 'career_switch', label: 'Changer de carrière' }
  ];
  
  const countries = [
    { value: 'Canada', label: 'Canada', flag: '🇨🇦' },
    { value: 'France', label: 'France', flag: '🇫🇷' },
    { value: 'USA', label: 'États-Unis', flag: '🇺🇸' },
    { value: 'Allemagne', label: 'Allemagne', flag: '🇩🇪' },
    { value: 'UK', label: 'Royaume-Uni', flag: '🇬🇧' },
    { value: 'Australie', label: 'Australie', flag: '🇦🇺' },
    { value: 'Japon', label: 'Japon', flag: '🇯🇵' },
    { value: 'Suisse', label: 'Suisse', flag: '🇨🇭' }
  ];
  
  const skills = [
    { value: 'programming', label: 'Programmation' },
    { value: 'data_analysis', label: 'Analyse de données' },
    { value: 'design', label: 'Design UI/UX' },
    { value: 'marketing', label: 'Marketing digital' },
    { value: 'finance', label: 'Finance/Comptabilité' },
    { value: 'project_management', label: 'Gestion de projet' },
    { value: 'languages', label: 'Traduction/Langues' },
    { value: 'research', label: 'Recherche scientifique' }
  ];
  
  const opportunityTypes = [
    { value: 'internship', label: 'Stage' },
    { value: 'full_time', label: 'Emploi temps plein' },
    { value: 'part_time', label: 'Emploi temps partiel' },
    { value: 'freelance', label: 'Freelance/Consultant' },
    { value: 'volunteer', label: 'Bénévolat' },
    { value: 'scholarship', label: 'Bourse d\'études' }
  ];
  
  const industries = [
    { value: 'tech', label: 'Technologie' },
    { value: 'finance', label: 'Finance/Banque' },
    { value: 'health', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'government', label: 'Secteur public' },
    { value: 'ngo', label: 'ONG/Associations' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'manufacturing', label: 'Industrie' }
  ];
  
  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleMultiSelect = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="onboarding-step">
            <h3>🎓 Votre profil académique</h3>
            <div className="form-group">
              <label>Niveau d'études le plus élevé *</label>
              <select 
                value={profile.educationLevel}
                onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                className="form-select"
              >
                <option value="">Sélectionnez votre niveau</option>
                {educationLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Domaine d'études principal *</label>
              <select 
                value={profile.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="form-select"
              >
                <option value="">Sélectionnez votre domaine</option>
                {fieldsOfStudy.map(field => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Année d'études</label>
              <input 
                type="number" 
                min="1" 
                max="10"
                value={profile.currentYear}
                onChange={(e) => handleInputChange('currentYear', e.target.value)}
                className="form-input"
                placeholder="Ex: 3"
              />
            </div>
            
            <div className="form-group">
              <label>Établissement (optionnel)</label>
              <input 
                type="text" 
                value={profile.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                className="form-input"
                placeholder="Nom de votre université"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="onboarding-step">
            <h3>🎯 Vos objectifs</h3>
            <div className="form-group">
              <label>Quel est votre objectif principal ? *</label>
              <div className="radio-group">
                {goals.map(goal => (
                  <label key={goal.value} className="radio-label">
                    <input 
                      type="radio"
                      name="primaryGoal"
                      value={goal.value}
                      checked={profile.primaryGoal === goal.value}
                      onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    {goal.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Pays qui vous intéressent *</label>
              <div className="checkbox-grid">
                {countries.map(country => (
                  <label key={country.value} className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={profile.targetCountries.includes(country.value)}
                      onChange={() => handleMultiSelect('targetCountries', country.value)}
                    />
                    <span className="checkbox-custom"></span>
                    {country.flag} {country.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Quand souhaitez-vous réaliser votre projet ?</label>
              <select 
                value={profile.timeframe}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
                className="form-select"
              >
                <option value="">Sélectionnez une période</option>
                <option value="immediate">Dès que possible</option>
                <option value="3_months">Dans les 3 mois</option>
                <option value="6_months">Dans les 6 mois</option>
                <option value="1_year">Dans 1 an</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="onboarding-step">
            <h3>💼 Vos compétences</h3>
            <div className="form-group">
              <label>Sélectionnez vos compétences *</label>
              <div className="checkbox-grid">
                {skills.map(skill => (
                  <label key={skill.value} className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={profile.skills.includes(skill.value)}
                      onChange={() => handleMultiSelect('skills', skill.value)}
                    />
                    <span className="checkbox-custom"></span>
                    {skill.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Langues que vous parlez *</label>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={profile.languages.includes('fr')}
                    onChange={() => handleMultiSelect('languages', 'fr')}
                  />
                  <span className="checkbox-custom"></span>
                  🇫🇷 Français
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={profile.languages.includes('en')}
                    onChange={() => handleMultiSelect('languages', 'en')}
                  />
                  <span className="checkbox-custom"></span>
                  🇬🇧 Anglais
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={profile.languages.includes('es')}
                    onChange={() => handleMultiSelect('languages', 'es')}
                  />
                  <span className="checkbox-custom"></span>
                  🇪🇸 Espagnol
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={profile.languages.includes('de')}
                    onChange={() => handleMultiSelect('languages', 'de')}
                  />
                  <span className="checkbox-custom"></span>
                  🇩🇪 Allemand
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Certifications (optionnel)</label>
              <input 
                type="text"
                value={profile.certifications.join(', ')}
                onChange={(e) => handleInputChange('certifications', e.target.value.split(', '))}
                className="form-input"
                placeholder="Ex: TOEFL, DELF, PMP, CPA"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="onboarding-step">
            <h3>⚙️ Vos préférences</h3>
            <div className="form-group">
              <label>Types d'opportunités recherchés *</label>
              <div className="checkbox-grid">
                {opportunityTypes.map(type => (
                  <label key={type.value} className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={profile.opportunityTypes.includes(type.value)}
                      onChange={() => handleMultiSelect('opportunityTypes', type.value)}
                    />
                    <span className="checkbox-custom"></span>
                    {type.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Secteurs d'activité qui vous intéressent</label>
              <div className="checkbox-grid">
                {industries.map(industry => (
                  <label key={industry.value} className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={profile.preferredIndustries.includes(industry.value)}
                      onChange={() => handleMultiSelect('preferredIndustries', industry.value)}
                    />
                    <span className="checkbox-custom"></span>
                    {industry.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={profile.remoteWork}
                  onChange={(e) => handleInputChange('remoteWork', e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                ☕ Travail à distance possible
              </label>
            </div>
            
            <div className="form-group">
              <label>Attentes salariales (optionnel)</label>
              <select 
                value={profile.salaryExpectation}
                onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                className="form-select"
              >
                <option value="">Non spécifié</option>
                <option value="low">Moins que la moyenne</option>
                <option value="medium">Dans la moyenne du marché</option>
                <option value="high">Au-dessus de la moyenne</option>
              </select>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const isStepValid = () => {
    switch(step) {
      case 1:
        return profile.educationLevel && profile.fieldOfStudy;
      case 2:
        return profile.primaryGoal && profile.targetCountries.length > 0;
      case 3:
        return profile.skills.length > 0 && profile.languages.length > 0;
      case 4:
        return profile.opportunityTypes.length > 0;
      default:
        return false;
    }
  };
  
  const getStepTitle = () => {
    const titles = {
      1: 'Profil académique',
      2: 'Objectifs',
      3: 'Compétences',
      4: 'Préférences'
    };
    return `Étape ${step}/4: ${titles[step]}`;
  };
  
  return (
    <div className="onboarding-wizard">
      <div className="onboarding-overlay" onClick={onSkip}></div>
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <h2>✨ Personnalisez votre expérience</h2>
          <p>Répondez à quelques questions pour recevoir des recommandations adaptées</p>
          <div className="progress-steps">
            {[1, 2, 3, 4].map((stepNum) => (
              <div 
                key={stepNum} 
                className={`step-indicator ${stepNum === step ? 'active' : stepNum < step ? 'completed' : ''}`}
              >
                {stepNum}
              </div>
            ))}
          </div>
        </div>
        
        <div className="onboarding-body">
          {renderStep()}
        </div>
        
        <div className="onboarding-footer">
          <button 
            className="btn btn-secondary"
            onClick={onSkip}
          >
            Passer pour l'instant
          </button>
          
          <div className="step-buttons">
            {step > 1 && (
              <button 
                className="btn btn-outline"
                onClick={handleBack}
              >
                ← Précédent
              </button>
            )}
            
            <button 
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {step === 4 ? 'Terminer' : 'Suivant →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;