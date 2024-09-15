

import { BackgroundClient } from '../slices/app/background-client';
import { growthbook } from '../slices/app/experimentation/feature-gating';
import type { RootState } from '../RootReducer';
import type { AppDispatch } from '../store';

export const thunkExtras = {
	growthbook,
	background: new BackgroundClient(),
};

type ThunkExtras = typeof thunkExtras;

export interface AppThunkConfig {
	extra: ThunkExtras;
	state: RootState;
	dispatch: AppDispatch;
}
