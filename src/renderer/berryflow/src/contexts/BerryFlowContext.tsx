import React, { createContext } from "react";
import type {
  BerryFlowTemplate,
  BerryFlowWorkflow,
  WorkflowExecution,
} from "../types/workflow";

interface BerryFlowContextType {
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

const BerryFlowContext = createContext<BerryFlowContextType | null>(null);
