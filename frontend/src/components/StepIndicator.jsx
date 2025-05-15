import React from "react";
import "../styles/stepindicator.css";

//Tar emot 2 props
// - currentStep = vilket steg användaren är på just nu (1,2,3,4)
// - onStepClick = en funktion som körs om man klickar på ett steg
const StepIndicator = ({ currentStep, onStepClick }) => { 
  //en lista med alla steg 
  const steps = [1, 2, 3, 4];

  return (
    <div className="step-indicator">
    {/* Loopar igenom alla steg (steps) och skapar ett "steg" för varje */}
      {steps.map((step) => {
        // Avgör om detta är ett slutfört, aktivt eller kommande steg
        const isCompleted = step < currentStep; // Om steget är före det aktuella - det är klart
        const isActive = step === currentStep; // Om steget är samma som currentStep - det är aktivt
        const isInactive = step > currentStep; // Om steget är efter currentStep - det är kommande

         // Funktionen körs om man klickar på ett steg
        // Den låter oss klicka tillbaka till tidigare steg — men inte om vi är på steg 4 (bekräftat)
        const handleClick = () => {
          if (onStepClick && currentStep !== 4) {
            onStepClick(step);
          }
        };

        // Skapar steget i gränssnittet
        return (
          <div
            key={step} // Nyckel när man loopar i React
            className={`step-item ${  //Sätter klassen beroende på status (completed, active eller inactive)
              isCompleted ? "completed" : isActive ? "active" : "inactive"
            }`}
            onClick={handleClick}  // När man klickar på steget - kör handleClick
          >
            <div className="step-circle">{step}</div> {/* Visar stegnummret */}
            <div className="step-label">Steg {step}</div> {/* Texten under cirkeln, t.ex. "Steg 1" */}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;


