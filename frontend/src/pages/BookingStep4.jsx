
import React, { useState } from "react";
import "../styles/bookingStep4.css"; 


// BookingStep4 komponenten - tar emot props (data) från föräldrakomponenten: treatment, hairdresser, selectedDate, selectedTime och resetBooking
const BookingStep4 = ({ treatment, hairdresser, selectedDate, selectedTime, resetBooking, }) => {  //resetBooking, funktion som kan nollställa bokningen och börja om
    return (
      <div className="booking-confirmation">
        <h2>Tack för din bokning!</h2>

        {/* En sammanfattning av bokningen: behandling, frisör, datum och tid */}
        <p><strong>Behandling:</strong> {treatment?.namn}</p>
        <p><strong>Frisör:</strong> {hairdresser?.namn}</p>
        <p><strong>Datum:</strong> {selectedDate?.toLocaleDateString("sv-SE")}</p>
        <p><strong>Tid:</strong> {selectedTime}</p>

        {/* En knapp som låter användaren börja om med en ny bokning */}
        {/* När man klickar på knappen körs resetBooking-funktionen */}
        <button onClick={resetBooking}>Boka en ny tid</button>
        
      </div>
    );
  };
  
  export default BookingStep4;
  