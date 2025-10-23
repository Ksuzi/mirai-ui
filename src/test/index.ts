// Re-export everything from @testing-library/react
export * from '@testing-library/react';
// Re-export userEvent
export { default as userEvent } from '@testing-library/user-event';
// Export render as default for convenience
export { customRender as render } from './render';
