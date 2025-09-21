export interface BerryFlowNode {
  id: string;
  type: 'trigger' | 'action' | 'ai-agent' | 'mcp-call' | 'output';
  label: string
  description?: string
  icon: string // Lets use maybe emoji for now. Later can use Lucide or something similar
  position: {x: number; y: number}
  data: Record<string, string>
  status: 'idle' | 'running' | 'success' | 'error'
  config?: NodeConfig
}

export interface NodeConfig {
    [key: string]: {
        type: 'text' | 'select' | 'number' | 'textarea'
        label: string
        required?: boolean
        options?: string[]
        defaultValue?: any
    }
}

export interface BerryFlowEdge {
    id: string
    source: string
    target: string
    type?: string
}

export interface BerryFlowTemplate {
    id: string
    name: string
    description: string
    icon: string
    category: 'research' | 'content' | 'data' | 'social' | 'productivity'
    nodes: BerryFlowNode[]
    edges: BerryFlowEdge[]
    tags: string[]
    esitmatedTime: string
}

export interface BerryFlowWorkflow extends BerryFlowTemplate {
    isCustom: boolean
    createdAt: string
    lastModified: string
}