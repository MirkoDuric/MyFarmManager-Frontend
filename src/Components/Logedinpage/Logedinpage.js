import React, { useEffect, useState } from "react";
import PodsjetnikCard from "../Utils/PodsjetnikCard";

function PodsjetnikList() {
  const [podsjetnici, setPodsjetnici] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`)
      .then((response) => response.json())
      .then((data) => setPodsjetnici(data))
      .catch((error) => console.error("Error fetching reminders:", error));
  }, []);

  return (
    <div>
      {podsjetnici.map((podsjetnik) => (
        <PodsjetnikCard
          key={podsjetnik.id}
          svinjaId={podsjetnik.svinja_id}
          serijskiBrojSvinje={podsjetnik.serijski_broj_svinje}
          rasaSvinje={podsjetnik.rasa_svinje}
          hasPodsjetnik={podsjetnik.has_podsjetnik}
          datumPodsjetnika={podsjetnik.datumpodsjetnika}
          tekstPodsjetnika={podsjetnik.tekst_podsjetnika}
          id={podsjetnik.id}
        />
      ))}
    </div>
  );
}

export default PodsjetnikList;
