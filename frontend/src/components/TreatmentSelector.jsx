import React from "react";

//Tar emot 3 props
// - behandlingar = en lista med alla behandlingar (t.ex. [{id:1, namn:"Klippning"}, ...])
// - selectedTreatment = den behandling som användaren valt just nu (eller null)
// - onChange = en funktion som körs när användaren väljer en annan behandling
const TreatmentSelector = ({ behandlingar, selectedTreatment, onChange }) => {
  return (
    //Skapar en <select>-meny (dropdown) där användaren kan välja behandling
    <select
      className="treatment-dropdown"
      //vilket alternativ som ska vara valt just nu ( valt treatment - visas dess id) (Om inget valt - visas "")
      value={selectedTreatment ? selectedTreatment.id : ""}
      // När användaren väljer något nytt körs den här funktionen
      onChange={(e) => {
        const selectedId = e.target.value; // Hämtar id:t på det användaren valt (OBS! Det är en sträng, så id:t (som du jämför med) blir också en sträng.)
        const selected = behandlingar.find(b => b.id === selectedId);  // Letar i listan efter behandling som har samma id som det användaren valde
        // Anropar onChange och skickar med den behandling användaren valde
        onChange(selected);
      }}
    >
      <option value="">Välj behandling</option>
       {/*Loopar igenom alla behandlingar och skapar ett <option> för varje */}
      {behandlingar.map((behandling) => (
        // Nyckel krävs när vi loopar, Värdet som skickas om man väljer den här behandlingen
        <option key={behandling.id} value={behandling.id}>
          {behandling.namn} {/* Texten som visas i dropdown-menyn */}
        </option>
      ))}
    </select>
  );
};

export default TreatmentSelector;










