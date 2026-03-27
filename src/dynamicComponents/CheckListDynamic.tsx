'use client';

import { useEffect, useRef, useState } from 'react';

import type { CheckListItem } from '../staticComponents/CheckListStatic';
import styles from '../styles/CheckList.module.scss';

interface Properties {
	items: CheckListItem[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const CHECKBOX_SIZE = 12;
const P_TAG_FONT_SIZE = 16;

const CheckListDynamic = ({
	items,
	hasMarginUp = false,
	hasMarginDown = false,
}: Properties) => {
	const [checkboxMarginTop, setCheckboxMarginTop] = useState(0);
	const measureRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!measureRef.current) return;
		const p = measureRef.current.querySelector('p');
		if (!p) return;
		const rawLineHeight = getComputedStyle(p).lineHeight;
		const lineHeight =
			rawLineHeight === 'normal'
				? P_TAG_FONT_SIZE * 1.2
				: parseFloat(rawLineHeight);
		if (!isNaN(lineHeight)) {
			setCheckboxMarginTop(Math.max(0, (lineHeight - CHECKBOX_SIZE) / 2));
		}
	}, []);

	return (
		<div
			className={`${styles['check-list']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			}`}
		>
			{items.map((item, index) => (
				<div
					key={item.id}
					className={styles['check-list__item']}
					style={{ alignItems: 'flex-start' }}
					data-id={item.id}
					ref={index === 0 ? measureRef : undefined}
				>
					<div
						className={`${styles['check-list__item__input']} ${
							item.isChecked ? styles['check-list__item__input--checked'] : ''
						}`}
						style={{ marginTop: `${checkboxMarginTop}px` }}
					/>
					{item.children}
				</div>
			))}
		</div>
	);
};

export default CheckListDynamic;
