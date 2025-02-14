import { createContext, useContext, useState } from "react";
import { steps } from "../pages/Admin/Register";


const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
  const [onboardData , setOnboardData] = useState(null);
  const [currenStage , setCurrentStage] = useState(steps[0]?.id);
  return (
    <OnboardingContext.Provider value={{ onboardData , currenStage , setOnboardData , setCurrentStage}}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => useContext(OnboardingContext);
