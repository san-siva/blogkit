import { useEffect } from 'react';

/**
 * While `isOpen`, locks page scroll and calls `onClose` on Escape.
 */
export const useFullscreenModal = (isOpen: boolean, onClose: () => void) => {
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
		};
	}, [isOpen, onClose]);
};
