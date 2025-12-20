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
import { useSpring, animated } from '@react-spring/web';

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

const Blog = ({ children, title = 'In this article' }: BlogProperties) => {
	const sectionReferences = useRef<SectionReference>(new Map());
	const [categoryTitles, setCategoryTitles] = useState<CategoryTitle>(
		new Map()
	);
	const [visibleTitle, setVisibleTitle] = useState<string | null>(null);
	const [showTOC, setShowTOC] = useState(false);

	const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const showTOCTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const sortByDomPosition = useCallback(
		(
			[, a]: [string, SectionReferenceValue],
			[, b]: [string, SectionReferenceValue]
		) => {
			const position = a.el.compareDocumentPosition(b.el);
			if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
				return -1; // a comes before b
			} else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
				return 1; // b comes before a
			}
			return 0;
		},
		[]
	);

	const updateCategoryTitles = useCallback(() => {
		const now = Date.now();
		const newCategoryTitles = new Map<string, CategoryTitleValue>();

		// Sort sections by their DOM position to maintain correct order
		const sectionsArray = Array.from(sectionReferences.current.entries());
		sectionsArray.sort(sortByDomPosition);

		let firstSectionId: string | null = null;
		for (const [id, { title, el, isSubSection }] of sectionsArray) {
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

		if (newCategoryTitles.size === 0) return;

		setCategoryTitles(newCategoryTitles);
		if (!showTOC) setShowTOC(true);

		if (visibleTitle) return;
		setVisibleTitle(firstSectionId);
	}, [visibleTitle, sortByDomPosition, showTOC, setShowTOC]);

	const debounceUpdateCategoryTitles = useCallback(() => {
		// Clear existing timer and set a new one to batch updates
		if (updateTimerRef.current) {
			clearTimeout(updateTimerRef.current);
		}
		updateTimerRef.current = setTimeout(() => {
			updateCategoryTitles();
		}, 200);
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
			if (updateTimerRef.current) {
				clearTimeout(updateTimerRef.current);
			}
			if (showTOCTimerRef.current) {
				clearTimeout(showTOCTimerRef.current);
			}
		};
	}, []);

	const handleSectionReference = useCallback(
		(element: ForwardedReference) => {
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
		},
		[debounceUpdateCategoryTitles]
	);

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

	const sidebarStyle = useSpring({
		opacity: showTOC ? 1 : 0,
		transform: showTOC ? 'translateX(0)' : 'translateX(80px)',
		config: { tension: 280, friction: 60 },
	});

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
			<animated.div className={styles['blog__sidebar']} style={sidebarStyle}>
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
			</animated.div>
		</div>
	);
};

export default Blog;
