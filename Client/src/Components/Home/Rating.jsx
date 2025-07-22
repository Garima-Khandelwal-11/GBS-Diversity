import React from 'react'
import '../../Styles/Home/Rating.css'

const Rating = () => {
  const ratings = [
    { id: 1, session: 'React Course', rating: 4.5, description: 'Great course with hands-on examples and clear explanations.' },
    { id: 2, session: 'JavaScript Article', rating: 4.0, description: 'Informative article with useful tips and best practices.' },
    { id: 3, session: 'Web Development Webinar', rating: 4.8, description: 'Engaging webinar with expert insights and practical advice.' },
    { id: 4, session: 'CSS Tricks', rating: 4.2, description: 'Useful tricks for mastering CSS.' },
    { id: 5, session: 'Node.js Guide', rating: 4.7, description: 'Comprehensive guide to Node.js with practical examples.' },
    { id: 6, session: 'HTML5 Basics', rating: 4.3, description: 'Solid introduction to HTML5 with practical examples.' }
  ]

  return (
    <div className="rating-section">
      <h2>User Satisfaction Ratings</h2>
      <div className="ratings-container">
        {ratings.map(rating => (
          <div key={rating.id} className="rating-text">
            <h3>{rating.session}</h3>
            <p>Rating: {rating.rating} / 5</p>
            <p>{rating.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rating