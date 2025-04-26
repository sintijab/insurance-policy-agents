import {step } from "@restackio/ai/agent";
import * as functions from "../functions";

export type policyVerificationInput = {
  eventData: {
    context: string;
  },
  flow: {
    prompt?: string;
    outputConditions: string[];
  }
};


export type policyVerificationOutput = {
  response: string[];
  rawResponse: any;
}

export async function policyVerification(input: policyVerificationInput): Promise<policyVerificationOutput> {
    console.log("Policy Verification Workflow Executed");

    const verificationResult = await step<typeof functions>({taskQueue: "workflow"}).policyVerification({
      context: input.eventData.context,
    });

    const llmResponse = await step<typeof functions>({taskQueue: "workflow"}).llmResponse({
      messages: [
        {
          role: "user",
          content: `${input.flow.prompt} : ${JSON.stringify(verificationResult)}`,
        },
      ],
      workflowName: "policyVerification",
      outputConditions: input.flow.outputConditions,
    });

    return {
      response: llmResponse,
      rawResponse: verificationResult,
    };

}