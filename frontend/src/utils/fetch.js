const apiUrl = "http://localhost:8080/Databashantering";

// Hämta behandlingar
export const fetchBehandlingar = async () => {
  try {
    const res = await fetch(`${apiUrl}/getBehandlingar.php`);
    if (!res.ok) {
      throw new Error(`HTTP fel: ${res.status}`);
    }
    const data = await res.json();
    return data;  // Returnera hämtade behandlingarna
  } catch (error) {
    console.error("Fel vid hämtning av behandlingar:", error);
    return [];  // Returnera tom array vid fel
  }
};

// Hämta frisörer
export const fetchFrisorer = async () => {
  try {
    const res = await fetch(`${apiUrl}/getFrisorer.php`);
    if (!res.ok) {
      throw new Error(`HTTP fel: ${res.status}`);
    }
    const data = await res.json();
    return data;  // Returnera hämtade frisörerna
  } catch (error) {
    console.error("Fel vid hämtning av frisörer:", error);
    return [];  // Returnera tom array vid fel
  }
};

export const fetchLedigaTider = async (frisorId, behandlingId, startDatum, slutDatum) => {
  try {
    const res = await fetch(
      `${apiUrl}/getLedigaTider.php?frisor_id=${frisorId}&behandling_id=${behandlingId}&start=${startDatum}&slut=${slutDatum}`
    );
    if (!res.ok) {
      throw new Error("Något gick fel vid hämtning av tider");
    }
    const data = await res.json();
    return data; // [{ date: '2025-04-21', times: ['09:00', '11:30', ...] }, ...]
  } catch (error) {
    console.error("Fel vid hämtning av lediga tider:", error);
    return [];
  }
};


// Skicka bokning
export const submitBooking = async (bookingData) => {
  try {
    const res = await fetch(`${apiUrl}/book.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Något gick fel vid bokningen.");
    }
    return result;
  } catch (error) {
    console.error("Fel vid fetch:", error);
    throw new Error("Fel vid fetch: " + error.message);
  }
};




