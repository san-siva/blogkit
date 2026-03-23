import type { ReactNode } from 'react';

import styles from '../styles/CheckList.module.scss';

export interface CheckListItem {
	id: string;
	children: ReactNode;
	isChecked?: boolean;
}

interface CheckListProperties {
	items: CheckListItem[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const CheckListStatic = ({
	items,
	hasMarginUp = false,
	hasMarginDown = false,
}: CheckListProperties) => {
	return (
		<div
			className={`${styles['check-list']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			}`}
		>
			{items.map((item) => (
				<div key={item.id} className={styles['check-list__item']} data-id={item.id}>
					<div
						className={`${styles['check-list__item__input']} ${
							item.isChecked ? styles['check-list__item__input--checked'] : ''
						}`}
					/>
					<div>{item.children}</div>
				</div>
			))}
		</div>
	);
};

export default CheckListStatic;
