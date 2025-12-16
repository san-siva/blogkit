'use client';

import type { NextPage } from 'next';

import '@san-siva/stylekit/index.module.scss';
import styles from './page.module.scss';

import { Blog } from '@san-siva/blogkit';
import { BlogHeader } from '@san-siva/blogkit';
import { BlogSection } from '@san-siva/blogkit';
import { Callout } from '@san-siva/blogkit';
import { CodeBlock } from '@san-siva/blogkit';
import { Mermaid } from '@san-siva/blogkit';
import { BlogLink } from '@san-siva/blogkit';
import { Table } from '@san-siva/blogkit';

const CODE_EXAMPLES = {
	installation: `npm install @san-siva/blogkit @san-siva/stylekit
# or
yarn add @san-siva/blogkit @san-siva/stylekit`,

	quickStart: `import { Blog, BlogHeader, BlogSection } from '@san-siva/blogkit';
import '@san-siva/stylekit/index.module.scss';

export default function MyBlog() {
  return (
    <Blog>
      <BlogHeader
        title={['My Blog Post']}
        desc={['A description of my blog post']}
      />
      <BlogSection title="Introduction">
        <p>Your content here...</p>
      </BlogSection>
    </Blog>
  );
}`,

	blog: `<Blog>
  {/* Your blog content */}
</Blog>`,

	blogHeader: `<BlogHeader
  title={['My Blog Title']}
  desc={['Posted on January 1, 2025']}
/>`,

	blogSection: `<BlogSection title="Section Title" hasMarginBottom>
  <p>Your section content...</p>
</BlogSection>`,

	codeBlock: `<CodeBlock
  language="typescript"
  code={\`const greeting = "Hello, World!";\`}
  hasMarginDown={true}
/>`,

	callout: `<Callout type="info">
  <p>
    <b>Information:</b>
		This is an informative message, often used to provide
    <br />
    context or <b>additional details</b> to users.
  </p>
</Callout>`,

	mermaid: `<Mermaid
  id="my-diagram"
  code={\`flowchart LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]
    C --> D
\`}
  hasMarginDown={true}
/>`,

	blogLink: `<BlogLink
  title="My Blog Post"
  desc="A short description of the blog post content"
  href="/blog/my-blog-post"
/>`,

	table: `<Table
  headers={['Column 1', 'Column 2', 'Column 3']}
  rows={[
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ]}
  hasMarginDown={true}
/>`,
};

