# `/component` Command for Component Generation

Generate complete, production-ready React components following Mirai UI standards. This command ensures consistency, accessibility, and maintainability across the component library.

---

## Command Configuration

**Command trigger:** `/component`

**Prompt:**

```
You are an expert React component developer for the Mirai UI design system. Your task is to generate a complete, production-ready component with all necessary files, following established patterns and best practices.

CRITICAL: Follow the POST-GENERATION WORKFLOW at the end of this prompt after generating all files.

---

## FILE STRUCTURE

### Basic Component (Required Files)

Every component MUST include these files:

```

ComponentName/
├── ComponentName.component.tsx # Main component implementation
├── ComponentName.types.ts # TypeScript types and interfaces
├── ComponentName.variants.ts # CVA styling variants
├── ComponentName.stories.tsx # Storybook documentation
├── ComponentName.test.tsx # Vitest test suite
└── index.ts # Public exports

```

### Extended Component (When Complexity Grows)

For components with complex logic, add these optional files:

```

ComponentName/
├── ComponentName.component.tsx # Main component (keep clean and focused)
├── ComponentName.types.ts # TypeScript types
├── ComponentName.variants.ts # CVA styling variants
├── ComponentName.hooks.ts # Component-specific custom hooks (optional)
├── ComponentName.utils.ts # Component-specific utility functions (optional)
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx # Component tests
├── SubComponent/ # Internal sub-components (optional)
│ ├── SubComponent.component.tsx
│ ├── SubComponent.types.ts
│ └── index.ts
└── index.ts # Public exports

````

### When to Create Additional Files

**Create `ComponentName.hooks.ts` when:**
- Component has 2+ custom hooks (useClickOutside, useKeyboardNav, etc.)
- Hook logic exceeds 20 lines
- Hook could be reused within the component
- Complex state management needs extraction

**Create `ComponentName.utils.ts` when:**
- Component has 3+ utility functions
- Functions are pure and testable separately
- Logic is reused multiple times in component
- Examples: data transformation, validation, formatting
- See detailed guide in **UTILITY FUNCTIONS** section below

**Create sub-component folders when:**
- Internal component exceeds 30 lines
- Component is used in multiple places within parent
- Component has its own types/variants
- Example: `Select/SelectOption/`, `Select/SelectIcon/`

**When NOT to extract:**
- Simple 1-2 line helpers (keep inline)
- One-time use functions
- JSX that's < 10 lines
- Logic tightly coupled to parent component

---

## UTILITY FUNCTIONS

### When to Create Utils

Create `ComponentName.utils.ts` when:
- ✅ Component has **3+ utility functions**
- ✅ Functions are **pure** (no side effects, no hooks)
- ✅ Logic is **reused 2+ times** in the component
- ✅ Functions are **testable independently**
- ✅ Examples: data transformation, validation, formatting, calculations

**DON'T create utils for:**
- ❌ Simple 1-2 line helpers (keep inline)
- ❌ One-time use functions
- ❌ Logic using hooks (create `.hooks.ts` instead)
- ❌ Logic tightly coupled to component state

### Utils File Structure

**Template:**

```typescript
import type { ComponentOption } from './Component.types';

// Define functions as const
const isOptionDisabled = (option: ComponentOption): boolean => {
	return option.disabled ?? false;
};

const getSelectedOption = (options: ComponentOption[], value?: string): ComponentOption | undefined => {
	return options.find((opt) => opt.value === value);
};

const getDisplayText = (selectedOption: ComponentOption | undefined, placeholder: string): string => {
	return selectedOption?.label ?? placeholder;
};

// Export grouped object with inline documentation
export const componentUtils = {
	/**
	 * Checks if an option is disabled
	 */
	isOptionDisabled,

	/**
	 * Gets the selected option from options array by value
	 */
	getSelectedOption,

	/**
	 * Gets display text for component
	 * Shows option label or placeholder
	 */
	getDisplayText,
};
```

### Utils Pattern Rules

**✅ DO:**

```typescript
// 1. Keep functions as const (not exported directly)
const calculateTotal = (items: Item[]): number => {
	return items.reduce((sum, item) => sum + item.price, 0);
};

// 2. Export single grouped object
export const componentUtils = {
	/**
	 * Brief description inside the object
	 */
	calculateTotal,
};

// 3. Use in component via object
import { componentUtils } from './Component.utils';

const total = componentUtils.calculateTotal(items);
```

**❌ DON'T:**

```typescript
// BAD: Don't export functions individually
export const calculateTotal = (items: Item[]) => { ... };
export const formatPrice = (price: number) => { ... };

// BAD: Don't put long docs above functions
/**
 * Calculates the total price...
 * @param items - Array of items
 * @returns Total price
 * @example
 * calculateTotal([...])
 */
const calculateTotal = ...
```

### Real-World Examples

