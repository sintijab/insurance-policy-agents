import { FunctionFailure } from "@restackio/ai/function";
import { ReactFlowJsonObject } from "reactflow";
import { endFlow, policyCount, policyVerification } from "../workflows";

export const mockFlow = async (): Promise<ReactFlowJsonObject> => {
  try {

    return {
      nodes: [
        {
          id: policyCount.name,
          type: "workflow",
          data: {
            eventType: policyCount.name,
            workflowType: policyCount.name,
            flowPrompt: 'Given the following input, determine if there are accounts holding multiple policies and the policy is active or not: ',
            flowOutputConditions: ["success", "activePolicies", 'no results'],
            status: "initial",
          },
         
          position: { x: 0, y: 0 } },
        {
          id: policyVerification.name,
          type: "workflow",
          data: {
            eventType: policyVerification.name,
            workflowType: policyVerification.name,
            flowPrompt: 'Given the following input, determine if verification is successful or not: ',
            flowOutputConditions: ["success", "no results"],
          },
          position: { x: 100, y: 100 } },
        {
          id: endFlow.name,
          type: "default",
          data: {
            eventType: endFlow.name,
            workflowType: endFlow.name,
          },
          position: { x: 200, y: 200 }
        }
      ],
      edges: [
        { id: `edge-${policyCount.name}-${policyVerification.name}-success`,
        source: policyCount.name,
        target: endFlow.name,
        sourceHandle: "success",
       },
       { id: `edge-${policyCount.name}-${policyVerification.name}-successAbove35`,
        source: policyCount.name,
        target: policyVerification.name,
        sourceHandle: "activePolicies",
       },
       {
        id: `edge-${policyCount.name}-${policyVerification.name}-failure`,
        source: policyCount.name,
        target: endFlow.name,
        sourceHandle: "failure",
       },
       { id: `edge-${policyVerification.name}-${endFlow.name}-success`,
        source: policyVerification.name,
        target: endFlow.name,
        sourceHandle: "success",
       },
       { id: `edge-${policyVerification.name}-${endFlow.name}-failure`,
        source: policyVerification.name,
        target: endFlow.name,
        sourceHandle: "failure",
       }
      ],
      viewport: { x: 0, y: 0, zoom: 1 }
    };;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error mockFlow: ${error}`);
  }
};
