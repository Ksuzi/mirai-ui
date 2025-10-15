import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Button } from '@mirai-ui/components';

test('renders button with text', () => {
	render(<Button>Click me</Button>);
	expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

test('handles click events', () => {
	const handleClick = vi.fn();
	render(<Button onClick={handleClick}>Click me</Button>);

	fireEvent.click(screen.getByRole('button'));
	expect(handleClick).toHaveBeenCalledTimes(1);
});

test('disables button when loading', () => {
	render(<Button loading>Loading</Button>);
	expect(screen.getByRole('button')).toBeDisabled();
});

test('shows loading spinner when loading', () => {
	render(<Button loading>Loading</Button>);
	expect(screen.getByLabelText('Loading')).toBeInTheDocument();
});
