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

## Development

### Prerequisites

- Node.js >= 20
- pnpm (recommended) or npm

### Setup

Install dependencies:

```bash
pnpm install
```

### Available Scripts

- **Run tests:**

```bash
pnpm run test
```

- **Build library:**

```bash
pnpm run build
```

- **Start Storybook:**

```bash
pnpm run storybook
```

- **Type checking:**

```bash
pnpm run type-check
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Button/         # Button component
│   ├── Input/          # Input component
│   ├── Checkbox/       # Checkbox component
│   ├── Text/           # Text component
│   └── Heading/        # Heading component
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]
