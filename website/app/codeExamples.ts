const installation = `npm install @san-siva/blogkit
# or
yarn add @san-siva/blogkit

# Install peer dependencies
npm install react@^19.0.0 react-dom@^19.0.0 next@^16.0.10 \\
  @react-spring/web@^10.0.0 mermaid@^10.0.0 prismjs@^1.29.0 \\
  react-syntax-highlighter@^15.5.0`;

const setup = `// app/layout.tsx or _app.tsx
// REQUIRED: Import Blogkit styles once in your root layout
// This provides all compiled SCSS module styles for components
import '@san-siva/blogkit/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const quickStart = `import { Blog, BlogHeader, BlogSection } from '@san-siva/blogkit';

// Note: Ensure you've imported '@san-siva/blogkit/styles.css' in your root layout

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
}`;

const blog = `<Blog>
  {/* Your blog content */}
</Blog>`;

const blogHeader = `<BlogHeader
  title={['My Blog Title']}
  desc={['Posted on January 1, 2025']}
/>`;

const blogSection = `<BlogSection title="Section Title" hasMarginBottom>
  <p>Your section content...</p>
</BlogSection>`;

const codeBlock = `<CodeBlock
  language="typescript"
  code={\`const greeting = "Hello, World!";\`}
  hasMarginDown={true}
/>`;

const callout = `<Callout type="info">
  <p>
    <b>Information:</b>
		This is an informative message, often used to provide
    <br />
    context or <b>additional details</b> to users.
  </p>
</Callout>`;

const mermaidFlowchart = `flowchart LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]
    C --> D`;

const mermaid = `<Mermaid
  id="my-diagram"
  code={\`${mermaidFlowchart}\`}
  hasMarginDown={true}
/>`;

const blogLink = `<BlogLink
  title="My Blog Post"
  desc="A short description of the blog post content"
  href="/blog/my-blog-post"
/>`;

const table = `<Table
  headers={['Column 1', 'Column 2', 'Column 3']}
  rows={[
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ]}
  hasMarginDown={true}
/>`;

export const CODE_EXAMPLES = {
	installation,
	setup,
	quickStart,
	blog,
	blogHeader,
	blogSection,
	codeBlock,
	callout,
	mermaid,
	mermaidFlowchart,
	blogLink,
	table,
};
