import { Button } from '../../src';
import { useState } from 'react';

// Mock icons for demonstration
const PlusIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<line x1="12" y1="5" x2="12" y2="19"></line>
		<line x1="5" y1="12" x2="19" y2="12"></line>
	</svg>
);

const ArrowRightIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<line x1="5" y1="12" x2="19" y2="12"></line>
		<polyline points="12,5 19,12 12,19"></polyline>
	</svg>
);

const TrashIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<polyline points="3,6 5,6 21,6"></polyline>
		<path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
	</svg>
);

export function App() {
	const [loading, setLoading] = useState(false);

	const handleAsyncAction = async () => {
		setLoading(true);
		// Simulate async operation
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-4xl mx-auto space-y-12">
				<header className="text-center space-y-4">
					<h1 className="text-4xl font-bold text-foreground">Mirai UI Button Component</h1>
					<p className="text-muted-foreground text-lg">
						A comprehensive, accessible, and customizable button component built with shadcn/ui
						patterns
					</p>
				</header>

				{/* Basic Usage */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Basic Usage</h2>
					<div className="flex flex-wrap gap-4">
						<Button>Default Button</Button>
						<Button disabled>Disabled Button</Button>
						<Button asChild>
							<a href="#demo">As Child (Link)</a>
						</Button>
					</div>
				</section>

				{/* Variants */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Variants</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Default</h3>
							<Button variant="default">Default</Button>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Destructive</h3>
							<Button variant="destructive">Destructive</Button>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Outline</h3>
							<Button variant="outline">Outline</Button>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Secondary</h3>
							<Button variant="secondary">Secondary</Button>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Ghost</h3>
							<Button variant="ghost">Ghost</Button>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Link</h3>
							<Button variant="link">Link</Button>
						</div>
					</div>
				</section>

				{/* Sizes */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Sizes</h2>
					<div className="flex flex-wrap items-center gap-4">
						<Button size="sm">Small</Button>
						<Button size="default">Default</Button>
						<Button size="lg">Large</Button>
						<Button size="icon">🚀</Button>
					</div>
				</section>

				{/* With Icons */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">With Icons</h2>
					<div className="flex flex-wrap gap-4">
						<Button leftIcon={<PlusIcon />}>Add Item</Button>
						<Button rightIcon={<ArrowRightIcon />}>Continue</Button>
						<Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
							Add & Continue
						</Button>
						<Button variant="destructive" leftIcon={<TrashIcon />}>
							Delete Item
						</Button>
					</div>
				</section>

				{/* Loading States */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Loading States</h2>
					<div className="flex flex-wrap gap-4">
						<Button loading>Loading...</Button>
						<Button loading loadingText="Saving changes...">
							Save
						</Button>
						<Button loading showSpinner={false}>
							No Spinner
						</Button>
						<Button loading={loading} loadingText="Processing..." onClick={handleAsyncAction}>
							Async Action
						</Button>
					</div>
				</section>

				{/* Accessibility Examples */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Accessibility</h2>
					<div className="flex flex-wrap gap-4">
						<Button aria-label="Close dialog">×</Button>
						<Button aria-pressed="true">Toggle Button</Button>
						<Button aria-expanded="false">Expandable Menu</Button>
						<Button aria-describedby="help-text">Help Button</Button>
						<div id="help-text" className="sr-only">
							This button will open the help section
						</div>
					</div>
				</section>

				{/* Real-world Examples */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Real-world Examples</h2>
					<div className="space-y-6">
						{/* Form Actions */}
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Form Actions</h3>
							<div className="flex gap-2">
								<Button variant="outline">Cancel</Button>
								<Button>Save Draft</Button>
								<Button variant="destructive">Delete</Button>
							</div>
						</div>

						{/* Navigation */}
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Navigation</h3>
							<div className="flex gap-2">
								<Button variant="outline" leftIcon={<ArrowRightIcon />}>
									Previous
								</Button>
								<Button rightIcon={<ArrowRightIcon />}>Next</Button>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-2">
							<h3 className="font-medium text-sm text-muted-foreground">Action Buttons</h3>
							<div className="flex gap-2">
								<Button size="sm" leftIcon={<PlusIcon />}>
									Add New
								</Button>
								<Button size="sm" variant="outline">
									Import
								</Button>
								<Button size="sm" variant="ghost">
									Export
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Code Examples */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">Code Examples</h2>
					<div className="bg-muted p-4 rounded-lg">
						<pre className="text-sm text-muted-foreground overflow-x-auto">
							{`// Basic usage
<Button>Click me</Button>

// With variants and sizes
<Button variant="destructive" size="lg">
  Delete Account
</Button>

// With loading state
<Button loading loadingText="Saving...">
  Save Changes
</Button>

// With icons
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
  Add Item
</Button>

// As child (composition)
<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>

// Accessibility
<Button 
  aria-label="Close dialog"
  aria-describedby="help-text"
>
  ×
</Button>`}
						</pre>
					</div>
				</section>
			</div>
		</div>
	);
}
