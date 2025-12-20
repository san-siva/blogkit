import type { ReactNode } from 'react';
import CalloutStatic from '../staticComponents/CalloutStatic';

interface CalloutProperties {
	children?: ReactNode;
	type: 'info' | 'warning' | 'error' | 'success';
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const Callout = ({
	children,
	type = 'info',
	hasMarginUp = false,
	hasMarginDown = false,
}: CalloutProperties) => {
	return (
		<CalloutStatic
			type={type}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		>
			{children}
		</CalloutStatic>
	);
};

export default Callout;
