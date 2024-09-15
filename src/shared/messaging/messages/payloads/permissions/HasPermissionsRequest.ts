

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

import type { PermissionType } from './PermissionType';

export interface HasPermissionsRequest extends BasePayload {
	type: 'has-permissions-request';
	permissions: readonly PermissionType[];
}

export function isHasPermissionRequest(payload: Payload): payload is HasPermissionsRequest {
	return isBasePayload(payload) && payload.type === 'has-permissions-request';
}
