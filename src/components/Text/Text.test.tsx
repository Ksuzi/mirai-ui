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
		test('renders with different text styles', () => {
			const { rerender } = render(<Text textStyle="xs">Extra Small</Text>);
			expect(screen.getByText('Extra Small')).toBeInTheDocument();

			rerender(<Text textStyle="sm">Small</Text>);
			expect(screen.getByText('Small')).toBeInTheDocument();

			rerender(<Text textStyle="md">Medium</Text>);
			expect(screen.getByText('Medium')).toBeInTheDocument();

			rerender(<Text textStyle="lg">Large</Text>);
			expect(screen.getByText('Large')).toBeInTheDocument();
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

		test('renders with color palette', () => {
			render(<Text colorPalette="blue">Colored text</Text>);
			expect(screen.getByText('Colored text')).toBeInTheDocument();
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
