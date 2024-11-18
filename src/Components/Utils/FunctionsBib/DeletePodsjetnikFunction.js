// Function to delete a reminder by its ID
const DeletePodsjetnikFunktion = async (id, onSuccess) => {
  try {
    // Ask user to confirm deletion
    if (window.confirm("Are you sure you want to delete this reminder?")) {
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

      onSuccess(); // Trigger the callback on successful deletion
      alert("Reminder deleted successfully!");
    } else {
      alert("Deletion canceled."); // Inform the user that deletion has been canceled
    }
  } catch (error) {
    console.error("Failed to delete reminder:", error);
    alert("Failed to delete reminder: " + error.message);
  }
};
export default DeletePodsjetnikFunktion;
