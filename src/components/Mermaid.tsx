'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import mermaid from 'mermaid';

import styles from '../styles/Mermaid.module.scss';

interface MermaidProperties {
	code: string;
	id: string;
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
}

mermaid.initialize({
	startOnLoad: false,
	theme: 'default',
	timeline: {
		useMaxWidth: true,
		diagramMarginX: 0,
	},
	flowchart: {
		useMaxWidth: true,
		diagramPadding: 0,
	},
	sequence: {
		useMaxWidth: true,
		diagramMarginX: 0,
	},
});

const Mermaid = ({
	code = '',
	id = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: MermaidProperties) => {
	const [enabled, setEnabled] = useState(false);
	const mermaidReference = useRef<HTMLDivElement>(null);

	const initializeMermaid = useCallback(async () => {
		try {
			if (!mermaidReference.current || !code) return;
			const { svg, bindFunctions } = await mermaid.render(
				`mermaid-diagram-${id}`,
				code
			);
			if (!svg) return;
			mermaidReference.current.innerHTML = svg || '';
			bindFunctions?.(mermaidReference.current);
			setEnabled(true);
		} catch (error) {
			console.error('Failed to render Mermaid diagram:', error);
		}
	}, [code, id]);

	useEffect(() => {
		if (!code || !mermaidReference.current) return;
		const timer = setTimeout(async () => {
			await initializeMermaid();
		}, 100);
		return () => clearTimeout(timer);
	}, [code, initializeMermaid]);

	return (
		<div
			className={`${styles.mermaid}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
		>
			{enabled ? null : <p>Diagram Loading...</p>}
			<div ref={mermaidReference} id={id}></div>
		</div>
	);
};

export default Mermaid;
