# Component Refactoring Checklist

Use this checklist when reviewing or refactoring components for better maintainability.

## 🔍 When to Refactor

Refactor when you notice:

- ❌ Component file > 200 lines
- ❌ Duplicate logic (used 3+ times)
- ❌ Complex hooks > 30 lines in component
- ❌ Inline event listeners with manual cleanup
- ❌ Deep nesting (> 3 levels)
- ❌ Large switch statements (> 40 lines)
- ❌ Complex internal components (> 30 lines inline)

---

## 📝 Refactoring Steps

### Step 1: Identify Extraction Candidates

Check your component for:

```typescript
// ❌ Manual event listeners?
useEffect(() => {
	document.addEventListener('click', handler);
	return () => document.removeEventListener('click', handler);
}, []);

// ✅ Use shared useEventListener
useEventListener('click', handler, document);
```

```typescript
// ❌ Repeated disabled checks?
if (option.disabled ?? false) return;
if (option.disabled ?? false) return;

// ✅ Extract to util
export const isOptionDisabled = (option: SelectOption) => option.disabled ?? false;
```

```typescript
// ❌ Large inline component?
<div className="absolute inset-y-0 right-0 flex items-center pr-3">
  <svg className="w-5 h-5">
    {/* 20+ lines of SVG */}
  </svg>
</div>

// ✅ Extract to named component
const Icon: React.FC<Props> = (props) => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
    <svg className="w-5 h-5">{/* SVG */}</svg>
  </div>
);
```

### Step 2: Extract Hooks

**Create `Component.hooks.ts` when:**

1. You have complex keyboard navigation:

```typescript
// Component.hooks.ts
export const useKeyboardNavigation = (config: NavigationConfig) => {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case 'Enter':
				case 'Space':
				case 'Escape':
				case 'ArrowDown':
				case 'ArrowUp':
				// ... handle all keys
			}
		},
		[config]
	);

	return { handleKeyDown };
};
```

2. You have click-outside detection:

```typescript
// Component.hooks.ts
export const useClickOutside = (
	refs: Array<React.RefObject<HTMLElement | null>>,
	handler: () => void,
	enabled = true
) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node));
			if (isOutside) handler();
		},
		[refs, handler, enabled]
	);

	useEventListener('mousedown', handleClickOutside, document);
};
```

3. You have complex state management:

```typescript
// Component.hooks.ts
export const useFormState = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string>();
	const [touched, setTouched] = useState(false);

	const validate = useCallback(() => {
		// validation logic
	}, [value]);

	return { value, setValue, error, touched, validate };
};
```

### Step 3: Extract Utils

**Create `Component.utils.ts` when:**

1. You have repeated checks:

```typescript
// Component.utils.ts
export const isOptionDisabled = (option: SelectOption): boolean => {
	return option.disabled ?? false;
};

export const isValidEmail = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

2. You have data transformations:

```typescript
// Component.utils.ts
export const getSelectedOption = (options: SelectOption[], value?: string): SelectOption | undefined => {
	return options.find((opt) => opt.value === value);
};

export const formatDisplayText = (option: SelectOption | undefined, placeholder: string): string => {
	return option?.label ?? placeholder;
};
```

3. You have pure calculations:

```typescript
// Component.utils.ts
export const calculateProgress = (current: number, total: number): number => {
	return Math.min(Math.round((current / total) * 100), 100);
};

export const formatFileSize = (bytes: number): string => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};
```

### Step 4: Extract Internal Components

**Create sub-component folder when:**

1. Internal component > 30 lines:

```typescript
// Before: Inline in main component
<div className="option" onClick={handleClick}>
  <div className="option-icon">{option.icon}</div>
  <div className="option-content">
    <div className="option-label">{option.label}</div>
    <div className="option-description">{option.description}</div>
  </div>
  <div className="option-badge">{option.badge}</div>
</div>

// After: Extract to SelectOption/
import { SelectOption } from './SelectOption';

<SelectOption
  option={option}
  onSelect={handleSelect}
/>
```

2. Component used in multiple places:

```typescript
// Before: Duplicated
<div className="icon-wrapper">
  <svg className="chevron-icon rotate-180">...</svg>
</div>

<div className="icon-wrapper">
  <svg className="chevron-icon">...</svg>
</div>

// After: Extract to SelectIcon/
import { SelectIcon } from './SelectIcon';

<SelectIcon isOpen={true} />
<SelectIcon isOpen={false} />
```

3. Component has its own variants:

```typescript
// SelectOption/SelectOption.variants.ts
export const selectOptionVariants = cva(['px-4 py-2 cursor-pointer'], {
	variants: {
		selected: {
			true: 'bg-primary-50 text-primary-600',
			false: 'text-foreground',
		},
		highlighted: {
			true: 'bg-muted-100',
			false: '',
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed',
			false: '',
		},
	},
});
```

### Step 5: Use Shared Hooks

**Replace manual implementations with shared hooks:**

```typescript
// ❌ Before: Manual event listener
useEffect(() => {
	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	window.addEventListener('resize', handleResize);
	return () => window.removeEventListener('resize', handleResize);
}, []);

