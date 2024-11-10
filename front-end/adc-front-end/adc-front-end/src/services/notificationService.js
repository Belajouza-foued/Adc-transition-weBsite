import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications';

// Récupérer les notifications d'un utilisateur
export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Retourne la liste des notifications
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications', error);
    return [];
  }
};

// Créer une nouvelle notification
export const createNotification = async (userId, message) => {
  try {
    const response = await axios.post(API_URL, {
      userId,
      message
    });
    return response.data; // Retourne la notification créée
  } catch (error) {
    console.error('Erreur lors de la création de la notification', error);
    return null;
  }
};

// Marquer une notification comme lue
export const markAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${API_URL}/${notificationId}/mark-as-read`);
    return response.data; // Retourne la notification mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la notification', error);
    return null;
  }
};
