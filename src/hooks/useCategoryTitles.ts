'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import type { ForwardedReference } from '../dynamicComponents/BlogDynamic';

export interface SectionReferenceValue {
	el: HTMLElement;
	title: string;
	depth: number;
}

export interface CategoryTitleValue extends SectionReferenceValue {
	lastUpdatedAt: number;
}

export type CategoryTitle = Map<string, CategoryTitleValue>;

interface SectionReferenceEntry extends SectionReferenceValue {
	baseId: string;
}

type SectionReference = Map<HTMLElement, SectionReferenceEntry>;

interface Options {
	visibleTitle: string | null;
	setVisibleTitle: Dispatch<SetStateAction<string | null>>;
	setShowTOC: Dispatch<SetStateAction<boolean>>;
}

export function useCategoryTitles({
	visibleTitle,
	setVisibleTitle,
	setShowTOC,
}: Options) {
	const sectionReferences = useRef<SectionReference>(new Map());
	const [categoryTitles, setCategoryTitles] = useState<CategoryTitle>(
		new Map()
	);
	const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const sortByDomPosition = useCallback(
		(
			[, a]: [HTMLElement, SectionReferenceEntry],
			[, b]: [HTMLElement, SectionReferenceEntry]
		) => {
			const position = a.el.compareDocumentPosition(b.el);
			if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
				return -1;
			} else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
				return 1;
			}
			return 0;
		},
		[]
	);

	const updateCategoryTitles = useCallback(() => {
		const now = Date.now();
		const newCategoryTitles = new Map<string, CategoryTitleValue>();

		const sectionsArray = Array.from(sectionReferences.current.entries());
		sectionsArray.sort(sortByDomPosition);

		let firstSectionId: string | null = null;
		const baseIdCounts = new Map<string, number>();
		for (const [, { title, el, depth, baseId }] of sectionsArray) {
			const occurrence = (baseIdCounts.get(baseId) ?? 0) + 1;
			baseIdCounts.set(baseId, occurrence);
			const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;

			if (!firstSectionId) {
				firstSectionId = id;
			}
			newCategoryTitles.set(id, {
				el,
				title,
				lastUpdatedAt: now,
				depth,
			});
		}

		if (newCategoryTitles.size === 0) return;

		setCategoryTitles(newCategoryTitles);
		setShowTOC(true);

		if (visibleTitle) return;
		setVisibleTitle(firstSectionId);
	}, [visibleTitle, sortByDomPosition, setShowTOC, setVisibleTitle]);

	const debounceUpdateCategoryTitles = useCallback(() => {
		if (updateTimerRef.current) {
			clearTimeout(updateTimerRef.current);
		}
		updateTimerRef.current = setTimeout(() => {
			updateCategoryTitles();
		}, 200);
	}, [updateCategoryTitles]);

	const handleCategoryTitle = (ref: HTMLDivElement) => {
		const baseId = ref.dataset.id;
		const title = ref.dataset.title;
		if (!baseId || !title) return;

		let depth = 0;
		let parent = ref.parentElement;
		while (parent) {
			if (parent.hasAttribute('data-id')) depth++;
			parent = parent.parentElement;
		}

		sectionReferences.current.set(ref, { el: ref, title, depth, baseId });
	};

	const processSection = (element: ForwardedReference) => {
		const { parentRef, childRefs } = element;
		if (parentRef) handleCategoryTitle(parentRef);
		if (Array.isArray(childRefs)) {
			for (const childRef of childRefs) {
				processSection(childRef);
			}
		}
	};

	const handleSectionReference = useCallback(
		(element: ForwardedReference) => {
			if (!element) return;
			processSection(element);
			debounceUpdateCategoryTitles();
		},
		[debounceUpdateCategoryTitles]
	);

	useEffect(() => {
		return () => {
			if (updateTimerRef.current) {
				clearTimeout(updateTimerRef.current);
			}
		};
	}, []);

	return { categoryTitles, handleSectionReference };
}
