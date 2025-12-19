import { ReactNode } from 'react';
import TableDynamic from '../dynamicComponents/TableDynamic';

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
		<TableDynamic
			rows={rows}
			headers={headers}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		/>
	);
};

export default Table;
