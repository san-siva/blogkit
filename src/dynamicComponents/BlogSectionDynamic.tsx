'use client';

import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';

import type { ReactNode, RefAttributes } from 'react';

import styles from '../styles/BlogSection.module.scss';

import type { ForwardedReference } from './BlogDynamic';
import { generateIdForBlogTitle, generateSectionHref } from '../utils';

interface BlogProperties {
	title?: string;
	category?: string;
	children?: ReactNode;
	increaseMarginBottom?: boolean;
}

const BlogSection = forwardRef<ForwardedReference, BlogProperties>(
	(
		{
			title = '',
			category = '',
			children = null,
			increaseMarginBottom = false,
		}: BlogProperties,
		forwardedReference
	) => {
		const titleWithCategory = category ? `${category} - ${title}` : title;
		const id = generateIdForBlogTitle(titleWithCategory);

		const parentReference = useRef<ForwardedReference['parentRef']>(null);
		const childReferences = useRef<ForwardedReference['childRefs']>([]);
		const imperativeHandleRef = useRef<ForwardedReference | null>(null);

		useImperativeHandle(forwardedReference, () => {
			const handle = {
				parentRef: parentReference.current!,
				childRefs: childReferences.current!,
			};
			imperativeHandleRef.current = handle;
			return handle;
		});

		// Re-register when title or category changes so the TOC reflects the updated heading
		useEffect(() => {
			if (typeof forwardedReference === 'function' && imperativeHandleRef.current) {
				forwardedReference(imperativeHandleRef.current);
			}
		}, [title, category]); // eslint-disable-line react-hooks/exhaustive-deps

		const handleChildReferences = (element: ForwardedReference | null) => {
			if (!element) return;
			const { parentRef: subParentReference } = element;
			if (!subParentReference) return;

			// Avoid registering the same child section twice
		const alreadyRegistered = childReferences.current.some(
				ref => ref.parentRef === subParentReference
			);
			if (!alreadyRegistered) {
				childReferences.current.push(element);
			}

			if (typeof forwardedReference === 'function' && imperativeHandleRef.current) {
				forwardedReference(imperativeHandleRef.current);
			}
		};

		return (
			<div
				className={`${styles['blog-section']}
					${
						increaseMarginBottom
							? styles['margin-bottom--9']
							: styles['margin-bottom--6']
					}`}
				data-title={title}
				data-id={id}
				ref={parentReference}
			>
				{title ? (
					<h4 className={styles['blog-section__title']}>
						<a href={generateSectionHref(id)} className={styles['blog-section__title-link']} onClick={e => e.preventDefault()}>
							{title}
						</a>
					</h4>
				) : null}
				{Children.map(children, child => {
					if (!isValidElement(child)) return child;
					return cloneElement(child, {
						ref: handleChildReferences,
					} as RefAttributes<ForwardedReference>);
				})}
			</div>
		);
	}
);

BlogSection.displayName = 'BlogSection';

export default BlogSection;
