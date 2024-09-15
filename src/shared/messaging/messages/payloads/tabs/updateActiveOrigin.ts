import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

export interface UpdateActiveOrigin extends BasePayload {
	type: 'update-active-origin';
	origin: string | null;
	favIcon: string | null;
}

export function isUpdateActiveOrigin(payload: Payload): payload is UpdateActiveOrigin {
	return isBasePayload(payload) && payload.type === 'update-active-origin';
}
