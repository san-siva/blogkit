'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import mermaid from 'mermaid';

import CalloutStatic from '../staticComponents/CalloutStatic';
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
	const [error, setError] = useState<string | null>(null);
	const mermaidReference = useRef<HTMLDivElement>(null);
	const renderCount = useRef(0);

	const initializeMermaid = useCallback(async () => {
		if (!mermaidReference.current || !code) return;
		const renderId = `mermaid-diagram-${id}-${++renderCount.current}`;
		document.getElementById(renderId)?.remove();
		try {
			const { svg, bindFunctions } = await mermaid.render(renderId, code);
			if (!mermaidReference.current || !svg) return;
			mermaidReference.current.innerHTML = svg;
			bindFunctions?.(mermaidReference.current);
			setEnabled(true);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to render diagram';
			setError(message);
		}
	}, [code, id]);

	useEffect(() => {
		if (!code) return;
		setError(null);
		const timer = setTimeout(initializeMermaid, 100);
		return () => clearTimeout(timer);
	}, [code, initializeMermaid]);

	return (
		<div
			className={`${styles.mermaid}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
		>
			{error ? (
				<CalloutStatic type="error">
					<p>
						<b>Diagram error:</b> {error}
					</p>
				</CalloutStatic>
			) : !enabled ? (
				<CalloutStatic type="info">
					<p>Rendering diagram...</p>
				</CalloutStatic>
			) : null}
			<div
				ref={mermaidReference}
				id={id}
				style={enabled ? undefined : { display: 'none' }}
			/>
		</div>
	);
};

export default Mermaid;
