import type { ReactNode } from 'react';

import styles from '../styles/Callout.module.scss';

interface CalloutProperties {
	children?: ReactNode;
	type: 'info' | 'warning' | 'error' | 'success';
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const Callout = ({ children, type = 'info',
	hasMarginUp = false,
	hasMarginDown = false
}: CalloutProperties) => {
	const className = `${styles.callout} ${styles[`callout--${type}`]} ${
		hasMarginUp ? styles['margin-top--1'] : ''
	} ${hasMarginDown ? styles['margin-bottom--2'] : ''}`;
	return (
		<div className={className}>
			<div className={styles.callout__icon}/>
			<div className={styles.callout__wrapper}>{children}</div>
		</div>
	);
};

export default Callout;
