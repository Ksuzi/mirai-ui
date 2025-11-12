import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
	it('should add event listener to window', () => {
		const handler = vi.fn();
		const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

		renderHook(() => useEventListener('click', handler));

		expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
		addEventListenerSpy.mockRestore();
	});

	it('should add event listener to document', () => {
		const handler = vi.fn();
		const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

		renderHook(() => useEventListener('mousedown', handler, document));

		expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), undefined);
		addEventListenerSpy.mockRestore();
	});

	it('should remove event listener on unmount', () => {
		const handler = vi.fn();
		const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = renderHook(() => useEventListener('resize', handler));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), undefined);
		removeEventListenerSpy.mockRestore();
	});

	it('should call handler when event is triggered', () => {
		const handler = vi.fn();

		renderHook(() => useEventListener('click', handler, window));

		const clickEvent = new MouseEvent('click');
		window.dispatchEvent(clickEvent);

		expect(handler).toHaveBeenCalledWith(clickEvent);
	});

	it('should update handler without re-attaching listener', () => {
		const handler1 = vi.fn();
		const handler2 = vi.fn();
		const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

		const { rerender } = renderHook(({ handler }) => useEventListener('click', handler), {
			initialProps: { handler: handler1 },
		});

		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

		rerender({ handler: handler2 });

		// Should still be called only once (no re-attachment)
		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

		const clickEvent = new MouseEvent('click');
		window.dispatchEvent(clickEvent);

		// New handler should be called
		expect(handler1).not.toHaveBeenCalled();
		expect(handler2).toHaveBeenCalledWith(clickEvent);

		addEventListenerSpy.mockRestore();
	});

	it('should support event listener options', () => {
		const handler = vi.fn();
		const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

		renderHook(() => useEventListener('scroll', handler, window, { passive: true }));

		expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
		addEventListenerSpy.mockRestore();
	});
});

