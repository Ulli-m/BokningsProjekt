// App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroImage from "./components/HeroImage";
import StepIndicator from "./components/StepIndicator";
import BookingStep1 from "./pages/BookingStep1";
import BookingStep2 from "./pages/BookingStep2";
import BookingStep3 from "./pages/BookingStep3";
import BookingStep4 from "./pages/BookingStep4";
import "./styles/app.css";



function App() {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(null);
  const [hairdresser, setHairdresser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);


  const handleTreatmentChange = (selectedTreatment) => {
    setTreatment(selectedTreatment);
  };

  const handleHairdresserChange = (selectedHairdresser) => {
    setHairdresser(selectedHairdresser);
  };

  

const handleDateChange = (date) => {
  setSelectedDate(date);
  console.log("Valt datum i App.jsx:", date);
};

const handleTimeChange = (time) => {
  setSelectedTime(time);
  console.log("Vald tid i App.jsx:", time);
};


  

  const goToNextStep = () => {
    setStep((prev) => (prev < 5 ? prev + 1 : prev));
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetBooking = () => {
    setStep(1);
    setTreatment(null);
    setHairdresser(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  

  return (
    <>
    <div className="app">
      <Header />
      <main>
        <HeroImage />
        <StepIndicator currentStep={step} onStepClick={(val) => setStep(val)} />

        {step === 1 && (
          <BookingStep1
            treatment={treatment}
            hairdresser={hairdresser}
            onTreatmentChange={handleTreatmentChange}
            onHairdresserChange={handleHairdresserChange}
            onNext={goToNextStep}
          />
        )}

        {step === 2 && (
  <BookingStep2
    treatment={treatment}
    hairdresser={hairdresser}
    onPrevious={goToPreviousStep}
    onNext={goToNextStep}
    onDateChange={handleDateChange}
    onTimeChange={handleTimeChange}
    selectedDate={selectedDate}
    selectedTime={selectedTime}
  />
)}

{step === 3 && (
  <BookingStep3
    treatment={treatment}
    hairdresser={hairdresser}
    selectedDate={selectedDate}
    selectedTime={selectedTime}
    onBack={goToPreviousStep}
    onConfirm={goToNextStep}
  />
)}


{step === 4 && (
  <BookingStep4
    treatment={treatment}
    hairdresser={hairdresser}
    selectedDate={selectedDate}
    selectedTime={selectedTime}
    resetBooking={resetBooking}
  />
)}


      </main>
      <Footer />
      </div>
    </>
  );
}

export default App;

