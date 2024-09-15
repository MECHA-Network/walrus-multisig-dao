import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';
import type { NetworkEnvType } from '../../../../api-env';

export type WalletStatusChange = {
	network?: NetworkEnvType;
	accounts?: { address: string; publicKey: string | null; nickname: string | null }[];
};

export interface WalletStatusChangePayload extends BasePayload, WalletStatusChange {
	type: 'wallet-status-changed';
}

export function isWalletStatusChangePayload(
	payload: Payload,
): payload is WalletStatusChangePayload {
	return isBasePayload(payload) && payload.type === 'wallet-status-changed';
}
