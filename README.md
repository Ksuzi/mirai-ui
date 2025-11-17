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

## Installation

```bash
npm install @mirai-ui/react
```

### Requirements

- React 19.1.0 or higher
- Node.js 20 or higher

## Quick Start

1. **Import the CSS** in your application entry point:

```tsx
import '@mirai-ui/react/dist/index.css';
```

2. **Import and use components**:

```tsx
import { Button, Input, Text, Heading } from '@mirai-ui/react';

function App() {
	return (
		<div>
			<Heading variant="h1">Welcome to mirai-ui</Heading>
			<Text>Get started by editing your components.</Text>
			<Input placeholder="Enter your name" />
			<Button variant="primary">Get Started</Button>
		</div>
	);
}
```

## Components

### Form Components

- **Button** - Customizable button component with multiple variants
- **Input** - Form input component with validation support
- **Textarea** - Multi-line text input component
- **Checkbox** - Accessible checkbox with custom styling
- **Radio** - Radio button component with RadioGroup support
- **Switch** - Toggle switch component
- **Select** - Dropdown select component with composition API
- **Label** - Form label component
- **Field** - Form field wrapper with label, control, and message composition

### Typography Components

- **Text** - Typography component for consistent text styling
- **Heading** - Semantic heading component with size variants

### Feedback Components

- **Spinner** - Loading spinner component

## License

MIT
