import React, { useState, useEffect } from "react";
import PodsjetnikCard from "../Utils/PodsjetnikCard/PodsjetnikCard";

const PodsjetnikList = () => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`
      );
      if (!response.ok) throw new Error("Failed to fetch reminders");
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error.message);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []); // Dependency array is empty to ensure this runs only on mount

  const handleDeleteSuccess = (id) => {
    setReminders((currentReminders) =>
      currentReminders.filter((reminder) => reminder.id !== id)
    );
  };

  const handleEditSuccess = (id, tekstPodsjetnika, datumPodsjetnika) => {
    fetchReminders(); // This function needs to be adjusted to be callable here
  };

  useEffect(() => {
    console.log("Reminders updated:", reminders);
  }, [reminders]);

  return (
    <div>
      {reminders.map((reminder) => (
        <PodsjetnikCard
          key={reminder.id}
          id={reminder.id}
          datumPodsjetnika={reminder.datumpodsjetnika}
          tekstPodsjetnika={reminder.tekst_podsjetnika}
          rasaSvinje={reminder.rasa_svinje}
          serijskiBrojSvinje={reminder.serijski_broj_svinje}
          onDeleteSuccess={handleDeleteSuccess}
          onEditSuccess={(updatedData) =>
            handleEditSuccess(reminder.id, updatedData)
          }
        />
      ))}
    </div>
  );
};

export default PodsjetnikList;
