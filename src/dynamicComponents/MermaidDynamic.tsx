'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import mermaid from 'mermaid';

import ContentToolbar from '../components/ContentToolbar';
import MermaidViewport from '../components/MermaidViewport';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useFullscreenModal } from '../hooks/useFullscreenModal';
import { usePanZoom } from '../hooks/usePanZoom';
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
	const [isExpanded, setIsExpanded] = useState(false);

	const mermaidReference = useRef<HTMLDivElement>(null);
	const modalMermaidReference = useRef<HTMLDivElement>(null);
	const renderCount = useRef(0);

	const { isCopied, copy } = useCopyToClipboard();
	const closeModal = useCallback(() => setIsExpanded(false), []);
	useFullscreenModal(isExpanded, closeModal);

	const inline = usePanZoom();
	const modal = usePanZoom();

	const renderInto = useCallback(
		async (target: HTMLDivElement | null, prefix: string) => {
			if (!target || !code) return false;
			const renderId = `${prefix}-${id}-${++renderCount.current}`;
			try {
				const { svg, bindFunctions } = await mermaid.render(renderId, code);
				if (!svg) return false;
				target.innerHTML = svg;
				bindFunctions?.(target);
				return true;
			} catch (err) {
				const message =
					err instanceof Error ? err.message : 'Failed to render diagram';
				setError(message);
				return false;
			}
		},
		[code, id]
	);

	useEffect(() => {
		if (!code) return;
		setError(null);
		inline.reset();
		const timer = setTimeout(() => {
			renderInto(mermaidReference.current, 'mermaid-diagram').then(ok => {
				if (ok) setEnabled(true);
			});
		}, 100);
		return () => clearTimeout(timer);
	}, [code, renderInto, inline.reset]);

	useEffect(() => {
		if (!isExpanded) return;
		modal.reset();
		const timer = setTimeout(() => {
			renderInto(modalMermaidReference.current, 'mermaid-modal');
		}, 0);
		return () => clearTimeout(timer);
	}, [isExpanded, renderInto, modal.reset]);

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
			) : (
				<ContentToolbar
					className={styles['mermaid__controls']}
					autoInside
					isExpanded={false}
					isCopied={isCopied}
					onCopy={() => copy(code)}
					onZoomIn={inline.zoomIn}
					onZoomOut={inline.zoomOut}
					onReset={inline.reset}
					onToggleExpand={() => setIsExpanded(true)}
				/>
			)}
			<MermaidViewport
				className={styles['mermaid__viewport']}
				draggingClassName={styles['mermaid__viewport--dragging']}
				pan={inline}
				contentRef={mermaidReference}
				contentId={id}
				hidden={!enabled}
			/>

			{isExpanded &&
				typeof document !== 'undefined' &&
				createPortal(
					<div
						className={styles['mermaid__modal']}
						onClick={() => setIsExpanded(false)}
						role="dialog"
						aria-modal="true"
					>
						<div
							className={styles['mermaid__modal__content']}
							onClick={e => e.stopPropagation()}
						>
							<ContentToolbar
								className={styles['mermaid__modal__controls']}
								isExpanded={true}
								isCopied={isCopied}
								onCopy={() => copy(code)}
								onZoomIn={modal.zoomIn}
								onZoomOut={modal.zoomOut}
								onReset={modal.reset}
								onToggleExpand={() => setIsExpanded(false)}
							/>
							<MermaidViewport
								className={styles['mermaid__modal__viewport']}
								draggingClassName={styles['mermaid__modal__viewport--dragging']}
								pan={modal}
								contentRef={modalMermaidReference}
							/>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default Mermaid;
