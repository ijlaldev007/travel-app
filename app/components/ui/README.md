# Raahi UI Component Library

This directory contains all the UI components used in the Raahi travel app. We use [Shadcn UI](https://ui.shadcn.com/) as our component library foundation, with customizations to match our design system.

## Component Registry

We maintain a component registry in `registry.ts` that tracks all the Shadcn UI components used in the project. This helps with documentation and maintenance.

## Important Note

**Do not create Shadcn UI components manually.** Always use the Shadcn CLI to add components to ensure they are properly configured and follow the project's conventions.

## Components to Add

The following components should be added to the project using the Shadcn CLI:

### Core Components

- **Button**: A button component with different variants and sizes.
- **Card**: A card component for displaying content in a contained manner.
- **Input**: An input component for collecting user input.

### Layout Components

- **Sheet**: A side-anchored dialog component.
- **Separator**: A visual divider between content.

### Data Display Components

- **Table**: A table component for displaying data in rows and columns.
- **Avatar**: An image component for user avatars.
- **Badge**: A small visual indicator for statuses or counts.

## Adding New Components

To add a new UI component to the project:

1. **Always use the Shadcn CLI** to add the component:
   ```bash
   npx shadcn-ui add [component-name]
   ```
   This will automatically create the component file in the correct location with proper styling and TypeScript types.

2. After adding the component, register it in the `registry.ts` file:
   ```typescript
   // Example
   componentName: {
     name: 'ComponentName',
     description: 'Description of the component',
     importPath: '~/components/ui/component-name',
     status: 'stable',
     usageExample: `...`,
     props: {
       // Component props
     },
   },
   ```

3. Update this README.md file to include the new component in the appropriate section.

4. If needed, create custom extensions of the component using the patterns described below.

## Component Extension Patterns

We use the following patterns to extend and customize Shadcn UI components:

### 1. Composition Pattern

Use composition to create higher-level components from Shadcn UI primitives:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function StatCard({ title, value, icon }) {
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

### 2. Wrapper Pattern

Create wrapper components that provide default props and styling:

```tsx
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface PrimaryButtonProps extends ButtonProps {
  // Additional props if needed
}

export function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant="default"
      className={cn("bg-primary-100 hover:bg-primary-500", className)}
      {...props}
    />
  );
}
```

### 3. Context Pattern

Use React Context to provide theme or configuration to components:

```tsx
import { createContext, useContext } from "react";
import { Button, ButtonProps } from "~/components/ui/button";

const ButtonSizeContext = createContext<"default" | "sm" | "lg">("default");

export function ButtonGroup({ size = "default", children }) {
  return (
    <ButtonSizeContext.Provider value={size}>
      <div className="flex gap-2">{children}</div>
    </ButtonSizeContext.Provider>
  );
}

export function GroupButton(props: ButtonProps) {
  const size = useContext(ButtonSizeContext);
  return <Button size={size} {...props} />;
}
```

## Best Practices

1. **Consistency**: Use the same component for the same purpose throughout the app.
2. **Composition**: Prefer composition over inheritance when building complex components.
3. **Accessibility**: Ensure all components are accessible by using proper ARIA attributes.
4. **Responsiveness**: Make sure components work well on all screen sizes.
5. **Performance**: Avoid unnecessary re-renders by using memoization where appropriate.
