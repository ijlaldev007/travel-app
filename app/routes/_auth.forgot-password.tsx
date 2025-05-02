/**
 * Forgot Password page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

import { useAuthContext } from '@/contexts/AuthContext';

// UI Components
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '~/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '~/components/ui/card';

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const meta = () => {
  return [
    { title: 'Forgot Password | Raahi' },
    { name: 'description', content: 'Reset your Raahi account password' },
  ];
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword, loading, error, resetError } = useAuthContext();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    resetError();
    setFormError(null);
    setSuccess(false);

    try {
      await resetPassword(values.email);
      setSuccess(true);
      form.reset();
    } catch (err) {
      setFormError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: 'url("/assets/images/auth-img.webp")' }}>
      <div className="w-full max-w-md px-4 py-12">
        <Card className="w-full bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
          </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Alert */}
          {(error || formError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {formError || error?.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle>Email Sent</AlertTitle>
              <AlertDescription>
                Password reset instructions have been sent to your email address.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Forgot Password Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Remember your password?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Back to login
            </a>
          </p>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