const BlogkitDocumentation: NextPage = () => {
	return (
		<Blog>
			<BlogHeader
				title={['Blogkit Documentation']}
				desc={['A reusable, feature-rich blog component library for React and Next.js applications']}
			/>

			<BlogSection title="Overview">
				<p className="margin-bottom--2">
					Blogkit is a comprehensive component library built with TypeScript and SCSS modules,
					providing everything you need to create beautiful, interactive blog posts with
					code highlighting, diagrams, callouts, and more.
				</p>
				<p>
					See Blogkit in action on <a href="https://santhoshsiva.dev" target="_blank" rel="noopener noreferrer">santhoshsiva.dev</a>,
					where it powers blog listings, table of contents navigation, and rich content with Mermaid diagrams.
				</p>
			</BlogSection>

			<BlogSection title="Installation">
				<p className="margin-bottom--2">
					Install Blogkit directly from GitHub using npm or yarn:
				</p>
				<CodeBlock
					hasMarginDown
					language="bash"
					code={CODE_EXAMPLES.installation}
				/>
			</BlogSection>

			<BlogSection title="Quick Start">
				<p className="margin-bottom--2">
					Here's a simple example to get you started:
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
					<CodeBlock
						hasMarginDown
						language="tsx"
						code={CODE_EXAMPLES.blog}
					/>
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
							['hasMarginBottom', 'boolean', 'Add margin at the bottom (optional)'],
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
							['language', 'string', 'Programming language for syntax highlighting'],
							['hasMarginDown', 'boolean', 'Add margin below the code block (optional)'],
						]}
					/>
				</BlogSection>

				<BlogSection title="Callout">
					<p className="margin-bottom--2">
						Highlight important information with styled callout boxes.
					</p>

					<div style={{
						marginTop: '24px',
						marginBottom: '24px',
						display: 'grid',
						gridGap: '16px',
						rowGap: '16px',
						gridAutoFlow: 'rows',
						gridTemplateColumns: 'repeat(auto-fill, max-content)'
					}}>
						<Callout type="info">
							<p>
								<b>Information:</b> This is an informative message, often used to provide
								<br />
								context or <b>additional details</b> to users.
							</p>
						</Callout>
						<Callout type="warning">
							<p>
								<b>Warning:</b> This is a warning message, typically used to alert users of
								<br />
								potential risks or issues.
							</p>
						</Callout>
						<Callout type="error">
							<p>
								<b>Error:</b> This is an error message, used to notify users of critical
								<br />
								problems or failures.
							</p>
						</Callout>
						<Callout type="success">
							<p>
								<b>Success:</b> This is a success message, indicating that an action or
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
							['type', '"info" | "success" | "warning" | "error"', 'Callout style'],
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
						code={`flowchart LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]
    C --> D`}
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
							['href', 'string', 'Custom URL (optional, defaults to /blog/[title-slug])'],
							['isInProgress', 'boolean', 'Hide link if post is in progress (optional)'],
						]}
					/>
				</BlogSection>

				<BlogSection title="Table">
					<p className="margin-bottom--2">
						Display tabular data with headers and rows.
					</p>
					<CodeBlock
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
				</BlogSection>
			</BlogSection>

			<BlogSection title="Features">
				<ul className="margin-bottom--2">
					<li>
						<strong>Blog Layout with TOC:</strong> Responsive blog layout with sticky table of contents sidebar
					</li>
					<li>
						<strong>Code Highlighting:</strong> Syntax highlighting for multiple programming languages using Prism.js
					</li>
					<li>
						<strong>Mermaid Diagrams:</strong> Render flowcharts, sequence diagrams, timelines, and more
					</li>
					<li>
						<strong>Callouts:</strong> Info, warning, error, and success notification boxes
					</li>
					<li>
						<strong>Data Tables:</strong> Flexible table component with dynamic column sizing
					</li>
					<li>
						<strong>Blog Sections:</strong> Hierarchical section organization with auto-generated IDs
					</li>
					<li>
						<strong>Blog Links:</strong> Animated link cards for blog navigation
					</li>
					<li>
						<strong>TypeScript Support:</strong> Fully typed components with ReactNode support
					</li>
					<li>
						<strong>SCSS Modules:</strong> Scoped, customizable styles using stylekit
					</li>
					<li>
						<strong>Next.js Optimized:</strong> Works seamlessly with Next.js 14, 15, and 16
					</li>
					<li>
						<strong>React 19 Ready:</strong> Full support for React 18 and 19
					</li>
				</ul>
			</BlogSection>

			<BlogSection title="Customization">
				<p className="margin-bottom--2">
					Blogkit uses SCSS modules for styling. You can customize the appearance by
					overriding CSS variables in stylekit or creating your own theme.
				</p>

				<BlogSection title="Key Variables">
					<ul className="margin-bottom--2">
						<li><code>$color--primary</code> - Primary accent color</li>
						<li><code>$color--secondary</code> - Secondary color</li>
						<li><code>$color--error</code> - Error color</li>
						<li><code>$font-family--primary</code> - Primary font family</li>
						<li><code>$font-family--code</code> - Code font family</li>
						<li><code>$border-radius</code> - Border radius for components</li>
					</ul>
				</BlogSection>
			</BlogSection>

			<BlogSection title="Browser Support">
				<ul className="margin-bottom--2">
					<li>Chrome (latest)</li>
					<li>Firefox (latest)</li>
					<li>Safari (latest)</li>
					<li>Edge (latest)</li>
				</ul>
			</BlogSection>

			<BlogSection title="About">
				<p className="margin-bottom--2">
					Blogkit is built and maintained by <a href="https://santhoshsiva.dev" target="_blank" rel="noopener noreferrer">Santhosh Siva</a>.
					It&apos;s extracted from a personal blog project and open to contributions.
				</p>
				<Callout type="info">
					<p>
						<strong>License:</strong> MIT
						<br />
						<strong>Repository:</strong> <a href="https://github.com/san-siva/blogkit" target="_blank" rel="noopener noreferrer">github.com/san-siva/blogkit</a>
					</p>
				</Callout>
			</BlogSection>
		</Blog>
	);
};

export default BlogkitDocumentation;
