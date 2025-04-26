import { FunctionFailure, log } from "@restackio/ai/function";

export type PolicyCountInput = {
  type: "count";
  minPolicies: string;
};

export type PolicyCountOutput = {
  status: "success" | "no results";
  data: any
};

export const policyCount = async ({
  type,
  minPolicies,
}: PolicyCountInput): Promise<PolicyCountOutput> => {
  try {
    log.info("PolicyCount input:", {input: {type, minPolicies}});

    // Simulate status response
    const statuses: PolicyCountOutput['status'][] = ['success', 'no results'];
    const status = statuses[0];

    const output: PolicyCountOutput = {
      status,
      data: {
        id: "3f5f9dc6-b608-4ae7-97e0-125099679031",
        firstName: "Brandy",
        lastName: "Harbour",
        email: null,
        dateOfBirth: "1985-02-28T12:51:27.000Z"
      }
    };

    log.info(`policyCount output: ${output}`);
    return output;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error policyCount chat: ${error}`);
  }
};
