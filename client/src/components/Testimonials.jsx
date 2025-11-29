import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed M. – Stage à Berlin",
      text: "Grâce à Global Path, j'ai décroché mon stage à Berlin en seulement 2 mois !"
    },
    {
      name: "Sarah L. – Master à Paris",
      text: "Le simulateur de visa m'a évité bien des erreurs !"
    },
    {
      name: "Youssef K. – Emploi à Montréal",
      text: "La communauté m'a soutenu à chaque étape."
    }
  ];

  return (
    <section>
      <h2>🌟 ILS ONT RÉUSSI AVEC GLOBAL PATH</h2>

      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <strong> {testimonial.name}</strong><br />
            <em>"{testimonial.text}"</em>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;