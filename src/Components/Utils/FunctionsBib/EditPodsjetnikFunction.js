const EditPodsjetnikFunction = async (id, reminderData, onSuccess) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/podsjetnici/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tekst_podsjetnika: reminderData.tekstPodsjetnika, // Ensure the field names match the backend expectation
          datumpodsjetnika: reminderData.datumPodsjetnika,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error occurred while updating the reminder."
      );
    }

    onSuccess();
    alert("Reminder updated successfully!");
  } catch (error) {
    console.error("Failed to update reminder:", error);
    alert("Failed to update reminder: " + error.message);
  }
};

export default EditPodsjetnikFunction;
