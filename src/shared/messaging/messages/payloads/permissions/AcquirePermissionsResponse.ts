

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

export interface AcquirePermissionsResponse extends BasePayload {
	type: 'acquire-permissions-response';
	result: boolean;
}

export function isAcquirePermissionsResponse(
	payload: Payload,
): payload is AcquirePermissionsResponse {
	return isBasePayload(payload) && payload.type === 'acquire-permissions-response';
}
