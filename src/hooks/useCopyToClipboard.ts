import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard and reports `isCopied` for `resetDelay` ms
 * afterwards, so a button can briefly show a "done" state.
 */
export const useCopyToClipboard = (resetDelay = 1000) => {
	const [isCopied, setIsCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	const copy = useCallback(
		async (text: string) => {
			try {
				await navigator.clipboard.writeText(text);
				setIsCopied(true);
				clearTimeout(timer.current);
				timer.current = setTimeout(() => setIsCopied(false), resetDelay);
			} catch (error) {
				console.error('Failed to copy:', error);
			}
		},
		[resetDelay]
	);

	return { isCopied, copy };
};
