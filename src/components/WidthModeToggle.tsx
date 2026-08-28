'use client';

import { useWidthMode } from '../context/WidthModeContext';

const WidthModeToggle = () => {
	const widthMode = useWidthMode();
	if (!widthMode) return null;

	const { increasedWidthMode, setIncreasedWidthMode } = widthMode;

	return (
		<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<input
				type="checkbox"
				checked={increasedWidthMode}
				onChange={event => setIncreasedWidthMode(event.target.checked)}
			/>
			Increased width mode
		</label>
	);
};

export default WidthModeToggle;
