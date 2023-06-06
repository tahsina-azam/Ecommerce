import "@/styles/globals.css";
import "@/styles/styles.scss";
import { clsx } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <main className={clsx("font-sans", fontSans.variable)}>
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
