# Blogkit

A reusable, feature-rich blog component library for React and Next.js applications. Built with TypeScript and SCSS modules, BlogKit provides everything you need to create beautiful, interactive blog posts with code highlighting, diagrams, callouts, and more.

**[📚 View Full Documentation](https://blogkit-c367c.web.app/)** | **[🌐 See Live Demo on santhoshsiva.dev](https://santhoshsiva.dev)**

## Key Features

✨ **Blog Layout with TOC** • 🎨 **Code Highlighting** • 📊 **Mermaid Diagrams** • 💬 **Callouts** • 📋 **Data Tables** • 🔗 **Blog Links** • 📝 **TypeScript** • 🎯 **React 19 Ready**

## Installation

```bash
npm install @san-siva/blogkit @san-siva/stylekit
# or
yarn add @san-siva/blogkit @san-siva/stylekit
# or
pnpm add @san-siva/blogkit @san-siva/stylekit
```

### Peer Dependencies

Blogkit requires the following peer dependencies:

```bash
npm install react@^19.0.0 react-dom@^19.0.0 next@^16.0.10 @react-spring/web@^10.0.0 mermaid@^10.0.0 prismjs@^1.29.0 react-syntax-highlighter@^15.5.0
```

## Quick Start

```tsx
import { Blog, BlogHeader, BlogSection, CodeBlock, Callout } from '@san-siva/blogkit';
import '@san-siva/stylekit/index.module.scss';

export default function MyBlogPost() {
	return (
		<Blog>
			<BlogHeader
				title={['My First Blog Post']}
				desc={['Published on December 15, 2025']}
			/>

			<BlogSection title="Introduction">
				<p>Welcome to my blog built with Blogkit!</p>

				<Callout type="info" hasMarginDown>
					<p>This is an informational callout.</p>
				</Callout>

				<CodeBlock
					language="typescript"
					code={`const greeting = "Hello, Blogkit!";`}
					hasMarginDown
				/>
			</BlogSection>
		</Blog>
	);
}
```

## Documentation

For detailed documentation, component APIs, live examples, and more:

👉 **[Visit the Full Documentation](https://blogkit-c367c.web.app/)**

The documentation includes:

- Complete component API reference
- Interactive live examples
- Code snippets for all components
- Customization guide
- TypeScript usage examples

## Contributing

Contributions are welcome! Open an issue or submit a pull request on [GitHub](https://github.com/san-siva/blogkit).

## License

MIT © [Santhosh Siva](https://santhoshsiva.dev)
