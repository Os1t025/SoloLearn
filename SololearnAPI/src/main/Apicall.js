const API_BASE_URL = "http://localhost:8080/api"; // Adjust based on your backend URL

export const fetchLessons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lessons`);
    if (!response.ok) throw new Error("Failed to fetch lessons");
    return await response.json();
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};

export const fetchUserProgress = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-progress/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user progress");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {};
  }
};
