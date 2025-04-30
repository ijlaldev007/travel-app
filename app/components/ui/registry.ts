/**
 * Shadcn UI Component Registry
 * 
 * This file serves as a registry for all Shadcn UI components used in the project.
 * It helps track which components are being used and provides a central place for
 * component documentation and configuration.
 */

export interface ComponentMeta {
  name: string;
  description: string;
  importPath: string;
  status: 'stable' | 'beta' | 'deprecated';
  usageExample?: string;
  props?: Record<string, {
    type: string;
    description: string;
    required: boolean;
    default?: string;
  }>;
}

/**
 * Registry of all Shadcn UI components used in the project
 */
export const componentRegistry: Record<string, ComponentMeta> = {
  // Button component
  button: {
    name: 'Button',
    description: 'A button component with different variants and sizes.',
    importPath: '~/components/ui/button',
    status: 'stable',
    usageExample: `
      import { Button } from "~/components/ui/button"
      
      export default function Example() {
        return (
          <Button variant="default">Click me</Button>
        )
      }
    `,
    props: {
      variant: {
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        description: 'The visual style of the button',
        required: false,
        default: 'default',
      },
      size: {
        type: '"default" | "sm" | "lg" | "icon"',
        description: 'The size of the button',
        required: false,
        default: 'default',
      },
      asChild: {
        type: 'boolean',
        description: 'Whether to render as a child component',
        required: false,
        default: 'false',
      },
    },
  },
  
  // Card component
  card: {
    name: 'Card',
    description: 'A card component for displaying content in a contained manner.',
    importPath: '~/components/ui/card',
    status: 'stable',
    usageExample: `
      import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
      } from "~/components/ui/card"
      
      export default function Example() {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        )
      }
    `,
  },
  
  // Input component
  input: {
    name: 'Input',
    description: 'An input component for collecting user input.',
    importPath: '~/components/ui/input',
    status: 'stable',
    usageExample: `
      import { Input } from "~/components/ui/input"
      
      export default function Example() {
        return <Input placeholder="Enter your name" />
      }
    `,
    props: {
      type: {
        type: 'string',
        description: 'The type of the input element',
        required: false,
        default: 'text',
      },
      placeholder: {
        type: 'string',
        description: 'The placeholder text',
        required: false,
      },
    },
  },
  
  // Add more components as they are added to the project
};

/**
 * Get a component from the registry by its key
 * @param key - The component key
 * @returns The component metadata
 */
export function getComponent(key: keyof typeof componentRegistry): ComponentMeta {
  return componentRegistry[key];
}

/**
 * Get all components from the registry
 * @returns All component metadata
 */
export function getAllComponents(): ComponentMeta[] {
  return Object.values(componentRegistry);
}

/**
 * Get all stable components from the registry
 * @returns All stable component metadata
 */
export function getStableComponents(): ComponentMeta[] {
  return Object.values(componentRegistry).filter(
    (component) => component.status === 'stable'
  );
}
