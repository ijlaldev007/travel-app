/**
 * Component Extension Patterns
 * 
 * This file provides utility functions and patterns for extending and customizing
 * Shadcn UI components to match the project's design system.
 */

import React from 'react';
import { cn } from './utils';

/**
 * Higher-Order Component (HOC) pattern for adding common functionality to components
 * @param Component - The component to wrap
 * @param className - Additional class names to apply
 * @returns A new component with the added functionality
 */
export function withClassName<T extends { className?: string }>(
  Component: React.ComponentType<T>,
  className: string
) {
  const WithClassName = (props: T) => {
    return <Component className={cn(className, props.className)} {...props} />;
  };
  
  WithClassName.displayName = `WithClassName(${Component.displayName || Component.name})`;
  return WithClassName;
}

/**
 * Variant pattern for creating component variants with predefined props
 * @param Component - The component to create a variant of
 * @param variantProps - The props to apply to the variant
 * @returns A new component with the variant props
 */
export function createVariant<T extends object>(
  Component: React.ComponentType<T>,
  variantProps: Partial<T>
) {
  const Variant = (props: T) => {
    return <Component {...variantProps} {...props} />;
  };
  
  Variant.displayName = `Variant(${Component.displayName || Component.name})`;
  return Variant;
}

/**
 * Composition pattern for creating a component from multiple components
 * @param components - The components to compose
 * @returns A new component composed of the input components
 */
export function composeComponents(
  ...components: React.ComponentType<any>[]
) {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      const ComposedComponents = (props: any) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent {...props} />
          </AccumulatedComponents>
        );
      };
      
      ComposedComponents.displayName = `Composed(${AccumulatedComponents.displayName || 'Component'}, ${CurrentComponent.displayName || 'Component'})`;
      return ComposedComponents;
    },
    ({ children }: { children?: React.ReactNode }) => <>{children}</>
  );
}

/**
 * Responsive component pattern for creating components that adapt to different screen sizes
 * @param Component - The component to make responsive
 * @param breakpointProps - The props to apply at different breakpoints
 * @returns A new component that adapts to different screen sizes
 */
export function createResponsiveComponent<T extends { className?: string }>(
  Component: React.ComponentType<T>,
  breakpointProps: {
    base?: Partial<T>;
    sm?: Partial<T>;
    md?: Partial<T>;
    lg?: Partial<T>;
    xl?: Partial<T>;
  }
) {
  const ResponsiveComponent = (props: T) => {
    // Combine all classes from different breakpoints
    const className = cn(
      props.className,
      breakpointProps.base?.className,
      breakpointProps.sm?.className && 'sm:' + breakpointProps.sm.className,
      breakpointProps.md?.className && 'md:' + breakpointProps.md.className,
      breakpointProps.lg?.className && 'lg:' + breakpointProps.lg.className,
      breakpointProps.xl?.className && 'xl:' + breakpointProps.xl.className
    );
    
    // Combine all other props
    const combinedProps = {
      ...breakpointProps.base,
      ...props,
      className
    };
    
    return <Component {...combinedProps} />;
  };
  
  ResponsiveComponent.displayName = `Responsive(${Component.displayName || Component.name})`;
  return ResponsiveComponent;
}

/**
 * Theme variant pattern for creating themed component variants
 * @param Component - The component to create a themed variant of
 * @param theme - The theme to apply
 * @returns A new component with the themed variant
 */
export function createThemedComponent<T extends { className?: string }>(
  Component: React.ComponentType<T>,
  theme: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
) {
  const themeClasses = {
    primary: 'bg-primary-100 text-white hover:bg-primary-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700',
    success: 'bg-success-500 text-white hover:bg-success-700',
    danger: 'bg-red-500 text-white hover:bg-red-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-700',
    info: 'bg-navy-500 text-white hover:bg-navy-700',
  };
  
  const ThemedComponent = (props: T) => {
    return <Component className={cn(themeClasses[theme], props.className)} {...props} />;
  };
  
  ThemedComponent.displayName = `${theme.charAt(0).toUpperCase() + theme.slice(1)}(${Component.displayName || Component.name})`;
  return ThemedComponent;
}
