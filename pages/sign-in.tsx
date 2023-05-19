import UserLoginForm from "@/components/forms/UserLoginForm";
import { Icons } from "@/components/icons";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPageContainer() {
  //TODO: Add auth
  // const isAuthenticated = useAuth();
  const router = useRouter();
  // if (isAuthenticated) {
  //   router.push("/");
  // }
  return <LoginPage />;
}

function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <div className="flex justify-center items-center">
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </div>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-slate-700">
            Enter your email and password to sign in to your account
          </p>
        </div>

        <UserLoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
