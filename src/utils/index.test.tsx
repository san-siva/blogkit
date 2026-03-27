import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { extractTextFromReactNode } from './index';

describe('extractTextFromReactNode', () => {
	it('returns empty string for null', () => {
		expect(extractTextFromReactNode(null)).toBe('');
	});

	it('returns empty string for undefined', () => {
		expect(extractTextFromReactNode(undefined)).toBe('');
	});

	it('returns empty string for boolean', () => {
		expect(extractTextFromReactNode(true)).toBe('');
		expect(extractTextFromReactNode(false)).toBe('');
	});

	it('returns string as-is', () => {
		expect(extractTextFromReactNode('Hello')).toBe('Hello');
	});

	it('converts number to string', () => {
		expect(extractTextFromReactNode(42)).toBe('42');
	});

	it('extracts text from a simple element', () => {
		const node = createElement('p', null, 'Section title');
		expect(extractTextFromReactNode(node)).toBe('Section title');
	});

	it('extracts text from nested elements', () => {
		const node = createElement('p', null,
			'Hello ',
			createElement('strong', null, 'world'),
		);
		expect(extractTextFromReactNode(node)).toBe('Hello world');
	});

	it('extracts text from deeply nested elements', () => {
		const node = createElement('p', null,
			createElement('em', null,
				createElement('strong', null, 'deep'),
			),
		);
		expect(extractTextFromReactNode(node)).toBe('deep');
	});

	it('extracts text from an array of nodes', () => {
		const nodes = ['foo', ' ', createElement('span', null, 'bar')];
		expect(extractTextFromReactNode(nodes)).toBe('foo bar');
	});

	it('handles mixed content with numbers and elements', () => {
		const node = createElement('p', null, 'Step ', 3, ': done');
		expect(extractTextFromReactNode(node)).toBe('Step 3: done');
	});

	it('returns empty string for element with no children', () => {
		const node = createElement('p', null);
		expect(extractTextFromReactNode(node)).toBe('');
	});
});
