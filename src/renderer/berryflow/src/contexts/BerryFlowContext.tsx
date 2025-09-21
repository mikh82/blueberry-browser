import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  BerryFlowTemplate,
  BerryFlowWorkflow,
  WorkflowExecution,
} from "../types/workflow";
import { mockTemplates } from "../mocks/templates";

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

export const useBerryFLow = (): BerryFlowContextType => {
  const context = useContext(BerryFlowContext);

  if (!context) {
    throw new Error("useBerryFlow must be used within a BerryFlowProvidewr");
  }

  return context;
};

export const BerryFlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [templates] = useState<BerryFlowTemplate[]>(mockTemplates);
  const [customWorkflows, setCustomWorkflows] = useState<BerryFlowWorkflow[]>(
    []
  );
  const [currentWorkflow, setCurrentWorkflow] =
    useState<BerryFlowWorkflow | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<BerryFlowTemplate | null>(null);
  const [currentExecution, setCurrentExecution] =
    useState<WorkflowExecution | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("berryflow-workflows");
      if (saved) {
        setCustomWorkflows(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load saved workflows:", error);
    }
  }, []);

  const openBuilder = useCallback((template?: BerryFlowTemplate) => {
    setIsBuilderOpen(true);
    if (template) {
      setSelectedTemplate(template);
    }
  }, []);

  const closeBuilder = useCallback(() => {
    setIsBuilderOpen(false);
    setSelectedTemplate(null);
    setCurrentWorkflow(null);
  }, []);

  return <BerryFlowContext.Provider>{children}</BerryFlowContext.Provider>;
};
