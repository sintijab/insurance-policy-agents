import type { Edge } from "@xyflow/react"
import { workflowDataMultiPolicies } from "./workflowData"

export const nodesMultiPolicies = workflowDataMultiPolicies

export const edgesMultiPolicies: Edge[] = [
  {
    id: `edge-start-idVerification`,
    source: "start",
    target: "policyCount",
  },
  {
    id: `edge-policyCount-policyVerification`,
    source: "policyCount",
    target: "policyVerification",
    sourceHandle: "activePolicies",
    type: "workflow",
  },
  {
    id: `edge-policyCount-endFlow`,
    source: "policyCount",
    target: "endFlow",
    sourceHandle: "success",
    type: "workflow",
  },
  {
    id: `edge-policyVerification-endFlow`,
    source: "policyVerification",
    target: "endFlow",
    type: "workflow",
  },
] 