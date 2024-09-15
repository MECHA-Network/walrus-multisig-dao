import { useCallback } from 'react';

export function useCopyToClipboard(onSuccessCallback?: () => void) {
	return useCallback(
		async (text: string) => {
			if (!navigator?.clipboard) {
				return false;
			}

			try {
				await navigator.clipboard.writeText(text);
				if (onSuccessCallback) {
					onSuccessCallback();
				}
				return true;
			} catch (error) {
				return false;
			}
		},
		[onSuccessCallback],
	);
}