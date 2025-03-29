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
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import useApiCall from '@/helpers/useApiCall';
import { LoaderIcon } from 'lucide-react';

// Define the schema using zod
const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  userName: z.string().min(6, {
    message: 'User Name mut be at least 6 characters',
  }),
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
                Welcome! let&apos;s create your account
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <SignupForm />
              <div className="flex flex-col gap-2 mt-2">
                <Link href={'/login'}>login</Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;

const SignupForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { error, isLoading, request } = useApiCall();

  // Initialize the form with useForm and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      userName: '',
      email: '',
      password: '',
    },
  });
  const { reset } = form;
  const onSubmit = async (data: {
    name: String;
    userName: String;
    email: String;
    password: String;
  }) => {
    console.log(data);
    try {
      const res = await request({
        method: 'POST',
        url: 'users',
        data: data,
      });
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Your account has been created successfully kindly login.',
      });
      reset();
      router.push('/login');
    } catch (err: any) {
      let errorMessage = 'An error occurred. Please try again.';

      if (err.response && err.response.status === 400) {
        errorMessage = err.response.data.message || 'User already exists.';
      }

      toast({
        variant: 'destructive',
        title: 'Error!',
        description: errorMessage,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  type="text"
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="User Name"
                  type="text"
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
