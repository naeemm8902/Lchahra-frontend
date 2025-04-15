'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import useApiCall from '@/helpers/useApiCall';
import { LoaderIcon, Eye, EyeOff } from 'lucide-react';

// Define the schema using zod
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="hidden md:block md:flex-1 bg-blue-300"
        style={{
          backgroundImage: 'url(/login.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <Card className="flex-1 md:w-[550px] md:flex-none bg-black/60 backdrop-blur-2xl border-0 shadow-2xl">
        <div className="min-h-screen flex justify-center items-center p-4">
          <div className="w-full max-w-[500px] mx-auto">
            <CardHeader className="space-y-6 pb-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur"></div>
                  <div className="relative h-16 w-16 md:h-20 md:w-20 bg-black rounded-lg flex items-center justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">L</h1>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold text-white">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-200 text-sm">
                  Enter your credentials to access your account
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <div className="mt-6 flex items-center justify-between text-sm">
                <Link 
                  href={'/login/forget'} 
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
                <Link 
                  href={'/login/signup'} 
                  className="inline-flex items-center text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Create Account 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { error, isLoading, request } = useApiCall();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form with useForm and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { reset } = form;
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await request({
        method: 'POST',
        url: 'users/login/sendcode',
        data,
      });
      if (res.accessToken && res.refreshToken) {
        sessionStorage.setItem('accessToken', res.accessToken);
        sessionStorage.setItem('refreshToken', res.refreshToken);
        sessionStorage.setItem('loginUser', JSON.stringify(res.user));
        // console.log('acess token', res.accessToken);
        // console.log('acess refersh token', res.refreshToken);
        // console.log('acess token', res.user);
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Login successful!',
        });
        router.push('/');
        return;
      }

      toast({
        variant: 'success',
        title: 'Success!',
        description: res.message || 'Login code sent to your email.',
      });

      reset();
      router.push('/login/code');
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description:
          err.response?.data?.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-0 pr-10"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-0 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full relative group"
          disabled={isLoading}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-black px-7 py-4 rounded-lg leading-none flex items-center justify-center">
            {isLoading ? (
              <LoaderIcon className="animate-spin h-5 w-5 text-white" />
            ) : (
              <span className="text-white font-semibold">Sign In</span>
            )}
          </div>
        </Button>
      </form>
    </Form>
  );
};
