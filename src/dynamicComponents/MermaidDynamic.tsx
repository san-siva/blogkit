'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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

const Mermaid = ({
	code = '',
	id = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: MermaidProperties) => {
	const [enabled, setEnabled] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);

	const mermaidReference = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const renderCount = useRef(0);
	const transformRef = useRef({ scale: 1, x: 0, y: 0 });
	const isDraggingRef = useRef(false);
	const dragStart = useRef({
		mouseX: 0,
		mouseY: 0,
		transformX: 0,
		transformY: 0,
	});

	const applyTransform = useCallback(
		(
			updater: (
				prev: typeof transformRef.current
			) => typeof transformRef.current
		) => {
			const next = updater(transformRef.current);
			transformRef.current = next;
			setTransform(next);
		},
		[]
	);

	const initializeMermaid = useCallback(async () => {
		if (!mermaidReference.current || !code) return;
		const renderId = `mermaid-diagram-${id}-${++renderCount.current}`;
		document.getElementById(renderId)?.remove();
		try {
			const { svg, bindFunctions } = await mermaid.render(renderId, code);
			if (!mermaidReference.current || !svg) return;
			mermaidReference.current.innerHTML = svg;
			bindFunctions?.(mermaidReference.current);
			setEnabled(true);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to render diagram';
			setError(message);
		}
	}, [code, id]);

	useEffect(() => {
		if (!code) return;
		setError(null);
		applyTransform(() => ({ scale: 1, x: 0, y: 0 }));
		const timer = setTimeout(initializeMermaid, 100);
		return () => clearTimeout(timer);
	}, [code, initializeMermaid, applyTransform]);

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();
			const factor = e.deltaY < 0 ? 1 + ZOOM_STEP : 1 - ZOOM_STEP;
			applyTransform(prev => {
				const newScale = Math.min(
					Math.max(prev.scale * factor, MIN_SCALE),
					MAX_SCALE
				);
				if (!viewportRef.current) return { ...prev, scale: newScale };
				const rect = viewportRef.current.getBoundingClientRect();
				const cursorX = e.clientX - rect.left;
				const cursorY = e.clientY - rect.top;
				const ratio = newScale / prev.scale;
				return {
					scale: newScale,
					x: cursorX - (cursorX - prev.x) * ratio,
					y: cursorY - (cursorY - prev.y) * ratio,
				};
			});
		},
		[applyTransform]
	);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport || !enabled) return;
		viewport.addEventListener('wheel', handleWheel, { passive: false });
		return () => viewport.removeEventListener('wheel', handleWheel);
	}, [handleWheel, enabled]);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
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

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDraggingRef.current) return;
			applyTransform(prev => ({
				...prev,
				x:
					dragStart.current.transformX + (e.clientX - dragStart.current.mouseX),
				y:
					dragStart.current.transformY + (e.clientY - dragStart.current.mouseY),
			}));
		},
		[applyTransform]
	);

	const handleMouseUp = useCallback(() => {
		isDraggingRef.current = false;
		setIsDragging(false);
	}, []);

	const zoomIn = useCallback(() => {
		applyTransform(prev => ({
			...prev,
			scale: Math.min(prev.scale * (1 + ZOOM_STEP), MAX_SCALE),
		}));
	}, [applyTransform]);

	const zoomOut = useCallback(() => {
		applyTransform(prev => ({
			...prev,
			scale: Math.max(prev.scale * (1 - ZOOM_STEP), MIN_SCALE),
		}));
	}, [applyTransform]);

	const resetView = useCallback(() => {
		applyTransform(() => ({ scale: 1, x: 0, y: 0 }));
	}, [applyTransform]);

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
				<div className={styles['mermaid__controls']}>
					<button className={styles['mermaid__controls__btn']} onClick={zoomIn}>
						+
					</button>
					<button
						className={styles['mermaid__controls__btn']}
						onClick={zoomOut}
					>
						−
					</button>
					<button
						className={styles['mermaid__controls__btn']}
						onClick={resetView}
					>
						Reset
					</button>
				</div>
			)}
			<div
				ref={viewportRef}
				className={`${styles['mermaid__viewport']} ${
					isDragging ? styles['mermaid__viewport--dragging'] : ''
				}`}
				style={enabled ? undefined : { display: 'none' }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				<div
					style={{
						transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
						transformOrigin: '0 0',
						transition: isDragging ? 'none' : 'transform 0.1s ease',
					}}
				>
					<div ref={mermaidReference} id={id} />
				</div>
			</div>
		</div>
	);
};

export default Mermaid;
