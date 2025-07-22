import React, { useState } from 'react';
import { FaSearch, FaBookmark, FaFilter, FaBook, FaNewspaper, FaVideo, FaStar, FaTimes } from 'react-icons/fa';
import '../Styles/Resource.css';

const Resource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = [
    { id: 'courses', icon: <FaBook />, label: 'Courses' },
    { id: 'articles', icon: <FaNewspaper />, label: 'Articles' },
    { id: 'webinars', icon: <FaVideo />, label: 'Webinars' }
  ];

  const sampleResources = [
    {
      id: 1,
      title: 'Introduction to AI',
      type: 'courses',
      difficulty: 'Beginner',
      rating: 4.5,
      description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning.',
      content: {
        overview: 'This comprehensive course covers the basics of AI and ML, from theoretical foundations to practical applications.',
        topics: [
          'Understanding AI and its applications',
          'Machine Learning fundamentals',
          'Neural Networks basics',
          'Python for AI development',
          'Real-world AI implementation'
        ],
        duration: '8 weeks',
        instructor: 'Dr. Sarah Chen',
        prerequisites: 'Basic programming knowledge'
      },
      bookmarked: false
    },
    {
      id: 2,
      title: 'Leadership in Tech',
      type: 'webinars',
      difficulty: 'Intermediate',
      rating: 4.8,
      description: 'Develop essential leadership skills for technology roles.',
      content: {
        overview: 'Master the art of tech leadership with practical insights and strategies for managing teams, projects, and stakeholders in the technology sector.',
        topics: [
          'Building and leading high-performing tech teams',
          'Communication strategies for technical leaders',
          'Project management and decision making',
          'Conflict resolution in tech environments',
          'Fostering innovation and creativity'
        ],
        duration: '4 sessions (2 hours each)',
        instructor: 'Michael Roberts',
        prerequisites: '3+ years of tech industry experience'
      },
      bookmarked: true
    },
    {
      id: 3,
      title: 'Future of Work',
      type: 'articles',
      difficulty: 'Beginner',
      rating: 4.2,
      description: 'Insights into evolving workplace trends and adaptations.',
      content: {
        overview: 'Explore how technology, remote work, and digital transformation are reshaping the modern workplace and career development.',
        topics: [
          'Remote work best practices',
          'Digital transformation trends',
          'Emerging workplace technologies',
          'Work-life integration strategies',
          'Future skills and adaptability'
        ],
        duration: '25 minute read',
        instructor: 'Emma Thompson',
        prerequisites: 'None'
      },
      bookmarked: false
    },
    {
      id: 4,
      title: 'Advanced Cloud Architecture',
      type: 'courses',
      difficulty: 'Advanced',
      rating: 4.9,
      description: 'Master cloud infrastructure and distributed systems.',
      content: {
        overview: 'Deep dive into advanced cloud architecture patterns, scalability, and best practices for building robust cloud solutions.',
        topics: [
          'Microservices architecture patterns',
          'Serverless computing and FaaS',
          'Cloud security and compliance',
          'Performance optimization',
          'Multi-cloud strategies'
        ],
        duration: '12 weeks',
        instructor: 'Dr. James Cloud',
        prerequisites: 'Basic cloud computing knowledge, experience with AWS/Azure'
      },
      bookmarked: false
    },
    {
      id: 5,
      title: 'Diversity in Tech',
      type: 'webinars',
      difficulty: 'Intermediate',
      rating: 4.7,
      description: 'Building inclusive tech teams and fostering innovation.',
      content: {
        overview: 'Learn practical strategies for creating inclusive tech environments and leveraging diversity for enhanced innovation and team performance.',
        topics: [
          'Understanding unconscious bias in tech',
          'Inclusive hiring practices',
          'Creating psychological safety',
          'Mentorship and sponsorship programs',
          'Measuring diversity impact'
        ],
        duration: '6 sessions (90 minutes each)',
        instructor: 'Dr. Maya Patel',
        prerequisites: 'Basic understanding of tech industry dynamics'
      },
      bookmarked: false
    }
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = sampleResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  return (
    <div className="resource-container">
      <div className="resource-header">
        <h1>Career Development Resources</h1>
        <p>A collection of learning materials to help you grow.</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="filter-btn">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="difficulty-filters">
          <span className="filter-label">Difficulty:</span>
          <div className="filter-options">
            <button
              className={`filter-option ${selectedDifficulty === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              All
            </button>
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                className={`filter-option ${selectedDifficulty === difficulty ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h2>Browse Resources by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h2>Recommended for You</h2>
        <div className="resource-grid">
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className="resource-card"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="resource-card-header">
                <span className={`resource-type ${resource.type}`}>
                  {resource.type}
                </span>
                <button className={`bookmark-btn ${resource.bookmarked ? 'bookmarked' : ''}`}>
                  <FaBookmark />
                </button>
              </div>
              <h3>{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <div className="resource-card-footer">
                <span className="difficulty">{resource.difficulty}</span>
                <span className="rating">
                  <FaStar /> {resource.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedResource && (
        <div className="resource-detail-overlay">
          <div className="resource-detail-modal">
            <button className="close-modal" onClick={() => setSelectedResource(null)}>
              <FaTimes />
            </button>
            <div className="resource-detail-content">
              <h2>{selectedResource.title}</h2>
              <div className="resource-meta">
                <span className={`resource-type ${selectedResource.type}`}>
                  {selectedResource.type}
                </span>
                <span className="difficulty">{selectedResource.difficulty}</span>
                <span className="rating"><FaStar /> {selectedResource.rating}</span>
              </div>
              <p className="resource-overview">{selectedResource.content.overview}</p>
              
              <div className="resource-topics">
                <h3>What you'll learn</h3>
                <ul>
                  {selectedResource.content.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              
              <div className="resource-details-grid">
                <div className="detail-item">
                  <h4>Duration</h4>
                  <p>{selectedResource.content.duration}</p>
                </div>
                <div className="detail-item">
                  <h4>Instructor</h4>
                  <p>{selectedResource.content.instructor}</p>
                </div>
                <div className="detail-item">
                  <h4>Prerequisites</h4>
                  <p>{selectedResource.content.prerequisites}</p>
                </div>
              </div>
              
              <button className="start-resource">Start Learning</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resource;