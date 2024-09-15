

import { isBasePayload } from '../../';
import type { BasePayload, Payload } from '../../';
import type { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { type SuiSignMessageOutput } from '@mysten/wallet-standard';

type SignedTransaction = {
	transactionBlockBytes: string;
	signature: string;
};

export interface TransactionRequestResponse extends BasePayload {
	type: 'transaction-request-response';
	txID: string;
	approved: boolean;
	txResult?: SuiTransactionBlockResponse | SuiSignMessageOutput;
	txResultError?: string;
	txSigned?: SignedTransaction;
}

export function isTransactionRequestResponse(
	payload: Payload,
): payload is TransactionRequestResponse {
	return isBasePayload(payload) && payload.type === 'transaction-request-response';
}
