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
import { useAuth } from '@/context/LoginContext';
import axios from 'axios';
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
                  Verify Email
                </CardTitle>
                <p className="text-gray-200 text-sm">
                  Enter the verification code sent to your email
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <InputOTPForm />
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });
  const { toast } = useToast();
  const { error, isLoading, request } = useApiCall();
  const { login } = useAuth();
  const router = useRouter();
  const { reset } = form;
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    console.log('starts');
    try {
      const res = await request({
        method: 'POST',
        url: 'users/login/loginwithcode',
        data: { code: data.pin },
      });
      console.log('data is', data);
      toast({
        variant: 'success',
        title: 'Success!',
        description: res.user.name + ' Welcome to Lchahra',
      });
      sessionStorage.setItem('accessToken', res.accessToken);
      sessionStorage.setItem('refreshToken', res.refreshToken);
      sessionStorage.setItem('loginUser', JSON.stringify(res.user));
      login();
      router.push('/');
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: error,
      });
      reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Input
                      placeholder="Enter code"
                      {...field}
                      className="w-full text-center text-2xl tracking-widest bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-0"
                      maxLength={6}
                    />
                  </div>
                  <FormMessage className="text-center text-rose-400" />
                </div>
              </FormControl>
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
              <span className="text-white font-semibold">Verify Code</span>
            )}
          </div>
        </Button>
      </form>
    </Form>
  );
}
