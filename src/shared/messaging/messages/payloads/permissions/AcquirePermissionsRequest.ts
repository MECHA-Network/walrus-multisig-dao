

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

import type { PermissionType } from './PermissionType';

export interface AcquirePermissionsRequest extends BasePayload {
	type: 'acquire-permissions-request';
	permissions: readonly PermissionType[];
}

export function isAcquirePermissionsRequest(
	payload: Payload,
): payload is AcquirePermissionsRequest {
	return isBasePayload(payload) && payload.type === 'acquire-permissions-request';
}
