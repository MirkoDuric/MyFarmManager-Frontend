import React, { useState, useEffect } from "react";
import PodsjetnikCard from "../Utils/PodsjetnikCard/PodsjetnikCard";

const PodsjetnikList = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error("Error fetching reminders:", error.message);
      }
    };

    fetchReminders();
  }, []);

  const handleDeleteSuccess = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const handleEditSuccess = (id, updatedData) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updatedData } : reminder
      )
    );
  };

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
