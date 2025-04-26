import {step } from "@restackio/ai/workflow";
import * as functions from "../functions";

export type DocCaptureWorkflowInput = {
  eventData: {
    type: "count";
    minPolicies: string;
  },
  flow: {
    prompt: string;
    outputConditions: string[];
  }
};

export type PolicyCountWorkflowOutput = {
  response: string[];
  rawResponse: any;
}

export async function policyCount(input: DocCaptureWorkflowInput): Promise<PolicyCountWorkflowOutput> {

    const verificationResult = await step<typeof functions>({taskQueue: "workflow",}).policyCount({
      type: input.eventData.type,
      minPolicies: input.eventData.minPolicies,
    });

    const llmResponse = await step<typeof functions>({taskQueue: "workflow",}).llmResponse({
      messages: [
        {
          role: "user",
          content: `${input.flow.prompt} : ${JSON.stringify(verificationResult)}`,
        },
      ],
      workflowName: "policyCount",
      outputConditions: input.flow.outputConditions,
    });

    return {
      response: llmResponse,
      rawResponse: verificationResult,
    }
}