import { useEffect, useRef } from 'react';

/**
 * Custom hook to add event listeners to DOM elements or window
 * Properly handles cleanup and prevents memory leaks
 *
 * @param eventName - The name of the event to listen for
 * @param handler - The event handler function
 * @param element - The element to attach the listener to (defaults to window)
 * @param options - Optional event listener options
 *
 * @example
 * ```tsx
 * useEventListener('mousedown', handleClick, document);
 * useEventListener('keydown', handleKeyPress, window);
 * useEventListener('scroll', handleScroll, elementRef.current);
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
	eventName: K,
	handler: (event: WindowEventMap[K]) => void,
	element?: Window | null,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
	eventName: K,
	handler: (event: DocumentEventMap[K]) => void,
	element: Document | null,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element: HTMLElement | null,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element: HTMLElement | Document | Window | null = window,
	options?: boolean | AddEventListenerOptions
): void {
	const savedHandler = useRef(handler);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		if (!element?.addEventListener) {
			return;
		}

		const eventListener: typeof handler = (event) => {
			savedHandler.current(event);
		};

		element.addEventListener(eventName, eventListener as EventListener, options);

		return () => {
			element.removeEventListener(eventName, eventListener as EventListener, options);
		};
	}, [eventName, element, options]);
}
