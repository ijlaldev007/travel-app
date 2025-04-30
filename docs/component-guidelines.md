# Raahi Component Usage Guidelines

This document provides guidelines for using UI components in the Raahi travel app. We use [Shadcn UI](https://ui.shadcn.com/) as our component library foundation, with customizations to match our design system.

## Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Component Selection](#component-selection)
3. [Component Customization](#component-customization)
4. [Component Composition](#component-composition)
5. [Accessibility Guidelines](#accessibility-guidelines)
6. [Performance Considerations](#performance-considerations)
7. [Component-Specific Guidelines](#component-specific-guidelines)

## General Guidelines

- **Consistency**: Use the same component for the same purpose throughout the app.
- **Simplicity**: Keep components simple and focused on a single responsibility.
- **Reusability**: Design components to be reusable across different parts of the app.
- **Documentation**: Document component props and usage examples.
- **Testing**: Write tests for components to ensure they work as expected.

## Component Selection

When selecting a component for a specific use case, consider the following:

1. **Purpose**: Choose the component that best matches the intended purpose.
2. **Complexity**: Use the simplest component that meets the requirements.
3. **Consistency**: Use the same component for similar use cases throughout the app.
4. **Accessibility**: Ensure the component meets accessibility requirements.
5. **Performance**: Consider the performance implications of the component.

### Component Decision Tree

```
Need to collect user input?
├── Single line text → Input
├── Multiple lines of text → Textarea
├── Selection from a list → Select or Combobox
├── Yes/No → Checkbox or Switch
├── One from many options → RadioGroup
└── Date or time → DatePicker or TimePicker

Need to display information?
├── Tabular data → Table
├── Lists → List or DescriptionList
├── Status → Badge
├── User → Avatar
└── Metrics → Card with appropriate content

Need user interaction?
├── Primary action → Button (primary variant)
├── Secondary action → Button (secondary variant)
├── Destructive action → Button (destructive variant)
├── Navigation → Link
└── Complex interaction → Custom component
```

## Component Customization

When customizing components, follow these guidelines:

1. **Use the `cn` utility**: Always use the `cn` utility from `~/lib/utils` to merge class names.
2. **Respect the component API**: Don't override component behavior in ways that break its API.
3. **Use variants**: Use the built-in variant props before adding custom styles.
4. **Extend, don't replace**: Extend components rather than replacing them.
5. **Document customizations**: Document any customizations for other developers.

### Example: Customizing a Button

```tsx
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// Good: Using the cn utility to merge class names
<Button className={cn("bg-primary-100", className)} />

// Bad: Overriding class names directly
<Button className="bg-primary-100" />
```

## Component Composition

When composing components, follow these guidelines:

1. **Use composition over inheritance**: Prefer composing components over extending them.
2. **Keep components focused**: Each component should have a single responsibility.
3. **Use context for shared state**: Use React Context for sharing state between components.
4. **Document composition patterns**: Document how components should be composed.

### Example: Composing Card Components

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

// Good: Using composition to create a stat card
function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-2xl font-bold">{value}</p>
        {icon}
      </CardContent>
    </Card>
  );
}
```

## Accessibility Guidelines

Ensure all components are accessible by following these guidelines:

1. **Semantic HTML**: Use semantic HTML elements appropriate for the content.
2. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible.
3. **Screen readers**: Provide appropriate ARIA attributes for screen readers.
4. **Color contrast**: Ensure sufficient color contrast for text and interactive elements.
5. **Focus management**: Manage focus appropriately, especially in modals and dialogs.

### Example: Accessible Button

```tsx
// Good: Using appropriate ARIA attributes
<Button aria-label="Close dialog">
  <XIcon />
</Button>

// Bad: Missing ARIA attributes for icon-only buttons
<Button>
  <XIcon />
</Button>
```

## Performance Considerations

Consider performance when using components:

1. **Memoization**: Use React.memo for expensive components.
2. **Lazy loading**: Lazy load components that aren't needed immediately.
3. **Code splitting**: Split code by route or feature to reduce initial load time.
4. **Virtualization**: Use virtualization for long lists.
5. **Debouncing and throttling**: Debounce or throttle event handlers for performance.

### Example: Memoizing a Component

```tsx
import { memo } from "react";
import { Card, CardContent } from "~/components/ui/card";

// Memoize the component to prevent unnecessary re-renders
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return (
    <Card>
      <CardContent>
        {/* Expensive rendering logic */}
      </CardContent>
    </Card>
  );
});
```

## Component-Specific Guidelines

### Buttons

- Use the appropriate variant for the action's importance:
  - `primary`: Main actions (e.g., "Create Trip", "Submit")
  - `secondary`: Alternative actions (e.g., "Cancel", "Back")
  - `destructive`: Destructive actions (e.g., "Delete", "Remove")
  - `outline`: Secondary actions that need visual distinction
  - `ghost`: Subtle actions that don't need much emphasis
  - `link`: Actions that should appear as links

- Use the appropriate size for the context:
  - `default`: Most buttons
  - `sm`: When space is limited or for less important actions
  - `lg`: For important actions that need emphasis
  - `icon`: For icon-only buttons

### Forms

- Group related form fields with `fieldset` and `legend`.
- Use `FormLabel` for all form inputs.
- Provide clear validation messages for form errors.
- Use consistent layout for forms throughout the app.
- Consider using form libraries like React Hook Form for complex forms.

### Cards

- Use cards to group related content.
- Maintain consistent padding and spacing within cards.
- Use card components for their intended purpose:
  - `Card`: Container for the card
  - `CardHeader`: Header section of the card
  - `CardTitle`: Title of the card
  - `CardDescription`: Description or subtitle of the card
  - `CardContent`: Main content of the card
  - `CardFooter`: Footer section of the card

### Tables

- Use tables for tabular data only.
- Provide column headers with appropriate scope attributes.
- Consider using virtualization for large tables.
- Implement sorting, filtering, and pagination for large datasets.
- Ensure tables are responsive on small screens.

### Dialogs and Modals

- Use dialogs for focused tasks that require user attention.
- Manage focus appropriately when opening and closing dialogs.
- Provide clear actions for dismissing the dialog.
- Consider using a backdrop to prevent interaction with the rest of the page.
- Ensure dialogs are accessible to screen readers.

## Conclusion

Following these guidelines will help ensure consistency, accessibility, and performance across the Raahi travel app. If you have questions or need clarification, please refer to the component documentation or ask the team.
