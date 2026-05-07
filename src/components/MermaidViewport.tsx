import type { PanZoom } from '../hooks/usePanZoom';

interface MermaidViewportProps {
	className: string;
	draggingClassName: string;
	pan: PanZoom;
	contentRef: React.RefObject<HTMLDivElement>;
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
}: MermaidViewportProps) => (
	<div
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

export default MermaidViewport;
