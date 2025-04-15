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
        <div className=" h-full flex justify-center items-center text-black ">
          <div className=" px-4">
            <CardHeader>
              <h1 className="text-center text-4xl font-bold mb-4 cursor-pointer">
                LCHAHRA
              </h1>
              <CardTitle className="text-center text-black">
                Please put activation code from your gmail
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <InputOTPForm />
              <div className="flex flex-col gap-2 mt-2">
                <Link href={'/login/forget'}>Forgot Password?</Link>
                <Link href={'/login/singup'}>SignUp</Link>
              </div>
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
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
