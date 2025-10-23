# Testing Guidelines

This document outlines our approach to testing components in the Mirai UI library.

## Philosophy

### What to Test

✅ **Do test:**

- Interactive component behavior (clicks, keyboard navigation, user input)
- Component state management (controlled vs uncontrolled)
- Accessibility features (ARIA attributes, keyboard support, focus management)
- Props handling (different variants, sizes, disabled states)
- Event handlers (onClick, onChange, onFocus, onBlur)
- Ref forwarding
- Edge cases (disabled + loading, error states, empty states)

❌ **Don't test:**

- Style variants and CSS classes (unless critical for functionality)
- Implementation details (internal state, private methods)
- Third-party library behavior (CVA, clsx, tailwind-merge)
- Trivial rendering of static content

### Testing Strategy

We follow the **80/20 rule**: 20% of testing effort should give 80% confidence in our code.

- **Complex interactive components** (Button, Input, Checkbox) → Comprehensive tests
- **Simple presentational components** (Text, Heading) → Basic tests
- Focus on **user-facing behavior**, not implementation
- Prioritize **accessibility testing**

## File Organization

Tests are **collocated with components** for better maintainability:

```
src/components/Button/
├── Button.component.tsx
├── Button.test.tsx          ← Test file next to component
├── Button.stories.tsx
├── Button.types.ts
├── Button.variants.ts
└── index.ts
```

### Benefits of Colocation

- Easy to find and update tests when modifying components
- Clear relationship between component and its tests
- Automatic cleanup when removing components
- Matches Storybook story organization

## Test Structure

Use `describe` blocks to organize tests logically:

```tsx
import { describe, expect, test, vi } from 'vitest';
import { render, screen, userEvent } from '@mirai-ui/test';

import { Button } from './Button.component';

describe('Button', () => {
	describe('Rendering', () => {
		test('renders button with text', () => {
			render(<Button>Click me</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Click me');
		});

		test('renders with icon', () => {
			render(<Button leftIcon={<span>👈</span>}>With Icon</Button>);
			expect(screen.getByText('👈')).toBeInTheDocument();
		});
	});

	describe('Interaction', () => {
		test('handles click events', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Click me</Button>);

			await user.click(screen.getByRole('button'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Accessibility', () => {
		test('sets aria-disabled when disabled', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
		});
	});

	describe('States', () => {
		test('disables button when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to button element', () => {
			const ref = { current: null as HTMLButtonElement | null };
			render(<Button ref={ref}>Button</Button>);
			expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		});
	});
});
```

### Standard Test Groups

1. **Rendering** - Basic rendering, variants, props
2. **Interaction** - User events, clicks, keyboard
3. **Accessibility** - ARIA attributes, keyboard navigation
4. **States** - Different component states (disabled, loading, error)
5. **Ref Forwarding** - Ref forwarding works correctly

## Using Test Utilities

We provide modular test utilities in `src/test/`:

```
src/test/
├── index.ts         # Main entry point (import from here)
├── render.ts        # Custom render functions
└── helpers.ts       # Accessibility and DOM helpers
```

### Import from Test Module

Always import from `@mirai-ui/test` using the clean alias:

```tsx
// ✅ Good - imports from test utilities
import { render, screen, userEvent } from '@mirai-ui/test';

// ❌ Bad - direct imports
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ❌ Bad - long relative paths or specific files
import { render } from '../../../test/render';
```

### Available Utilities

#### `render()`

Custom render function that can wrap components with providers:

```tsx
import { render } from '@mirai-ui/test';

test('renders with providers', () => {
	render(<MyComponent />);
	// Component is automatically wrapped with necessary providers
});

// Also available as:
import { customRender } from '@mirai-ui/test';
```

#### `userEvent`

Realistic user interaction simulation:

```tsx
test('handles user typing', async () => {
	const user = userEvent.setup();
	render(<Input />);

	const input = screen.getByRole('textbox');
	await user.type(input, 'Hello World');

	expect(input).toHaveValue('Hello World');
});
```

## User Interactions

### Use `userEvent` Instead of `fireEvent`

`userEvent` provides more realistic user interaction simulation:

```tsx
// ✅ Good - realistic user interaction
test('handles click', async () => {
	const user = userEvent.setup();
	render(<Button onClick={handleClick}>Click</Button>);
	await user.click(screen.getByRole('button'));
});

// ❌ Avoid - less realistic
test('handles click', () => {
	render(<Button onClick={handleClick}>Click</Button>);
	fireEvent.click(screen.getByRole('button'));
});
```

### Common User Events

```tsx
const user = userEvent.setup();

// Click
await user.click(element);

// Type text
await user.type(input, 'text to type');

// Clear and type
await user.clear(input);
await user.type(input, 'new text');

// Keyboard
await user.keyboard('{Enter}');
await user.keyboard(' '); // Space key

// Tab navigation
await user.tab();
```

