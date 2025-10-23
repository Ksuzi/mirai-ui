import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import type { RenderOptions, RenderResult } from '@testing-library/react';

/**
 * Custom render function that wraps components with necessary providers.
 * Currently passes through to standard render, but can be extended in the future
 * to include theme providers, context providers, etc.
 *
 * @example
 * ```tsx
 * import { customRender as render } from '@mirai-ui/test';
 *
 * test('renders component', () => {
 *   render(<Button>Click me</Button>);
 *   // ...
 * });
 * ```
 */
export function customRender(ui: ReactElement, options?: RenderOptions): RenderResult {
	return render(ui, { ...options });
}
