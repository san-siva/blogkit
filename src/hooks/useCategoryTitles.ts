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

type SectionReference = Map<string, SectionReferenceValue>;

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
			[, a]: [string, SectionReferenceValue],
			[, b]: [string, SectionReferenceValue]
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
		for (const [id, { title, el, depth }] of sectionsArray) {
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

	const removeStaleRefs = (ref: HTMLDivElement) => {
		for (const [existingId, { el }] of sectionReferences.current) {
			if (el !== ref) {
				continue;
			}
			sectionReferences.current.delete(existingId);
			break;
		}
	};

	const handleCategoryTitle = (ref: HTMLDivElement) => {
		const id = ref.dataset.id;
		const title = ref.dataset.title;
		if (!id || !title) return;

		let depth = 0;
		let parent = ref.parentElement;
		while (parent) {
			if (parent.hasAttribute('data-id')) depth++;
			parent = parent.parentElement;
		}

		removeStaleRefs(ref);
		sectionReferences.current.set(id, { el: ref, title, depth });
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
