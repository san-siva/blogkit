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

import type { HTMLAttributes, ReactElement, ReactNode, RefAttributes } from 'react';

import styles from '../styles/BlogSection.module.scss';

import type { ForwardedReference } from './BlogDynamic';
import { generateIdForBlogTitle, generateSectionHref } from '../utils';

interface BlogProperties {
	title?: string | ReactElement<HTMLAttributes<HTMLParagraphElement>, 'p'>;
	category?: string;
	children?: ReactNode;
}

const BlogSection = forwardRef<ForwardedReference, BlogProperties>(
	(
		{ title = '', category = '', children = null }: BlogProperties,
		forwardedReference
	) => {
		const titleString = typeof title === 'string' ? title : '';
		const titleWithCategory = category ? `${category} - ${titleString}` : titleString;
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
			if (
				typeof forwardedReference === 'function' &&
				imperativeHandleRef.current
			) {
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

			if (
				typeof forwardedReference === 'function' &&
				imperativeHandleRef.current
			) {
				forwardedReference(imperativeHandleRef.current);
			}
		};

		return (
			<div
				className={styles['blog-section']}
				data-title={titleString}
				data-id={id}
				ref={parentReference}
			>
				<h3
					className={`${styles['blog-section__title']} ${title ? '' : styles['blog-section__title--empty']}`}
				>
					{title ? (
						<a
							href={generateSectionHref(id)}
							className={styles['blog-section__title-link']}
							onClick={e => e.preventDefault()}
						>
							{title}
						</a>
					) : (
						<p>No title</p>
					)}
				</h3>
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
