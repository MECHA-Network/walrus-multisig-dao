import { combineReducers } from '@reduxjs/toolkit';

import app from './slices/app';
import permissions from './slices/permissions';
import transactionRequests from './slices/transaction-requests';

const rootReducer = combineReducers({
	app,
	permissions,
	transactionRequests,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;