import { useEffect, useRef } from 'react';

import type { PanZoom } from '../hooks/usePanZoom';

interface MermaidViewportProps {
	className: string;
	draggingClassName: string;
	pan: PanZoom;
	contentRef: React.RefObject<HTMLDivElement | null>;
	contentId?: string;
	hidden?: boolean;
}

const MermaidViewport = ({
	className,
	draggingClassName,
	pan,
	contentRef,
	contentId,
	hidden,
}: MermaidViewportProps) => {
	const viewportRef = useRef<HTMLDivElement>(null);
	const { zoomAtPoint } = pan;

	useEffect(() => {
		const el = viewportRef.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			if (!e.ctrlKey) return;
			e.preventDefault();
			const rect = el.getBoundingClientRect();
			zoomAtPoint(e.deltaY, e.clientX - rect.left, e.clientY - rect.top);
		};
		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, [zoomAtPoint]);

	return (
		<div
			ref={viewportRef}
			className={`${className} ${pan.isDragging ? draggingClassName : ''}`}
			style={hidden ? { display: 'none' } : undefined}
			onMouseDown={pan.onMouseDown}
			onMouseMove={pan.onMouseMove}
			onMouseUp={pan.onMouseUp}
			onMouseLeave={pan.onMouseUp}
		>
			<div
				style={{
					transform: `translate(${pan.transform.x}px, ${pan.transform.y}px) scale(${pan.transform.scale})`,
					transformOrigin: '0 0',
					transition: pan.isDragging ? 'none' : 'transform 0.1s ease',
				}}
			>
				<div ref={contentRef} id={contentId} />
			</div>
		</div>
	);
};

export default MermaidViewport;
