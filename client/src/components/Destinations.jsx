function Destinations() {
  const countries = [
    {
      id: 1,
      name: "France",
      flag: "🇫🇷",
      capital: "Paris",
      language: "Français",
      visa: "Schengen",
      cost: "Moyen",
      universities: ["Sorbonne", "Polytechnique"],
      opportunities: ["Stages tech", "PFE ingénierie"]
    },
    {
      id: 2,
      name: "Allemagne",
      flag: "🇩🇪",
      capital: "Berlin",
      language: "Allemand",
      visa: "Schengen",
      cost: "Élevé",
      universities: ["TU Berlin", "LMU Munich"],
      opportunities: ["Industrie 4.0", "Recherche"]
    },
    // Ajoutez plus de pays...
  ];

  return (
    <div className="destinations-page">
      <h1>🌍 Destinations Internationales</h1>
      
      <div className="destinations-grid">
        {countries.map(country => (
          <div key={country.id} className="country-card">
            <div className="country-header">
              <h2>{country.flag} {country.name}</h2>
              <span className="capital">🏛️ {country.capital}</span>
            </div>
            
            <div className="country-info">
              <p><strong>Langue:</strong> {country.language}</p>
              <p><strong>Visa:</strong> {country.visa}</p>
              <p><strong>Coût de vie:</strong> {country.cost}</p>
            </div>
            
            <div className="universities">
              <h4>🎓 Universités réputées:</h4>
              <ul>
                {country.universities.map((uni, index) => (
                  <li key={index}>{uni}</li>
                ))}
              </ul>
            </div>
            
            <div className="opportunities">
              <h4>💼 Opportunités:</h4>
              <ul>
                {country.opportunities.map((opp, index) => (
                  <li key={index}>{opp}</li>
                ))}
              </ul>
            </div>
            
            <button className="view-guide">Voir le guide complet</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Destinations;