'use client';

import { lazy, ReactNode, Suspense } from 'react';
import TableStatic from '../staticComponents/TableStatic';

const TableDynamic = lazy(() => import('../dynamicComponents/TableDynamic'));

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
		<Suspense
			fallback={
				<TableStatic
					rows={rows}
					headers={headers}
					hasMarginUp={hasMarginUp}
					hasMarginDown={hasMarginDown}
					fontSize={fontSize}
				/>
			}
		>
			<TableDynamic
				rows={rows}
				headers={headers}
				hasMarginUp={hasMarginUp}
				hasMarginDown={hasMarginDown}
				fontSize={fontSize}
			/>
		</Suspense>
	);
};

export default Table;
