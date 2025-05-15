import React from "react";
import "../styles/bookingStep2.css";


// Tar emot 3 props
// - currentWeekStart = datum för måndagen den här veckan
// - onPrevious = funktion som körs när användaren klickar "Föregående vecka"
// - onNext = funktion som körs när användaren klickar "Nästa vecka"
const WeekNavigator = ({ currentWeekStart, onPrevious, onNext }) => {
  // Funktion som formaterar ett datum till svensk text, t.ex. "8 maj"
  const getFormattedDate = (date) =>
    date.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });

  // Skapar två datum: måndag och söndag
  // Börjar med måndagen (det datum vi fått in)
  const monday = new Date(currentWeekStart);
  // Skapar ett nytt datumobjekt för söndag
  const sunday = new Date(currentWeekStart);
  // Lägger till 6 dagar till måndag - så vi får söndag
  sunday.setDate(monday.getDate() + 6);

  return (
    <div className="week-navigator">
    {/* Knapp för att gå till föregående vecka - vi anropar onPrevious-funktionen */}
      <button onClick={onPrevious}>← Föregående vecka</button>
      {/* Visar texten "8 maj – 14 maj" (måndag till söndag) */}
      <span>
        {getFormattedDate(monday)} – {getFormattedDate(sunday)}
      </span>
      {/*  Knapp för att gå till nästa vecka - anropar onNext-funktionen */}
      <button onClick={onNext}>Nästa vecka →</button>
    </div>
  );
};

export default WeekNavigator;
