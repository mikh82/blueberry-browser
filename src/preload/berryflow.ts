import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

const berryFlowAPI = {
  getTemplates: () => electronAPI.ipcRenderer.invoke("berryflow-get-templates"),
  saveWorkflow: (workflow: any) =>
    electronAPI.ipcRenderer.invoke("berryflow-save-workflow", workflow),
  loadWorkflow: (id: string) =>
    electronAPI.ipcRenderer.invoke("berryflow-load-workflow", id),

  executeWorkflow: (workflow: any) =>
    electronAPI.ipcRenderer.invoke("berryflow-execute-workflow", workflow),
  stopExecution: (executionId: string) =>
    electronAPI.ipcRenderer.invoke("berryflow-stop-execution", executionId),

  mcpCall: (functionName: string, params: any) =>
    electronAPI.ipcRenderer.invoke("berryflow-mcp-call", functionName, params),

  onExecutionUpdate: (callback: (data: any) => void) => {
    electronAPI.ipcRenderer.on("berryflow-execution-update", (_, data) =>
      callback(data)
    );
  },

  onTemplateUpdate: (callback: (templates: any[]) => void) => {
    electronAPI.ipcRenderer.on("berryflow-templates-updated", (_, templates) =>
      callback(templates)
    );
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("berryFlowAPI", berryFlowAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.berryFlowAPI = berryFlowAPI;
}
