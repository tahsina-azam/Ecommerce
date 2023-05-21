import LottieAnimation from "@/components/LottieAnimation";
import UserRegistrationForm from "@/components/forms/UserRegistrationForm";
import { Icons } from "@/components/icons";
import Link from "next/link";
// import Lottie from "react-lottie";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="tw-container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-in"
        className="absolute left-4 top-4 md:left-8 md:top-8"
      >
        <div className="flex justify-center items-center">
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Login
        </div>
      </Link>
      <div className="hidden h-full bg-slate-50 lg:flex w-full flex-col justify-center items-center">
        <LottieAnimation type="buy-and-sell-online" height={400} width={800} />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <UserRegistrationForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="#"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
