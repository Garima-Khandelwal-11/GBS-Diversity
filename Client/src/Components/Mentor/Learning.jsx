import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Mentor.css';

const Learning = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      if (!user || !user.data?.user_id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/getCourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.data.user_id }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setCourses(data.data.matchingCourses); // Set the matching courses in state
        } else {
          setError(data.message || 'No recommended courses found');
        }
      } catch (error) {
        setError('Error fetching courses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedCourses();
  }, [user]);

  if (loading) {
    return <p>Loading recommended courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="learning-resources">
      <h2>Learning Resources</h2>
      <div className="resource-cards">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="resource-card">
              <h3>{course.name}</h3>
              <p>Organization: {course.organization}</p>
              <p>{course.career_goal}</p>
            </div>
          ))
        ) : (
          <p>No recommended courses available.</p>
        )}
      </div>
      <button className="more-btn" onClick={() => navigate('/resource')}>
        More
      </button>
    </div>
  );
};

export default Learning;
