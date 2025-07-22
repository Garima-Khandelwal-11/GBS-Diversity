import React, { useState } from 'react'
import '../Styles/About.css'

const About = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);

  const profiles = {
    
    sarah: {
      name: "Sarah Chen",
      role: "UX Designer at Adobe",
      quote: "This platform helped me transition from marketing to UX design. My mentor's guidance was invaluable.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      details: {
        journey: "Former Marketing Manager turned UX Designer",
        mentorship: "6 months intensive UX/UI mentorship",
        achievement: "Successfully transitioned to Adobe in 2023",
        skills: ["User Research", "Figma", "Design Systems", "Prototyping"]
      }
    },
    maria: {
      name: "Maria Rodriguez",
      role: "Engineering Manager at Microsoft",
      quote: "The structured mentorship program gave me the confidence to pursue a leadership role in tech.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      details: {
        journey: "Software Engineer to Engineering Manager",
        mentorship: "Leadership and management mentorship program",
        achievement: "Leading a team of 12 engineers at Microsoft",
        skills: ["Team Leadership", "Project Management", "Technical Architecture", "Agile"]
      }
    }
  };

  const statsDetails = {
    payGap: {
      title: "Gender Pay Gap in Tech",
      percentage: "47%",
      description: "Women in tech earn significantly less than their male counterparts. This gap represents lost earning potential and systemic inequity in the industry.",
      details: [
        "Salary difference most pronounced in senior positions",
        "Gap widens with career progression",
        "Varies by specific tech sectors",
        "Impact on long-term career earnings"
      ]
    },
    representation: {
      title: "Women in Tech Roles",
      percentage: "26%",
      description: "Despite making up half the workforce, women are significantly underrepresented in technology positions.",
      details: [
        "Lower representation in leadership roles",
        "Declining numbers in certain tech fields",
        "Higher turnover rates than male colleagues",
        "Challenges in retention and advancement"
      ]
    },
    success: {
      title: "Success with Mentorship",
      percentage: "82%",
      description: "Mentorship programs have shown remarkable success in supporting women's career advancement in technology.",
      details: [
        "Higher job satisfaction rates",
        "Increased promotion rates",
        "Better salary negotiations",
        "Stronger professional networks"
      ]
    }
  };

  return (
    <div className="about-container">
      <div className="hero-section">
        <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095" alt="Women Tech Conference" className="hero-image" />
      </div>
      <h1>About Our Women in Tech Mentorship Platform</h1>
      
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>We are committed to breaking barriers and creating opportunities for women in technology. Our platform connects aspiring tech professionals with experienced mentors, fostering an inclusive community where knowledge sharing and growth thrive.</p>
        <div className="mission-points">
          <div className="point">
            <h4>Empowerment</h4>
            <p>Supporting women to reach their full potential in tech careers</p>
          </div>
          <div className="point">
            <h4>Inclusivity</h4>
            <p>Creating a diverse and welcoming tech community</p>
          </div>
          <div className="point">
            <h4>Growth</h4>
            <p>Facilitating continuous learning and development</p>
          </div>
        </div>
      </section>

      <section className="company-overview">
        <h2>Company Overview</h2>
        <div className="two-column">
          <div className="column">
            <p className="overview-headline">Breaking Barriers in Tech Since 2023</p>
            <p>As a pioneering platform in the tech mentorship space, we've identified and addressed the critical challenges women face in the technology sector. With only 26% representation in computing jobs and even fewer in leadership roles, our mission became clear: to create pathways for women to thrive in tech.</p>
            <p>Through our innovative approach to mentorship and community building, we're working to bridge the gender gap in technology and create more opportunities for women to succeed in their tech careers.</p>
            <div className="company-stats">
              <div className="stat">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Expert Mentors</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partner Companies</span>
              </div>
            </div>
          </div>
          <div className="column">
            <img src="https://images.unsplash.com/photo-1522071901873-411886a10004" alt="Team collaboration" className="section-image" />
            <div className="image-caption">Our diverse community of tech professionals</div>
          </div>
        </div>
      </section>

      <section className="why-platform">
        <h2>Why This Platform?</h2>
        <div className="stats-container">
          <div 
            className="stat-item" 
            onClick={() => setSelectedStat(statsDetails.payGap)}
          >
            <h3>{statsDetails.payGap.percentage}</h3>
            <p>{statsDetails.payGap.title}</p>
          </div>
          <div 
            className="stat-item"
            onClick={() => setSelectedStat(statsDetails.representation)}
          >
            <h3>{statsDetails.representation.percentage}</h3>
            <p>{statsDetails.representation.title}</p>
          </div>
          <div 
            className="stat-item"
            onClick={() => setSelectedStat(statsDetails.success)}
          >
            <h3>{statsDetails.success.percentage}</h3>
            <p>{statsDetails.success.title}</p>
          </div>
        </div>

        {selectedStat && (
          <div className="stat-modal" onClick={() => setSelectedStat(null)}>
            <div className="stat-modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedStat(null)}>&times;</button>
              <h3>{selectedStat.title}</h3>
              <div className="stat-percentage">{selectedStat.percentage}</div>
              <p className="stat-description">{selectedStat.description}</p>
              <div className="stat-details">
                <h4>Key Insights:</h4>
                <ul>
                  {selectedStat.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <p className="platform-description">Our platform bridges the gender gap in technology by providing structured mentorship programs, networking opportunities, and resources specifically designed for women in tech.</p>
        <div className="impact-grid">
          <div className="impact-item">
            <h4>Proven Success</h4>
            <p>Over 1,000+ successful mentor-mentee matches with 90% satisfaction rate</p>
          </div>
          <div className="impact-item">
            <h4>Expert Network</h4>
            <p>Access to mentors from leading tech companies like Google, Microsoft, and Amazon</p>
          </div>
          <div className="impact-item">
            <h4>Structured Growth</h4>
            <p>Personalized development plans and milestone tracking</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Mentorship" className="feature-icon" />
            <h3>1:1 Mentorship</h3>
            <p>Connect with experienced professionals in your desired tech field.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1560264280-88b68371db39" alt="Career" className="feature-icon" />
            <h3>Career Guidance</h3>
            <p>Get personalized advice on career paths and skill development.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0" alt="Network" className="feature-icon" />
            <h3>Network Building</h3>
            <p>Join a community of like-minded women in technology.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial" onClick={() => setSelectedProfile(profiles.sarah)}>
            <p>{profiles.sarah.quote}</p>
            <h4>{profiles.sarah.name}</h4>
            <p className="role">{profiles.sarah.role}</p>
          </div>
          <div className="testimonial" onClick={() => setSelectedProfile(profiles.maria)}>
            <p>{profiles.maria.quote}</p>
            <h4>{profiles.maria.name}</h4>
            <p className="role">{profiles.maria.role}</p>
          </div>
        </div>

        {selectedProfile && (
          <div className="profile-modal" onClick={() => setSelectedProfile(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedProfile(null)}>&times;</button>
              <div className="profile-header">
                <img src={selectedProfile.image} alt={selectedProfile.name} className="profile-image" />
                <div>
                  <h3>{selectedProfile.name}</h3>
                  <p className="role">{selectedProfile.role}</p>
                </div>
              </div>
              <blockquote>{selectedProfile.quote}</blockquote>
              <div className="profile-details">
                <h4>Career Journey</h4>
                <p>{selectedProfile.details.journey}</p>
                <h4>Mentorship Experience</h4>
                <p>{selectedProfile.details.mentorship}</p>
                <h4>Key Achievement</h4>
                <p>{selectedProfile.details.achievement}</p>
                <h4>Skills Developed</h4>
                <div className="skills-list">
                  {selectedProfile.details.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: support@platform.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: Tech Hub, Innovation Street</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
            <textarea placeholder="Your Message" className="form-input"></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default About