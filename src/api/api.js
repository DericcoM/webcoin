import axios from 'axios';

const API_BASE_URL = 'https://ammolin.ru/api/'; // Ensure this is correct

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}get_user_data/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

export const fetchUserWorker = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}get_workers/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user worker:', error);
      throw error;
    }
  };

  export const fetchWorkerUp = async (userId, workerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}level_up/${userId}/${workerId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user worker:', error);
      throw error;
    }
  };

  export const fetchWorkerShield = async (userId, workerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}safe/${userId}/${workerId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user worker:', error);
      throw error;
    }
  };

  export const fetchWorkerBuy = async (userId, workerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}get_shop/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user worker:', error);
      throw error;
    }
  };

  export const buyWorker = async (userId, workerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}buy_worker/${userId}/${workerId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user worker:', error);
      throw error;
    }
  };