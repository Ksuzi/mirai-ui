import { SelectContent } from './SelectContent';
import { SelectOptionComposition } from './SelectOptionComposition';
import { SelectRoot } from './SelectRoot';
import { SelectTrigger } from './SelectTrigger';

/**
 * Select - Main compound component with sub-components
 *
 * Supports both props-based mode (for simple use cases) and composition mode (for advanced custom content)
 *
 * @example
 * // Props-based mode (simple)
 * <Select options={[
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2' }
 * ]} />
 *
 * @example
 * // Composition mode (advanced)
 * <Select>
 *   <Select.Trigger placeholder="Choose..." />
 *   <Select.Content>
 *     <Select.Option value="1">Custom Content 1</Select.Option>
 *     <Select.Option value="2">Custom Content 2</Select.Option>
 *   </Select.Content>
 * </Select>
 */
export const Select = Object.assign(SelectRoot, {
	Trigger: SelectTrigger,
	Content: SelectContent,
	Option: SelectOptionComposition,
});
