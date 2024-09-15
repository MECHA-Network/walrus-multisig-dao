

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';
import type { NetworkEnvType } from '../../../../api-env';

export interface SetNetworkPayload extends BasePayload {
	type: 'set-network';
	network: NetworkEnvType;
}

export function isSetNetworkPayload(payload: Payload): payload is SetNetworkPayload {
	return isBasePayload(payload) && payload.type === 'set-network';
}
