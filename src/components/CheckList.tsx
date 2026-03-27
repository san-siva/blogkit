'use client';

import { lazy, Suspense } from 'react';
import CheckListStatic, { type CheckListItem } from '../staticComponents/CheckListStatic';

const CheckListDynamic = lazy(() => import('../dynamicComponents/CheckListDynamic'));

interface CheckListProperties {
	items: CheckListItem[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const CheckList = ({
	items,
	hasMarginUp = false,
	hasMarginDown = false,
}: CheckListProperties) => {
	return (
		<Suspense
			fallback={
				<CheckListStatic items={items} hasMarginUp={hasMarginUp} hasMarginDown={hasMarginDown} />
			}
		>
			<CheckListDynamic items={items} hasMarginUp={hasMarginUp} hasMarginDown={hasMarginDown} />
		</Suspense>
	);
};

export { type CheckListItem };
export default CheckList;
