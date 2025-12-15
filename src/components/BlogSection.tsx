'use client';

import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useImperativeHandle,
	useRef,
} from 'react';

import type { ReactNode, RefAttributes } from 'react';

import styles from '../styles/BlogSection.module.scss';

import type { ForwardedReference } from './Blog';
import { generateIdForBlogTitle } from '../utils';

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

		useImperativeHandle(forwardedReference, () => ({
			parentRef: parentReference.current!,
			childRefs: childReferences.current!,
		}));

		const handleChildReferences = (element: ForwardedReference | null) => {
			if (!element) return;
			const { parentRef: subParentReference } = element;
			if (!subParentReference) return;
			childReferences.current.push(subParentReference);
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
					<h4 className={styles['blog-section__title']}>{title}</h4>
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
