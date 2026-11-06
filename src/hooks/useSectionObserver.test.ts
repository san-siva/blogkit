import { describe, expect, it } from 'vitest';
import { findSectionId, getSectionIdFromHref } from './useSectionObserver';

describe('getSectionIdFromHref', () => {
	it('reads a hash link', () => {
		expect(getSectionIdFromHref('#why')).toBe('why');
	});

	it('reads a ?section= link', () => {
		expect(getSectionIdFromHref('?section=how-it-works')).toBe('how-it-works');
	});

	it('decodes an encoded hash', () => {
		expect(getSectionIdFromHref('#caf%C3%A9')).toBe('café');
	});

	it('ignores external links, other pages and empty hashes', () => {
		expect(getSectionIdFromHref('https://example.com/#why')).toBeNull();
		expect(getSectionIdFromHref('/other-page')).toBeNull();
		expect(getSectionIdFromHref('#')).toBeNull();
		expect(getSectionIdFromHref('?tab=1')).toBeNull();
	});
});

describe('findSectionId', () => {
	const sections = new Map<string, unknown>([
		['why', {}],
		['1--suggest-module-names', {}],
		['llm-calls', {}],
		['reflection', {}],
		['reflection-2', {}],
	]);

	it('returns an exact id match', () => {
		expect(findSectionId(sections, 'why')).toBe('why');
		expect(findSectionId(sections, 'reflection-2')).toBe('reflection-2');
	});

	it('matches a GitHub-style anchor to a blogkit id', () => {
		expect(findSectionId(sections, '1-suggest-module-names')).toBe('1--suggest-module-names');
		expect(findSectionId(sections, 'LLM-Calls')).toBe('llm-calls');
	});

	it('returns null when nothing matches', () => {
		expect(findSectionId(sections, 'missing')).toBeNull();
		expect(findSectionId(sections, '---')).toBeNull();
	});
});
