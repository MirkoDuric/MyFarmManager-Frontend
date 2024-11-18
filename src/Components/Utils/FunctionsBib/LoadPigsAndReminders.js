export const LoadPigsAndReminders = async (apiUrl, page) => {
  try {
    const [pigsResponse, remindersResponse] = await Promise.all([
      fetch(`${apiUrl}/piginfo/piglist?page=${page}`),
      fetch(`${apiUrl}/podsjetnici_za_svinje`),
    ]);

    if (!pigsResponse.ok || !remindersResponse.ok) {
      throw new Error("Greška prilikom učitavanja podataka.");
    }

    const pigsData = await pigsResponse.json();
    const remindersData = await remindersResponse.json();

    // Logovi za potvrdu podataka
    console.log("Pigs Data:", pigsData);
    console.log("Reminders Data:", remindersData);

    // Ekstrakcija i prilagođavanje podataka
    const pigs = pigsData.pigs || [];
    const reminders = remindersData || []; // Reminders API vraća niz direktno

    // Mapiranje podsjetnika po svinji
    const remindersMap = reminders.reduce((map, reminder) => {
      if (!map[reminder.svinja_id]) map[reminder.svinja_id] = [];
      map[reminder.svinja_id].push(reminder);
      return map;
    }, {});

    return {
      pigs,
      reminders,
      remindersMap,
    };
  } catch (err) {
    throw new Error("Došlo je do greške prilikom učitavanja podataka.");
  }
};
