import React, { useState, useEffect, useRef } from "react";
import "../styles/bookingStep2.css";
import WeekNavigator from "../components/WeekNavigator";
import NextButton from "../components/NextButton";
import { fetchLedigaTider } from "../utils/fetch";

// Props (värden och funktioner från steg 1 och App.)
const BookingStep2 = ({ treatment, hairdresser, onPrevious, onNext, onDateChange, onTimeChange,  }) => {
  // useState = spara egna värden i komponenten (lokalt)
  const [weekOffset, setWeekOffset] = useState(0);
  // Hur många veckor framåt/bakåt vi tittar (0 = denna vecka)
  const [availableTimes, setAvailableTimes] = useState([]);
  // Lista med lediga tider vi hämtar från servern
  const [selectedSlot, setSelectedSlot] = useState(null);
  // Sparar vilken tid användaren har valt (ex: "2025-05-12T10:00")

  const nextButtonRef = useRef(null);


   // Beräkna start (måndag) och slut (söndag) för aktuell vecka
  const startDate = getStartOfWeek(new Date(), weekOffset);
  // Få måndag för rätt vecka

  const endDate = new Date(startDate);
  // Kopiera startdatum

  endDate.setDate(startDate.getDate() + 6);
  // Lägg till 6 dagar = söndag samma vecka



  // useEffect = kör automatiskt när något ändras
  // Här: när treatment, hairdresser eller weekOffset ändras
  useEffect(() => {
    if (treatment && hairdresser) {
      fetchAvailableTimes();
    }
  }, [treatment, hairdresser, weekOffset]);


  // Funktion som hämtar lediga tider från servern (API)
  const fetchAvailableTimes = async () => {
    try {
      const times = await fetchLedigaTider(
        hairdresser.id,
        treatment.id,
        startDate.toISOString().split("T")[0], // datum från (YYYY-MM-DD)
        endDate.toISOString().split("T")[0]  // datum till (YYYY-MM-DD)
      );
      setAvailableTimes(times); // Spara tider vi fått från API
    } catch (err) {
      console.error("Kunde inte hämta tider", err);
    }
  };


  // När användaren klickar på en ledig tid
  const handleSelectSlot = (slot) => {
    console.log("slotKey:", slot); // Ex: 2025-04-18T10:00
  
    setSelectedSlot(slot); // Spara vald tid
  
    const [datePart, timePart] = slot.split("T"); // Separera datum och tid
  
    const selectedDate = new Date(datePart); // Skapar ett Date-objekt från datumet
  
    if (isNaN(selectedDate.getTime())) {
      console.error("Ogiltigt datum:", selectedDate);
      return; // Stoppa om datumet är fel
    }
  
    if (onDateChange) onDateChange(selectedDate); // Skicka valt datum till parent/App
    if (onTimeChange) onTimeChange(timePart); // Skicka vidare tiden till parent/App

    if (nextButtonRef.current) { //SCROLLA till "Fortsätt"-knappen
    nextButtonRef.current.scrollIntoView({ behavior: "smooth" });
  }
  };
  
  
  
  
  
  



  return (
    <div className="booking-step-2">
      <h2>Välj tid</h2>

      <WeekNavigator
  currentWeekStart={startDate} // Måndag för aktuell vecka
  onPrevious={() => setWeekOffset(weekOffset - 1)} // Bläddra bakåt 1 vecka
  onNext={() => setWeekOffset(weekOffset + 1)}  // Bläddra framåt 1 vecka
/>

      <div className="calendar-grid">
        {/* Visa kalender med lediga tider */}
        {availableTimes.map((day) => (
          <div key={day.date} className="day-column">

            {/* Datum-rubrik (ex: mån 12/5) */}
            <div className="day-header">
              {new Date(day.date).toLocaleDateString("sv-SE", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
              })}
            </div>
            {/* Visa alla tider den dagen */}
            {day.times.map((time) => {
              const slotKey = `${day.date}T${time}`; // t.ex. 2025-04-18T10:00
              const slotDateTime = new Date(slotKey);
              const now = new Date();

              if (slotDateTime < now) return null; // Visa inte tider i det förflutna

              const isSelected = selectedSlot === slotKey; // Är detta tiden som användaren valt?
              return (
                <button
                  key={slotKey}
                  className={`time-slot ${isSelected ? "selected" : ""}`}
                  // Lägg till klass "selected" om vald
                  onClick={() => handleSelectSlot(slotKey)}
                  // När man klickar: välj tiden
                >
                  {time} {/* Visa bara tiden (ex: 10:00) */}
                </button>
              );
            })}
          </div>
        ))}
      </div>
        
      <div>
        <button onClick={onPrevious} className="step-button">Tillbaka</button>
        
        <NextButton
        ref={nextButtonRef}
  onClick={() => {
    if (selectedSlot) {
      onNext(); // Gå vidare till steg 3 (om tid är vald)
    }
  }}
  disabled={!selectedSlot}
  // Knappen är grå (disabled) om ingen tid är vald
/>

    </div> 
    </div>
  );
};

export default BookingStep2;

// Hjälpfunktion som beräknar måndagen för aktuell vecka
function getStartOfWeek(date, offset = 0) {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay(); // Söndag (0) räknas som dag 7
  d.setDate(d.getDate() - day + 1 + offset * 7); // Måndag = start (Flytta tillbaka till måndag och justera för vecka (offset))
  return d;
  // Returnera måndagens datum
}




