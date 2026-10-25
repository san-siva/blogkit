import { useInsideWhenClipped } from '../hooks/useInsideWhenClipped';
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
	/** For a toolbar positioned outside its host: fall back to inside top-left when it would be clipped. */
	autoInside?: boolean;
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
	autoInside = false,
	isExpanded,
	isCopied,
	onCopy,
	onToggleExpand,
	onZoomIn,
	onZoomOut,
	onReset,
}: ContentToolbarProps) => {
	const { toolbarReference, style } = useInsideWhenClipped(autoInside);
	const expandLabel = isExpanded ? 'Close fullscreen' : 'Expand to fullscreen';
	const hasZoom = onZoomIn && onZoomOut && onReset;
	const button = (modifier: ButtonModifier) =>
		`${styles['toolbar__btn']} ${styles[`toolbar__btn--${modifier}` as const]}`;

	return (
		<div
			ref={toolbarReference}
			className={`${styles['toolbar']} ${className}`}
			style={style}
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
