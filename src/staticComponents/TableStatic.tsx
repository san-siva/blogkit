import { ReactNode } from 'react';
import styles from '../styles/Table.module.scss';

interface TableProperties {
	rows?: ReactNode[][];
	headers?: ReactNode[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
	fontSize?: string;
}

const Table = ({
	rows = [],
	headers = [],
	hasMarginUp = false,
	hasMarginDown = false,
	fontSize,
}: TableProperties) => {
	const columnCount = headers.length;

	return (
		<div
			className={`${styles.table}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
			style={{
				gridTemplateColumns: `repeat(${columnCount}, auto)`,
			}}
		>
			<div className={`${styles['table__header']}`}>
				{headers.map((header, index) => (
					<div
						key={typeof header === 'string' ? header : index}
						className={`${styles['table__header__cell']}`}
						style={fontSize ? { fontSize } : undefined}
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
							style={fontSize ? { fontSize } : undefined}
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
