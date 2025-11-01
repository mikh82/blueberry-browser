import React, { ReactNode, useCallback, useEffect, useState } from "react";
import type {
  BerryFlowTemplate,
  BerryFlowWorkflow,
  WorkflowExecution,
} from "../types/workflow";
import { mockTemplates } from "../mocks/templates";
import {
  BerryFlowContext,
  BerryFlowContextType,
} from "../hooks/useBerryFlow.ts";

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

  const loadWorkflow = useCallback(
    (workflowId: string) => {
      const template = templates.find((t) => t.id === workflowId);
      const custom = customWorkflows.find((w) => w.id === workflowId);

      if (template) {
        selectTemplate(template);
      } else if (custom) {
        setCurrentWorkflow(custom);
      }
    },
    [templates, customWorkflows, selectTemplate]
  );

  const executeWorkflow = useCallback(async (workflow: BerryFlowWorkflow) => {
    setIsLoading(true);

    // NOTE: Mock execution for now
    const execution: WorkflowExecution = {
      id: `exec-${Date.now()}`,
      workflowId: workflow.id,
      status: "running",
      progress: 0,
      results: {},
      errors: [],
      startTime: new Date().toISOString(),
    };

    setCurrentExecution(execution);

    // NOTE: Mock execution (change later)
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentExecution((prev) => (prev ? { ...prev, progress: i } : null));
    }

    setCurrentExecution((prev) =>
      prev
        ? {
            ...prev,
            status: "completed",
            progress: 100,
            endTime: new Date().toISOString(),
          }
        : null
    );

    setIsLoading(false);

    setTimeout(() => setCurrentExecution(null), 3000);
  }, []);

  const value: BerryFlowContextType = {
    templates,
    customWorkflows,
    currentWorkflow,
    isBuilderOpen,
    selectedTemplate,
    currentExecution,
    openBuilder,
    closeBuilder,
    selectTemplate,
    saveWorkflow,
    loadWorkflow,
    executeWorkflow,
    isLoading,
  };

  return (
    <BerryFlowContext.Provider value={value}>
      {children}
    </BerryFlowContext.Provider>
  );
};
