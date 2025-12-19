import styles from '../styles/CodeBlock.module.scss';

interface Properties {
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
	language?: string;
	code?: string;
}

const CodeBlockStatic = ({
	language = 'javascript',
	code = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: Properties) => {
	return (
		<div
			className={`${styles['code-block']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			} ${styles['code-block--static']}`}
		>
			<div className={styles['code-block__header']}>
				<div className={styles['code-block__header__title']}>{language}</div>
			</div>
			<div className={styles['code-block__wrapper']}>
				<pre>
					<code>{code}</code>
				</pre>
			</div>
		</div>
	);
};

export default CodeBlockStatic;
