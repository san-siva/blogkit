import CheckListStatic, {
	type CheckListItem,
} from '../staticComponents/CheckListStatic';

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
		<CheckListStatic
			items={items}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		/>
	);
};

export { type CheckListItem };
export default CheckList;
