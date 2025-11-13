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

## INDEX.TS EXPORT

```typescript
export { ComponentName } from './ComponentName.component';
export type { ComponentNameProps } from './ComponentName.types';
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

---

## GENERATION CHECKLIST

Before considering the task complete, verify:

- [ ] All 6 required files created (component, types, variants, stories, test, index)
- [ ] Component uses `React.forwardRef` with `displayName`
- [ ] CVA variants use semantic tokens only
- [ ] Proper TypeScript types extending correct HTML interfaces
- [ ] Comprehensive Storybook stories (Default, Variants, ColorSchemes, Sizes, States, RealWorld)
- [ ] Complete test coverage (Rendering, Interaction, Accessibility, States, Ref)
- [ ] Proper ARIA attributes for accessibility
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
