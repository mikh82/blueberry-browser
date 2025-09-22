import type {
  BerryFlowTemplate,
  BerryFlowWorkflow,
  WorkflowExecution,
} from "../types/workflow";
import { createContext, useContext } from "react";

export interface BerryFlowContextType {
  templates: BerryFlowTemplate[];
  customWorkflows: BerryFlowWorkflow[];
  currentWorkflow: BerryFlowWorkflow | null;

  isBuilderOpen: boolean | null;
  selectedTemplate: BerryFlowTemplate | null;

  currentExecution: WorkflowExecution | null;

  openBuilder: (template?: BerryFlowTemplate) => void;
  closeBuilder: () => void;
  selectTemplate: (template: BerryFlowTemplate) => void;
  saveWorkflow: (workflow: BerryFlowWorkflow) => void;
  loadWorkflow: (workflowId: string) => void;
  executeWorkflow: (workflow: BerryFlowWorkflow) => Promise<void>;

  isLoading: boolean;
}

export const BerryFlowContext = createContext<BerryFlowContextType | null>(
  null
);

export const useBerryFLow = (): BerryFlowContextType => {
  const context = useContext(BerryFlowContext);

  if (!context) {
    throw new Error("useBerryFlow must be used within a BerryFlowProvidewr");
  }

  return context;
};
