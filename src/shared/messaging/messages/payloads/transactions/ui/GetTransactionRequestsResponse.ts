

import { isBasePayload } from '../../';
import type { BasePayload, Payload } from '../../';
import type { ApprovalRequest } from '../../transactions/ApprovalRequest';

export interface GetTransactionRequestsResponse extends BasePayload {
	type: 'get-transaction-requests-response';
	txRequests: ApprovalRequest[];
}

export function isGetTransactionRequestsResponse(
	payload: Payload,
): payload is GetTransactionRequestsResponse {
	return isBasePayload(payload) && payload.type === 'get-transaction-requests-response';
}
