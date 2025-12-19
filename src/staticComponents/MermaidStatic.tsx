import CodeBlockStatic from './CodeBlockStatic';

interface MermaidStaticProperties {
	code: string;
	id: string;
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

const MermaidStatic = ({
	code = '',
	id = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: MermaidStaticProperties) => {
	return (
		<CodeBlockStatic
			language="mermaid"
			code={code}
			hasMarginUp={hasMarginUp}
			hasMarginDown={hasMarginDown}
		/>
	);
};

export default MermaidStatic;
