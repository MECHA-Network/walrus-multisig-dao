import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

export interface PermissionResponse extends BasePayload {
	type: 'permission-response';
	id: string;
	accounts: string[];
	allowed: boolean;
	responseDate: string;
}

export function isPermissionResponse(payload: Payload): payload is PermissionResponse {
	return isBasePayload(payload) && payload.type === 'permission-response';
}
