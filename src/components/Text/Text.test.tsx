import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Text } from './Text.component';

describe('Text', () => {
	describe('Rendering', () => {
		test('renders text content', () => {
			render(<Text>Hello World</Text>);
			expect(screen.getByText('Hello World')).toBeInTheDocument();
		});

		test('renders as paragraph by default', () => {
			const { container } = render(<Text>Paragraph text</Text>);
			expect(container.querySelector('p')).toBeInTheDocument();
			expect(container.querySelector('p')).toHaveTextContent('Paragraph text');
		});

		test('renders as span when as="span"', () => {
			const { container } = render(<Text as="span">Span text</Text>);
			expect(container.querySelector('span')).toBeInTheDocument();
			expect(container.querySelector('span')).toHaveTextContent('Span text');
		});

		test('renders as div when as="div"', () => {
			const { container } = render(<Text as="div">Div text</Text>);
			expect(container.querySelector('div')).toBeInTheDocument();
			expect(container.querySelector('div')).toHaveTextContent('Div text');
		});

		test('renders as label when as="label"', () => {
			const { container } = render(<Text as="label">Label text</Text>);
			expect(container.querySelector('label')).toBeInTheDocument();
			expect(container.querySelector('label')).toHaveTextContent('Label text');
		});

		test('applies custom className', () => {
			render(<Text className="custom-class">Text</Text>);
			expect(screen.getByText('Text')).toHaveClass('custom-class');
		});
	});

	describe('Variants', () => {
		test('renders with different semantic variants', () => {
			const { rerender } = render(<Text variant="body-lg">Body Large</Text>);
			expect(screen.getByText('Body Large')).toBeInTheDocument();

			rerender(<Text variant="body">Body</Text>);
			expect(screen.getByText('Body')).toBeInTheDocument();

			rerender(<Text variant="body-sm">Body Small</Text>);
			expect(screen.getByText('Body Small')).toBeInTheDocument();

			rerender(<Text variant="caption">Caption</Text>);
			expect(screen.getByText('Caption')).toBeInTheDocument();

			rerender(<Text variant="label">Label</Text>);
			expect(screen.getByText('Label')).toBeInTheDocument();

			rerender(<Text variant="overline">Overline</Text>);
			expect(screen.getByText('Overline')).toBeInTheDocument();
		});

		test('renders with different color schemes', () => {
			const { rerender } = render(<Text colorScheme="default">Default</Text>);
			expect(screen.getByText('Default')).toBeInTheDocument();

			rerender(<Text colorScheme="primary">Primary</Text>);
			expect(screen.getByText('Primary')).toBeInTheDocument();

			rerender(<Text colorScheme="success">Success</Text>);
			expect(screen.getByText('Success')).toBeInTheDocument();

			rerender(<Text colorScheme="error">Error</Text>);
			expect(screen.getByText('Error')).toBeInTheDocument();

			rerender(<Text colorScheme="muted">Muted</Text>);
			expect(screen.getByText('Muted')).toBeInTheDocument();
		});

		test('renders with different font weights', () => {
			const { rerender } = render(<Text fontWeight="normal">Normal</Text>);
			expect(screen.getByText('Normal')).toBeInTheDocument();

			rerender(<Text fontWeight="medium">Medium</Text>);
			expect(screen.getByText('Medium')).toBeInTheDocument();

			rerender(<Text fontWeight="semibold">Semibold</Text>);
			expect(screen.getByText('Semibold')).toBeInTheDocument();

			rerender(<Text fontWeight="bold">Bold</Text>);
			expect(screen.getByText('Bold')).toBeInTheDocument();
		});

		test('renders with truncate', () => {
			render(<Text truncate>Truncated text</Text>);
			expect(screen.getByText('Truncated text')).toBeInTheDocument();
		});

		test('renders with line clamp', () => {
			render(<Text lineClamp={2}>Clamped text</Text>);
			expect(screen.getByText('Clamped text')).toBeInTheDocument();
		});

		test('renders with text alignment', () => {
			render(<Text align="center">Centered text</Text>);
			expect(screen.getByText('Centered text')).toBeInTheDocument();
		});
	});

	describe('Props', () => {
		test('accepts and applies HTML attributes', () => {
			render(
				<Text data-testid="test-text" id="my-text">
					Text with props
				</Text>
			);
			const element = screen.getByTestId('test-text');
			expect(element).toHaveAttribute('id', 'my-text');
		});

		test('renders as label element', () => {
			render(<Text as="label">Label text</Text>);
			const label = screen.getByText('Label text');
			expect(label.tagName).toBe('LABEL');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to paragraph element by default', () => {
			const ref = { current: null as HTMLParagraphElement | null };
			render(<Text ref={ref}>Text</Text>);
			expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
		});

		test('forwards ref to span element when as="span"', () => {
			const ref = { current: null as HTMLSpanElement | null };
			render(
				<Text as="span" ref={ref}>
					Text
				</Text>
			);
			expect(ref.current).toBeInstanceOf(HTMLSpanElement);
		});

		test('forwards ref to div element when as="div"', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(
				<Text as="div" ref={ref}>
					Text
				</Text>
			);
			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});

		test('forwards ref to label element when as="label"', () => {
			const ref = { current: null as HTMLLabelElement | null };
			render(
				<Text as="label" ref={ref}>
					Text
				</Text>
			);
			expect(ref.current).toBeInstanceOf(HTMLLabelElement);
		});
	});
});
