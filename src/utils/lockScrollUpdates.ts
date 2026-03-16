import type { MutableRefObject } from 'react';

const lockScrollUpdates = (
	id: string,
	isClickScrolling: MutableRefObject<boolean>,
	scrollEndHandlerRef: MutableRefObject<(() => void) | null>,
	setVisibleTitle: (id: string) => void
) => {
	if (scrollEndHandlerRef.current) {
		document.body.removeEventListener('scrollend', scrollEndHandlerRef.current);
	}

	isClickScrolling.current = true;

	scrollEndHandlerRef.current = () => {
		isClickScrolling.current = false;
		scrollEndHandlerRef.current = null;
		setVisibleTitle(id);
		const url = new URL(window.location.href);
		url.searchParams.set('section', id);
		window.history.replaceState({}, '', url.toString());
	};

	document.body.addEventListener('scrollend', scrollEndHandlerRef.current, {
		once: true,
	});
};

export default lockScrollUpdates;
