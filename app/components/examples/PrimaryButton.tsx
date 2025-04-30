import React from 'react';
// Note: These imports will work once the Shadcn UI components are added using the CLI
// import { Button, ButtonProps } from "~/components/ui/button";
// import { cn } from "~/lib/utils";

/**
 * PrimaryButton Component
 * 
 * This is an example component that demonstrates how to extend Shadcn UI components
 * using the wrapper pattern.
 * 
 * Note: This component requires the Button component to be added using the Shadcn CLI:
 * npx shadcn-ui add button
 */
export interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function PrimaryButton({ 
  children, 
  className, 
  onClick, 
  disabled, 
  type = 'button',
  size = 'default'
}: PrimaryButtonProps) {
  // This is just a placeholder implementation
  // Replace with actual Shadcn UI Button component once it's added
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 py-1.5 text-sm',
    lg: 'h-11 px-8 py-2.5',
    icon: 'h-10 w-10 p-2',
  };
  
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium 
                 bg-primary-100 text-white hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none
                 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/**
 * Example usage:
 * 
 * ```tsx
 * import { PrimaryButton } from "~/components/examples/PrimaryButton";
 * import { Plus } from "lucide-react";
 * 
 * export default function ToolbarExample() {
 *   return (
 *     <div className="flex gap-2">
 *       <PrimaryButton>Create Trip</PrimaryButton>
 *       <PrimaryButton size="sm">Small Button</PrimaryButton>
 *       <PrimaryButton size="lg">Large Button</PrimaryButton>
 *       <PrimaryButton size="icon"><Plus className="h-4 w-4" /></PrimaryButton>
 *     </div>
 *   );
 * }
 * ```
 */
