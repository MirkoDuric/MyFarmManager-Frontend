// Function to delete a reminder by its ID
const DeletePodsjetnikFunktion = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/podsjetnici/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error occurred while deleting the reminder."
      );
    }

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error("Failed to delete reminder:", error);
    alert("Failed to delete reminder: " + error.message);
  }
};
export default DeletePodsjetnikFunktion;
