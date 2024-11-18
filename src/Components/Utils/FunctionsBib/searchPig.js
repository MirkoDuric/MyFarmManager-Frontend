export const searchPigs = async (apiUrl, query) => {
  if (!query.trim()) {
    throw new Error("Pretraga ne može biti prazna.");
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/pigs/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Greška prilikom pretrage svinja.");
    }

    const data = await response.json();
    console.log(data);
    return data; // Vraća niz svinja koje odgovaraju pretrazi
  } catch (err) {
    throw new Error(err.message || "Došlo je do greške prilikom pretrage.");
  }
};
