import apiClient from './apiConfig';

export const mentorApi = {
  getAllMentors: async () => {
    try {
      const response = await apiClient.get('/mentors');
      return response.data;
    } catch (error) {
      console.error('Get mentors error:', error);
      throw error.response?.data || { message: 'Failed to fetch mentors' };
    }
  }
};
