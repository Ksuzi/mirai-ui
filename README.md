# mirai-ui

A modern React UI components library built with Tailwind CSS and TypeScript. Designed for building beautiful, accessible, and performant user interfaces.

## Features

- 🎨 **Modern Design** - Clean and contemporary component designs
- 🔧 **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎯 **Tailwind CSS** - Built with Tailwind CSS for easy customization
- ♿ **Accessible** - Components follow accessibility best practices
- 📱 **Responsive** - Mobile-first responsive design
- 🧪 **Well Tested** - Comprehensive test coverage with Vitest
- 📖 **Storybook** - Interactive component documentation

## Documentation

View the live interactive component documentation on [GitHub Pages](https://ksuzi.github.io/mirai-ui/).

## Components

- **Button** - Customizable button component with multiple variants
- **Input** - Form input component with validation support
- **Checkbox** - Accessible checkbox with custom styling
- **Text** - Typography component for consistent text styling
- **Heading** - Semantic heading component with size variants

## Installation

```bash
npm install @ksuzi/mirai-ui
```

## Quick Start

```tsx
import { Button, Input, Text } from '@ksuzi/mirai-ui';

function App() {
	return (
		<div>
			<Text>Welcome to mirai-ui</Text>
			<Input placeholder="Enter your name" />
			<Button variant="primary">Get Started</Button>
		</div>
	);
}
```

## License

MIT
