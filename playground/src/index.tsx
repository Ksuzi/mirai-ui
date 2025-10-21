import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from './App';
import './style.css';

const appElement = document.querySelector('#app');

if (!appElement) {
	throw new Error('Failed to find the app element');
}

createRoot(appElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
