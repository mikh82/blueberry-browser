export interface BerryFlowNode {
  id: string;
  type: 'trigger' | 'action' | 'ai-agent' | 'mcp-call' | 'output';
  label: string
  description?: string
  icon: string // Lets use maybe emoji for now. Later can use Lucide or something similar
  position: {x: number; y: number}
  data: Record<string, string>
  status: 'idle' | 'running' | 'success' | 'error'
//   config?: NodeConfig
}
