import { describe, expect, it } from 'vitest';
import { gestureTransform, measure } from './usePanZoom';

describe('measure', () => {
	it('returns the origin for no pointers', () => {
		expect(measure([])).toEqual([{ x: 0, y: 0 }, 0]);
	});

	it('returns the pointer itself and no spread for one pointer', () => {
		expect(measure([{ x: 3, y: 4 }])).toEqual([{ x: 3, y: 4 }, 0]);
	});

	it('returns the midpoint and distance for two pointers', () => {
		expect(measure([{ x: 0, y: 0 }, { x: 6, y: 8 }])).toEqual([{ x: 3, y: 4 }, 10]);
	});
});

describe('gestureTransform', () => {
	const start = { transform: { scale: 1, x: 10, y: 20 }, center: { x: 100, y: 100 }, distance: 0 };

	it('pans by how far a single pointer moved', () => {
		expect(gestureTransform(start, { x: 130, y: 90 }, 0, 0.5, 4)).toEqual({ scale: 1, x: 40, y: 10 });
	});

	it('scales by the change in pinch distance around the pinch center', () => {
		const pinch = { ...start, transform: { scale: 1, x: 0, y: 0 }, distance: 100 };
		// fingers spread to twice the distance without moving their midpoint
		expect(gestureTransform(pinch, { x: 100, y: 100 }, 200, 0.5, 4)).toEqual({ scale: 2, x: -100, y: -100 });
	});

	it('clamps the pinch scale', () => {
		const pinch = { ...start, distance: 100 };
		expect(gestureTransform(pinch, start.center, 1000, 0.5, 4).scale).toBe(4);
		expect(gestureTransform(pinch, start.center, 1, 0.5, 4).scale).toBe(0.5);
	});
});
