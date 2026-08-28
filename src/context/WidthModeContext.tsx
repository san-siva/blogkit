'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'blogkit:increased-width-mode';

interface WidthModeContextValue {
	increasedWidthMode: boolean;
	setIncreasedWidthMode: (value: boolean) => void;
}

const WidthModeContext = createContext<WidthModeContextValue | null>(null);

interface WidthModeProviderProperties {
	children: ReactNode;
}

export const WidthModeProvider = ({ children }: WidthModeProviderProperties) => {
	const [increasedWidthMode, setIncreasedWidthMode] = useState(false);

	useEffect(() => {
		setIncreasedWidthMode(localStorage.getItem(STORAGE_KEY) === 'true');
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, String(increasedWidthMode));
	}, [increasedWidthMode]);

	return (
		<WidthModeContext.Provider
			value={{ increasedWidthMode, setIncreasedWidthMode }}
		>
			{children}
		</WidthModeContext.Provider>
	);
};

export const useWidthMode = () => useContext(WidthModeContext);
