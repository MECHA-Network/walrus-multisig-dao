

import { isBasePayload } from '../';
import type { BasePayload, Payload } from '../';
import type { GrowthBook } from '@growthbook/growthbook';

export type LoadedFeatures = Parameters<GrowthBook['setFeatures']>['0'];
export type LoadedAttributes = Parameters<GrowthBook['setAttributes']>['0'];

export interface LoadedFeaturesPayload extends BasePayload {
	type: 'features-response';
	features: LoadedFeatures;
	attributes: LoadedAttributes;
}

export function isLoadedFeaturesPayload(payload: Payload): payload is LoadedFeaturesPayload {
	return isBasePayload(payload) && payload.type === 'features-response';
}
