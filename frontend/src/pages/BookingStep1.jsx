import React, { useState, useEffect } from "react";
import { fetchBehandlingar, fetchFrisorer } from "../utils/fetch";
import TreatmentSelector from "../components/TreatmentSelector";
import HairdresserSelector from "../components/HairdresserSelector";
import NextButton from "../components/NextButton";
import "../styles/bookingstep1.css";

const BookingStep1 = ({ treatment, hairdresser, onTreatmentChange, onHairdresserChange, onNext }) => {
  // useState skapar tre variabler som lagrar:
  // - Lista över behandlingar (från servern)
  // - Lista över frisörer (från servern)
  // - Om vi fortfarande laddar data (true = laddar)
  const [behandlingar, setBehandlingar] = useState([]);
  const [frisorer, setFrisorer] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect körs automatiskt första gången komponenten visas (renderas)
  // Här hämtar vi data från servern (behandlingar och frisörer)
  useEffect(() => {
    // Promise.all kör två API-anrop samtidigt
    Promise.all([fetchBehandlingar(), fetchFrisorer()])
      .then(([behandlingData, frisorData]) => {
        // Spara de hämtade behandlingarna och frisörerna i variablerna
        setBehandlingar(behandlingData || []); // Om datan är tom, använd tom array
        setFrisorer(frisorData || []);
        setLoading(false); // laddningen är nu klar
      })
      .catch((error) => {
        // Om något gick fel när vi hämtade data
        console.error("Fel vid hämtning av data:", error);
        setLoading(false);
      });
  }, []);

  // När användaren väljer en behandling kallas funktionen från föräldrakomponenten (App.jsx)
  const handleTreatmentChange = (selectedTreatment) => {
    onTreatmentChange(selectedTreatment); // Skicka valet till föräldern
  };

  const handleHairdresserChange = (selectedHairdresser) => {
    onHairdresserChange(selectedHairdresser); // Skicka objektet till parent
  };

  if (loading) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="booking-step-1">
      

      <h2>Välj behandling</h2>
      <div className="dropdown-wrapper">
      <TreatmentSelector
        behandlingar={behandlingar} // Skicka listan till komponenten
        selectedTreatment={treatment} // Skicka nuvarande val
        onChange={handleTreatmentChange} // Skicka funktion som ska köras vid val
      />
      </div>

      <h2>Välj frisör</h2>
      <div className="dropdown-wrapper">
      <HairdresserSelector
        frisorer={frisorer}
        selectedHairdresser={hairdresser}
        onChange={handleHairdresserChange}
      />
      </div>

      {/* Aktivera knappen när både behandling och frisör är valda */}
      {treatment && hairdresser && (
        <NextButton onClick={onNext} label="Fortsätt" />
      )}
    </div>
  );
};

export default BookingStep1;


