export interface BerryFlowNode {
  id: string;
  type: "trigger" | "action" | "ai-agent" | "mcp-call" | "output";
  label: string;
  description?: string;
  icon: string; // Lets use maybe emoji for now. Later can use Lucide or something similar
  position: { x: number; y: number };
  data: Record<string, any>;
  status: "idle" | "running" | "success" | "error";
  config?: NodeConfig;
}

export interface TextNodeConfig {
  type: "text";
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export interface SelectNodeConfig {
  type: "select";
  label: string;
  required?: boolean;
  options: string[];
  defaultValue?: string;
}

export interface NumberNodeConfig {
  type: "number";
  label: string;
  required?: boolean;
  defaultValue?: number;
}

export interface TextareaNodeConfig {
  type: "textarea";
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export type NodeConfigValue =
  | TextNodeConfig
  | SelectNodeConfig
  | NumberNodeConfig
  | TextareaNodeConfig;

export interface NodeConfig {
  [key: string]: NodeConfigValue;
}

export interface BerryFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface BerryFlowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "research" | "content" | "data" | "social" | "productivity";
  nodes: BerryFlowNode[];
  edges: BerryFlowEdge[];
  tags: string[];
  esitmatedTime: string;
}

export interface BerryFlowWorkflow extends BerryFlowTemplate {
  isCustom: boolean;
  createdAt: string;
  lastModified: string;
}

export interface WorkflowExecutionError {
  nodeId: string;
  message: string;
  timestamp: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "running" | "completed" | "failed" | "cancelled";
  progress: number;
  currentNodeId?: string;
  results: Record<string, any>; // TODO: CHANGE ANY TYPE
  errors: Array<WorkflowExecutionError>;
}
