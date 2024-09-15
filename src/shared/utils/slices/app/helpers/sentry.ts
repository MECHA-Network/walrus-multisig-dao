

import { growthbook } from "../experimentation/feature-gating"
import * as Sentry from '@sentry/react';

import { getSentryConfig } from "../../../../sentry-config"

export default function initSentry() {
	Sentry.init(
		getSentryConfig({
			integrations: [new Sentry.BrowserTracing()],
			tracesSampler: () => {
				return growthbook.getFeatureValue('wallet-sentry-tracing', 0);
			},
		}),
	);
}
