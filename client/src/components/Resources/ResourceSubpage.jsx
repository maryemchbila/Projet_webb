import React from 'react';
import { useParams } from 'react-router-dom';

// Import de toutes les sous-pages
import LanguageTests from './subpages/langue_test';
import SkillsTests from './subpages/SkillsTests';
import AICertifications from './subpages/AICertifications';
import CVApplications from './subpages/Cv';
import PostBac from './subpages/bac';
import MastersDoctorat from './subpages/master_doct';

const ResourceSubpage = () => {
  // Récupère le paramètre 'category' depuis l'URL
  // Ex: /resources/language-tests → category = "language-tests"
  const { category } = useParams();
  
  // Affiche la sous-page correspondante
  switch(category) {
    case 'language-tests':
      return <LanguageTests />;
    case 'skills-tests':
      return <SkillsTests />;
    case 'ai-certifications':
      return <AICertifications />;
    case 'cv-applications':
      return <CVApplications />;
    case 'post-bac':
      return <PostBac />;
    case 'masters-doctorat':
      return <MastersDoctorat />;
    default:
      // Page 404 personnalisée pour les catégories inexistantes
      return (
        <div className="subpage">
          <div className="subpage-content">
            <div className="error-page">
              <h1>404 - Ressource non trouvée</h1>
              <p>La catégorie "{category}" n'existe pas dans nos ressources.</p>
              <div className="suggestions">
                <p>Voici les ressources disponibles :</p>
                <ul>
                  <li><a href="/resources/language-tests">Tests de Langue</a></li>
                  <li><a href="/resources/skills-tests">Tests de Compétences</a></li>
                  <li><a href="/resources/ai-certifications">Intelligence Artificielle</a></li>
                  <li><a href="/resources/cv-applications">CV & Candidatures</a></li>
                  <li><a href="/resources/post-bac">Orientation Post-Bac</a></li>
                  <li><a href="/resources/masters-doctorat">Masters & Doctorat</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default ResourceSubpage;