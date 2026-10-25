import { type RefObject, useRef } from 'react';

import { useInsideWhenClipped } from '../hooks/useInsideWhenClipped';
import { useToolbarVisibility } from '../hooks/useToolbarVisibility';
import styles from '../styles/ContentToolbar.module.scss';

type ButtonModifier =
	| 'zoom-in'
	| 'zoom-out'
	| 'reset'
	| 'copy'
	| 'copied'
	| 'expand'
	| 'collapse';

interface ContentToolbarProps {
	/** Positioning/visibility is up to the host component. */
	className?: string;
	/**
	 * The component this toolbar belongs to, for a toolbar positioned outside
	 * it. The toolbar is shown while the host is hovered (tapped on touch
	 * devices) and falls back to inside top-left when it would be clipped.
	 * Omit it for a fullscreen toolbar, which is shown on hovering the toolbar.
	 */
	host?: RefObject<HTMLElement | null>;
	isExpanded: boolean;
	isCopied: boolean;
	onCopy: () => void;
	onToggleExpand: () => void;
	/** The zoom group renders only when all three handlers are provided. */
	onZoomIn?: () => void;
	onZoomOut?: () => void;
	onReset?: () => void;
}

const ContentToolbar = ({
	className = '',
	host,
	isExpanded,
	isCopied,
	onCopy,
	onToggleExpand,
	onZoomIn,
	onZoomOut,
	onReset,
}: ContentToolbarProps) => {
	const toolbarReference = useRef<HTMLDivElement>(null);
	const placementStyle = useInsideWhenClipped(toolbarReference, host);
	const { isVisible, isInert, handlers } = useToolbarVisibility(
		toolbarReference,
		host
	);
	const expandLabel = isExpanded ? 'Close fullscreen' : 'Expand to fullscreen';
	const hasZoom = onZoomIn && onZoomOut && onReset;
	const button = (modifier: ButtonModifier) =>
		`${styles['toolbar__btn']} ${styles[`toolbar__btn--${modifier}` as const]}`;

	return (
		<div
			ref={toolbarReference}
			className={[
				styles['toolbar'],
				isVisible ? styles['toolbar--visible'] : '',
				isInert ? styles['toolbar--inert'] : '',
				className,
			].join(' ')}
			style={placementStyle}
			{...handlers}
		>
			{hasZoom && (
				<>
					<button
						className={button('zoom-in')}
						onClick={onZoomIn}
						aria-label="Zoom in"
						title="Zoom in"
					/>
					<button
						className={button('zoom-out')}
						onClick={onZoomOut}
						aria-label="Zoom out"
						title="Zoom out"
					/>
					<button
						className={button('reset')}
						onClick={onReset}
						aria-label="Reset view"
						title="Reset view"
					/>
				</>
			)}
			<button
				className={button(isCopied ? 'copied' : 'copy')}
				onClick={onCopy}
				aria-label={isCopied ? 'Copied' : 'Copy'}
				title={isCopied ? 'Copied' : 'Copy'}
			/>
			<button
				className={button(isExpanded ? 'collapse' : 'expand')}
				onClick={onToggleExpand}
				aria-label={expandLabel}
				title={expandLabel}
			/>
		</div>
	);
};

export default ContentToolbar;
