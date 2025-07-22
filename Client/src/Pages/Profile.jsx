import React, { useState, useRef } from 'react'
import '../Styles/Profile.css'
import { FaGithub, FaLinkedin, FaTwitter, FaEdit, FaCheck, FaTimes, FaBook, FaUserFriends, FaStar, FaSave, FaUpload } from 'react-icons/fa'

const Profile = () => {
  const defaultData = {
    name: 'Diva',
    email: 'diva.doe@example.com',
    location: 'New York, USA',
    education: {
      degree: 'Computer Science',
      school: 'University of Technology',
      years: '2018 - 2022'
    },
    gender: 'Female',
    interests: ['Technology', 'Leadership', 'Innovation'],
    learningPreferences: ['Visual Learning', 'Hands-on Practice'],
    careerGoals: 'Become a Senior Full Stack Developer in 2 years'
  };

  const [profileData, setProfileData] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const user= userData?.data ||null;
    return user
      ? {
          name: user.mentee_name || user.mentor_name || defaultData.name,
          email: user.email || defaultData.email,
          location: user.location || defaultData.location,
          education: {
            degree: user.education?.degree || defaultData.education.degree,
            school: user.education?.school || defaultData.education.school,
            years: user.education?.years || defaultData.education.years
          },
          gender: user.gender || defaultData.gender,
          interests: user.interests || defaultData.interests,
          learningPreferences: user.learningPreferences || defaultData.learningPreferences,
          careerGoals: user.career_goal || defaultData.careerGoals
        }
      : defaultData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(() => {
    return localStorage.getItem('uploadedImage') || null;
  });

  const [metrics] = useState({
    sessionsCompleted: 12,
    resourcesAccessed: 25,
    satisfactionRating: 4.8
  });

  const [editingSections, setEditingSections] = useState({
    personalInfo: false,
    education: false,
    experience: false,
    skills: false,
    careerGoals: false
  });

  const fileInputRef = useRef();
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    setIsEditing(false);
    setTempData(null);
  };

  const toggleSectionEdit = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSectionSave = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
    // Here you would typically make an API call to save the section data
  };

  const handleSectionCancel = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
    // Revert changes if needed
  };

  const renderEditActions = (section) => {
    if (!editingSections[section]) return null;
    return (
      <div className="section-actions">
        <button className="action-btn save" onClick={() => handleSectionSave(section)}>
          <FaSave /> Save
        </button>
        <button className="action-btn cancel" onClick={() => handleSectionCancel(section)}>
          <FaTimes /> Cancel
        </button>
      </div>
    );
  };

  const [editableEducation, setEditableEducation] = useState({ ...profileData.education });
  const [editableExperience, setEditableExperience] = useState({
    title: 'Software Developer',
    company: 'Tech Company Inc.',
    period: '2022 - Present'
  });
  const [editableSkills, setEditableSkills] = useState(['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'Git']);
  const [newSkill, setNewSkill] = useState('');

  return (
    <div className="profile-container">
      <div className="profile-cover"></div>
      
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={uploadedImage || "/user.png"} alt="Profile" />
          <label className="upload-trigger" htmlFor="file-upload">
            <FaUpload />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              hidden
            />
          </label>
        </div>
        <div className="header-content">
          <h1>{profileData.name}</h1>
          <p>{profileData.title}</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Personal Information</h2>
          {!editingSections.personalInfo && (
            <button 
              className="section-edit-btn"
              onClick={() => toggleSectionEdit('personalInfo')}
            >
              <FaEdit />
            </button>
          )}
        </div>
        {renderEditActions('personalInfo')}
        <div className="info-grid">
          {editingSections.personalInfo ? (
            <>
              <div className="info-item">
                <span>Email:</span>
                <input
                  type="email"
                  className="edit-input"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <div className="info-item">
                <span>Location:</span>
                <input
                  type="text"
                  className="edit-input"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                />
              </div>
            </>
          ) : (
            <>
              <div className="info-item">
                <span>Email:</span>
                <p>{profileData.email}</p>
              </div>
              <div className="info-item">
                <span>Location:</span>
                <p>{profileData.location}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Education</h2>
          {!editingSections.education && (
            <button 
              className="section-edit-btn"
              onClick={() => toggleSectionEdit('education')}
            >
              <FaEdit />
            </button>
          )}
        </div>
        {renderEditActions('education')}
        <div className="education-item">
          {editingSections.education ? (
            <>
              <input
                type="text"
                className="edit-input"
                value={editableEducation.degree}
                onChange={(e) => setEditableEducation({...editableEducation, degree: e.target.value})}
                placeholder="Degree"
              />
              <input
                type="text"
                className="edit-input"
                value={editableEducation.school}
                onChange={(e) => setEditableEducation({...editableEducation, school: e.target.value})}
                placeholder="School"
              />
              <input
                type="text"
                className="edit-input"
                value={editableEducation.years}
                onChange={(e) => setEditableEducation({...editableEducation, years: e.target.value})}
                placeholder="Years"
              />
            </>
          ) : (
            <>
              <h3>{profileData.education.degree}</h3>
              <p>{profileData.education.school}</p>
              <p>{profileData.education.years}</p>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Experience</h2>
          {!editingSections.experience && (
            <button 
              className="section-edit-btn"
              onClick={() => toggleSectionEdit('experience')}
            >
              <FaEdit />
            </button>
          )}
        </div>
        {renderEditActions('experience')}
        <div className="experience-item">
          {editingSections.experience ? (
            <>
              <input
                type="text"
                className="edit-input"
                value={editableExperience.title}
                onChange={(e) => setEditableExperience({...editableExperience, title: e.target.value})}
                placeholder="Job Title"
              />
              <input
                type="text"
                className="edit-input"
                value={editableExperience.company}
                onChange={(e) => setEditableExperience({...editableExperience, company: e.target.value})}
                placeholder="Company"
              />
              <input
                type="text"
                className="edit-input"
                value={editableExperience.period}
                onChange={(e) => setEditableExperience({...editableExperience, period: e.target.value})}
                placeholder="Period"
              />
            </>
          ) : (
            <>
              <h3>{editableExperience.title}</h3>
              <p>{editableExperience.company}</p>
              <p>{editableExperience.period}</p>
            </>
          )}
        </div>
      </div>

      <div className="profile-section skills-section">
        <div className="section-header">
          <h2>Skills</h2>
          {!editingSections.skills && (
            <button 
              className="section-edit-btn"
              onClick={() => toggleSectionEdit('skills')}
            >
              <FaEdit />
            </button>
          )}
        </div>
        {renderEditActions('skills')}
        <div className="skills-grid">
          {editingSections.skills ? (
            <>
              <div className="skills-edit">
                {editableSkills.map((skill, index) => (
                  <div key={index} className="skill-item editable">
                    {skill}
                    <button 
                      className="remove-skill"
                      onClick={() => setEditableSkills(skills => skills.filter((_, i) => i !== index))}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <div className="add-skill">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newSkill.trim()) {
                        setEditableSkills([...editableSkills, newSkill.trim()]);
                        setNewSkill('');
                      }
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            editableSkills.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))
          )}
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Career Goals & Interests</h2>
          {!editingSections.careerGoals && (
            <button 
              className="section-edit-btn"
              onClick={() => toggleSectionEdit('careerGoals')}
            >
              <FaEdit />
            </button>
          )}
        </div>
        {renderEditActions('careerGoals')}
        {editingSections.careerGoals ? (
          <div className="career-goals-edit">
            <textarea
              className="edit-input"
              value={profileData.careerGoals}
              onChange={(e) => setProfileData({...profileData, careerGoals: e.target.value})}
              placeholder="What are your career goals?"
            />
            <div className="tags-input">
              <input
                type="text"
                placeholder="Add interests..."
                className="edit-input"
              />
            </div>
          </div>
        ) : (
          <div className="career-goals-view">
            <p>{profileData.careerGoals}</p>
            <div className="tags-container">
              {profileData.interests.map((interest, index) => (
                <span key={index} className="tag">{interest}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="profile-section metrics-section">
        <h2>Your Progress</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <FaUserFriends className="metric-icon" />
            <h3>Sessions Completed</h3>
            <p className="metric-value">{metrics.sessionsCompleted}</p>
          </div>
          <div className="metric-card">
            <FaBook className="metric-icon" />
            <h3>Resources Accessed</h3>
            <p className="metric-value">{metrics.resourcesAccessed}</p>
          </div>
          <div className="metric-card">
            <FaStar className="metric-icon" />
            <h3>Satisfaction Rating</h3>
            <p className="metric-value">{metrics.satisfactionRating}/5.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile