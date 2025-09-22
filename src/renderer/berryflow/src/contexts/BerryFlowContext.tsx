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

  const selectTemplate = useCallback((template: BerryFlowTemplate) => {
    setSelectedTemplate(template);
    const workflow: BerryFlowWorkflow = {
      ...template,
      isCustom: false,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setCurrentWorkflow(workflow);
  }, []);

  const saveWorkflow = useCallback(
    (workflow: BerryFlowWorkflow) => {
      const updated = [...customWorkflows];
      const existingIndex = updated.findIndex((w) => w.id === workflow.id);

      if (existingIndex >= 0) {
        updated[existingIndex] = {
          ...workflow,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };
      } else {
        updated.push({
          ...workflow,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        });
      }

      setCustomWorkflows(updated);

      try {
        localStorage.setItem("berryflow-workflows", JSON.stringify(updated));
      } catch (error) {
        console.error("failed to save workflows: ", error);
      }
    },
    [customWorkflows]
  );

  return <BerryFlowContext.Provider>{children}</BerryFlowContext.Provider>;
};