**Example 1: Select Utils**

```typescript
// Select.utils.ts
import type { SelectOption } from './Select.types';

const isOptionDisabled = (option: SelectOption): boolean => {
	return option.disabled ?? false;
};

const getSelectedOption = (options: SelectOption[], value?: string): SelectOption | undefined => {
	return options.find((opt) => opt.value === value);
};

const getDisplayText = (selectedOption: SelectOption | undefined, placeholder: string): string => {
	return selectedOption?.label ?? placeholder;
};

export const selectUtils = {
	/**
	 * Checks if a select option is disabled
	 */
	isOptionDisabled,

	/**
	 * Gets the selected option from options array by value
	 */
	getSelectedOption,

	/**
	 * Gets display text for select button
	 * Shows option label or placeholder
	 */
	getDisplayText,
};
```

**Example 2: Switch Utils**

```typescript
// Switch.utils.ts
import type { SwitchVariantProps } from './Switch.variants';
import type { SpinnerVariantProps } from '../Spinner/Spinner.variants';

const getSpinnerSize = (size: SwitchVariantProps['size']): SpinnerVariantProps['size'] => {
	if (size === 'xl') return 'lg';
	if (size === 'lg') return 'md';
	return 'sm';
};

export const switchUtils = {
	/**
	 * Maps Switch size to appropriate Spinner size
	 */
	getSpinnerSize,
};
```

**Example 3: Input Utils**

```typescript
// Input.utils.ts
export type InputStateType = 'default' | 'error' | 'success' | 'warning';

const getInputState = (params: { state?: 'success' | 'warning' | null; error?: string }): InputStateType => {
	const { state, error } = params;

	if (error) return 'error';
	if (state === 'success' || state === 'warning') return state;
	return 'default';
};

const getInputMessage = (params: { error?: string; helperText?: string }): string | undefined => {
	const { error, helperText } = params;
	return error ?? helperText;
};

const getInputId = (customId?: string): string => {
	return customId ?? `input-${Math.random().toString(36).substring(2, 11)}`;
};

const getAriaDescribedBy = (inputId: string, hasMessage: boolean): string | undefined => {
	return hasMessage ? `${inputId}-message` : undefined;
};

export const inputUtils = {
	/**
	 * Determines input state based on error and state props
	 * Priority: error > state > default
	 */
	getInputState,

	/**
	 * Gets display message from error or helper text
	 * Priority: error > helperText
	 */
	getInputMessage,

	/**
	 * Generates unique ID for input element if not provided
	 */
	getInputId,

	/**
	 * Generates ARIA describedby ID when message exists
	 */
	getAriaDescribedBy,
};
```

### Using Utils in Components

```typescript
// Component.component.tsx
import React from 'react';
import { componentUtils } from './Component.utils';
import type { ComponentProps } from './Component.types';

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
	({ options, value, placeholder, ...props }, ref) => {
		// Use utils via the exported object
		const selectedOption = componentUtils.getSelectedOption(options, value);
		const displayText = componentUtils.getDisplayText(selectedOption, placeholder);

		const handleSelect = (option: Option) => {
			// Use utils in handlers
			if (componentUtils.isOptionDisabled(option)) return;
			onChange?.(option.value);
		};

		return <div>{displayText}</div>;
	}
);
```

### Exporting Utils from index.ts

```typescript
// Component/index.ts
export { Component } from './Component.component';
export type { ComponentProps } from './Component.types';
export type { ComponentVariantProps } from './Component.variants';
export { componentUtils } from './Component.utils';
```

### Testing Utils

