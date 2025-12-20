import { lazy, Suspense } from 'react';
import CodeBlockStatic from '../staticComponents/CodeBlockStatic';

const CodeBlockDynamic = lazy(
	() => import('../dynamicComponents/CodeBlockDynamic')
);

interface CodeBlockProperties {
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
	language?: string;
	code?: string;
}

const CodeBlock = ({
	language = 'javascript',
	code = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: CodeBlockProperties) => {
	return (
		<Suspense
			fallback={
				<CodeBlockStatic
					language={language}
					code={code}
					hasMarginUp={hasMarginUp}
					hasMarginDown={hasMarginDown}
				/>
			}
		>
			<CodeBlockDynamic
				language={language}
				code={code}
				hasMarginUp={hasMarginUp}
				hasMarginDown={hasMarginDown}
			/>
		</Suspense>
	);
};

export default CodeBlock;
