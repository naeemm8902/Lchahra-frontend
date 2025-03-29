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
import { LoaderIcon } from 'lucide-react';

// Define the schema using zod
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const page = () => {
  return (
    <div className="flex ">
      <div
        className="bg-blue-300 w-full"
        style={{
          backgroundImage: 'url(/loginbg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <Card className=" h-screen w-fit">
        <div className=" h-full flex justify-center items-center text-white">
          <div className=" px-4">
            <CardHeader>
              <h1 className="text-center text-4xl font-bold mb-4 cursor-pointer">
                LCHAHRA
              </h1>
              <CardTitle className="text-center">
                Welcome to login Page
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <LoginForm />
              <div className="flex flex-col gap-2 mt-2">
                <Link href={'/login/forget'}>Forgot Password?</Link>
                <Link href={'/login/signup'}>SignUp</Link>
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  {...field}
                  className=" sm:min-w-96"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                  className="sm:min-w-96"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full disabled:cursor-not-allowed"
          disabled={isLoading ? true : false}
        >
          {isLoading ? <LoaderIcon className="animate-spin" /> : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};
