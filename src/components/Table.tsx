import styles from '../styles/Table.module.scss';

interface TableProperties {
	rows?: string[][];
	headers?: string[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const Table = ({
	rows = [],
	headers = [],
	hasMarginUp = false,
	hasMarginDown = false,
}: TableProperties) => {
	const maxWidths = headers.map(element => element.length);
	rows.forEach(row => {
		row.forEach((element, index) => {
			maxWidths[index] = Math.max(maxWidths[index], element.length);
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
						key={header}
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
							key={cell}
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
