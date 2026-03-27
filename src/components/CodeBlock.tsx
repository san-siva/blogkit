import CodeBlockStatic from '../staticComponents/CodeBlockStatic';

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
		<CodeBlockStatic
			language={language}
			code={code}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		/>
	);
};

export default CodeBlock;