// ✅ After: Use shared hook
import { useEventListener } from '../../hooks';

useEventListener(
	'resize',
	() => {
		setWidth(window.innerWidth);
	},
	window
);
```

```typescript
// ❌ Before: Complex click outside logic
useEffect(() => {
	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	if (isOpen) {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}
}, [isOpen]);

// ✅ After: Use custom hook
import { useClickOutside } from './Component.hooks';

useClickOutside([dropdownRef, buttonRef], () => setIsOpen(false), isOpen);
```

### Step 6: Optimize Performance

**Add memoization where needed:**

```typescript
// ✅ Memoize callbacks
const handleClick = useCallback(() => {
	onChange?.(value);
}, [onChange, value]);

// ✅ Memoize expensive calculations
const filteredOptions = useMemo(() => options.filter((opt) => !opt.disabled), [options]);

// ✅ Memoize derived values
const displayText = useMemo(() => getDisplayText(selectedOption, placeholder), [selectedOption, placeholder]);
```

---

## ✅ Final Checklist

After refactoring, verify:

### Structure

- [ ] Main component file < 150 lines
- [ ] Hooks extracted to `.hooks.ts` (if 2+)
- [ ] Utils extracted to `.utils.ts` (if 3+)
- [ ] Internal components extracted (if > 30 lines)
- [ ] Sub-components in separate folders (if complex)

### Imports

- [ ] Correct import order (React → utils → hooks → local → types)
- [ ] Using shared hooks from `src/hooks/`
- [ ] No unused imports

### Code Quality

- [ ] Used `useCallback` for event handlers
- [ ] Used `useMemo` for expensive calculations
- [ ] Functions < 20 lines
- [ ] Max nesting depth: 3 levels
- [ ] Early returns for guard clauses

### Shared Resources

- [ ] Using `useEventListener` instead of manual listeners
- [ ] Using `mergeClassNames` for class composition
- [ ] No reimplemented shared functionality

### Performance

- [ ] No inline object/array creation in render
- [ ] Event handlers memoized
- [ ] Expensive calculations memoized
- [ ] Handler refs in custom hooks

### Testing

- [ ] All tests still passing
- [ ] No regressions
- [ ] Added tests for new utils/hooks

### Documentation

- [ ] JSDoc comments for public APIs
- [ ] Type definitions clear
- [ ] Usage examples in stories

---

## 📊 Before/After Example

### Before: Monolithic Component (208 lines)

```typescript
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options = [], value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // 60 lines of useEffect for click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

    // 40 lines of keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          // logic
          break;
        case 'Space':
          // logic
          break;
        // ... 30 more lines
      }
    };

    // 20 lines of inline SVG icon
    // 30 lines of option rendering
    // ...

    return <div>{/* Complex JSX */}</div>;
  }
);
```

### After: Refactored Component (147 lines)

```typescript
// Select.component.tsx
import { useClickOutside, useKeyboardNavigation } from './Select.hooks';
import { isOptionDisabled, getDisplayText } from './Select.utils';
import { SelectIcon } from './SelectIcon';
import { SelectOption } from './SelectOption';

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options = [], value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Clean, single-line hook usage
    useClickOutside([dropdownRef, buttonRef], () => setIsOpen(false), isOpen);

    const { handleKeyDown } = useKeyboardNavigation({
      isOpen,
      onClose: () => setIsOpen(false),
      // ... config
    });

    const displayText = getDisplayText(selectedOption, placeholder);

    return (
      <div>
        <button onKeyDown={handleKeyDown}>
          <span>{displayText}</span>
          <SelectIcon isOpen={isOpen} />
        </button>
        {isOpen && (
          <div ref={dropdownRef}>
            {options.map(opt => (
              <SelectOption key={opt.value} option={opt} />
            ))}
          </div>
        )}
      </div>
    );
  }
);
```

**Result:**

- ✅ Main component: 208 lines → 147 lines (29% reduction)
- ✅ Logic organized in separate files
- ✅ Reusable hooks and utils
- ✅ Better testability
- ✅ Improved readability

---

## 🎯 Key Principles

1. **Single Responsibility** - Each file has one clear purpose
2. **DRY (Don't Repeat Yourself)** - Extract repeated logic
3. **Separation of Concerns** - UI, logic, and data separate
4. **Readability First** - Code should be self-documenting
5. **Performance Aware** - Memoize when needed, not always
6. **Testability** - Small, pure functions are easier to test
7. **Maintainability** - Future developers (including you) will thank you

---

## 💡 Pro Tips

1. **Start small** - Don't refactor everything at once
2. **Test after each change** - Ensure no regressions
3. **Use linter** - It will guide import order and conventions
4. **Check existing patterns** - Look at Select component for reference
5. **Document as you go** - Add JSDoc comments
6. **Get feedback** - Have others review your refactoring
7. **Measure impact** - Track line count and complexity reduction

---

## 🚀 Next Steps

After refactoring:

1. Run all tests: `npm test`
2. Check linting: `npm run lint`
3. Type check: `npm run typecheck`
4. Update documentation
5. Create PR with before/after comparison
6. Share learnings with team

Happy refactoring! ✨
