'use client';

import {
	Children,
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import type { MouseEvent, ReactNode, RefAttributes } from 'react';

import styles from '../styles/Blog.module.scss';

interface BlogProperties {
	children: ReactNode;
	title?: string;
}

export interface ForwardedReference {
	parentRef: HTMLDivElement;
	childRefs: HTMLDivElement[];
}

interface SectionReferenceValue {
	el: HTMLElement;
	title: string;
	isSubSection: boolean;
}

type SectionReference = Map<string, SectionReferenceValue>;

interface CategoryTitleValue extends SectionReferenceValue {
	lastUpdatedAt: number;
}

type CategoryTitle = Map<string, CategoryTitleValue>;

type AddPaddingTopTimerReference = ReturnType<typeof setTimeout> | null;

const Blog = ({ children, title = 'In this article' }: BlogProperties) => {
	const addPaddingTopTimerReference = useRef<AddPaddingTopTimerReference>(null);
	const highlightCategoryTimerReference =
		useRef<AddPaddingTopTimerReference>(null);

	const clearTimers = (
		addPaddingTopTimerReference_: AddPaddingTopTimerReference,
		highlightCategoryTimerReference_: AddPaddingTopTimerReference
	) => {
		if (addPaddingTopTimerReference_) {
			clearTimeout(addPaddingTopTimerReference_);
		}
		if (highlightCategoryTimerReference_) {
			clearTimeout(highlightCategoryTimerReference_);
		}
	};

	const sectionReferences = useRef<SectionReference>(new Map());
	const [categoryTitles, setCategoryTitles] = useState<CategoryTitle>(
		new Map()
	);
	const [visibleTitle, setVisibleTitle] = useState<string | null>(null);
	const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const updateCategoryTitles = useCallback(() => {
		let firstSectionId: string | null = null;
		const now = Date.now();
		const newCategoryTitles = new Map<string, CategoryTitleValue>();

		for (const [id, { title, el, isSubSection }] of sectionReferences.current) {
			if (!firstSectionId) {
				firstSectionId = id;
			}
			newCategoryTitles.set(id, {
				el,
				title,
				lastUpdatedAt: now,
				isSubSection,
			});
		}

		if (newCategoryTitles.size > 0) {
			setCategoryTitles(newCategoryTitles);
			if (!visibleTitle) {
				setVisibleTitle(firstSectionId);
			}
		}
	}, [visibleTitle]);

	const debounceUpdateCategoryTitles = useCallback(() => {
		// Clear existing timer and set a new one to batch updates
		if (updateTimerRef.current) {
			clearTimeout(updateTimerRef.current);
		}
		updateTimerRef.current = setTimeout(() => {
			updateCategoryTitles();
		}, 50);
	}, [updateCategoryTitles]);

	useEffect(() => {
		const observers = new Map<string, IntersectionObserver>();
		for (const [id, { el }] of categoryTitles) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) return;
					setVisibleTitle(visibleId => {
						if (visibleId === id && !entry.isIntersecting) return null;
						if (entry.isIntersecting) return id;
						return visibleId;
					});
				},
				{ threshold: 0.1 }
			);
			observers.set(id, observer);
			observer.observe(el);
		}
		return () => {
			for (const observer of observers.values()) {
				observer.disconnect();
			}
		};
	}, [categoryTitles.size]);

	useEffect(() => {
		return () => {
			clearTimers(
				addPaddingTopTimerReference.current,
				highlightCategoryTimerReference.current
			);
			if (updateTimerRef.current) {
				clearTimeout(updateTimerRef.current);
			}
		};
	}, []);

	const handleSectionReference = useCallback((element: ForwardedReference) => {
		if (!element) return;
		const { parentRef, childRefs } = element;

		// Add parent section reference
		if (parentRef) {
			const id = parentRef.dataset.id;
			const title = parentRef.dataset.title;
			if (id && title) {
				sectionReferences.current.set(id, {
					el: parentRef,
					title,
					isSubSection: false,
				});
			}
		}

		// Add child section references
		if (Array.isArray(childRefs)) {
			for (const childRef of childRefs) {
				if (!childRef) continue;
				const id = childRef.dataset.id;
				const title = childRef.dataset.title;
				if (id && title) {
					sectionReferences.current.set(id, {
						el: childRef,
						title,
						isSubSection: true,
					});
				}
			}
		}

		debounceUpdateCategoryTitles();
	}, [debounceUpdateCategoryTitles]);

	const handleClickCategoryTitle = (
		error: MouseEvent<HTMLParagraphElement>
	) => {
		const id = error.currentTarget.dataset.id;
		const index = error.currentTarget.dataset.idx;
		if (!id || !index) return;

		const { el } = categoryTitles.get(id) || {};
		if (!el) return;

		const top = el.getBoundingClientRect().top + document.body.scrollTop - 100;
		document.body.scrollTo({
			top,
			behavior: 'smooth',
		});

		const timer = setTimeout(() => {
			setVisibleTitle(id);
			clearTimeout(timer);
		}, 1000);
	};


	return (
		<div className={styles.blog}>
			<div className={styles['blog__content']}>
				{Children.map(children, child => {
					if (!isValidElement(child)) return child;
					return cloneElement(child, {
						ref: handleSectionReference,
					} as RefAttributes<ForwardedReference>);
				})}
			</div>
			<div className={styles['blog__sidebar']}>
				<p
					className={`${styles['margin-bottom--3']} ${styles['category__header']}`}
				>
					{title}
				</p>
				{[...categoryTitles].map(
					([id, { title, isSubSection }], index, array) => {
						const isNextSectionSubSection = array[index + 1]?.[1]?.isSubSection;
						return (
							<p
								key={id}
								data-idx={index}
								data-id={id}
								className={`${styles['category__title']} ${
									id === visibleTitle ? styles['category__title--active'] : ''
								} ${isSubSection ? styles['category__title--sub'] : ''} ${
									isSubSection && !isNextSectionSubSection
										? styles['margin-bottom-imp--2']
										: ''
								}`}
								onClick={handleClickCategoryTitle}
							>
								{title}
							</p>
						);
					}
				)}
			</div>
		</div>
	);
};

export default Blog;
