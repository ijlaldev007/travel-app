import React from 'react';
// Note: These imports will work once the Shadcn UI components are added using the CLI
// import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

/**
 * StatCard Component
 * 
 * This is an example component that demonstrates how to use Shadcn UI components
 * with the component extension patterns.
 * 
 * Note: This component requires the Card component to be added using the Shadcn CLI:
 * npx shadcn-ui add card
 */
export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  // This is just a placeholder implementation
  // Replace the div elements with actual Shadcn UI components once they are added
  return (
    <div className={`p-6 rounded-lg border bg-white shadow-sm ${className}`}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
      </div>
      <div className="p-6 pt-0 flex items-center justify-between">
        <p className="text-2xl font-bold">{value}</p>
        {icon}
        {trend && (
          <div className={`flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Example usage:
 * 
 * ```tsx
 * import { StatCard } from "~/components/examples/StatCard";
 * import { Users } from "lucide-react";
 * 
 * export default function Dashboard() {
 *   return (
 *     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 *       <StatCard 
 *         title="Total Users" 
 *         value="1,234" 
 *         icon={<Users className="h-6 w-6" />} 
 *         trend={{ value: 12, isPositive: true }}
 *       />
 *       <StatCard 
 *         title="Active Trips" 
 *         value="42" 
 *         trend={{ value: 8, isPositive: true }}
 *       />
 *       <StatCard 
 *         title="Revenue" 
 *         value="$12,345" 
 *         trend={{ value: 5, isPositive: false }}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
