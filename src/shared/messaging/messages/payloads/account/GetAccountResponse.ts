

import type { BasePayload } from '../';

export interface GetAccountResponse extends BasePayload {
	type: 'get-account-response';
	accounts: { address: string; publicKey: string | null; nickname: string | null }[];
}
