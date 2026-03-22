'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { Dispatch, MouseEvent, SetStateAction } from 'react';

import lockScrollUpdates from '../utils/lockScrollUpdates';
import type { CategoryTitle } from './useCategoryTitles';

const getSectionFromUrl = () => {
	const url = new URL(window.location.href);
	return url.searchParams.get('section');
};

const updateUrl = (id: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set('section', id);
	window.history.replaceState({}, '', url.toString());
};

const scrollIntoView = (element: HTMLElement) => {
	if (!element) return;
	const top =
		element.getBoundingClientRect().top + document.body.scrollTop - 100;
	document.body.scrollTo({ top, behavior: 'smooth' });
};

interface Options {
	categoryTitles: CategoryTitle;
	setVisibleTitle: Dispatch<SetStateAction<string | null>>;
}

export function useSectionObserver({ categoryTitles, setVisibleTitle }: Options) {
	const isClickScrolling = useRef(false);
	const scrollEndHandlerRef = useRef<(() => void) | null>(null);
	const intersectionObserversRef = useRef<Map<string, IntersectionObserver>>(
		new Map()
	);

	// Set up IntersectionObservers whenever the set of sections changes
	useEffect(() => {
		for (const [id, { el }] of categoryTitles) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) return;
					if (isClickScrolling.current) return;
					if (document.body.scrollTop === 0) return;
					setVisibleTitle(visibleId => {
						if (visibleId === id && !entry.isIntersecting) return null;
						if (entry.isIntersecting) return id;
						return visibleId;
					});
					updateUrl(id);
				},
				{ threshold: 0.1 }
			);
			intersectionObserversRef.current.set(id, observer);
			observer.observe(el as HTMLElement);
		}
	}, [categoryTitles.size, setVisibleTitle]);

	// On initial load, scroll to section specified in URL
	useEffect(() => {
		if (categoryTitles.size === 0) return;
		const section = getSectionFromUrl();
		if (!section) return;
		const entry = categoryTitles.get(section);
		if (!entry) return;
		scrollIntoView(entry.el);
		lockScrollUpdates(section, isClickScrolling, scrollEndHandlerRef, setVisibleTitle);
	}, [categoryTitles.size, setVisibleTitle]);

	// Cleanup observers on unmount
	useEffect(() => {
		return () => {
			if (scrollEndHandlerRef.current) {
				document.body.removeEventListener('scrollend', scrollEndHandlerRef.current);
			}
			for (const observer of intersectionObserversRef.current.values()) {
				observer.disconnect();
			}
		};
	}, []);

	const handleClickCategoryTitle = useCallback(
		(event: MouseEvent<HTMLParagraphElement>) => {
			const id = event.currentTarget.dataset.id;
			const index = event.currentTarget.dataset.idx;
			if (!id || !index) return;

			const { el } = categoryTitles.get(id) || {};
			if (!el) return;

			updateUrl(id);
			scrollIntoView(el);
			lockScrollUpdates(id, isClickScrolling, scrollEndHandlerRef, setVisibleTitle);
		},
		[categoryTitles, setVisibleTitle]
	);

	return { handleClickCategoryTitle };
}
