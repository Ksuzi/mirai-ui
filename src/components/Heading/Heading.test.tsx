import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Heading } from './Heading.component';

describe('Heading', () => {
	describe('Rendering', () => {
		test('renders heading content', () => {
			render(<Heading>Hello World</Heading>);
			expect(screen.getByText('Hello World')).toBeInTheDocument();
		});

		test('renders as h2 by default', () => {
			render(<Heading>Default Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveTextContent('Default Heading');
		});

		test('renders as h1 when as="h1"', () => {
			render(<Heading as="h1">H1 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 1 });
			expect(heading).toHaveTextContent('H1 Heading');
		});

		test('renders as h2 when as="h2"', () => {
			render(<Heading as="h2">H2 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveTextContent('H2 Heading');
		});

		test('renders as h3 when as="h3"', () => {
			render(<Heading as="h3">H3 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 3 });
			expect(heading).toHaveTextContent('H3 Heading');
		});

		test('renders as h4 when as="h4"', () => {
			render(<Heading as="h4">H4 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 4 });
			expect(heading).toHaveTextContent('H4 Heading');
		});

		test('renders as h5 when as="h5"', () => {
			render(<Heading as="h5">H5 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 5 });
			expect(heading).toHaveTextContent('H5 Heading');
		});

		test('renders as h6 when as="h6"', () => {
			render(<Heading as="h6">H6 Heading</Heading>);
			const heading = screen.getByRole('heading', { level: 6 });
			expect(heading).toHaveTextContent('H6 Heading');
		});

		test('applies custom className', () => {
			render(<Heading className="custom-class">Heading</Heading>);
			expect(screen.getByText('Heading')).toHaveClass('custom-class');
		});
	});

	describe('Variants', () => {
		test('renders with different sizes', () => {
			const { rerender } = render(<Heading size="xs">Extra Small</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Extra Small');

			rerender(<Heading size="sm">Small</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Small');

			rerender(<Heading size="md">Medium</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Medium');

			rerender(<Heading size="lg">Large</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Large');

			rerender(<Heading size="xl">Extra Large</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Extra Large');
		});

		test('renders with color palette', () => {
			render(<Heading colorPalette="blue">Colored Heading</Heading>);
			expect(screen.getByRole('heading')).toHaveTextContent('Colored Heading');
		});

		test('size prop is independent of semantic heading level', () => {
			render(
				<Heading as="h1" size="xs">
					Small H1
				</Heading>
			);
			const heading = screen.getByRole('heading', { level: 1 });
			expect(heading).toHaveTextContent('Small H1');
		});
	});

	describe('Props', () => {
		test('accepts and applies HTML attributes', () => {
			render(
				<Heading data-testid="test-heading" id="my-heading">
					Heading with props
				</Heading>
			);
			const element = screen.getByTestId('test-heading');
			expect(element).toHaveAttribute('id', 'my-heading');
		});
	});

	describe('Accessibility', () => {
		test('maintains proper heading hierarchy with different sizes', () => {
			render(
				<>
					<Heading as="h1">Main Title</Heading>
					<Heading as="h2">Subtitle</Heading>
					<Heading as="h3">Section</Heading>
				</>
			);

			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
			expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
			expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to h2 element by default', () => {
			const ref = { current: null as HTMLHeadingElement | null };
			render(<Heading ref={ref}>Heading</Heading>);
			expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
			expect(ref.current?.tagName).toBe('H2');
		});

		test('forwards ref to h1 element when as="h1"', () => {
			const ref = { current: null as HTMLHeadingElement | null };
			render(
				<Heading as="h1" ref={ref}>
					Heading
				</Heading>
			);
			expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
			expect(ref.current?.tagName).toBe('H1');
		});

		test('forwards ref to h3 element when as="h3"', () => {
			const ref = { current: null as HTMLHeadingElement | null };
			render(
				<Heading as="h3" ref={ref}>
					Heading
				</Heading>
			);
			expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
			expect(ref.current?.tagName).toBe('H3');
		});
	});
});
