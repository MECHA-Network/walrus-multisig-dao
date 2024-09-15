

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';

export interface DisconnectApp extends BasePayload {
	type: 'disconnect-app';
	origin: string;
	specificAccounts?: string[];
}

export function isDisconnectApp(payload: Payload): payload is DisconnectApp {
	return isBasePayload(payload) && payload.type === 'disconnect-app';
}
