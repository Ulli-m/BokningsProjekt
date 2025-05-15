import React from "react"; //importerar React för att kunna använda JSX och skapa komponenter

const HairdresserSelector = ({ frisorer, selectedHairdresser, onChange }) => { //Tar emot 3 props
  return ( 
    //Skapar en dropdown (select) för att välja frisör
    <select
      className="hairdresser-dropdown"
      value={selectedHairdresser ? selectedHairdresser.id : ""} //value bestämmer vilken frisör som visas som vald i dropdownen, om ingen är vald blir värdet tomt.
      onChange={(e) => { //onChange körs när användaren väljer en annan frisör i listan
        const selectedId = e.target.value;//hämtar id:t (value) på den frisör som användaren valde
        const selected = frisorer.find(f => f.id === selectedId);//hittar den frisören i listan (frisorer)
        onChange(selected);//skickar tillbaka den valda frisören till föräldrakomponenten (så den kan uppdatera)
      }}
    >
      <option value="">Välj frisör</option>
      {frisorer.map((frisör) => (  //loopar igenom alla frisörer och skapar ett <option>-element för varje frisör
        <option key={frisör.id} value={frisör.id}>
          {frisör.namn} {/* Frisörens namn visas i dropdownen */}
        </option>
      ))}
    </select>
  );
};

export default HairdresserSelector; // Komponenten exporteras för att visas i andra filer






