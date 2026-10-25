import {
	type CSSProperties,
	type RefObject,
	useCallback,
	useEffect,
	useState,
} from 'react';

// Matches the 8px padding that bridges the gap between an outside toolbar and its host
const OUTSIDE_GAP = 8;
const INSIDE_OFFSET = 4;

const insideStyle: CSSProperties = {
	right: 'auto',
	left: INSIDE_OFFSET,
	top: INSIDE_OFFSET,
	paddingRight: 0,
};

/**
 * For a toolbar that is absolutely positioned outside the left edge of its
 * host (`right: 100%`): reports whether that spot would be off-screen or
 * clipped by an overflow ancestor, and supplies the style that moves the
 * toolbar to the host's top-left corner instead.
 *
 * The outside position is computed from the host's rect rather than measured
 * off the toolbar, so the check stays valid while the toolbar is inside.
 */
export const useInsideWhenClipped = (
	toolbarReference: RefObject<HTMLElement | null>,
	hostReference?: RefObject<HTMLElement | null>
) => {
	const enabled = hostReference !== undefined;
	const [isInside, setIsInside] = useState(false);

	const measure = useCallback(() => {
		const toolbar = toolbarReference.current;
		const host = hostReference?.current;
		if (!toolbar || !host) return;

		const width = toolbar.offsetWidth + (isInside ? OUTSIDE_GAP : 0);
		const outsideLeft = host.getBoundingClientRect().left - width;

		let clipLeft = 0; // the viewport
		for (let node: HTMLElement | null = host; node; node = node.parentElement) {
			if (getComputedStyle(node).overflowX !== 'visible') {
				clipLeft = Math.max(clipLeft, node.getBoundingClientRect().left);
			}
		}

		setIsInside(outsideLeft < clipLeft - 0.5);
	}, [isInside, toolbarReference, hostReference]);

	useEffect(() => {
		if (!enabled) return;
		measure();
		const host = hostReference?.current;
		const observer = host ? new ResizeObserver(measure) : undefined;
		if (host) observer?.observe(host);
		window.addEventListener('resize', measure);
		return () => {
			observer?.disconnect();
			window.removeEventListener('resize', measure);
		};
	}, [enabled, measure]);

	return enabled && isInside ? insideStyle : undefined;
};
