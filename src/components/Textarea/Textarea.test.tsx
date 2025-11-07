import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Field } from '../Field';

import { Textarea } from './Textarea.component';

describe('Textarea', () => {
	describe('Rendering', () => {
		test('renders textarea element', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('renders with placeholder', () => {
			render(<Textarea placeholder="Enter your message" />);
			expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
		});

		test('renders with default value', () => {
			render(<Textarea defaultValue="Initial text" />);
			expect(screen.getByRole('textbox')).toHaveValue('Initial text');
		});

		test('renders with controlled value', () => {
			render(
				<Textarea
					value="Controlled text"
					onChange={() => {
						void 0;
					}}
				/>
			);
			expect(screen.getByRole('textbox')).toHaveValue('Controlled text');
		});

		test('renders with specified rows', () => {
			render(<Textarea rows={5} data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5');
		});
	});

	describe('Variants', () => {
		test('renders different textarea styles', () => {
			const { rerender } = render(<Textarea variant="default" placeholder="Default" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea variant="outlined" placeholder="Outlined" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea variant="filled" placeholder="Filled" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea variant="borderless" placeholder="Borderless" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea variant="underlined" placeholder="Underlined" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('renders different states', () => {
			const { rerender } = render(<Textarea state="default" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea state="error" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea state="success" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Textarea state="warning" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('applies different sizes', () => {
			const { rerender } = render(<Textarea size="sm" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea size="md" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea size="lg" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea size="xl" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();
		});

		test('applies different resize options', () => {
			const { rerender } = render(<Textarea resize="none" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea resize="vertical" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea resize="horizontal" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();

			rerender(<Textarea resize="both" data-testid="textarea" />);
			expect(screen.getByTestId('textarea')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(<Textarea className="custom-class" data-testid="textarea" />);
			const textarea = screen.getByTestId('textarea');
			expect(textarea).toHaveClass('custom-class');
		});

		test('applies fullWidth by default', () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId('textarea');
			expect(textarea).toBeInTheDocument();
		});

		test('applies fullWidth={false}', () => {
			render(<Textarea fullWidth={false} data-testid="textarea" />);
			const textarea = screen.getByTestId('textarea');
			expect(textarea).toBeInTheDocument();
		});
	});

	describe('Interaction', () => {
		test('handles user input', async () => {
			const user = userEvent.setup();
			render(<Textarea />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'Hello, World!');
			expect(textarea).toHaveValue('Hello, World!');
		});

		test('handles multiline input', async () => {
			const user = userEvent.setup();
			render(<Textarea />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'Line 1{Enter}Line 2{Enter}Line 3');
			expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
		});

		test('calls onChange handler', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Textarea onChange={handleChange} />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'test');
			expect(handleChange).toHaveBeenCalled();
		});

		test('calls onFocus handler', async () => {
			const user = userEvent.setup();
			const handleFocus = vi.fn();
			render(<Textarea onFocus={handleFocus} />);
			const textarea = screen.getByRole('textbox');

			await user.click(textarea);
			expect(handleFocus).toHaveBeenCalledTimes(1);
		});

		test('calls onBlur handler', async () => {
			const user = userEvent.setup();
			const handleBlur = vi.fn();
			render(<Textarea onBlur={handleBlur} />);
			const textarea = screen.getByRole('textbox');

			await user.click(textarea);
			await user.tab();
			expect(handleBlur).toHaveBeenCalledTimes(1);
		});

		test('respects maxLength attribute', async () => {
			const user = userEvent.setup();
			render(<Textarea maxLength={10} />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'This is a very long text that exceeds the limit');
			expect(textarea).toHaveValue('This is a ');
		});
	});

	describe('States', () => {
		test('can be disabled', () => {
			render(<Textarea disabled />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		test('cannot type in disabled textarea', async () => {
			const user = userEvent.setup();
			render(<Textarea disabled />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'test');
			expect(textarea).toHaveValue('');
		});

		test('can be readonly', () => {
			render(<Textarea readOnly value="Read only text" onChange={() => {}} />);
			const textarea = screen.getByRole('textbox');
			expect(textarea).toHaveAttribute('readonly');
		});

		test('cannot modify readonly textarea', async () => {
			const user = userEvent.setup();
			render(<Textarea readOnly defaultValue="Read only text" />);
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'new text');
			expect(textarea).toHaveValue('Read only text');
		});
	});

	describe('With Field Component', () => {
		test('works with Field for labels', () => {
			render(
				<Field>
					<Field.Label>Description</Field.Label>
					<Field.Control>
						<Textarea />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Description')).toBeInTheDocument();
		});

		test('works with Field for error messages', () => {
			render(
				<Field error="Description is required">
					<Field.Label>Description</Field.Label>
					<Field.Control>
						<Textarea />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('Description is required');
		});

		test('works with Field for helper text', () => {
			render(
				<Field helperText="Maximum 500 characters">
					<Field.Label>Description</Field.Label>
					<Field.Control>
						<Textarea />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
		});

		test('works with Field in disabled state', () => {
			render(
				<Field disabled>
					<Field.Label>Description</Field.Label>
					<Field.Control>
						<Textarea />
					</Field.Control>
				</Field>
			);

			expect(screen.getByRole('textbox')).toBeDisabled();
		});
	});

	describe('Accessibility', () => {
		test('has correct role', () => {
			render(<Textarea />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('supports aria-label', () => {
			render(<Textarea aria-label="Comment box" />);
			expect(screen.getByLabelText('Comment box')).toBeInTheDocument();
		});

		test('supports aria-describedby', () => {
			render(
				<>
					<Textarea aria-describedby="helper-text" />
					<span id="helper-text">Helper text</span>
				</>
			);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper-text');
		});

		test('can be required', () => {
			render(<Textarea required />);
			expect(screen.getByRole('textbox')).toBeRequired();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to textarea element', () => {
			const ref = { current: null as HTMLTextAreaElement | null };
			render(<Textarea ref={ref} />);
			expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
		});

		test('can focus textarea using ref', () => {
			const ref = { current: null as HTMLTextAreaElement | null };
			render(<Textarea ref={ref} />);
			ref.current?.focus();
			expect(ref.current).toHaveFocus();
		});
	});
});
