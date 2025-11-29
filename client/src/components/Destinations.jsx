import React from 'react';

const Destinations = () => {
  const destinations = [
    { country: "France", flag: "🇫🇷", offers: "250+ offres" },
    { country: "Canada", flag: "🇨🇦", offers: "180+ offres" },
    { country: "Allemagne", flag: "🇩🇪", offers: "160+ offres" },
    { country: "USA", flag: "🇺🇸", offers: "120+ offres" }
  ];

  return (
    <section>
      <h2>📍 DESTINATIONS POPULAIRES</h2>

      <div className="destinations">
        {destinations.map((dest, index) => (
          <div key={index}>
            {dest.flag} <strong>{dest.country}</strong><br />
            {dest.offers}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;