import type { HTMLAttributes, ReactElement } from 'react';

import Checkbox from '../components/Checkbox';
import styles from '../styles/CheckList.module.scss';

export interface CheckListItem {
	id: string;
	children: ReactElement<HTMLAttributes<HTMLParagraphElement>, 'p'>;
	isChecked?: boolean;
	onClick?: () => void;
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
					<Checkbox isChecked={item.isChecked} onClick={item.onClick} />
					{item.children}
				</div>
			))}
		</div>
	);
};

export default CheckListStatic;
