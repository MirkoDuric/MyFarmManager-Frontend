import React, { useState, useEffect } from "react";
import PodsjetnikCard from "../Utils/PodsjetnikCard/PodsjetnikCard";

const PodsjetnikList = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetch reminders from the API when the component mounts
    const fetchReminders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }
        const data = await response.json();
        setReminders(data); // Set the fetched reminders into state
      } catch (error) {
        console.error("Error fetching reminders:", error.message);
      }
    };

    fetchReminders();
  }, []); // The empty array ensures this effect runs only once after the component mounts

  const handleDeleteSuccess = (id) => {
    setReminders((currentReminders) =>
      currentReminders.filter((reminder) => reminder.id !== id)
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
          onDeleteSuccess={() => handleDeleteSuccess(reminder.id)}
        />
      ))}
    </div>
  );
};

export default PodsjetnikList;
