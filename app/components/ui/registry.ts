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

  // Form component
  form: {
    name: 'Form',
    description: 'A form component with validation using React Hook Form.',
    importPath: '~/components/ui/form',
    status: 'stable',
    usageExample: `
      import { useForm } from "react-hook-form"
      import { z } from "zod"
      import { zodResolver } from "@hookform/resolvers/zod"
      import {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
      } from "~/components/ui/form"
      import { Input } from "~/components/ui/input"
      import { Button } from "~/components/ui/button"

      const formSchema = z.object({
        username: z.string().min(2).max(50),
      })

      export default function Example() {
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            username: "",
          },
        })

        function onSubmit(values) {
          console.log(values)
        }

        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )
      }
    `,
  },

  // Checkbox component
  checkbox: {
    name: 'Checkbox',
    description: 'A checkbox component for toggling between checked and unchecked states.',
    importPath: '~/components/ui/checkbox',
    status: 'stable',
    usageExample: `
      import { Checkbox } from "~/components/ui/checkbox"

      export default function Example() {
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        )
      }
    `,
  },

  // Alert component
  alert: {
    name: 'Alert',
    description: 'A component that displays a brief, important message in a way that attracts the user\'s attention.',
    importPath: '~/components/ui/alert',
    status: 'stable',
    usageExample: `
      import {
        Alert,
        AlertDescription,
        AlertTitle,
      } from "~/components/ui/alert"
      import { InfoIcon } from "lucide-react"

      export default function Example() {
        return (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>
        )
      }
    `,
    props: {
      variant: {
        type: '"default" | "destructive"',
        description: 'The visual style of the alert',
        required: false,
        default: 'default',
      },
    },
  },

  // Label component
  label: {
    name: 'Label',
    description: 'A label component for form inputs.',
    importPath: '~/components/ui/label',
    status: 'stable',
    usageExample: `
      import { Label } from "~/components/ui/label"
      import { Input } from "~/components/ui/input"

      export default function Example() {
        return (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        )
      }
    `,
  },

  // Password Input component (custom)
  passwordInput: {
    name: 'PasswordInput',
    description: 'A password input component with visibility toggle.',
    importPath: '~/components/ui/password-input',
    status: 'stable',
    usageExample: `
      import { PasswordInput } from "~/components/ui/password-input"

      export default function Example() {
        return <PasswordInput placeholder="Enter your password" />
      }
    `,
    props: {
      showToggle: {
        type: 'boolean',
        description: 'Whether to show the visibility toggle button',
        required: false,
        default: 'true',
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
