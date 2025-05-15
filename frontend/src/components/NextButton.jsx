import React, { forwardRef } from "react";
import "../styles/nextButton.css";

//forwardRef : ref kan skickas vidare
const NextButton = forwardRef(({ onClick, disabled, label = "Fortsätt" }, ref) => {  // { //tar emot 3 props: onClick (vad som händer när man klickar), disabled (om knappen är avstängd), label (texten på knappen)
  return (
    <div className="next-button-container" ref={ref}>
      <button
        type="button"
        onClick={onClick} // När användaren klickar på knappen,kör funktionen som skickats in via onClick-propen
        disabled={disabled} // Om prop disabled är true ,knappen blir grå och kan inte klickas
        className="next-button"
      >
        {label} {/* Här visas texten på knappen — "Fortsätt" om ingen annan text skickas in */}
      </button>
    </div>
  );
});

export default NextButton;


