import { thunkExtras } from './store/thunk-extras';

export function useBackgroundClient() {
	return thunkExtras.background;
}