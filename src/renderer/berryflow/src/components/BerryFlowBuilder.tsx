import React from "react";
import { useBerryFlow } from "../hooks/useBerryFlow";
import { LoadingSpinner } from "./LoadingSpinner";

export const BerryFlowBuilder: React.FC = () => {
  const {
    // templates,
    isBuilderOpen,
    // selectedTemplate,
    // currentExecution,
    // selectTemplate,
    // closeBuilder,
    // executeWorkflow,
    isLoading,
  } = useBerryFlow();

  if (!isBuilderOpen) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <LoadingSpinner size="lg" message="Executing workflow..." />
      </>
    );
  }

  return <h1>Test test</h1>;
};
