import { lazy, Suspense } from 'react';
import MermaidStatic from '../staticComponents/MermaidStatic';

const MermaidDynamic = lazy(
	() => import('../dynamicComponents/MermaidDynamic')
);

interface MermaidProperties {
	code: string;
	id: string;
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const Mermaid = ({
	code = '',
	id = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: MermaidProperties) => {
	return (
		<Suspense
			fallback={
				<MermaidStatic
					code={code}
					id={id}
					hasMarginUp={hasMarginUp}
					hasMarginDown={hasMarginDown}
				/>
			}
		>
			<MermaidDynamic
				code={code}
				id={id}
				hasMarginUp={hasMarginUp}
				hasMarginDown={hasMarginDown}
			/>
		</Suspense>
	);
};

export default Mermaid;
