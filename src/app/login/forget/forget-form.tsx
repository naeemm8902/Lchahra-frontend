"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useApiCall from "@/helpers/useApiCall";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const ForgetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { error, isLoading, request } = useApiCall();
  const [emailSent, setEmailSent] = useState(false);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await request({
        url: "/auth/forgot-password",
        method: "POST",
        data: {
          email: data.email,
        },
      });

      if (response?.status === 200) {
        setEmailSent(true);
        toast({
          title: "Success",
          description: "Password reset link has been sent to your email.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error || "Failed to send reset link. Please try again.",
      });
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Check Your Email</h3>
        <p className="text-gray-200">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </p>
        <div className="mt-6">
          <Button
            type="button"
            className="text-gray-200 hover:text-white underline"
            variant="link"
            onClick={() => setEmailSent(false)}
          >
            Didn't receive the email? Try again
          </Button>
        </div>
      </div>
    );
  }

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
              <span className="text-white font-semibold">Send Reset Link</span>
            )}
          </div>
        </Button>
      </form>
    </Form>
  );
};
