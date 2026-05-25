import { useCallback, useRef, useState } from 'react';

export interface Transform {
	scale: number;
	x: number;
	y: number;
}

export interface UsePanZoomOptions {
	initialTransform?: Transform;
	minScale?: number;
	maxScale?: number;
	zoomStep?: number;
}

const DEFAULT_INITIAL_TRANSFORM: Transform = { scale: 1, x: 0, y: 0 };
const DEFAULT_MIN_SCALE = 0.5;
const DEFAULT_MAX_SCALE = 4;
const DEFAULT_ZOOM_STEP = 0.15;

export const usePanZoom = ({
	initialTransform = DEFAULT_INITIAL_TRANSFORM,
	minScale = DEFAULT_MIN_SCALE,
	maxScale = DEFAULT_MAX_SCALE,
	zoomStep = DEFAULT_ZOOM_STEP,
}: UsePanZoomOptions = {}) => {
	const [transform, setTransform] = useState<Transform>(initialTransform);
	const [isDragging, setIsDragging] = useState(false);
	const transformRef = useRef<Transform>(initialTransform);
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
			scale: Math.min(prev.scale * (1 + zoomStep), maxScale),
		}));
	}, [apply, zoomStep, maxScale]);

	const zoomOut = useCallback(() => {
		apply(prev => ({
			...prev,
			scale: Math.max(prev.scale * (1 - zoomStep), minScale),
		}));
	}, [apply, zoomStep, minScale]);

	const zoomAtPoint = useCallback(
		(deltaY: number, pointX: number, pointY: number) => {
			apply(prev => {
				const factor = deltaY < 0 ? 1 + zoomStep : 1 - zoomStep;
				const newScale = Math.max(
					minScale,
					Math.min(maxScale, prev.scale * factor)
				);
				if (newScale === prev.scale) return prev;
				const ratio = newScale / prev.scale;
				return {
					scale: newScale,
					x: pointX - (pointX - prev.x) * ratio,
					y: pointY - (pointY - prev.y) * ratio,
				};
			});
		},
		[apply, zoomStep, minScale, maxScale]
	);

	const reset = useCallback(() => {
		apply(() => initialTransform);
	}, [apply, initialTransform]);

	return {
		transform,
		isDragging,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		zoomIn,
		zoomOut,
		zoomAtPoint,
		reset,
	};
};

export type PanZoom = ReturnType<typeof usePanZoom>;
