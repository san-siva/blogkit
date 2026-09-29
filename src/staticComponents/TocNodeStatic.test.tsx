import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import TocNodeStatic, { containsId } from './TocNodeStatic';
import type { TocNode } from './TocNodeStatic';

const tree: TocNode = {
	id: 'root',
	title: 'Root',
	depth: 0,
	children: [
		{
			id: 'child',
			title: 'Child',
			depth: 1,
			children: [{ id: 'grandchild', title: 'Grandchild', depth: 2, children: [] }],
		},
		{ id: 'sibling', title: 'Sibling', depth: 1, children: [] },
	],
};

const render = (props: Partial<Parameters<typeof TocNodeStatic>[0]> = {}) =>
	renderToStaticMarkup(
		<TocNodeStatic node={tree} index={0} visibleTitle={null} onClick={() => {}} {...props} />
	);

describe('containsId', () => {
	it('matches the node itself and any descendant', () => {
		expect(containsId(tree, 'root')).toBe(true);
		expect(containsId(tree, 'grandchild')).toBe(true);
	});

	it('returns false for unknown ids and null', () => {
		expect(containsId(tree, 'missing')).toBe(false);
		expect(containsId(tree, null)).toBe(false);
	});
});

describe('TocNodeStatic', () => {
	it('renders every level and no toggle when not collapsible', () => {
		const html = render();
		expect(html).toContain('data-id="grandchild"');
		expect(html).not.toContain('<button');
	});

	it('collapses by default when the active section is outside the node', () => {
		const html = render({ onToggle: () => {} });
		expect(html).not.toContain('data-id="child"');
		expect(html).toContain('aria-label="Expand Root"');
	});

	it('expands every level on the path to the active section', () => {
		const html = render({ onToggle: () => {}, visibleTitle: 'grandchild' });
		expect(html).toContain('aria-label="Collapse Root"');
		expect(html).toContain('aria-label="Collapse Child"');
		expect(html).toContain('data-id="grandchild"');
	});

	it('lets a manual override collapse a nested level', () => {
		const html = render({
			onToggle: () => {},
			visibleTitle: 'grandchild',
			expandOverrides: { child: false },
		});
		expect(html).toContain('data-id="child"');
		expect(html).toContain('aria-label="Expand Child"');
		expect(html).not.toContain('data-id="grandchild"');
	});

	it('calls onToggle with the node id and current state', () => {
		const onToggle = vi.fn();
		const element = TocNodeStatic({ node: tree, index: 0, visibleTitle: null, onClick: () => {}, onToggle });
		const button = element.props.children[0].props.children[0];
		button.props.onClick();
		expect(onToggle).toHaveBeenCalledWith('root', false);
	});

	it('adds a spacer only on levels where a sibling has a toggle', () => {
		const html = render({ onToggle: () => {}, expandOverrides: { root: true, child: true } });
		expect(html.match(/toggle-spacer/g)).toHaveLength(1);
	});

	it('places the toggle before the title', () => {
		const html = render({ onToggle: () => {} });
		expect(html.indexOf('<button')).toBeLessThan(html.indexOf('data-id="root"'));
	});
});
