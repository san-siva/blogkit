'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { Dispatch, MouseEvent, SetStateAction } from 'react';

import { getSectionFromUrl, setSectionInUrl as updateUrl } from '../utils';
import lockScrollUpdates from '../utils/lockScrollUpdates';
import type { CategoryTitle } from './useCategoryTitles';

const scrollIntoView = (element: HTMLElement) => {
	if (!element) return;
	const top =
		element.getBoundingClientRect().top + document.body.scrollTop - 100;
	document.body.scrollTo({ top, behavior: 'smooth' });
};

// `#why` or `?section=why` → `why`; anything else (external links, other pages) → null
export const getSectionIdFromHref = (href: string): string | null => {
	if (href.startsWith('#')) return decodeURIComponent(href.slice(1)) || null;
	if (href.startsWith('?')) return new URLSearchParams(href).get('section');
	return null;
};

// Markdown authors write GitHub-style anchors (`#1-suggest-module-names`) while
// section ids replace every non-word character (`1--suggest-module-names`), so
// fall back to comparing only the letters and digits.
const toComparableKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export const findSectionId = (
	categoryTitles: Map<string, unknown>,
	target: string
): string | null => {
	if (categoryTitles.has(target)) return target;
	const key = toComparableKey(target);
	if (!key) return null;
	for (const id of categoryTitles.keys()) {
		if (toComparableKey(id) === key) return id;
	}
	return null;
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
		const target = getSectionFromUrl();
		if (!target) return;
		const section = findSectionId(categoryTitles, target);
		if (!section) return;
		const entry = categoryTitles.get(section);
		if (!entry) return;
		updateUrl(section);
		scrollIntoView(entry.el);
		lockScrollUpdates(section, isClickScrolling, scrollEndHandlerRef, setVisibleTitle);
	}, [categoryTitles.size, setVisibleTitle]);

	// Intercept in-page links (`#why`, `?section=why`) so they scroll instead of reloading
	useEffect(() => {
		const handleDocumentClick = (event: globalThis.MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

			const anchor = (event.target as Element | null)?.closest?.('a[href]');
			if (!anchor) return;

			const target = getSectionIdFromHref(anchor.getAttribute('href') ?? '');
			if (!target) return;

			const id = findSectionId(categoryTitles, target);
			if (!id) return;

			const { el } = categoryTitles.get(id) || {};
			if (!el) return;

			event.preventDefault();
			updateUrl(id);
			scrollIntoView(el);
			lockScrollUpdates(id, isClickScrolling, scrollEndHandlerRef, setVisibleTitle);
		};

		document.addEventListener('click', handleDocumentClick);
		return () => document.removeEventListener('click', handleDocumentClick);
	}, [categoryTitles, setVisibleTitle]);

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
