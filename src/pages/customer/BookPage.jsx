import React, { useState } from "react";
import Stepper from "../../components/customer/Stepper.jsx";
import StylistStep from "../../components/customer/StylistStep.jsx";
import ServiceStep from "../../components/customer/ServiceStep.jsx";
import DateStep from "../../components/customer/DateStep.jsx";
import TimeStep from "../../components/customer/TimeStep.jsx";
import ConfirmStep from "../../components/customer/ConfirmStep.jsx";

export const BookPage = () => {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    service: null,
    stylist: null,
    date: null,
    time: null,
  });

  const updateData = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ServiceStep
            nextStep={nextStep}
            updateData={updateData}
            selected={bookingData.service}
          />
        );
      case 2:
        return (
          <StylistStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            selected={bookingData.stylist}
          />
        );
      case 3:
        return (
          <DateStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            selected={bookingData.date}
          />
        );
      case 4:
        return (
          <TimeStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            selected={bookingData.time}
          />
        );
      case 5:
        return (
          <ConfirmStep
            prevStep={prevStep}
            bookingData={bookingData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Stepper step={step} />
      {renderStep()}
    </div>
  );
};
