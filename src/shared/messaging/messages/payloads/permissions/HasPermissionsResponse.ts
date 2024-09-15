

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

export interface HasPermissionsResponse extends BasePayload {
	type: 'has-permissions-response';
	result: boolean;
}

export function isHasPermissionResponse(payload: Payload): payload is HasPermissionsResponse {
	return isBasePayload(payload) && payload.type === 'has-permissions-response';
}
