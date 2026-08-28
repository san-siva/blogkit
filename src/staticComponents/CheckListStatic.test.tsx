import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import CheckListStatic from './CheckListStatic';

describe('CheckListStatic', () => {
	it('renders one item per entry', () => {
		const html = renderToStaticMarkup(
			<CheckListStatic
				items={[
					{ id: 'a', children: <p>A</p> },
					{ id: 'b', children: <p>B</p> },
				]}
			/>
		);
		expect(html).toContain('data-id="a"');
		expect(html).toContain('data-id="b"');
	});

	it("wires each item's onClick through to its Checkbox", () => {
		const onClick = vi.fn();
		const element = CheckListStatic({
			items: [{ id: 'a', children: <p>A</p>, onClick }],
		});
		const checkbox = element.props.children[0].props.children[0];
		checkbox.props.onClick();
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
