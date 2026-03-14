export const calculateOpportunityMatch = (userProfile, opportunity) => {
  let score = 0;
  let maxScore = 0;
  const reasons = [];

  // 1. Match par objectif (25%)
  maxScore += 25;
  if (
    userProfile.primaryGoal === "study_abroad" &&
    opportunity.type === "scholarship"
  ) {
    score += 25;
    reasons.push("Correspond à votre objectif d'études à l'étranger");
  } else if (
    userProfile.primaryGoal === "job_abroad" &&
    opportunity.type === "job"
  ) {
    score += 25;
    reasons.push("Correspond à votre objectif d'emploi à l'étranger");
  } else if (userProfile.primaryGoal && opportunity.type) {
    score += 10;
  }

  // 2. Match par pays cible (20%)
  maxScore += 20;
  if (
    opportunity.location?.country &&
    userProfile.targetCountries?.includes(opportunity.location.country)
  ) {
    score += 20;
    reasons.push(`Dans votre pays cible: ${opportunity.location.country}`);
  }

  // 3. Match par compétences (20%)
  maxScore += 20;
  if (userProfile.skills && opportunity.requirements?.skills) {
    const matchingSkills = userProfile.skills.filter((skill) =>
      opportunity.requirements.skills.includes(skill)
    );
    const skillMatch =
      (matchingSkills.length / opportunity.requirements.skills.length) * 100;
    const skillScore = Math.min(skillMatch * 0.2, 20);
    score += skillScore;

    if (matchingSkills.length > 0) {
      reasons.push(
        `Utilise vos compétences: ${matchingSkills.slice(0, 2).join(", ")}`
      );
    }
  }

  // 4. Match par niveau d'éducation (15%)
  maxScore += 15;
  if (
    opportunity.requirements?.educationLevel?.includes(
      userProfile.educationLevel
    )
  ) {
    score += 15;
    reasons.push("Niveau d'éducation requis correspond");
  }

  // 5. Match par type d'opportunité (10%)
  maxScore += 10;
  if (userProfile.opportunityTypes?.includes(opportunity.type)) {
    score += 10;
    reasons.push("Type d'opportunité recherché");
  }

  // 6. Match par secteur (10%)
  maxScore += 10;
  if (userProfile.preferredIndustries && opportunity.category) {
    if (userProfile.preferredIndustries.includes(opportunity.category)) {
      score += 10;
      reasons.push("Secteur correspondant à vos intérêts");
    }
  }

  // Normaliser le score
  const normalizedScore =
    maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return {
    score: normalizedScore,
    reasons: reasons.slice(0, 3), // Limiter à 3 raisons
  };
};

// Filtrer et trier les opportunités
export const filterAndSortOpportunities = (opportunities, userProfile) => {
  return opportunities
    .map((opportunity) => {
      const match = calculateOpportunityMatch(userProfile, opportunity);
      return {
        ...opportunity,
        matchScore: match.score,
        matchReasons: match.reasons,
      };
    })
    .filter((opportunity) => opportunity.matchScore >= 50) // Seulement si > 50% match
    .sort((a, b) => b.matchScore - a.matchScore); // Tri décroissant par score
};

// Recommandations de cours
export const getCourseRecommendations = (userProfile, courses) => {
  return courses
    .map((course) => {
      let matchScore = 0;

      // Match par domaine d'études
      if (userProfile.fieldOfStudy === course.category) {
        matchScore += 40;
      }

      // Match par compétences
      if (userProfile.skills && course.relatedSkills) {
        const matchingSkills = userProfile.skills.filter((skill) =>
          course.relatedSkills.includes(skill)
        );
        matchScore += (matchingSkills.length / userProfile.skills.length) * 30;
      }

      // Match par objectif
      if (
        userProfile.primaryGoal === "study_abroad" &&
        course.category === "langues"
      ) {
        matchScore += 30;
      }

      return {
        ...course,
        matchScore: Math.min(matchScore, 100),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};
