import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	it('renders unchecked by default with no interactive attributes', () => {
		const html = renderToStaticMarkup(<Checkbox />);
		expect(html).not.toContain('role="checkbox"');
		expect(html).not.toContain('tabindex');
	});

	it('adds role, aria-checked and tabIndex when onClick is provided', () => {
		const html = renderToStaticMarkup(<Checkbox isChecked onClick={() => {}} />);
		expect(html).toContain('role="checkbox"');
		expect(html).toContain('aria-checked="true"');
		expect(html).toContain('tabindex="0"');
	});

	it('renders a different className when checked vs unchecked', () => {
		const uncheckedHtml = renderToStaticMarkup(<Checkbox isChecked={false} />);
		const checkedHtml = renderToStaticMarkup(<Checkbox isChecked />);
		expect(checkedHtml).not.toBe(uncheckedHtml);
	});

	it('wires the onClick prop through to the rendered element', () => {
		const onClick = vi.fn();
		const element = Checkbox({ onClick });
		element.props.onClick();
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
