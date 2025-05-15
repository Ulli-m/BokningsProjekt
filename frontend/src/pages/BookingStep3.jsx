import React, { useState } from "react";
import "../styles/bookingStep3.css";
// Importera funktion som skickar bokningen till backend (API-anrop)
import { submitBooking } from "../utils/fetch";


// Komponent BookingStep3 — vi tar emot dessa props från App.jsx
const BookingStep3 = ({
  treatment,
  hairdresser,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
}) => {
  // useState — spara kundens uppgifter i formuläret
  const [formData, setFormData] = useState({
    kund_fornamn: "",
    kund_efternamn: "",
    kund_email: "",
    kund_mobilnummer: "",
    kund_meddelande: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); //Denna variabel håller koll på om vi just nu skickar bokningen.

  // Uppdatera formData när användaren skriver i fält
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Säkerställ att tiden alltid är i format "HH:00"
  const formatTime = (time) => {
    if (typeof time === "string" && time.includes(":")) {
      return time;
    }
    const hour = String(time).padStart(2, "0");
    return `${hour}:00`;
  };

  // Hantera formulärskick (bekräfta bokning)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Starta laddning

    // Validera datum och tid
    const validDate = new Date(selectedDate);
    if (isNaN(validDate.getTime()) || !selectedDate || !selectedTime) {
      setIsSubmitting(false);
      return; // Avbryt tyst om datum/tid saknas
    }

    // Förbered bokningsdata som skickas till backend
    const bookingData = {
      frisor_id: hairdresser.id,
      behandling_id: treatment.id,
      datum: selectedDate.toISOString().split("T")[0],
      tid: formatTime(selectedTime),
      status: "bokad",
      ...formData,
    };

    try {
      await submitBooking(bookingData); // Skicka bokningen
      setIsSubmitting(false);
      onConfirm(); // Hoppa till bekräftelsesidan (BookingStep4)
    } catch (error) {
      setIsSubmitting(false);
      console.error("Fel vid bokning:", error);
    }
  };

  return (
    <div className="booking-step-3">
      <h2>Bekräfta bokning</h2>

      {/* Visa sammanfattning av bokningen */}
      <div className="booking-summary">
        <p><strong>Behandling:</strong> {treatment.namn}</p>
        <p><strong>Frisör:</strong> {hairdresser.namn}</p>
        <p><strong>Datum:</strong> {selectedDate ? selectedDate.toLocaleDateString("sv-SE") : "Inget datum valt"}</p>
        <p><strong>Tid:</strong> {selectedTime}</p>
      </div>

       {/* Formulär för kunduppgifter */}
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="kund_fornamn"
          placeholder="Förnamn"
          value={formData.kund_fornamn}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="kund_efternamn"
          placeholder="Efternamn"
          value={formData.kund_efternamn}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="kund_email"
          placeholder="E-post"
          value={formData.kund_email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="kund_mobilnummer"
          placeholder="Mobilnummer"
          value={formData.kund_mobilnummer}
          pattern="[0-9]{6,15}"
          title="Ange ett giltigt nummer utan mellanslag"
          onChange={handleChange}
          required
        />
        <textarea
          name="kund_meddelande"
          placeholder="Meddelande (valfritt)"
          value={formData.kund_meddelande}
          onChange={handleChange}
        />

         {/* Knappar för tillbaka och bekräfta */}
        <div className="buttons">
          <button type="button" onClick={onBack} disabled={isSubmitting}>Tillbaka</button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Skickar bokning..." : "Bekräfta bokning"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingStep3;
