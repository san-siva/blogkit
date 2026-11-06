import type { MutableRefObject } from 'react';

import { setSectionInUrl } from '.';

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
		setSectionInUrl(id);
	};

	document.body.addEventListener('scrollend', scrollEndHandlerRef.current, {
		once: true,
	});
};

export default lockScrollUpdates;
