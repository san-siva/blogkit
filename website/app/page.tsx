import type { NextPage } from 'next';

import styles from './page.module.scss';

import {
	Blog,
	BlogHeader,
	BlogSection,
	BlogLink,
	CodeBlock,
	Mermaid,
	Callout,
	Table,
} from '@san-siva/blogkit';

import { CODE_EXAMPLES } from './codeExamples';

const BlogkitDocumentation: NextPage = () => {
	return (
		<Blog>
			<BlogHeader
				title={['Blogkit']}
				desc={[
					'A reusable, feature-rich blog component library for React and Next.js applications',
				]}
			/>

			<BlogSection title="Overview">
				<p className="margin-bottom--2">
					Blogkit is a comprehensive component library built with TypeScript and
					SCSS modules, providing everything you need to create beautiful,
					interactive blog posts with code highlighting, diagrams, callouts, and
					more.
				</p>
				<p>
					In fact, this documentation page itself was built using Blogkit!
					You're currently viewing a live example of what Blogkit can do.
				</p>
			</BlogSection>

			<BlogSection title="Examples">
				<p className="margin-bottom--2">
					Explore these production-ready examples to see Blogkit in action and
					learn from real-world implementations:
				</p>

				<BlogSection title="Live Websites">
					<ul className="margin-bottom--2">
						<li className="margin-bottom--1">
							<a
								href="https://blogkit.santhoshsiva.dev/"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								Blogkit Documentation
							</a>{' '}
							- This site! A complete documentation website with component
							examples (
							<a
								href="https://github.com/san-siva/blogkit/tree/main/website"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								source code
							</a>
							)
						</li>
						<li className="margin-bottom--1">
							<a
								href="https://gitsy-56895.web.app/"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								Gitsy
							</a>{' '}
							- A feature-rich blog showcasing advanced Blogkit features and
							customization (
							<a
								href="https://github.com/san-siva/gitsy/tree/main/website"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								source code
							</a>
							)
						</li>
						<li className="margin-bottom--1">
							<a
								href="https://stylekit-68309.web.app/"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								StyleKit Documentation
							</a>{' '}
							- Complex documentation site demonstrating advanced component
							usage and styling (
							<a
								href="https://github.com/san-siva/stylekit/tree/main/website"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								source code
							</a>
							)
						</li>
					</ul>
				</BlogSection>

				<BlogSection title="Blog Post Examples">
					<p className="margin-bottom--2">
						See how Blogkit handles complex technical content with rich
						features:
					</p>
					<ul className="margin-bottom--2">
						<li className="margin-bottom--1">
							<a
								href="https://santhoshsiva.dev/blog/linting-at-scale-strategies-for-updating-eslint-configs-in-large-applications/"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								Linting at Scale: Strategies for Updating ESLint Configs
							</a>{' '}
							- A comprehensive blog post demonstrating code blocks, table of
							contents, diagrams, and complex formatting
						</li>
						<li>
							<a
								href="https://santhoshsiva.dev/blog/understanding-closures-capturing-lexical-environments/"
								target="_blank"
								rel="noopener noreferrer"
								className={styles['a--highlighted']}
							>
								Understanding Closures: Capturing Lexical Environments
							</a>{' '}
							- Technical deep-dive showcasing advanced formatting and code
							examples
						</li>
					</ul>
				</BlogSection>

				<Callout type="success" hasMarginDown>
					<p>
						<strong>Tip:</strong> Browse the source code of these examples to
						learn best practices for component usage, styling customization, and
						application structure. Each example demonstrates different use cases
						and complexity levels.
					</p>
				</Callout>
			</BlogSection>

			<BlogSection title="System Requirements">
				<Table
					headers={['Requirement', 'Details']}
					hasMarginDown
					rows={[
						['Node.js', '18.0.0 or higher (20.x LTS recommended)'],
						['Package Manager', 'npm 7+, yarn 1.22+, or pnpm 8+'],
						['React', '^19.0.0 or higher'],
						['React DOM', '^19.0.0 or higher'],
						['Next.js', '^16.0.10 or higher'],
						['TypeScript', '5.0.0 or higher (optional)'],
					]}
				/>
				<Callout type="info" hasMarginDown>
					<p>
						<b>Browser Support:</b> Blogkit supports all modern browsers
						including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+.
					</p>
				</Callout>
			</BlogSection>

			<BlogSection title="Installation">
				<p className="margin-bottom--2">Install Blogkit using npm or yarn:</p>
				<CodeBlock
					hasMarginDown
					language="bash"
					code={CODE_EXAMPLES.installation}
				/>
				<p className="margin-bottom--2">
					<b>Note:</b> npm 7+ will automatically prompt you to install peer
					dependencies if they're missing.
				</p>
			</BlogSection>

			<BlogSection title="Setup">
				<p className="margin-bottom--2">
					<b>Important:</b> You must import the Blogkit styles in your root
					layout or app entry point.
				</p>
				<Callout type="info" hasMarginDown>
					<p>
						<b>Why is this required?</b>
						<br />
						Blogkit pre-compiles its SCSS modules into CSS at build time. This
						means you don't need Sass as a dependency, and your builds are
						faster. The <code>styles.css</code> import provides all component
						styles, responsive design rules, theme variables, and critical
						layout styles. Without it, components will render unstyled.
					</p>
				</Callout>
				<CodeBlock hasMarginDown language="tsx" code={CODE_EXAMPLES.setup} />
			</BlogSection>

			<BlogSection title="Quick Start">
				<p className="margin-bottom--2">
					Once you've imported the styles, you can start using Blogkit
					components:
				</p>
				<CodeBlock
					hasMarginDown
					language="tsx"
					code={CODE_EXAMPLES.quickStart}
				/>
			</BlogSection>

			<BlogSection title="Core Components">
				<BlogSection title="Blog">
					<p className="margin-bottom--2">
						The main container component that wraps all your blog content.
					</p>
					<CodeBlock hasMarginDown language="tsx" code={CODE_EXAMPLES.blog} />
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Default', 'Description']}
						rows={[
							['children', 'ReactNode', '—', 'Blog content'],
							[
								'title',
								'string',
								'"In this article"',
								'Label for the table of contents',
							],
							[
								'jsonLd',
								'WithContext<Thing>',
								'undefined',
								'Schema.org structured data injected as a JSON-LD script tag',
							],
						]}
					/>
					<BlogSection title="JSON-LD / Structured Data">
						<p className="margin-bottom--2">
							JSON-LD (JavaScript Object Notation for Linked Data) is a
							lightweight way to embed machine-readable metadata directly inside
							your HTML. Search engines like Google read this metadata to
							understand the content of a page beyond what they can infer from
							the visible text alone — enabling rich results such as article
							cards, author attribution, publish dates, and breadcrumbs in
							search listings.
						</p>
						<p className="margin-bottom--2">
							Unlike <code>{`<meta>`}</code> tags, which only describe the page
							in general terms, JSON-LD lets you express precise, typed facts
							about your content using the shared vocabulary defined by{' '}
							<a
								href="https://schema.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								Schema.org
							</a>
							. For example, a <code>BlogPosting</code> type can carry the
							headline, author, publication date, and canonical URL all in one
							structured block — the same information that social platforms and
							search engines surface when previewing your link.
						</p>
						<p className="margin-bottom--2">
							Pass a <code>jsonLd</code> prop to the <code>Blog</code> component
							to inject this metadata as a{' '}
							<code>{`<script type="application/ld+json">`}</code> tag in the
							page head. Blogkit uses the{' '}
							<a
								href="https://www.npmjs.com/package/schema-dts"
								target="_blank"
								rel="noopener noreferrer"
							>
								schema-dts
							</a>{' '}
							package to give you full TypeScript types for every Schema.org
							type, so mistakes are caught at compile time.
						</p>
						<Callout type="info" hasMarginDown>
							<p>
								<b>Tip:</b> Use a specific Schema.org type like{' '}
								<code>BlogPosting</code>, <code>Article</code>, or{' '}
								<code>TechArticle</code> instead of the base <code>Thing</code>{' '}
								type for richer structured data.
							</p>
						</Callout>
						<CodeBlock
							hasMarginDown
							language="tsx"
							code={CODE_EXAMPLES.blogJsonLd}
						/>
					</BlogSection>
				</BlogSection>

				<BlogSection title="BlogHeader">
					<p className="margin-bottom--2">
						Display a title and description at the top of your blog post.
					</p>
					<CodeBlock
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
				</BlogSection>

				<BlogSection title="BlogSection">
					<p className="margin-bottom--2">
						Create sections within your blog post with optional titles.
					</p>
					<CodeBlock
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
				</BlogSection>

				<BlogSection title="CodeBlock">
					<p className="margin-bottom--2">
						Display syntax-highlighted code blocks with support for multiple
						programming languages.
					</p>
					<CodeBlock
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
				</BlogSection>

				<BlogSection title="Callout">
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

					<CodeBlock
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
								<p>
									"info",
									<br />
									"warning",
									<br />
									"error",
									<br />
									"success"
								</p>,
								'Callout style',
							],
							['hasMarginDown', 'boolean', 'Add margin below (optional)'],
							['children', 'ReactNode', 'Callout content'],
						]}
					/>
				</BlogSection>

				<BlogSection title="Mermaid">
					<p className="margin-bottom--2">
						Render diagrams and visualizations using Mermaid syntax. Supports
						flowcharts, sequence diagrams, timelines, and more.
					</p>

					<Mermaid
						id="example-flowchart"
						code={CODE_EXAMPLES.mermaidFlowchart}
						hasMarginDown
					/>

					<CodeBlock
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
				</BlogSection>

				<BlogSection title="BlogLink">
					<p className="margin-bottom--2">
						Create animated links to blog posts with title, description, and
						hover effects.
					</p>

					<div className={styles.blogLinkContainer}>
						<BlogLink
							title="Getting Started with Blogkit"
							desc="Learn how to use Blogkit components in your Next.js application"
							href="https://santhoshsiva.dev"
						/>
					</div>

					<CodeBlock
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
				</BlogSection>

				<BlogSection title="Table">
					<p className="margin-bottom--2">
						Display tabular data with headers and rows. Columns automatically
						size to fit their content for optimal space usage.
					</p>
					<CodeBlock hasMarginDown language="tsx" code={CODE_EXAMPLES.table} />
					<Table
						hasMarginDown
						headers={['Prop', 'Type', 'Description']}
						rows={[
							['headers', '(string | ReactNode)[]', 'Table header cells'],
							['rows', '(string | ReactNode)[][]', 'Table rows'],
							['hasMarginDown', 'boolean', 'Add margin below (optional)'],
							['hasMarginUp', 'boolean', 'Add margin above (optional)'],
							[
								'fontSize',
								'string',
								'Custom font size (e.g., "14px", "1rem") (optional)',
							],
						]}
					/>
				</BlogSection>
			</BlogSection>

			<BlogSection title="Features">
				<BlogSection title="">
					<Table
						hasMarginDown
						headers={['Feature', 'Description']}
						rows={[
							[
								'Blog Layout with TOC',
								'Responsive blog layout with sticky table of contents sidebar',
							],
							[
								'Code Highlighting',
								'Syntax highlighting for multiple programming languages using Prism.js',
							],
							[
								'Mermaid Diagrams',
								'Render flowcharts, sequence diagrams, timelines, and more',
							],
							[
								'Callouts',
								'Info, warning, error, and success notification boxes',
							],
							[
								'Data Tables',
								'Flexible table component with dynamic column sizing',
							],
							[
								'Blog Sections',
								'Hierarchical section organization with auto-generated IDs',
							],
							['Blog Links', 'Animated link cards for blog navigation'],
						]}
					/>
				</BlogSection>
				<BlogSection title="Developer Experience">
					<Table
						hasMarginDown
						headers={['Feature', 'Description']}
						rows={[
							[
								'TypeScript Support',
								'Fully typed components with ReactNode support',
							],
							['SCSS Modules', 'Scoped, customizable styles using StyleKit'],
						]}
					/>
				</BlogSection>
				<BlogSection title="Compatibility">
					<Table
						hasMarginDown
						headers={['Feature', 'Description']}
						rows={[
							[
								'Next.js Optimized',
								'Works seamlessly with Next.js 14, 15, and 16',
							],
							['React 19 Ready', 'Full support for React 18 and 19'],
						]}
					/>
				</BlogSection>
				<BlogSection title="SEO">
					<Table
						hasMarginDown
						headers={['Feature', 'Description']}
						rows={[
							[
								'Deep Linking',
								'Sections generate shareable ?section= URLs with scroll-aware TOC highlighting that activates only after user interaction',
							],
							[
								'SSR & Hydration Safe',
								'Static fallback renders full content server-side for instant load and SEO; interactive layer hydrates progressively via Suspense without layout shift',
							],
							[
								'JSON-LD / Structured Data',
								'Inject Schema.org structured data via the jsonLd prop to enable rich search results such as article cards, author attribution, and publish dates',
							],
						]}
					/>
				</BlogSection>
			</BlogSection>

			<BlogSection title="Customization">
				<p className="margin-bottom--2">
					Blogkit is powered by{' '}
					<a
						href="https://github.com/san-siva/stylekit"
						target="_blank"
						rel="noopener noreferrer"
						className={styles['a--highlighted']}
					>
						StyleKit
					</a>
					, a modular SCSS design system that provides the foundation for all
					styling in Blogkit. StyleKit is a comprehensive design system that
					includes colors, typography, spacing utilities, animations, and
					responsive breakpoints.
				</p>

				<BlogSection title="How StyleKit Powers Blogkit">
					<p className="margin-bottom--2">
						StyleKit provides Blogkit with a consistent design language through:
					</p>
					<ul className="margin-bottom--2">
						<li>
							<strong>Color System:</strong> Primary, secondary, accent, and
							semantic colors with variants for consistent theming
						</li>
						<li>
							<strong>Typography Scale:</strong> Font families, sizes, weights,
							and line heights for harmonious text hierarchy
						</li>
						<li>
							<strong>Spacing System:</strong> A 0-9 scale (4px to 96px) for
							consistent margins and padding
						</li>
						<li>
							<strong>Utility Classes:</strong> Pre-built classes for common
							styling patterns
						</li>
						<li>
							<strong>Responsive Design:</strong> Built-in breakpoints for
							mobile-first layouts
						</li>
						<li>
							<strong>Animations:</strong> Smooth transitions and loading
							animations
						</li>
					</ul>
					<p className="margin-bottom--2">
						By leveraging StyleKit, Blogkit ensures visual consistency across
						all components while giving you full control over customization
						through SCSS variables and CSS custom properties.
					</p>
				</BlogSection>

				<BlogSection title="Customizing Your Blog">
					<p className="margin-bottom--2">
						You can customize Blogkit's appearance in two ways:
					</p>
					<ol className="margin-bottom--2">
						<li>
							<strong>Override StyleKit Variables:</strong> Import StyleKit in
							your own SCSS files and override variables to match your brand
						</li>
						<li>
							<strong>Use CSS Custom Properties:</strong> Override CSS variables
							at runtime for dynamic theming
						</li>
					</ol>
					<p>
						Visit the{' '}
						<a
							href="https://stylekit-68309.web.app/"
							target="_blank"
							rel="noopener noreferrer"
							className={styles['a--highlighted']}
						>
							StyleKit documentation
						</a>{' '}
						to explore all available design tokens and customization options.
					</p>
				</BlogSection>
			</BlogSection>

			<BlogSection title="Browser Support">
				<p className="margin-bottom--2">
					Blogkit supports all modern browsers with the following minimum
					versions:
				</p>
				<Table
					headers={['Browser', 'Minimum Version']}
					hasMarginDown
					rows={[
						['Chrome', '90+'],
						['Firefox', '88+'],
						['Safari', '14+ (macOS and iOS)'],
						['Edge', '90+'],
					]}
				/>
			</BlogSection>

			<BlogSection title="Contributing">
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
			</BlogSection>

			<BlogSection title="License">
				<p>This project is licensed under the MIT License.</p>
			</BlogSection>

			<BlogSection title="About">
				<p>
					<strong>Author:</strong>{' '}
					<a
						href="https://santhoshsiva.dev"
						target="_blank"
						rel="noopener noreferrer"
						className={styles['a--highlighted']}
					>
						Santhosh Siva
					</a>
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
			</BlogSection>
		</Blog>
	);
};

export default BlogkitDocumentation;
