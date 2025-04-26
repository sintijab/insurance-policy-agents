import type { Node } from "@xyflow/react";
import { Position } from "@xyflow/react";

export const workflowDataMultiPolicies: Node[] = [
  {
    id: "start",
    type: "default",
    position: { x: 0, y: 0 },
    data: {
      label: "Start",
      description: "Start the agent",
      icon: 'PlayCircle',
      handles: [
        { id: 'next', type: 'source', position: Position.Bottom },
      ],
      status: 'initial',
    },
  },
  {
    id: "endFlow",
    type: "workflow",
    position: { x: 0, y: 0 },
    data: {
      label: "End",
      description: "End of the agent",
      icon: 'StopCircle',
      handles: [
        { id: 'input', type: 'target', position: Position.Top },
      ],
      status: 'initial',
    },
  },
  {
    id: "policyCount",
    type: "workflow",
    position: { x: 0, y: 0 },
    data: {
      label: "Policy count",
      description: "Automated search of multi-policy accounts",
      icon: 'Cpu',
      handles: [
        { id: 'input', type: 'target', position: Position.Top },
        { id: 'success', type: 'source', position: Position.Bottom },
        { id: 'activePolicies', type: 'source', position: Position.Bottom },
      ],
      status: 'initial',
    },
  },
  {
    id: "policyVerification",
    type: "workflow",
    position: { x: 0, y: 0 },
    data: {
      label: "Policy verification",
      description: "Filter active policies",
      icon: 'User',
      handles: [
        { id: 'input', type: 'target', position: Position.Top },
        { id: 'success', type: 'source', position: Position.Bottom },
        { id: 'failure', type: 'source', position: Position.Bottom },
        
      ],
      status: 'initial',
    },
  },
];