Always create tests for utils (they're easy to test!):

```typescript
// Component.utils.test.ts
import { describe, expect, test } from 'vitest';
import { componentUtils } from './Component.utils';

describe('Component Utils', () => {
	describe('isOptionDisabled', () => {
		test('returns false when disabled property is not set', () => {
			const option = { value: 'test', label: 'Test' };
			expect(componentUtils.isOptionDisabled(option)).toBe(false);
		});

		test('returns true when disabled is explicitly true', () => {
			const option = { value: 'test', label: 'Test', disabled: true };
			expect(componentUtils.isOptionDisabled(option)).toBe(true);
		});
	});

	describe('getSelectedOption', () => {
		const options = [
			{ value: 'opt1', label: 'Option 1' },
			{ value: 'opt2', label: 'Option 2' },
		];

		test('returns correct option when value matches', () => {
			const result = componentUtils.getSelectedOption(options, 'opt2');
			expect(result).toEqual({ value: 'opt2', label: 'Option 2' });
		});

		test('returns undefined when value does not match', () => {
			expect(componentUtils.getSelectedOption(options, 'opt3')).toBeUndefined();
		});
	});
});
```

### Utils Best Practices

1. **Keep functions pure** - No side effects, no external state
2. **Single responsibility** - Each function does one thing well
3. **Type everything** - Full TypeScript types for params and returns
4. **Test thoroughly** - Utils are easy to test, aim for 100% coverage
5. **Clear naming** - Use action verbs: `get`, `is`, `calculate`, `format`, `validate`
6. **Brief docs** - One-line description in exported object is enough
7. **Group logically** - Related functions in same utils file
8. **Reusability** - If used only once, keep it inline in component

### Utils vs Hooks

**Use Utils (.utils.ts) for:**
- ✅ Pure functions (no side effects)
- ✅ Data transformation
- ✅ Validation logic
- ✅ Calculations
- ✅ Formatting

**Use Hooks (.hooks.ts) for:**
- ✅ Functions using React hooks
- ✅ State management
- ✅ Side effects
- ✅ Event listeners
- ✅ Lifecycle logic

```typescript
// ✅ UTIL: Pure function
const formatPrice = (price: number): string => {
	return `$${price.toFixed(2)}`;
};

// ✅ HOOK: Uses React hooks
const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => { ... };
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [ref, handler]);
};
```

---

## COMPONENT CATEGORIES

### 1. Interactive Components (Button, Select, Checkbox, etc.)

**Key Requirements:**
- Use `React.forwardRef` for ref forwarding
- Set `displayName` for dev tools
- Support `variant`, `colorScheme`, `size` variants
- Include `loading` and `disabled` states
- Add proper ARIA attributes
- Handle keyboard interactions

**Variants Structure:**
```typescript
export const buttonVariants = cva(
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'rounded-md',
		'font-medium',
		'transition-all',
		'duration-300',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-ring',
		'focus-visible:ring-offset-2',
	],
	{
		variants: {
			variant: { solid: [], outline: [], ghost: [], link: [] },
			colorScheme: { primary: [], secondary: [], success: [], warning: [], error: [], info: [], muted: [] },
			size: {
				sm: ['px-3', 'py-1.5', 'text-sm'],
				md: ['px-4', 'py-2', 'text-base'],
				lg: ['px-6', 'py-3', 'text-lg'],
			},
			fullWidth: { true: 'w-full', false: 'w-auto' },
		},
		compoundVariants: [
			{ variant: 'solid', colorScheme: 'primary', class: 'bg-primary-600 hover:bg-primary-500 text-white' },
			{ variant: 'outline', colorScheme: 'primary', class: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white' },
			{ variant: 'ghost', colorScheme: 'primary', class: 'text-primary-600 hover:bg-primary-50' },
		],
		defaultVariants: { variant: 'solid', colorScheme: 'primary', size: 'md', fullWidth: false },
	}
);
````

### 2. Form Components (Input, Textarea, Select, etc.)

**Key Requirements:**

- Support both controlled and uncontrolled modes
- Integrate with Field component for labels/errors
- Handle `variant`, `state`, `size` variants
- Add proper ARIA attributes for accessibility
- Support `disabled`, `readOnly`, `required` states
- Include helper text and error message handling

**Variants Structure:**

```typescript
export const inputVariants = cva(
	[
		'block',
		'w-full',
		'rounded-md',
		'transition-all',
		'duration-200',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-ring',
		'focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
		'placeholder:text-muted-400',
	],
	{
		variants: {
			variant: {
				default: ['border', 'bg-input'],
				outlined: ['border-2', 'bg-transparent'],
				filled: ['border', 'border-transparent', 'bg-muted-100', 'shadow-xs'],
				borderless: ['border-0', 'bg-transparent', 'shadow-none'],
				underlined: ['border-0', 'border-b-2', 'bg-transparent', 'rounded-none', 'shadow-none', 'px-0'],
			},
			state: { default: [], error: [], success: [], warning: [] },
			size: { sm: ['px-3', 'py-1.5', 'text-sm'], md: ['px-4', 'py-2', 'text-base'] },
			fullWidth: { true: 'w-full', false: 'w-auto' },
		},
		compoundVariants: [
			{ variant: 'default', state: 'default', class: 'border-input-border text-foreground focus:border-primary-500' },
			{ variant: 'default', state: 'error', class: 'border-error-500 text-foreground focus:border-error-600' },
			{ variant: 'default', state: 'success', class: 'border-success-500 text-foreground focus:border-success-600' },
			{ variant: 'outlined', state: 'default', class: 'border-border text-foreground focus:border-primary-500' },
			{ variant: 'outlined', state: 'error', class: 'border-error-500 text-foreground focus:border-error-600' },
		],
		defaultVariants: { variant: 'default', state: 'default', size: 'md', fullWidth: true },
	}
);
```

### 3. Display Components (Card, Badge, Alert, etc.)

**Key Requirements:**

- Simple prop interfaces
- Support `variant` and `padding`/`spacing` variants
- Use semantic color tokens
- No complex state management needed

**Variants Structure:**

```typescript
export const cardVariants = cva(['rounded-md', 'border'], {
	variants: {
		variant: {
			default: ['bg-card', 'border-border'],
			elevated: ['bg-card', 'shadow-md', 'border-transparent'],
			outlined: ['bg-transparent', 'border-border'],
		},
		padding: {
			none: 'p-0',
			sm: 'p-4',
			md: 'p-6',
			lg: 'p-8',
		},
	},
	defaultVariants: { variant: 'default', padding: 'md' },
});
```

### 4. Typography Components (Heading, Text)

**Key Requirements:**

- Use semantic typography tokens (typo-body, typo-h1, etc.)
- Support polymorphic `as` prop for semantic HTML
- Support `colorScheme` for text colors
- Keep variants simple and semantic

**Variants Structure:**

```typescript
export const textVariants = cva([], {
	variants: {
		variant: {
			body: ['typo-body'],
			'body-sm': ['typo-body-sm'],
			'body-lg': ['typo-body-lg'],
			caption: ['typo-caption'],
			code: ['typo-code'],
		},
		colorScheme: {
			default: ['text-foreground'],
			muted: ['text-foreground-muted'],
			primary: ['text-primary-600'],
			secondary: ['text-secondary-600'],
			success: ['text-success-600'],
			error: ['text-error-600'],
		},
	},
	defaultVariants: { variant: 'body', colorScheme: 'default' },
});
```

---

## SEMANTIC TOKENS USAGE

ALWAYS use semantic tokens, NEVER use base colors directly:

**✅ DO:**

- `bg-primary-600`, `text-foreground`, `border-input-border`
- `text-error-600`, `bg-success-50`, `border-warning-500`
- Typography utilities: `typo-body`, `typo-h1`, `typo-caption`

**❌ DON'T:**

- `bg-indigo-600`, `text-blue-500`, `border-gray-300`
- Hardcoded pixel values for typography

**Available Semantic Families:**

- Color schemes: `primary`, `secondary`, `success`, `warning`, `error`, `info`, `muted`, `accent`
- UI tokens: `foreground`, `border`, `input`, `card`, `disabled`, `ring`
- Typography: `typo-body`, `typo-body-sm`, `typo-body-lg`, `typo-caption`, `typo-h1` to `typo-h6`

---

## ACCESSIBILITY REQUIREMENTS

Every component MUST include:

**1. Semantic HTML**

- Use correct semantic elements (button, input, label, etc.)
- Avoid divs for interactive elements

**2. ARIA Attributes**

- `aria-label` or `aria-labelledby` for non-text content
- `aria-describedby` for helper text/errors
- `aria-invalid` for error states
- `aria-disabled` for disabled states
- `aria-busy` for loading states
- `role="alert"` and `aria-live="polite"` for error messages

**3. Keyboard Support**

- Tab navigation with visible focus states
- Enter/Space for activation
- Escape for dismissal (modals, dropdowns)
- Arrow keys for navigation (where applicable)

**4. Focus Management**

- `focus-visible:outline-none` base style
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` for visible focus

---

## TYPES TEMPLATE

```typescript
import type { ComponentVariantProps } from './ComponentName.variants';

// For button-like components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ComponentVariantProps {
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

// For input-like components
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, ComponentVariantProps {
	label?: string;
	helperText?: string;
	error?: string;
}

// For display components
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, ComponentVariantProps {
	children: React.ReactNode;
}

// For polymorphic components (Text, Heading)
export interface TextProps<T extends React.ElementType = 'p'>
	extends Omit<React.ComponentPropsWithoutRef<T>, 'as'>,
		ComponentVariantProps {
	as?: T;
}
```

---

## COMPONENT IMPLEMENTATION PATTERNS

**Interactive Component:**

```typescript
import React from 'react';
import { mergeClassNames } from '@mirai-ui/utils';
import { buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, colorScheme, size, fullWidth, loading, className, children, disabled, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={mergeClassNames(
					buttonVariants({ variant, colorScheme, size, fullWidth }),
					className
				)}
				aria-busy={loading}
				disabled={disabled || loading}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
```

**Form Component:**

```typescript
import React from 'react';
import { mergeClassNames } from '@mirai-ui/utils';
import { inputVariants } from './Input.variants';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ variant, state, size, fullWidth, className, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={mergeClassNames(
					inputVariants({ variant, state, size, fullWidth }),
					className
				)}
				aria-invalid={state === 'error'}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';
```

---

## STORYBOOK STORIES STRUCTURE

Every component MUST have these core stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.component';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Button',
		variant: 'solid',
		colorScheme: 'primary',
		size: 'md',
	},
	argTypes: {
		onClick: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Default story
export const Default: Story = {};

// 2. All variants showcase
export const Variants: Story = {
	render: () => (
		<div className="flex gap-3 flex-wrap">
			<Button variant="solid">Solid</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

// 3. Color schemes showcase
export const ColorSchemes: Story = {
	render: () => (
		<div className="flex gap-3 flex-wrap">
			<Button colorScheme="primary">Primary</Button>
			<Button colorScheme="secondary">Secondary</Button>
			<Button colorScheme="success">Success</Button>
			<Button colorScheme="warning">Warning</Button>
			<Button colorScheme="error">Error</Button>
		</div>
	),
};

// 4. Sizes showcase
export const Sizes: Story = {
	render: () => (
		<div className="flex items-start gap-3">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

// 5. States showcase (for interactive components)
export const States: Story = {
	render: () => (
		<div className="flex gap-3 flex-wrap">
			<Button>Default</Button>
			<Button loading>Loading</Button>
			<Button disabled>Disabled</Button>
		</div>
	),
};

// 6. Real-world examples
export const RealWorld: Story = {
	render: () => (
		<div className="flex gap-3">
			<Button variant="solid" colorScheme="primary">
				Submit Form
			</Button>
			<Button variant="outline" colorScheme="secondary">
				Cancel
			</Button>
		</div>
	),
};
```

---

## TEST STRUCTURE

Every component MUST include comprehensive tests:

```typescript
import { describe, expect, test, vi } from 'vitest';
import { render, screen, userEvent } from '@mirai-ui/test';
import { Button } from './Button.component';

describe('Button', () => {
	describe('Rendering', () => {
		test('renders button with text', () => {
			render(<Button>Click me</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Click me');
		});

		test('applies custom className', () => {
			render(<Button className="custom-class">Button</Button>);
			expect(screen.getByRole('button')).toHaveClass('custom-class');
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

		test('does not trigger click when disabled', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick} disabled>Disabled</Button>);

			await user.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		test('has proper role', () => {
			render(<Button>Button</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('sets aria-busy when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
		});

		test('is keyboard accessible', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Button</Button>);

			screen.getByRole('button').focus();
			await user.keyboard('{Enter}');
			expect(handleClick).toHaveBeenCalled();
		});
	});

	describe('States', () => {
		test('disables button when disabled prop is true', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

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

**Test Requirements:**

- Use `describe` blocks to organize tests
- Test rendering, interaction, accessibility, states, and ref forwarding
- Use `userEvent` for realistic interactions (NOT `fireEvent`)
- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Always use `await` with `userEvent` methods
- Test keyboard navigation where applicable
- Don't test CSS classes unless critical for functionality

---

## COMPONENT EXPORT PATTERNS

### Export Philosophy

Use **explicit named exports** for clarity, tree-shaking, and TypeScript support. Choose the right pattern based on component architecture.

---

### Pattern 1: Simple Component (Most Common)

For standalone components without sub-components or minimal internal parts.

**When to use:**

- Button, Input, Text, Heading
- Components without sub-components
- Internal parts are implementation details

**index.ts structure:**

```typescript
// Export main component
export { ComponentName } from './ComponentName.component';

// Export types
export type { ComponentNameProps } from './ComponentName.types';

// Export variant props for advanced users
export type { ComponentNameVariantProps } from './ComponentName.variants';
```

**Example: Button**

```typescript
export { Button } from './Button.component';
export type { ButtonProps } from './Button.types';
export type { ButtonVariantProps, IconSize } from './Button.variants';
```

**Benefits:**

- ✅ Best tree-shaking
- ✅ Clear API surface
- ✅ TypeScript-friendly
- ✅ No namespace pollution

---

### Pattern 2: Compound Component with Context (Flexible Composition)

For components where sub-parts **must** work together and share state via Context.

**When to use:**

- Field (label, control, message share context)
- Tabs (tab buttons share active state)
- Accordion (items share open/close state)
- RadioGroup (radios share selection)

**Criteria:**

- Sub-components require shared state
- Sub-components are rarely used independently
- Context API is used for implicit communication

**index.ts structure:**

```typescript
// Export all parts individually for tree-shaking
export { ComponentName, ComponentNamePart1, ComponentNamePart2 } from './ComponentName.component';

// Export all types
export type { ComponentNameProps, ComponentNamePart1Props, ComponentNamePart2Props } from './ComponentName.types';

export type { ComponentNameVariantProps } from './ComponentName.variants';
```

**ComponentName.component.tsx structure:**

```typescript
// Define sub-components
export const FieldLabel = React.forwardRef<...>((props, ref) => {
  const context = useFieldContext(); // Uses shared context
  // ...
});

export const FieldControl = React.forwardRef<...>((props, ref) => {
  const context = useFieldContext(); // Uses shared context
  // ...
});

export const FieldMessage = React.forwardRef<...>((props, ref) => {
  const context = useFieldContext(); // Uses shared context
  // ...
});

// Main component with namespace for convenience
export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
  Message: FieldMessage,
});

FieldRoot.displayName = 'FieldRoot';
FieldLabel.displayName = 'FieldLabel';
FieldControl.displayName = 'FieldControl';
FieldMessage.displayName = 'FieldMessage';
```

**Example: Field**

```typescript
// index.ts
export { Field, FieldLabel, FieldControl, FieldMessage } from './Field.component';
export type { FieldRootProps, FieldLabelProps, FieldControlProps, FieldMessageProps } from './Field.types';
export type { FieldRootVariantProps } from './Field.variants';
```

**Usage flexibility:**

```typescript
// Pattern 1: Namespace (cleaner for compound components)
<Field>
  <Field.Label>Email</Field.Label>
  <Field.Control><Input /></Field.Control>
  <Field.Message>Helper text</Field.Message>
</Field>

// Pattern 2: Named imports (better tree-shaking)
import { Field, FieldLabel, FieldControl } from '@mirai-ui';
<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldControl><Input /></FieldControl>
</Field>
```

**Benefits:**

- ✅ Both usage patterns available
- ✅ Clear parent-child relationship
- ✅ Implicit state sharing via Context
- ✅ Still supports tree-shaking with named imports

---

### Pattern 3: Component with Internal Sub-Components

For components with sub-components that are internal implementation details.

**When to use:**

- Select (with SelectOption, SelectIcon)
- Checkbox (with CheckboxIcon)
- Components where sub-parts are rendered internally

**Criteria:**

- Sub-components are NOT meant for external use
- Parent component controls rendering
- No need for external composition

**index.ts structure:**

```typescript
// Export ONLY the main component
export { Select } from './Select.component';
export type { SelectProps, SelectOption } from './Select.types';
export type { SelectVariantProps } from './Select.variants';

// DO NOT export SelectOption or SelectIcon - they're internal
```

**Example: Select**

```typescript
// Select renders options internally via props
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  value={value}
  onChange={onChange}
/>

// SelectOption and SelectIcon are internal implementation details
```

**Benefits:**

- ✅ Simple, focused API
- ✅ No breaking changes if internal structure changes
- ✅ Users can't misuse internal components
- ✅ Best encapsulation

---

### Export Pattern Decision Matrix

| Component Type              | Pattern        | Export Sub-Components? | Example                    |
| --------------------------- | -------------- | ---------------------- | -------------------------- |
| **Simple standalone**       | Pattern 1      | No                     | Button, Input, Text        |
| **Compound with Context**   | Pattern 2      | Yes, all parts         | Field, Tabs, Accordion     |
| **Internal sub-components** | Pattern 3      | No, keep internal      | Select, Checkbox           |
| **Optional composition**    | Pattern 1 or 2 | Optional               | Card, CardHeader, CardBody |

---

### What to Export

**Always export:**

- ✅ Main component
- ✅ Component props types
- ✅ Variant props types (for advanced styling)

**Sometimes export:**

- ⚠️ Sub-components (only for compound components with Context)
- ⚠️ Utility types (if useful for consumers)
- ⚠️ Variant functions (for advanced custom styling)

**Never export:**

- ❌ Internal helper functions
- ❌ Internal sub-components (unless Pattern 2)
- ❌ Implementation details
- ❌ Hook internals

---

### Common Mistakes to Avoid

**❌ DON'T: Use wildcard exports**

```typescript
// BAD - breaks tree-shaking, unclear API
export * from './Button.component';
export * from './Button.types';
```

**✅ DO: Use explicit named exports**

```typescript
// GOOD - clear, tree-shakeable
export { Button } from './Button.component';
export type { ButtonProps } from './Button.types';
export type { ButtonVariantProps } from './Button.variants';
```

**❌ DON'T: Export everything**

```typescript
// BAD - exposes internal implementation
export { Select, SelectOption, SelectIcon, useSelectState, SelectDropdown } from './Select.component';
```

**✅ DO: Export only public API**

```typescript
// GOOD - clean API surface
export { Select } from './Select.component';
export type { SelectProps, SelectOption } from './Select.types';
```

**❌ DON'T: Use Object.assign for simple components**

```typescript
// BAD - unnecessary complexity for standalone component
export const Button = Object.assign(ButtonRoot, {
	Icon: ButtonIcon, // Users don't need this
});
```

**✅ DO: Use Object.assign only for compound components**

```typescript
// GOOD - compound component with shared context
export const Field = Object.assign(FieldRoot, {
	Label: FieldLabel, // Uses shared context
	Control: FieldControl, // Uses shared context
	Message: FieldMessage, // Uses shared context
});
```

---

## INDEX.TS EXPORT TEMPLATES

### Template 1: Simple Component

```typescript
export { ComponentName } from './ComponentName.component';
export type { ComponentNameProps } from './ComponentName.types';
export type { ComponentNameVariantProps } from './ComponentName.variants';
```

### Template 2: Compound Component

```typescript
export {
	ComponentName,
	ComponentNameLabel,
	ComponentNameControl,
	ComponentNameMessage,
} from './ComponentName.component';

export type {
	ComponentNameProps,
	ComponentNameLabelProps,
	ComponentNameControlProps,
	ComponentNameMessageProps,
} from './ComponentName.types';

export type { ComponentNameVariantProps } from './ComponentName.variants';
```

### Template 3: Component with Type Exports Only

```typescript
export { ComponentName } from './ComponentName.component';
export type { ComponentNameProps } from './ComponentName.types';
// Note: No variant props if component doesn't use CVA
```

---

## POST-GENERATION WORKFLOW

After generating all files, you MUST execute these steps IN ORDER:

### Step 1: Export Component

Add the component to `src/components/index.ts`:

```typescript
export * from './ComponentName';
```

### Step 2: Write Tests

- Verify all test cases are comprehensive
- Ensure tests follow the structure above
- Include rendering, interaction, accessibility, states, and ref tests

### Step 3: Run Linter

Run: `pnpm lint` or lint specific files

- Fix ALL linting errors and warnings
- Do not proceed until linting passes

### Step 4: Type Check

Run: `pnpm typecheck` or `tsc --noEmit`

- Fix ALL type errors
- Ensure type safety across all files

### Step 5: Run Tests

Run: `pnpm test`

- Verify all new tests pass
- Ensure existing tests still pass
- Fix any failures before proceeding

### Iteration Loop

If ANY step fails:

1. Fix the issues
2. Return to Step 3 (linting)
3. Continue through all steps until everything passes

### Success Criteria

ALL of these must pass:

- ✅ All files generated with correct structure
- ✅ Component exported from index files
- ✅ No linting errors
- ✅ No type errors
- ✅ All tests passing

---

## CODE ORGANIZATION & MAINTAINABILITY

### Shared Hooks Usage

**Always check `src/hooks/` before creating component-specific hooks:**

Available shared hooks:

- `useEventListener` - For DOM event listeners (click, resize, keydown, etc.)

```typescript
// ✅ DO: Use shared hook from src/hooks
import { useEventListener } from '../../hooks';

const handleClickOutside = (e: MouseEvent) => {
	// logic
};

useEventListener('mousedown', handleClickOutside, document);

// ❌ DON'T: Reimplement event listener logic
useEffect(() => {
	document.addEventListener('mousedown', handleClickOutside);
	return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### Component Organization Principles

1. **Keep component file clean** (ideally < 150 lines)
   - Extract hooks to `.hooks.ts` if > 20 lines
   - Extract utils to `.utils.ts` if reused 3+ times
   - Extract internal components if > 30 lines

2. **Naming conventions:**
   - Internal components: Prefix with parent name (`SelectIcon`, `SelectOption`)
   - Hooks: Descriptive names (`useClickOutside`, `useKeyboardNavigation`)
   - Utils: Action-based names (`isOptionDisabled`, `getDisplayText`)

3. **Import order (enforced by linter):**

   ```typescript
   // 1. External libraries
   import React from 'react';

   // 2. Shared hooks/utils (alphabetical)
   import { useEventListener } from '../../hooks';
   import { mergeClassNames } from '@mirai-ui/utils';

   // 3. Local imports (alphabetical)
   import { ComponentName } from './ComponentName';
   import { componentVariants } from './ComponentName.variants';

   // 4. Types (last)
   import type { ComponentProps } from './ComponentName.types';
   ```

4. **Component structure order:**

   ```typescript
   // 1. Internal sub-components (if any)
   const InternalIcon: React.FC<IconProps> = ({ isOpen }) => (
     <svg>...</svg>
   );

   // 2. Main component
   export const Component = React.forwardRef<HTMLElement, Props>(
     (props, ref) => {
       // 3. Refs
       const elementRef = useRef(null);

       // 4. State
       const [isOpen, setIsOpen] = useState(false);

       // 5. Shared hooks
       useEventListener('click', handler, document);

       // 6. Component-specific hooks
       const { handleKeyDown } = useKeyboardNavigation({...});

       // 7. Callbacks
       const handleClick = useCallback(() => {}, []);

       // 8. Derived values
       const displayText = getDisplayText(value);

       // 9. Render
       return <div>...</div>;
     }
   );

   Component.displayName = 'Component';
   ```

### Extract Internal Components When:

```typescript
// ❌ BAD: Inline complex JSX
<button>
  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
    <svg className="w-5 h-5">
      <path d="..." />
    </svg>
  </div>
  {children}
</button>

// ✅ GOOD: Extract to named component
const LeftIcon: React.FC<{ icon: ReactNode }> = ({ icon }) => (
  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
    <span className="text-muted-400">{icon}</span>
  </div>
);

LeftIcon.displayName = 'LeftIcon';

// ✅ BEST: Extract to separate file/folder if used elsewhere
import { LeftIcon } from './LeftIcon';
```

### Performance Optimization

```typescript
// ✅ Use React.useCallback for event handlers
const handleClick = React.useCallback(() => {
	// logic
}, [deps]);

// ✅ Use React.useMemo for expensive calculations
const filteredOptions = React.useMemo(() => options.filter((opt) => !opt.disabled), [options]);

// ✅ Memoize handler updates in custom hooks
useEffect(() => {
	savedHandler.current = handler;
}, [handler]);
```

## IMPORTANT REMINDERS

1. **Always use `React.forwardRef`** for components that render HTML elements
2. **Always set `displayName`** for better dev tools experience
3. **Use `mergeClassNames`** utility for combining CVA classes with custom className
4. **Use semantic tokens** - never hardcode base colors
5. **Include proper ARIA attributes** for accessibility
6. **Test keyboard interactions** in addition to click events
7. **Support both controlled and uncontrolled modes** for form inputs
8. **Follow the post-generation workflow** - don't skip steps
9. **Use `@mirai-ui/test`** for test imports, not direct testing-library imports
10. **Keep stories simple and focused** - show variants, don't test logic
11. **Check `src/hooks/` for shared hooks** before reimplementing
12. **Extract complex logic** to separate files when appropriate
13. **Keep component files clean** (< 150 lines ideal)
14. **Follow import order** conventions (enforced by linter)
15. **Use `useCallback`** for event handlers to prevent re-renders
16. **Create `.utils.ts` with `componentUtils` export** for pure functions (3+ utils or reused)
17. **Always test utils** - they're easy to test and should have good coverage
18. **Use utils via object notation** - `componentUtils.functionName()` in components

---

## GENERATION CHECKLIST

Before considering the task complete, verify:

### Required Files

- [ ] All 6 required files created (component, types, variants, stories, test, index)
- [ ] Optional files added when needed (hooks, utils, sub-components)
- [ ] Utils file follows pattern (`componentUtils` export) if created
- [ ] Utils tests created if utils file exists

### Code Quality

- [ ] Component uses `React.forwardRef` with `displayName`
- [ ] CVA variants use semantic tokens only
- [ ] Proper TypeScript types extending correct HTML interfaces
- [ ] Utils are pure functions (no hooks, no side effects)
- [ ] Utils exported from `index.ts` if created
- [ ] Component file < 150 lines (extract if longer)

### Documentation & Testing

- [ ] Comprehensive Storybook stories (Default, Variants, ColorSchemes, Sizes, States, RealWorld)
- [ ] Complete test coverage (Rendering, Interaction, Accessibility, States, Ref)
- [ ] Utils tests pass with good coverage
- [ ] Proper ARIA attributes for accessibility

### Integration

- [ ] Component exported from `src/components/index.ts`
- [ ] Linting passes with no errors
- [ ] Type checking passes with no errors
- [ ] All tests pass (new and existing)

---

When you receive a component request, follow this workflow:

1. Identify component category (Interactive, Form, Display, or Typography)
2. Generate all 6 required files
3. Export from index files
4. Execute post-generation workflow
5. Report completion with summary of what was created

```

---

## Usage Examples

### Example 1: Simple Interactive Component
```

/component create a Badge component with variants for solid, outline, and soft styles, and color schemes for all semantic colors

```

### Example 2: Form Component
```

/component create a Select component with dropdown functionality, support for options, placeholder, and all standard form states

```

### Example 3: Display Component
```

/component create an Alert component with variants for info, success, warning, and error, with support for icons and dismiss button

```

### Example 4: Typography Component
```

/component create a Label component for form labels with support for required indicator and different sizes

```

### Example 5: Complex Interactive Component
```

/component create a Switch toggle component with on/off states, support for controlled/uncontrolled modes, and accessibility features

```

---

## Tips

1. **Be specific about variants** - List the variants you want (solid, outline, ghost, etc.)
2. **Mention special features** - Icons, loading states, special interactions
3. **Reference existing components** - "similar to Button but for..."
4. **Specify accessibility needs** - Keyboard navigation, screen reader support
5. **Trust the process** - The command will handle the complete workflow

---

## Component Categories Reference

- **Interactive**: Button, IconButton, Link, Switch, ToggleButton
- **Form**: Input, Textarea, Select, Radio, Checkbox, Slider
- **Display**: Card, Badge, Alert, Avatar, Chip, Divider
- **Typography**: Text, Heading, Label, Code
- **Layout**: Container, Stack, Grid, Flex
- **Feedback**: Spinner, Skeleton, Progress, Toast
- **Overlay**: Modal, Popover, Tooltip, Dropdown






```
