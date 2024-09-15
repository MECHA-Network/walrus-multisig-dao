import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

import type { Permission } from './Permission';

export interface PermissionRequests extends BasePayload {
	type: 'permission-request';
	permissions: Permission[];
}

export function isPermissionRequests(payload: Payload): payload is PermissionRequests {
	return isBasePayload(payload) && payload.type === 'permission-request';
}
