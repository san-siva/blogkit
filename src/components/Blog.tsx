'use client';

import {
	Children,
	cloneElement,
	isValidElement,
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

	useEffect(() => {
		let firstSectionId: string | null = null;
		const now = Date.now();
		for (const [id, { title, el, isSubSection }] of sectionReferences.current) {
			if (!firstSectionId) {
				firstSectionId = id;
			}
			setCategoryTitles((previous: CategoryTitle) => {
				const newState = new Map(previous);
				newState.set(id, {
					el,
					title,
					lastUpdatedAt: now,
					isSubSection,
				});
				return newState;
			});
		}
		setVisibleTitle(firstSectionId);
	}, []);

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

	useEffect(
		() =>
			clearTimers(
				addPaddingTopTimerReference.current,
				highlightCategoryTimerReference.current
			),
		[addPaddingTopTimerReference, highlightCategoryTimerReference]
	);

	const addSectionReferences = (element: HTMLElement, isSubSection = false) => {
		if (!element) return;
		const id = element.dataset.id;
		if (!id) return;
		const title = element.dataset.title;
		if (!title) return;

		sectionReferences.current.set(id, {
			el: element,
			title,
			isSubSection,
		});
	};

	const handleSectionReference = (element: ForwardedReference) => {
		if (!element) return;
		const { parentRef, childRefs } = element;
		if (!parentRef) return;
		addSectionReferences(parentRef);
		if (!Array.isArray(childRefs)) return;
		for (const childReference of childRefs) {
			if (!childReference) continue;
			addSectionReferences(childReference, true);
		}
	};

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
