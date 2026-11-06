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

export interface Point {
	x: number;
	y: number;
}

export interface GestureStart {
	transform: Transform;
	center: Point;
	distance: number;
}

const toLocal = (e: React.PointerEvent<HTMLElement>): Point => {
	const rect = e.currentTarget.getBoundingClientRect();
	return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

// center and spread of the pointers; spread is 0 for a single pointer
export const measure = (points: Point[]): [Point, number] => {
	const [a, b] = points;
	if (!a) return [{ x: 0, y: 0 }, 0];
	if (!b) return [a, 0];
	return [{ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, Math.hypot(a.x - b.x, a.y - b.y)];
};

// one pointer pans; two pointers also scale by how far apart they moved, keeping the
// content point under the gesture's starting center under its current center
export const gestureTransform = (
	start: GestureStart,
	center: Point,
	distance: number,
	minScale: number,
	maxScale: number
): Transform => {
	const scale =
		start.distance > 0 && distance > 0
			? Math.max(minScale, Math.min(maxScale, start.transform.scale * (distance / start.distance)))
			: start.transform.scale;
	const ratio = scale / start.transform.scale;
	return {
		scale,
		x: center.x - (start.center.x - start.transform.x) * ratio,
		y: center.y - (start.center.y - start.transform.y) * ratio,
	};
};

export const usePanZoom = ({
	initialTransform = DEFAULT_INITIAL_TRANSFORM,
	minScale = DEFAULT_MIN_SCALE,
	maxScale = DEFAULT_MAX_SCALE,
	zoomStep = DEFAULT_ZOOM_STEP,
}: UsePanZoomOptions = {}) => {
	const [transform, setTransform] = useState<Transform>(initialTransform);
	const [isDragging, setIsDragging] = useState(false);
	const transformRef = useRef<Transform>(initialTransform);
	// active pointers, in viewport-relative coordinates
	const pointers = useRef(new Map<number, Point>());
	// the gesture (one-finger pan or two-finger pinch) as it was when it started
	const gestureStart = useRef<GestureStart>({
		transform: initialTransform,
		center: { x: 0, y: 0 },
		distance: 0,
	});

	const apply = useCallback((updater: (prev: Transform) => Transform) => {
		const next = updater(transformRef.current);
		transformRef.current = next;
		setTransform(next);
	}, []);

	// restart the gesture from the current pointers, so adding or lifting a finger doesn't jump
	const beginGesture = useCallback(() => {
		const [center, distance] = measure([...pointers.current.values()]);
		gestureStart.current = { transform: transformRef.current, center, distance };
	}, []);

	const onPointerDown = useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			if (e.pointerType === 'mouse' && e.button !== 0) return;
			if (pointers.current.size >= 2) return;
			e.preventDefault();
			e.currentTarget.setPointerCapture?.(e.pointerId);
			pointers.current.set(e.pointerId, toLocal(e));
			beginGesture();
			setIsDragging(true);
		},
		[beginGesture]
	);

	const onPointerMove = useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			if (!pointers.current.has(e.pointerId)) return;
			pointers.current.set(e.pointerId, toLocal(e));
			const [center, distance] = measure([...pointers.current.values()]);
			apply(() => gestureTransform(gestureStart.current, center, distance, minScale, maxScale));
		},
		[apply, minScale, maxScale]
	);

	const onPointerUp = useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			if (!pointers.current.delete(e.pointerId)) return;
			if (pointers.current.size > 0) {
				beginGesture();
				return;
			}
			setIsDragging(false);
		},
		[beginGesture]
	);

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
		onPointerDown,
		onPointerMove,
		onPointerUp,
		zoomIn,
		zoomOut,
		zoomAtPoint,
		reset,
	};
};

export type PanZoom = ReturnType<typeof usePanZoom>;