## Testing Controlled vs Uncontrolled Components

For components that support both modes (like Checkbox, Input):

```tsx
describe('Controlled vs Uncontrolled', () => {
	test('works as uncontrolled component', async () => {
		const user = userEvent.setup();
		render(<Checkbox defaultChecked={false} />);
		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).not.toBeChecked();
		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	test('works as controlled component', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		const { rerender } = render(<Checkbox checked={false} onChange={handleChange} />);
		const checkbox = screen.getByRole('checkbox');

		await user.click(checkbox);
		expect(handleChange).toHaveBeenCalled();

		// State doesn't change until parent updates
		expect(checkbox).not.toBeChecked();

		// Simulate parent update
		rerender(<Checkbox checked={true} onChange={handleChange} />);
		expect(checkbox).toBeChecked();
	});
});
```

## Accessibility Testing

Always test accessibility features:

```tsx
describe('Accessibility', () => {
	test('associates label with input', () => {
		render(<Input label="Email" id="email-input" />);
		const input = screen.getByLabelText('Email');
		expect(input).toHaveAttribute('id', 'email-input');
	});

	test('sets aria-invalid on error', () => {
		render(<Input error="Required" />);
		expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
	});

	test('error has role alert', () => {
		render(<Input error="Required" />);
		expect(screen.getByRole('alert')).toHaveTextContent('Required');
	});

	test('error has aria-live', () => {
		render(<Input error="Required" />);
		expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
	});
});
```

## Querying Elements

Follow the [Testing Library query priority](https://testing-library.com/docs/queries/about/#priority):

1. **Accessible queries** (preferred):
   - `getByRole` - Best for interactive elements
   - `getByLabelText` - Best for form fields
   - `getByText` - For non-interactive text

2. **Semantic queries**:
   - `getByAltText` - For images
   - `getByTitle` - For title attributes

3. **Test IDs** (last resort):
   - `getByTestId` - When other queries don't work

```tsx
// ✅ Good - accessible queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');
screen.getByText('Welcome');

// ⚠️ Use sparingly
screen.getByTestId('custom-element');
```

## Running Tests

### Run all tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test:watch
```

### Run tests with coverage

```bash
pnpm test:coverage
```

### Run tests for changed files

```bash
pnpm test:changed
```

### Run specific test file

```bash
pnpm test src/components/Button/Button.test.tsx
```

## Coverage Goals

Our coverage thresholds (defined in `vitest.config.ts`):

- **Statements**: 70%
- **Branches**: 65%
- **Functions**: 70%
- **Lines**: 70%

We don't aim for 100% coverage. Instead:

- Focus on testing critical user paths
- Prioritize accessibility and interaction
- Skip trivial code (getters, simple presentational components)

## Examples

### Simple Presentational Component

```tsx
// Text.test.tsx
describe('Text', () => {
	test('renders text content', () => {
		render(<Text>Hello World</Text>);
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});

	test('renders as different elements', () => {
		const { container } = render(<Text as="span">Text</Text>);
		expect(container.querySelector('span')).toBeInTheDocument();
	});

	test('forwards ref', () => {
		const ref = { current: null as HTMLParagraphElement | null };
		render(<Text ref={ref}>Text</Text>);
		expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
	});
});
```

### Complex Interactive Component

See `src/components/Button/Button.test.tsx` or `src/components/Checkbox/Checkbox.test.tsx` for comprehensive examples.

## Best Practices

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use semantic queries** - Prefer `getByRole` and `getByLabelText`
3. **Test accessibility** - Always include ARIA and keyboard tests
4. **Avoid snapshot tests** - They break easily and provide little value
5. **Mock sparingly** - Only mock external dependencies, not components
6. **Keep tests simple** - One concept per test
7. **Use descriptive test names** - Test name should explain what it tests
8. **Setup user at test level** - `const user = userEvent.setup()` in each test

## Common Pitfalls

❌ **Don't test implementation details:**

```tsx
// Bad - testing internal state
expect(component.state.isOpen).toBe(true);

// Good - testing user-visible behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

❌ **Don't use `.toHaveClass()` for variants:**

```tsx
// Bad - testing CSS classes
expect(button).toHaveClass('bg-blue-500');

// Good - just verify it renders
expect(button).toBeInTheDocument();
```

❌ **Don't forget async/await with userEvent:**

```tsx
// Bad - missing await
user.click(button);

// Good - with await
await user.click(button);
```

## Questions?

If you're unsure how to test something:

1. Check existing tests in `src/components/` for examples
2. Refer to [Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)
3. Follow the principle: "Test what users see and do"
