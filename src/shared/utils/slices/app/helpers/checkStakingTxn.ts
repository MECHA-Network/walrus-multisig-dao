

import type { SuiTransactionBlockResponse } from '@mysten/sui/client';

// TODO: Support programmable transactions:
export function checkStakingTxn(_txn: SuiTransactionBlockResponse) {
	return false;
}
