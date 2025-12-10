import { ReactNode } from 'react';
import styles from '../styles/Table.module.scss';

interface TableProperties {
	rows?: ReactNode[][];
	headers?: ReactNode[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const Table = ({
	rows = [],
	headers = [],
	hasMarginUp = false,
	hasMarginDown = false,
}: TableProperties) => {
	const getStringLength = (element: ReactNode): number => {
		if (typeof element === 'string') {
			return element.length;
		}
		return 20; // Default width for non-string elements
	};

	const maxWidths = headers.map(element => getStringLength(element));
	rows.forEach(row => {
		row.forEach((element, index) => {
			maxWidths[index] = Math.max(maxWidths[index], getStringLength(element));
		});
	});

	return (
		<div
			className={`${styles.table}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
		>
			<div className={`${styles['table__header']}`}>
				{headers.map((header, index) => (
					<div
						key={typeof header === 'string' ? header : index}
						className={`${styles['table__header__cell']}`}
						style={{ width: `${maxWidths[index]}ch` }}
					>
						{header}
					</div>
				))}
			</div>
			{rows.map((row, index) => (
				<div key={index} className={`${styles['table__row']}`}>
					{row.map((cell, cellIndex) => (
						<div
							key={typeof cell === 'string' ? cell : cellIndex}
							className={`${styles['table__row__cell']}`}
							style={{ width: `${maxWidths[cellIndex]}ch` }}
						>
							{cell}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Table;
