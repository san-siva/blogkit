'use client';

import type { NextPage } from 'next';

import '@san-siva/stylekit/index.module.scss';
import styles from './page.module.scss';

import { BlogStatic } from '@san-siva/blogkit';
import { BlogSectionStatic } from '@san-siva/blogkit';
import { BlogLinkStatic } from '@san-siva/blogkit';
import { CodeBlockStatic } from '@san-siva/blogkit';
import { MermaidStatic } from '@san-siva/blogkit';

import { Blog } from '@san-siva/blogkit';
import { BlogHeader } from '@san-siva/blogkit';
import { BlogSection } from '@san-siva/blogkit';
import { Callout } from '@san-siva/blogkit';
import { CodeBlock } from '@san-siva/blogkit';
import { Mermaid } from '@san-siva/blogkit';
import { BlogLink } from '@san-siva/blogkit';
import { Table } from '@san-siva/blogkit';

import { CODE_EXAMPLES } from './codeExamples';

const BlogkitDocumentation: NextPage = () => {
	return (
		<BlogStatic>
			<BlogHeader
				title={['Blogkit Documentation']}
				desc={[
					'A reusable, feature-rich blog component library for React and Next.js applications',
				]}
			/>

			<BlogSectionStatic title="Overview">
				<p className="margin-bottom--2">
					Blogkit is a comprehensive component library built with TypeScript and
					SCSS modules, providing everything you need to create beautiful,
					interactive blog posts with code highlighting, diagrams, callouts, and
					more.
				</p>
				<p>
					See Blogkit in action on{' '}
					<a
						href="https://santhoshsiva.dev"
						target="_blank"
						rel="noopener noreferrer"
						className={styles['a--highlighted']}
					>
						santhoshsiva.dev
					</a>
					, where it powers blog listings, table of contents navigation, and
					rich content with Mermaid diagrams.
				</p>
			</BlogSectionStatic>

			<BlogSectionStatic title="Installation">
				<p className="margin-bottom--2">
					Install Blogkit directly from GitHub using npm or yarn:
				</p>
				<CodeBlockStatic
					hasMarginDown
					language="bash"
					code={CODE_EXAMPLES.installation}
				/>
			</BlogSectionStatic>

			<BlogSectionStatic title="Quick Start">
				<p className="margin-bottom--2">
					Here's a simple example to get you started:
				</p>
				<CodeBlockStatic
					hasMarginDown
					language="tsx"
					code={CODE_EXAMPLES.quickStart}
				/>
			</BlogSectionStatic>

			<BlogSectionStatic title="Core Components">
				<BlogSectionStatic title="Blog">
					<p className="margin-bottom--2">
						The main container component that wraps all your blog content.
					</p>
					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.blog}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="BlogHeader">
					<p className="margin-bottom--2">
						Display a title and description at the top of your blog post.
					</p>
					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.blogHeader}
					/>
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['title', 'string[]', 'Array of title lines'],
							['desc', 'string[]', 'Array of description lines'],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="BlogSection">
					<p className="margin-bottom--2">
						Create sections within your blog post with optional titles.
					</p>
					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.blogSection}
					/>
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['title', 'string', 'Section title (optional)'],
							[
								'hasMarginBottom',
								'boolean',
								'Add margin at the bottom (optional)',
							],
							['children', 'ReactNode', 'Section content'],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="CodeBlock">
					<p className="margin-bottom--2">
						Display syntax-highlighted code blocks with support for multiple
						programming languages.
					</p>
					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.codeBlock}
					/>
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['code', 'string', 'Code to display'],
							[
								'language',
								'string',
								'Programming language for syntax highlighting',
							],
							[
								'hasMarginDown',
								'boolean',
								'Add margin below the code block (optional)',
							],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="Callout">
					<p className="margin-bottom--2">
						Highlight important information with styled callout boxes.
					</p>

					<div
						style={{
							marginTop: '24px',
							marginBottom: '24px',
							display: 'grid',
							gridGap: '16px',
							rowGap: '16px',
							gridAutoFlow: 'rows',
							gridTemplateColumns: 'repeat(auto-fill, max-content)',
						}}
					>
						<Callout type="info">
							<p>
								<b>Information:</b> This is an informative message, often used
								to provide
								<br />
								context or <b>additional details</b> to users.
							</p>
						</Callout>
						<Callout type="warning">
							<p>
								<b>Warning:</b> This is a warning message, typically used to
								alert users of
								<br />
								potential risks or issues.
							</p>
						</Callout>
						<Callout type="error">
							<p>
								<b>Error:</b> This is an error message, used to notify users of
								critical
								<br />
								problems or failures.
							</p>
						</Callout>
						<Callout type="success">
							<p>
								<b>Success:</b> This is a success message, indicating that an
								action or
								<br />
								operation was completed <i>successfully</i>.
							</p>
						</Callout>
					</div>

					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.callout}
					/>

					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							[
								'type',
								'"info" | "success" | "warning" | "error"',
								'Callout style',
							],
							['hasMarginDown', 'boolean', 'Add margin below (optional)'],
							['children', 'ReactNode', 'Callout content'],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="Mermaid">
					<p className="margin-bottom--2">
						Render diagrams and visualizations using Mermaid syntax. Supports
						flowcharts, sequence diagrams, timelines, and more.
					</p>

					<MermaidStatic
						id="example-flowchart"
						code={`flowchart LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]
    C --> D`}
						hasMarginDown
					/>

					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.mermaid}
					/>

					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['id', 'string', 'Unique identifier for the diagram'],
							['code', 'string', 'Mermaid diagram code'],
							['hasMarginUp', 'boolean', 'Add margin above (optional)'],
							['hasMarginDown', 'boolean', 'Add margin below (optional)'],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="BlogLink">
					<p className="margin-bottom--2">
						Create animated links to blog posts with title, description, and
						hover effects.
					</p>

					<div className={styles.blogLinkContainer}>
						<BlogLinkStatic
							title="Getting Started with Blogkit"
							desc="Learn how to use Blogkit components in your Next.js application"
							href="https://santhoshsiva.dev"
						/>
					</div>

					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.blogLink}
					/>

					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['title', 'string', 'Link title'],
							['desc', 'string', 'Link description (optional)'],
							[
								'href',
								'string',
								'Custom URL (optional, defaults to /blog/[title-slug])',
							],
							[
								'isInProgress',
								'boolean',
								'Hide link if post is in progress (optional)',
							],
						]}
					/>
				</BlogSectionStatic>

				<BlogSectionStatic title="Table">
					<p className="margin-bottom--2">
						Display tabular data with headers and rows.
					</p>
					<CodeBlockStatic
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.table}
					/>
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['headers', '(string | ReactNode)[]', 'Table header cells'],
							['rows', '(string | ReactNode)[][]', 'Table rows'],
							['hasMarginDown', 'boolean', 'Add margin below (optional)'],
						]}
					/>
				</BlogSectionStatic>
			</BlogSectionStatic>

			<BlogSectionStatic title="Features">
				<ul className="margin-bottom--2">
					<li>
						<strong>Blog Layout with TOC:</strong> Responsive blog layout with
						sticky table of contents sidebar
					</li>
					<li>
						<strong>Code Highlighting:</strong> Syntax highlighting for multiple
						programming languages using Prism.js
					</li>
					<li>
						<strong>Mermaid Diagrams:</strong> Render flowcharts, sequence
						diagrams, timelines, and more
					</li>
					<li>
						<strong>Callouts:</strong> Info, warning, error, and success
						notification boxes
					</li>
					<li>
						<strong>Data Tables:</strong> Flexible table component with dynamic
						column sizing
					</li>
					<li>
						<strong>Blog Sections:</strong> Hierarchical section organization
						with auto-generated IDs
					</li>
					<li>
						<strong>Blog Links:</strong> Animated link cards for blog navigation
					</li>
					<li>
						<strong>TypeScript Support:</strong> Fully typed components with
						ReactNode support
					</li>
					<li>
						<strong>SCSS Modules:</strong> Scoped, customizable styles using
						stylekit
					</li>
					<li>
						<strong>Next.js Optimized:</strong> Works seamlessly with Next.js
						14, 15, and 16
					</li>
					<li>
						<strong>React 19 Ready:</strong> Full support for React 18 and 19
					</li>
				</ul>
			</BlogSectionStatic>

			<BlogSectionStatic title="Customization">
				<p className="margin-bottom--2">
					Blogkit uses SCSS modules for styling. You can customize the
					appearance by overriding CSS variables in stylekit or creating your
					own theme.
				</p>

				<BlogSectionStatic title="Key Variables">
					<ul className="margin-bottom--2">
						<li>
							<code>$color--primary</code> - Primary accent color
						</li>
						<li>
							<code>$color--secondary</code> - Secondary color
						</li>
						<li>
							<code>$color--error</code> - Error color
						</li>
						<li>
							<code>$font-family--primary</code> - Primary font family
						</li>
						<li>
							<code>$font-family--code</code> - Code font family
						</li>
						<li>
							<code>$border-radius</code> - Border radius for components
						</li>
					</ul>
				</BlogSectionStatic>
			</BlogSectionStatic>

			<BlogSectionStatic title="Browser Support">
				<ul className="margin-bottom--2">
					<li>Chrome (latest)</li>
					<li>Firefox (latest)</li>
					<li>Safari (latest)</li>
					<li>Edge (latest)</li>
				</ul>
			</BlogSectionStatic>

			<BlogSectionStatic title="Contributing">
				<p className={styles['margin-bottom--1']}>
					Contributions are welcome! Please fork the repository and submit pull
					requests. For bugs or feature requests, open an issue on the
					repository.
				</p>
				<a
					href="https://github.com/san-siva/blogkit"
					target="_blank"
					rel="noopener noreferrer"
					className={styles['a--highlighted']}
				>
					View source code, report issues, and contribute
				</a>
			</BlogSectionStatic>

			<BlogSectionStatic title="License">
				<p>This project is licensed under the MIT License.</p>
			</BlogSectionStatic>

			<BlogSectionStatic title="About">
				<p>
					<strong>Author:</strong> Santhosh Siva
					<br />
					<strong>GitHub:</strong>{' '}
					<a
						href="https://github.com/san-siva"
						target="_blank"
						rel="noopener noreferrer"
						className={styles['a--highlighted']}
					>
						https://github.com/san-siva
					</a>
				</p>
			</BlogSectionStatic>
		</BlogStatic>
	);
};

export default BlogkitDocumentation;
