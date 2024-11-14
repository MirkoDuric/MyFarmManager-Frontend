export const handleApiError = (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      return error.response.data.message || "An error occurred. Please try again.";
    }
    console.error("Network Error:", error.message);
    return "Network error. Please check your connection.";
  };
  