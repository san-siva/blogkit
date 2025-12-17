# Blogkit

A comprehensive, production-ready blog component library for React and Next.js applications. Built with TypeScript and SCSS modules, Blogkit provides a complete suite of components for creating professional, interactive blog posts with advanced features including syntax highlighting, diagram rendering, callouts, and more.

**[View Full Documentation](https://blogkit-c367c.web.app/)** | **[Live Demo](https://santhoshsiva.dev)**

## Overview

Blogkit is designed to streamline the development of content-rich blog applications by providing a modular, customizable component library. It supports modern React patterns, offers full TypeScript support, and includes responsive design out of the box.

## Features

- **Blog Layout System**: Pre-built layout components with table of contents navigation
- **Syntax Highlighting**: Code block components with multi-language support via Prism.js
- **Diagram Rendering**: Integrated Mermaid.js support for flowcharts, sequence diagrams, and more
- **Content Components**: Callouts, data tables, and specialized blog link components
- **TypeScript Support**: Fully typed API for enhanced developer experience
- **Responsive Design**: Mobile-first design with SCSS modules
- **React 19 Compatible**: Built to work seamlessly with the latest React version
- **Next.js Optimized**: Designed for optimal performance in Next.js applications

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

Comprehensive documentation is available at [https://blogkit-c367c.web.app/](https://blogkit-c367c.web.app/)

The documentation includes:

- Complete component API reference
- Interactive live examples
- Implementation guides and best practices
- Code snippets for all components
- Customization and theming guide
- TypeScript usage examples and type definitions

## Examples

See Blogkit in action in these blogs and documentation sites:

- **[Gitsy](https://gitsy-56895.web.app/)** - A blog built with Blogkit showcasing various components
- **[Optimizing Background Tasks with requestIdleCallback](https://santhoshsiva.dev/blog/optimizing-background-tasks-with-requestidlecallback-advanced-scheduling-in-the-javascript-event-loop/)** - Advanced scheduling in the JavaScript event loop
- **[Linting at Scale](https://santhoshsiva.dev/blog/linting-at-scale-strategies-for-updating-eslint-configs-in-large-applications/)** - Strategies for updating ESLint configs in large applications

## Requirements

- React ^19.0.0
- Next.js ^16.0.10
- Node.js 18+ recommended

## Browser Support

Blogkit supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

For bug reports and feature requests, please [open an issue](https://github.com/san-siva/blogkit/issues) on GitHub.

## License

MIT © [Santhosh Siva](https://santhoshsiva.dev)

## Author

**Santhosh Siva**
- Website: [https://santhoshsiva.dev](https://santhoshsiva.dev)
- GitHub: [@san-siva](https://github.com/san-siva)
