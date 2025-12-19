import type { ReactNode } from 'react';
import CalloutDynamic from '../dynamicComponents/CalloutDynamic';

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
		<CalloutDynamic
			type={type}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		>
			{children}
		</CalloutDynamic>
	);
};

export default Callout;
