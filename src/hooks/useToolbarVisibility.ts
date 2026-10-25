import { type RefObject, useEffect, useState } from 'react';

const TOUCH_QUERY = '(hover: none), (pointer: coarse)';
const DOUBLE_TAP_MS = 300;

/**
 * Decides when a ContentToolbar is shown.
 *
 * With a `host` (an inline toolbar): while the pointer is over the host; on
 * touch devices, by a single tap on the host and hidden by a double tap.
 *
 * Without one (a fullscreen toolbar): while the pointer is over the toolbar
 * itself, so it stays out of the way until the pointer reaches its corner; on
 * touch devices always, as there is no hover and no Esc key there.
 *
 * Keyboard focus inside the toolbar always shows it. `isInert` is set while a
 * touch toolbar is hidden: it is only transparent, so a tap near it would
 * otherwise hit an invisible button.
 */
export const useToolbarVisibility = (
	toolbarReference: RefObject<HTMLElement | null>,
	hostReference?: RefObject<HTMLElement | null>
) => {
	const isInline = hostReference !== undefined;
	const [isTouch, setIsTouch] = useState(false);
	const [isHostHovered, setIsHostHovered] = useState(false);
	const [isToolbarHovered, setIsToolbarHovered] = useState(false);
	const [hasFocus, setHasFocus] = useState(false);
	const [isTapRevealed, setIsTapRevealed] = useState(false);

	useEffect(() => {
		const query = window.matchMedia(TOUCH_QUERY);
		const update = () => setIsTouch(query.matches);
		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		const host = hostReference?.current;
		if (!host) return;

		if (!isTouch) {
			const onEnter = () => setIsHostHovered(true);
			const onLeave = () => setIsHostHovered(false);
			host.addEventListener('pointerenter', onEnter);
			host.addEventListener('pointerleave', onLeave);
			return () => {
				host.removeEventListener('pointerenter', onEnter);
				host.removeEventListener('pointerleave', onLeave);
				setIsHostHovered(false);
			};
		}

		let lastTap = -Infinity;
		const previousTouchAction = host.style.touchAction;
		// stops a double tap from zooming the page instead of hiding the toolbar
		host.style.touchAction = 'manipulation';

		const onPointerUp = (event: PointerEvent) => {
			if (event.pointerType !== 'touch') return;
			// taps on the toolbar's own buttons are not taps on the host
			if (toolbarReference.current?.contains(event.target as Node)) return;

			if (event.timeStamp - lastTap < DOUBLE_TAP_MS) {
				setIsTapRevealed(false);
				lastTap = -Infinity;
			} else {
				setIsTapRevealed(true);
				lastTap = event.timeStamp;
			}
		};

		host.addEventListener('pointerup', onPointerUp);
		return () => {
			host.removeEventListener('pointerup', onPointerUp);
			host.style.touchAction = previousTouchAction;
			setIsTapRevealed(false);
		};
	}, [hostReference, isTouch, toolbarReference]);

	let isShownByPointer: boolean;
	if (isInline) isShownByPointer = isTouch ? isTapRevealed : isHostHovered;
	else isShownByPointer = isTouch || isToolbarHovered;

	const isVisible = hasFocus || isToolbarHovered || isShownByPointer;

	return {
		isVisible,
		isInert: isInline && isTouch && !isVisible,
		handlers: {
			onPointerEnter: () => setIsToolbarHovered(true),
			onPointerLeave: () => setIsToolbarHovered(false),
			onFocus: () => setHasFocus(true),
			onBlur: () => setHasFocus(false),
		},
	};
};
