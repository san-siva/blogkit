'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import mermaid from 'mermaid';

import CalloutStatic from '../staticComponents/CalloutStatic';
import styles from '../styles/Mermaid.module.scss';

interface MermaidProperties {
	code: string;
	id: string;
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

mermaid.initialize({
	startOnLoad: false,
	theme: 'default',
	timeline: {
		useMaxWidth: true,
		diagramMarginX: 0,
	},
	flowchart: {
		useMaxWidth: true,
		diagramPadding: 0,
	},
	sequence: {
		useMaxWidth: true,
		diagramMarginX: 0,
	},
});

const MIN_SCALE = 0.5;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.15;

interface Transform {
	scale: number;
	x: number;
	y: number;
}

const INITIAL_TRANSFORM: Transform = { scale: 1, x: 0, y: 0 };

const usePanZoom = () => {
	const [transform, setTransform] = useState<Transform>(INITIAL_TRANSFORM);
	const [isDragging, setIsDragging] = useState(false);
	const transformRef = useRef<Transform>(INITIAL_TRANSFORM);
	const isDraggingRef = useRef(false);
	const dragStart = useRef({
		mouseX: 0,
		mouseY: 0,
		transformX: 0,
		transformY: 0,
	});

	const apply = useCallback((updater: (prev: Transform) => Transform) => {
		const next = updater(transformRef.current);
		transformRef.current = next;
		setTransform(next);
	}, []);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		isDraggingRef.current = true;
		setIsDragging(true);
		dragStart.current = {
			mouseX: e.clientX,
			mouseY: e.clientY,
			transformX: transformRef.current.x,
			transformY: transformRef.current.y,
		};
	}, []);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDraggingRef.current) return;
			apply(prev => ({
				...prev,
				x:
					dragStart.current.transformX + (e.clientX - dragStart.current.mouseX),
				y:
					dragStart.current.transformY + (e.clientY - dragStart.current.mouseY),
			}));
		},
		[apply]
	);

	const onMouseUp = useCallback(() => {
		isDraggingRef.current = false;
		setIsDragging(false);
	}, []);

	const zoomIn = useCallback(() => {
		apply(prev => ({
			...prev,
			scale: Math.min(prev.scale * (1 + ZOOM_STEP), MAX_SCALE),
		}));
	}, [apply]);

	const zoomOut = useCallback(() => {
		apply(prev => ({
			...prev,
			scale: Math.max(prev.scale * (1 - ZOOM_STEP), MIN_SCALE),
		}));
	}, [apply]);

	const reset = useCallback(() => {
		apply(() => INITIAL_TRANSFORM);
	}, [apply]);

	return {
		transform,
		isDragging,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		zoomIn,
		zoomOut,
		reset,
	};
};

type PanZoom = ReturnType<typeof usePanZoom>;

interface MermaidViewportProps {
	className: string;
	draggingClassName: string;
	pan: PanZoom;
	contentRef: React.RefObject<HTMLDivElement>;
	contentId?: string;
	hidden?: boolean;
}

const MermaidViewport = ({
	className,
	draggingClassName,
	pan,
	contentRef,
	contentId,
	hidden,
}: MermaidViewportProps) => (
	<div
		className={`${className} ${pan.isDragging ? draggingClassName : ''}`}
		style={hidden ? { display: 'none' } : undefined}
		onMouseDown={pan.onMouseDown}
		onMouseMove={pan.onMouseMove}
		onMouseUp={pan.onMouseUp}
		onMouseLeave={pan.onMouseUp}
	>
		<div
			style={{
				transform: `translate(${pan.transform.x}px, ${pan.transform.y}px) scale(${pan.transform.scale})`,
				transformOrigin: '0 0',
				transition: pan.isDragging ? 'none' : 'transform 0.1s ease',
			}}
		>
			<div ref={contentRef} id={contentId} />
		</div>
	</div>
);

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

const Mermaid = ({
	code = '',
	id = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: MermaidProperties) => {
	const [enabled, setEnabled] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);

	const mermaidReference = useRef<HTMLDivElement>(null);
	const modalMermaidReference = useRef<HTMLDivElement>(null);
	const renderCount = useRef(0);

	const inline = usePanZoom();
	const modal = usePanZoom();

	const renderInto = useCallback(
		async (target: HTMLDivElement | null, prefix: string) => {
			if (!target || !code) return false;
			const renderId = `${prefix}-${id}-${++renderCount.current}`;
			try {
				const { svg, bindFunctions } = await mermaid.render(renderId, code);
				if (!svg) return false;
				target.innerHTML = svg;
				bindFunctions?.(target);
				return true;
			} catch (err) {
				const message =
					err instanceof Error ? err.message : 'Failed to render diagram';
				setError(message);
				return false;
			}
		},
		[code, id]
	);

	useEffect(() => {
		if (!code) return;
		setError(null);
		inline.reset();
		const timer = setTimeout(() => {
			renderInto(mermaidReference.current, 'mermaid-diagram').then(ok => {
				if (ok) setEnabled(true);
			});
		}, 100);
		return () => clearTimeout(timer);
	}, [code, renderInto, inline.reset]);

	useEffect(() => {
		if (!isExpanded) return;
		modal.reset();
		const timer = setTimeout(() => {
			renderInto(modalMermaidReference.current, 'mermaid-modal');
		}, 0);
		return () => clearTimeout(timer);
	}, [isExpanded, renderInto, modal.reset]);

	useEffect(() => {
		if (!isExpanded) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsExpanded(false);
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
		};
	}, [isExpanded]);

	return (
		<div
			className={`${styles.mermaid}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
		>
			{error ? (
				<CalloutStatic type="error">
					<p>
						<b>Diagram error:</b> {error}
					</p>
				</CalloutStatic>
			) : !enabled ? (
				<CalloutStatic type="info">
					<p>Rendering diagram...</p>
				</CalloutStatic>
			) : (
				<MermaidControls
					className={styles['mermaid__controls']}
					isExpanded={false}
					onZoomIn={inline.zoomIn}
					onZoomOut={inline.zoomOut}
					onReset={inline.reset}
					onToggleExpand={() => setIsExpanded(true)}
				/>
			)}
			<MermaidViewport
				className={styles['mermaid__viewport']}
				draggingClassName={styles['mermaid__viewport--dragging']}
				pan={inline}
				contentRef={mermaidReference}
				contentId={id}
				hidden={!enabled}
			/>

			{isExpanded &&
				typeof document !== 'undefined' &&
				createPortal(
					<div
						className={styles['mermaid__modal']}
						onClick={() => setIsExpanded(false)}
						role="dialog"
						aria-modal="true"
					>
						<div
							className={styles['mermaid__modal__content']}
							onClick={e => e.stopPropagation()}
						>
							<MermaidControls
								className={styles['mermaid__modal__controls']}
								isExpanded={true}
								onZoomIn={modal.zoomIn}
								onZoomOut={modal.zoomOut}
								onReset={modal.reset}
								onToggleExpand={() => setIsExpanded(false)}
							/>
							<MermaidViewport
								className={styles['mermaid__modal__viewport']}
								draggingClassName={styles['mermaid__modal__viewport--dragging']}
								pan={modal}
								contentRef={modalMermaidReference}
							/>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default Mermaid;
