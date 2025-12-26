import { ReactNode } from 'react';
import TableStatic from '../staticComponents/TableStatic';

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
	return (
		<TableStatic
			rows={rows}
			headers={headers}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
			fontSize={fontSize}
		/>
	);
};

export default Table;
