import { isBasePayload } from '../../';
import type { BasePayload, Payload } from '../../';

export interface GetTransactionRequests extends BasePayload {
	type: 'get-transaction-requests';
}

export function isGetTransactionRequests(payload: Payload): payload is GetTransactionRequests {
	return isBasePayload(payload) && payload.type === 'get-transaction-requests';
}
