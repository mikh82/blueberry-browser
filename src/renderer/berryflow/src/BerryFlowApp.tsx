import React, { useEffect } from "react";
import { BerryFlowProvider } from "./contexts/BerryFlowContext";
import { BerryFlowBuilder } from "./components/BerryFlowBuilder";
import { useDarkMode } from "../../common/hooks/useDarkMode";

const BerryFlowContent: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <BerryFlowBuilder />;
};

export const BerryFlowApp: React.FC = () => {
  return (
    <BerryFlowProvider>
      <BerryFlowContent />
    </BerryFlowProvider>
  );
};
