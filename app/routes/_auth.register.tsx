/**
 * Registration page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, User, Check } from 'lucide-react';

import { useAuthContext } from '@/contexts/AuthContext';

// UI Components
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/ui/password-input';
import { Checkbox } from '~/components/ui/checkbox';
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
const registerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const meta = () => {
  return [
    { title: 'Register | Raahi' },
    { name: 'description', content: 'Create a new Raahi account' },
  ];
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, loading, error, resetError } = useAuthContext();
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // Initialize form with react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  // Handle password change to update strength indicator
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
    form.setValue('password', password);
  };

  // Handle form submission
  const onSubmit = async (values: RegisterFormValues) => {
    resetError();
    setFormError(null);

    try {
      await signUp(values.email, values.password, values.name);
      navigate('/dashboard');
    } catch (err) {
      setFormError('Failed to create account. Please try again.');
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    resetError();
    setFormError(null);

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setFormError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create your Raahi account</CardTitle>
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

          {/* Registration Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Create a password"
                        {...field}
                        onChange={handlePasswordChange}
                      />
                    </FormControl>

                    {/* Password Strength Indicator */}
                    {field.value && (
                      <div className="mt-2">
                        <div className="flex space-x-1 h-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-full w-full rounded-sm ${
                                level <= passwordStrength
                                  ? level <= 2
                                    ? 'bg-red-500'
                                    : level <= 4
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs mt-1 text-gray-500">
                          {passwordStrength === 0 && 'Very weak'}
                          {passwordStrength === 1 && 'Weak'}
                          {passwordStrength === 2 && 'Fair'}
                          {passwordStrength === 3 && 'Good'}
                          {passwordStrength === 4 && 'Strong'}
                          {passwordStrength === 5 && 'Very strong'}
                        </p>
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
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
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.701-6.735-2.701-5.539 0-10.032 4.493-10.032 10.032s4.493 10.032 10.032 10.032c8.445 0 10.452-7.888 9.629-11.732h-9.629z"
                  fill="currentColor"
                />
              </svg>
            )}
            Google
          </Button>
        </CardContent>

        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
