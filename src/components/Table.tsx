import { ReactNode } from 'react';
import TableStatic from '../staticComponents/TableStatic';

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
	return (
		<TableStatic
			rows={rows}
			headers={headers}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		/>
	);
};

export default Table;
