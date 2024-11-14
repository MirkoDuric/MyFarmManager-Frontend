import React, { useEffect, useState } from "react";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8001/podsjetnici_za_svinje`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setReminders(data.rows);
    } catch (error) {
      console.error("Error fetching reminders:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading reminders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {reminders.length > 0 ? (
        reminders.map((reminder, index) => (
          <div key={index} className="reminder-post">
            <h3>{reminder.serijski_broj_svinje}</h3>
            <p>{reminder.rasa_svinje}</p>
            <p>
              <b>Datum podsjetnika:</b>{" "}
              {new Date(reminder.datumpodsjetnika).toLocaleDateString()}
            </p>
            <p>Tekst podsjetnika: {reminder.tekst_podsjetnika}</p>
          </div>
        ))
      ) : (
        <div>No reminders found.</div>
      )}
    </div>
  );
};

export default Reminders;
