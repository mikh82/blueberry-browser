import { ElectronAPI } from "@electron-toolkit/preload";

interface BerryFlowAPI {
  getTemplates: () => Promise<any[]>;
  saveWorkflow: (workflow: any) => Promise<boolean>;
  loadWorkflow: (id: string) => Promise<any>;

  executeWorkflow: (workflow: any) => Promise<string>;
  stopExecution: (executionId: string) => Promise<boolean>;

  mcpCall: (functionName: string, params: any) => Promise<any>;
  onExecutionUpdate: (callback: (data: any) => void) => void;
  onTemplateUpdate: (callback: (templates: any[]) => void) => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    berryFlowAPI: BerryFlowAPI;
  }
}
