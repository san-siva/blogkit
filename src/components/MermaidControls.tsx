import styles from '../styles/Mermaid.module.scss';

interface MermaidControlsProps {
	className: string;
	isExpanded: boolean;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
	onToggleExpand: () => void;
}

const MermaidControls = ({
	className,
	isExpanded,
	onZoomIn,
	onZoomOut,
	onReset,
	onToggleExpand,
}: MermaidControlsProps) => {
	const toggleLabel = isExpanded ? 'Close fullscreen' : 'Expand to fullscreen';
	const toggleModifier = isExpanded
		? styles['mermaid__controls__btn--collapse']
		: styles['mermaid__controls__btn--expand'];
	return (
		<div className={className}>
			<button
				className={`${styles['mermaid__controls__btn']} ${styles['mermaid__controls__btn--zoom-in']}`}
				onClick={onZoomIn}
				aria-label="Zoom in"
				title="Zoom in"
			/>
			<button
				className={`${styles['mermaid__controls__btn']} ${styles['mermaid__controls__btn--zoom-out']}`}
				onClick={onZoomOut}
				aria-label="Zoom out"
				title="Zoom out"
			/>
			<button
				className={`${styles['mermaid__controls__btn']} ${styles['mermaid__controls__btn--reset']}`}
				onClick={onReset}
				aria-label="Reset view"
				title="Reset view"
			/>
			<button
				className={`${styles['mermaid__controls__btn']} ${toggleModifier}`}
				onClick={onToggleExpand}
				aria-label={toggleLabel}
				title={toggleLabel}
			/>
		</div>
	);
};

export default MermaidControls;
