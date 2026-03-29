import React, { useState, useEffect } from 'react';
import flavors from '../data/flavors';
import reviews from '../data/reviews';

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    const shuffledFlavors = [...flavors].sort(() => Math.random() - 0.5);
    setFeaturedFlavors(shuffledFlavors.slice(0, 3));

    const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5);
    setFeaturedReviews(shuffledReviews.slice(0, 2));
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="mainsection">
      <div>
        <h3>About Sweet Scoop Ice Cream</h3>
        <p>
          Sweet Scoop Ice Cream is a family-owned business that has been serving delicious ice cream
          since 1990. We pride ourselves on using only the freshest ingredients to create our unique
          flavors. Come visit us and treat yourself to a sweet scoop today!
        </p>
      </div>

      <div>
        <h3>Featured Flavors</h3>
        <div className="flavorgrid">
          {featuredFlavors.map((flavor) => (
            <div key={flavor.id} className="flavorcard">
              <h3><em>{flavor.name}</em></h3>
              <p><em>{flavor.description}</em></p>
              <p><em>Price: {flavor.price}</em></p>
              <img src={flavor.image} alt={flavor.name} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Customer Reviews</h3>
        {featuredReviews.map((review, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <h3><i>{review.customerName}</i></h3>
            <p><i>Rating: {renderStars(review.rating)}</i></p>
            <p><i>{review.review}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainSection;