

import { growthbook } from '../../shared/experimentation/features';
import { getSentryConfig } from '../../shared/sentry-config';
import * as Sentry from '@sentry/browser';

export function initSentry() {
	Sentry.addTracingExtensions();
	Sentry.init(
		getSentryConfig({
			tracesSampler: () => {
				return growthbook.getFeatureValue('wallet-sentry-tracing', 0);
			},
		}),
	);
}

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
