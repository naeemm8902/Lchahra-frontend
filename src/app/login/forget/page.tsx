import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ForgetPasswordForm } from "./forget-form";

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
                  Reset Password
                </CardTitle>
                <p className="text-gray-200 text-sm">
                  Enter your email to receive a password reset link
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ForgetPasswordForm />
              <div className="mt-6 text-center">
                <Link 
                  href={'/login'} 
                  className="inline-flex items-center text-gray-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Login
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
